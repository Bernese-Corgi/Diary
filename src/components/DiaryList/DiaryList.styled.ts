import styled from 'styled-components';
import theme from '../../style/theme';
import { InfinteLoadingProps } from './DiaryList';

export const DiaryListWrapper = styled.div`
  width: 100%;
  margin: 1em auto;
  padding: 1em;
  height: 90%;
  overflow: scroll;
  border-radius: 1em;

  li {
    cursor: pointer;
  }
`;

export const LoadingWrapper = styled.div<InfinteLoadingProps>`
  height: 100px;
  font-size: 1.4em;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  color: ${theme.colors.black.base};

  .loadingSpinner {
    height: 100%;
  }
`;
