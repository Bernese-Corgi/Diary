import theme from 'style/theme';
import styled from 'styled-components';

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
