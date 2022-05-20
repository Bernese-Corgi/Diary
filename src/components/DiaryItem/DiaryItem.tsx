import { UpdatedDiariesType } from 'container/DiaryListContainer';
import React from 'react';
import { DiaryType } from 'types/dataType';
import { dateToStringKr } from 'utils/date';
import { DiaryItemLi } from './DiaryItem.styled';

interface DiaryItemProps {
  diary: DiaryType;
  onClick?: () => void;
}

const DiaryItem = ({ diary, onClick, ...restProps }: DiaryItemProps) => {
  return (
    <DiaryItemLi onClick={onClick} {...restProps}>
      <p className="title">{diary.title}</p>
      <p className="contents">{diary.contents}</p>
      <p className="date">{dateToStringKr(diary.created_at)}</p>
    </DiaryItemLi>
  );
};

export default DiaryItem;
