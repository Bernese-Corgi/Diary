import { LoadingSpinner } from 'components/Icon';
import {
  forwardRef,
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import { DiaryListType, DiaryType } from 'types/dataType';
import { LoadingWrapper, DiaryListWrapper } from './DiaryList.styled';
import { DiaryDetail, DiaryItem } from 'components';
import { NewUpdatedAlertWrapper } from 'components/DiaryApp/DiaryApp.styled';
import { UpdatedDiariesType } from 'container/DiaryListContainer';

interface DiaryListProps {
  diaries: DiaryListType;
  updatedDiaries: UpdatedDiariesType;
}

export interface InfinteLoadingProps {
  isLoading: boolean;
}

const InfinteLoading = forwardRef<HTMLDivElement, InfinteLoadingProps>(
  ({ isLoading }, ref) => {
    return (
      <LoadingWrapper ref={ref} isLoading={isLoading}>
        {isLoading ? (
          <LoadingSpinner className="loadingSpinner" />
        ) : (
          <p>모든 데이터를 로드했습니다</p>
        )}
      </LoadingWrapper>
    );
  }
);

const DiaryList = ({ diaries, updatedDiaries }: DiaryListProps) => {
  /* click diary ------------------------------------------------------------- */
  // 일기 상세 컴포넌트 렌더링 여부
  const [hasDiaryDetail, setHasDiaryDetail] = useState<boolean>(false);
  // 클릭한 일기의 데이터를 설정
  const [matchDiary, setMatchDiary] = useState<DiaryType>();

  // 제목이 일치하는 일기 데이터를 반환
  const findMatchDiary = (title: string) =>
    // container에서 null인 경우의 예외처리가 되었으므로 타입 단언을 사용하고 있다.
    diaries!.find((diary: DiaryType) => diary.title === title);

  // 일기들 중 하나를 클릭할 때의 이벤트 핸들러
  const handleClickItem = (title: string) => {
    // 클릭한 일기의 제목 정보를 인수로 전달해 전체 리스트에서 해당하는 일기 데이터를 상태값으로 설정
    setMatchDiary(findMatchDiary(title));
    // 일기 상세 컴포넌트를 렌더링하도록 설정한다
    setHasDiaryDetail(true);
  };

  // 일기 상세 컴포넌트를 닫는 이벤트 핸들러
  const handleCloseDiary = () => setHasDiaryDetail(false);

  /* infinite scroll --------------------------------------------------------- */
  interface inifiniteScrollOptType {
    skip: number;
    loading: boolean;
  }

  /* ------------------ 스크롤 옵저빙에 필요한 상태들 ------------------ */
  const LIMIT = 10; // 로드할 아이템 개수
  const initialScrollOpt: inifiniteScrollOptType = {
    skip: 0, // 로드된 아이템 개수
    loading: false, // 스크롤 로딩 상태
  };
  // 스크롤 시 필요한 옵션 상태
  const [scrollOpt, setScrollOpt] =
    useState<inifiniteScrollOptType>(initialScrollOpt);

  // intersection observer에 전달할 타겟 및 상위 요소 ref
  const observerRoot = useRef<HTMLDivElement>(null);
  const observerTarget = useRef<HTMLDivElement>(null);

  // 스크롤할 때마다 렌더링될 일기 리스트
  const [pagingDiaries, setPagingDiaries] = useState<DiaryListType>();

  /* ------------------ 로드될 아이템을 설정하는 함수 ------------------ */
  const getMoreItems = useCallback(async () => {
    if (scrollOpt.skip === 0) {
      // first : 처음 아이템을 로드할 때 실행된다.
      setScrollOpt(prev => ({ ...prev, loading: true })); // 로딩 시작

      setTimeout(async () => {
        // diaries의 0번째부터 LIMIT까지 설정
        await setPagingDiaries([...diaries!.slice(0, LIMIT)]);

        setScrollOpt(prev => ({
          ...prev,
          skip: prev.skip + LIMIT, // skip 값을 늘려서 데이터를 더 로드한다
          loading: false, // 로딩 종료
        }));
      }, 700);
    } else if (scrollOpt.skip !== 0 && !(scrollOpt.skip >= diaries!.length)) {
      // middle : 현재 로드된 데이터 개수(skip)가 전체 데이터의 length보다 작으면 실행
      setScrollOpt(prev => ({ ...prev, loading: true })); // 로딩 시작

      // 로딩 상태를 살피기 위해 setTimeout으로 지연
      setTimeout(async () => {
        // 이전 값에 다음 로드될 아이템을 더한다.
        diaries &&
          (await setPagingDiaries(
            prev =>
              prev && [
                ...prev,
                ...diaries!.slice(scrollOpt.skip, scrollOpt.skip + LIMIT),
              ]
          ));

        setScrollOpt(prev => ({
          ...prev,
          skip: prev.skip + LIMIT, // skip 값을 늘려서 데이터를 더 로드한다
          loading: false, // 로딩 종료
        }));
      }, 700);
    } else {
      // end : LIMIT보다 적은 아이템이 남은 경우 실행된다.
      setScrollOpt(prev => ({ ...prev, loading: true })); // 로딩 시작

      // 로딩 상태를 살피기 위해 setTimeout으로 지연
      setTimeout(async () => {
        // 이전 값에 다음 로드될 아이템을 더한다.
        diaries &&
          (await setPagingDiaries(
            prev =>
              prev && [
                ...prev,
                ...diaries!.slice(scrollOpt.skip, scrollOpt.skip + LIMIT),
              ]
          ));

        // skip 값을 늘리지 않고 로딩 종료
        setScrollOpt(prev => ({ ...prev, loading: false })); // 로딩 종료
      }, 700);
    }
  }, [diaries, scrollOpt.skip]);

  const onIntersection = useCallback(
    async ([entry]: IntersectionObserverEntry[]) => {
      // 타겟이 주시되고 있을 때 getMoreItem 함수를 실행한다.
      if (entry.isIntersecting) {
        getMoreItems();
      }
    },
    [getMoreItems]
  );

  // 옵저버 옵션
  const observerOption: IntersectionObserverInit = useMemo(
    () => ({
      root: observerRoot.current,
      threshold: 0.5,
    }),
    []
  );

  // 옵저버 등록
  useEffect(() => {
    let observer: IntersectionObserver;

    if (observerTarget) {
      observer = new IntersectionObserver(onIntersection, observerOption);
      observerTarget.current && observer.observe(observerTarget.current);
    }
    return () => {
      observer && observer.disconnect();
    };
    // skip 값이 변경될 때마다 observer를 설정한다.
  }, [scrollOpt.skip]);

  // {/* 새로운 데이터가 업데이트 시 렌더링 */}
  return (
    <div>
      {updatedDiaries?.length && (
        <NewUpdatedAlertWrapper>
          <p>
            새로운 데이터가
            <span className="highlight">
              {' ' + updatedDiaries.length + ' '}
            </span>
            개 있습니다.
          </p>
        </NewUpdatedAlertWrapper>
      )}
      <DiaryListWrapper ref={observerRoot}>
        {!hasDiaryDetail ? (
          <>
            {pagingDiaries && (
              <ul className="diaryList">
                {pagingDiaries.map((diary: DiaryType, i: number) => (
                  <DiaryItem
                    key={i}
                    diary={diary}
                    // 일기 리스트의 아이템을 클릭하면 제목 정보를 전달한다
                    onClick={() => handleClickItem(diary.title)}
                  />
                ))}
              </ul>
            )}
            {/* Intersectioin Observer가 주시하는 타겟. 로딩 아이콘을 렌더링한다. */}
            <InfinteLoading
              ref={observerTarget}
              isLoading={scrollOpt.loading}
            />
          </>
        ) : (
          <DiaryDetail diary={matchDiary} onClose={handleCloseDiary} />
        )}
      </DiaryListWrapper>
    </div>
  );
};

export default DiaryList;
