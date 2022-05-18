import React, { ChangeEvent, useRef, useState } from 'react';
import { DiaryList, Searchbar } from '..';
import { DiaryListType, DiaryType } from '../../types/dataType';

interface DiaryAppProps {
  allDiaries: DiaryListType;
}

const DiaryApp = ({ allDiaries }: DiaryAppProps) => {
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
  const filteredDiaries = allDiaries.filter(
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
      <DiaryList diaries={searchValue ? filteredDiaries : allDiaries} />
    </>
  );
};

export default DiaryApp;
