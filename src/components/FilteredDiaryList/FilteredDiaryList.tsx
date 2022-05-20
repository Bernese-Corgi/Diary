import React from 'react';
import { DiaryItem } from 'components';
import { DiaryListWrapper } from 'components/DiaryList/DiaryList.styled';
import { DiaryType } from 'types/dataType';

interface FilteredDiaryListProps {
  searchValue: string;
  filteredDiaries: DiaryType[];
}

const FilteredDiaryList = ({
  searchValue,
  filteredDiaries,
}: FilteredDiaryListProps) => {
  interface highlightType {
    prev: string;
    searched: string;
    next: string;
  }

  return (
    <DiaryListWrapper>
      {filteredDiaries.map((diary, i) => (
        <DiaryItem diary={diary} key={i} />
      ))}
    </DiaryListWrapper>
  );
};

export default FilteredDiaryList;
