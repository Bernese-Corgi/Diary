import React, { useState } from 'react';
import { DiaryDetail } from '..';
import { DiaryListType, DiaryType } from '../../types/dataType';
import { dateToStringKr } from '../../utils/date';

import { DiaryItemLi, DiaryListWrapper } from './DiaryList.styled';

interface DiaryListProps {
  diaries: DiaryListType;
}

interface DiaryItemProps {
  diary: DiaryType;
  onClick: () => void;
}

const DiaryItem = ({ diary, onClick, ...restProps }: DiaryItemProps) => (
  <DiaryItemLi onClick={onClick} {...restProps}>
    <p className="title">{diary.title}</p>
    <p className="contents">{diary.contents}</p>
    <p className="date">{dateToStringKr(diary.created_at)}</p>
  </DiaryItemLi>
);

const DiaryList = ({ diaries }: DiaryListProps) => {
  // 일기 상세 컴포넌트 렌더링 여부
  const [hasDiaryDetail, setHasDiaryDetail] = useState<boolean>(false);
  // 클릭한 일기의 데이터를 설정
  const [matchDiary, setMatchDiary] = useState<DiaryType>();

  // 제목이 일치하는 일기 데이터를 반환
  const findMatchDiary = (title: string) =>
    diaries.find((diary: DiaryType) => diary.title === title);

  // 일기들 중 하나를 클릭할 때의 이벤트 핸들러
  const handleClickItem = (title: string) => {
    // 클릭한 일기의 제목 정보를 인수로 전달해 전체 리스트에서 해당하는 일기 데이터를 상태값으로 설정
    setMatchDiary(findMatchDiary(title));
    // 일기 상세 컴포넌트를 렌더링하도록 설정한다
    setHasDiaryDetail(true);
  };

  // 일기 상세 컴포넌트를 닫는 이벤트 핸들러
  const handleCloseDiary = () => setHasDiaryDetail(false);

  return (
    <DiaryListWrapper>
      {!hasDiaryDetail ? (
        <ul>
          {diaries.map((diary: DiaryType, i: number) => (
            <DiaryItem
              key={i}
              diary={diary}
              // 일기 리스트의 아이템을 클릭하면 제목 정보를 전달한다
              onClick={() => handleClickItem(diary.title)}
            />
          ))}
        </ul>
      ) : (
        <DiaryDetail diary={matchDiary} onClose={handleCloseDiary} />
      )}
    </DiaryListWrapper>
  );
};

export default DiaryList;
