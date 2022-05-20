import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/modules';
import { readAllDiaryAsync } from 'redux/modules/diary';
import { useReduxDispatch } from 'redux/store';
import { DiaryApp } from 'components';

const DiaryListContainer = () => {
  const dispatch = useReduxDispatch();

  const { diaries } = useSelector(({ diary }: RootState) => ({
    diaries: diary.diaries,
  }));

  useEffect(() => {
    dispatch(readAllDiaryAsync());
  }, []);

  if (!diaries) return null;

  return <DiaryApp allDiaries={diaries} />;
};

export default DiaryListContainer;
