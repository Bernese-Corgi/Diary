import styled from 'styled-components';
import theme from '../../style/theme';
import { InfinteLoadingProps } from './DiaryList';

export const DiaryItemLi = styled.li`
  margin-top: 2.5em;
  padding: 0.8em;
  width: 100%;

  ${theme.commonStyle.boxWrapper}

  .title {
    padding: 0.2em 0.5em;
  }

  .contents {
    margin: 0.6em 0;
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    text-decoration: none;
  }

  &:hover {
    box-shadow: 0 4px 1em rgba(0, 0, 0, 0.15);
    transform: translateY(-0.2em);
  }

  ${theme.commonStyle.transition}
`;

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
