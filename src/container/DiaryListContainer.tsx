import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/modules';
import { readAllDiaryAsync } from 'redux/modules/diary';
import { useReduxDispatch } from 'redux/store';
import { DiaryApp } from 'components';
import { DiaryType } from 'types/dataType';
import { compareDiaries } from 'utils/diary';

export type UpdatedDiariesType = DiaryType[] | null;

const DiaryListContainer = () => {
  const dispatch = useReduxDispatch();

  const { diaries } = useSelector(({ diary }: RootState) => ({
    diaries: diary.diaries,
  }));

  // 업데이트된 데이터의 배열
  const [updatedDiaries, setUpdatedDiaries] =
    useState<UpdatedDiariesType>(null);
  // diaries 배열의 변화를 감지하기 위한 상태
  const [currentDiaries, setCurrentDiaries] = useState<DiaryType[]>([]);

  const getDiariesAsync = async (url: string) => {
    const response = await dispatch(readAllDiaryAsync(url));

    if (response.diary) {
      // 현재 diaries 배열 상태 값을 설정
      setCurrentDiaries(prev => {
        if (prev) {
          // compareDiaries에 이전 배열과 현재 배열을 인수로 전달해 실행한다.
          const resultOfCompare = compareDiaries(prev, response.diary);
          // 이전 배열과 비교해 변경된 값이 있으면 해당 결과값을, 없으면 null을 설정한다.
          setUpdatedDiaries(resultOfCompare || null);
        }

        // 현재 response의 diary 데이터를 설정
        return response.diary;
      });
    }

    return response;
  };

  useEffect(() => {
    // 초기 렌더링 시 디스패치
    getDiariesAsync('/data1/work1.json');

    // 10초 후 디스패치
    setTimeout(() => {
      getDiariesAsync('/data1/work2.json');
    }, 10000);
  }, []);

  if (!diaries) return null;

  return <DiaryApp allDiaries={diaries} updatedDiaries={updatedDiaries} />;
};

export default DiaryListContainer;
