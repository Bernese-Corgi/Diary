import React from 'react';

import styled from 'styled-components';
import DiaryListContainer from '../../container/DiaryListContainer';

const StyledDiaryListPage = styled.main`
  margin: 0 auto;
  padding: 4em 2em;

  ${({ theme }) => theme.media.desktop`
    width: 70vw;
    height: 100vh;
  `}

  ${({ theme }) => theme.media.tablet`
    width: 70vw;
    height: 100vh;
  `}
  ${({ theme }) => theme.media.mobile`
    width: 90vw;
    minwidth: 320px
    height: 100vh;
  `}
`;

const DiaryListPage = () => {
  return (
    <StyledDiaryListPage>
      <DiaryListContainer />
    </StyledDiaryListPage>
  );
};

export default DiaryListPage;
