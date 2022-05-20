import { useRef, useState, ChangeEvent } from 'react';
import { UpdatedDiariesType } from 'container/DiaryListContainer';
import { DiaryListType, DiaryType } from 'types/dataType';
import { DiaryList, Searchbar } from 'components';
import { NewUpdatedAlertWrapper } from './DiaryApp.styled';

interface DiaryAppProps {
  allDiaries: DiaryListType;
  updatedDiaries: UpdatedDiariesType;
}

const DiaryApp = ({ allDiaries, updatedDiaries }: DiaryAppProps) => {
  /* search input value ------------------------------------------------------ */
  // input ref 객체
  const searchInputRef = useRef<HTMLInputElement>(null);
  // 검색창의 input value 상태
  const [searchValue, setSearchValue] = useState<string>('');

  // input의 change 이벤트 핸들러
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchValue(e.target.value);

  // input의 값을 초기화하는 버튼
  const handleClickResetButton = () => {
    setSearchValue(''); // input 값을 초기화
    searchInputRef.current && searchInputRef.current.focus(); // input에 포커스
  };

  /* filter diary ------------------------------------------------------------ */
  // container에서 null인 경우의 예외처리가 되었으므로 타입 단언 사용
  const filteredDiaries = allDiaries!.filter(
    (diary: DiaryType) =>
      diary.title.includes(searchValue) || diary.contents.includes(searchValue)
  );

  return (
    <>
      <Searchbar
        searchValue={searchValue}
        searchInputRef={searchInputRef}
        onChageInput={handleChangeInput}
        onClickResetButton={handleClickResetButton}
      />
      {/* 새로운 데이터가 업데이트 시 렌더링 */}
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
      <DiaryList diaries={searchValue ? filteredDiaries : allDiaries} />
    </>
  );
};

export default DiaryApp;
