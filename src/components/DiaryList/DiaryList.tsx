import React from 'react';
import { DiaryListType, DiaryType } from '../../types/dataType';
import { dateToStringKr } from '../../utils/date';
import { DiaryItemLink, DiaryListWrapper } from './DiaryList.styled';

interface DiaryListProps {
  allDiaries: DiaryListType;
}

interface DiaryItemProps {
  diary: DiaryType;
}

const DiaryItem = ({ diary }: DiaryItemProps) => {
  return (
    <DiaryItemLink to={`/diary/${diary.title.replaceAll(' ', '_')}`}>
      <p className="title">{diary.title}</p>
      <p className="contents">{diary.contents}</p>
      <p className="date">{dateToStringKr(diary.created_at)}</p>
    </DiaryItemLink>
  );
};

const DiaryList = ({ allDiaries }: DiaryListProps) => {
  return (
    <DiaryListWrapper>
      <ul>
        {allDiaries.map((diary: DiaryType, i: number) => (
          <li key={i}>
            <DiaryItem diary={diary} />
          </li>
        ))}
      </ul>
    </DiaryListWrapper>
  );
};

export default DiaryList;
