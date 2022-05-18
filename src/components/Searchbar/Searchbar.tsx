import React, { ChangeEvent, RefObject } from 'react';
import { CloseIcon, SearchIcon } from '../Icon';
import {
  SearchbarInputFieldWrapper,
  SearchbarWrapper,
} from './Searchbar.styled';

interface SearchbarProps {
  searchValue: string;
  searchInputRef: RefObject<HTMLInputElement>;
  onChageInput: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickResetButton: () => void;
}

const Searchbar = ({
  searchValue,
  searchInputRef,
  onChageInput,
  onClickResetButton,
}: SearchbarProps) => {
  return (
    <SearchbarWrapper>
      <SearchbarInputFieldWrapper>
        <label aria-label="검색창">
          <SearchIcon className="searchIcon" />
        </label>
        <input
          type="text"
          id="searchValue"
          value={searchValue}
          onChange={onChageInput}
          ref={searchInputRef}
          autoComplete="off"
          placeholder="검색어를 입력해 보세요."
        />
        {searchValue && (
          <button onClick={onClickResetButton}>
            <CloseIcon className="closeIcon" />
          </button>
        )}
      </SearchbarInputFieldWrapper>
    </SearchbarWrapper>
  );
};

export default Searchbar;
