import React from 'react';
import { DiaryType } from '../../types/dataType';
import { DiaryDetailWrapper } from './DiaryDetail.styled';
import { CloseIcon } from '../Icon';
import { dateToStringKr } from '../../utils/date';

interface DiaryDetailProps {
  diary?: DiaryType;
  onClose: () => void;
}

const DiaryDetail = ({ diary, onClose }: DiaryDetailProps) => {
  if (!diary) return null;

  return (
    <DiaryDetailWrapper>
      <div className="diaryWrapper">
        <p className="title">{diary.title}</p>
        <p className="contents">{diary.contents}</p>
        <p className="date">{dateToStringKr(diary.created_at)}</p>
      </div>

      <button className="closeBtn" onClick={onClose}>
        <CloseIcon />
      </button>
    </DiaryDetailWrapper>
  );
};

export default DiaryDetail;
