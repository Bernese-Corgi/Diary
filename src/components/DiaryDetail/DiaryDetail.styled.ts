import styled from 'styled-components';
import theme from '../../style/theme';

export const DiaryDetailWrapper = styled.div`
  display: flex;
  flex-flow: column-reverse;
  height: 90vh;
  padding: 1em;

  .diaryWrapper {
    height: 95%;
    display: flex;
    flex-flow: column;
    margin: 1em;

    .title {
      font-size: 1.1em;
      display: inline-block;
      background-color: #fff;
      margin-left: 1em;
      padding: 0 0.4em;
    }

    .contents {
      padding: 1em;
      flex-grow: 1;
    }

    .date {
      margin-right: 1em;
      margin-bottom: 1em;
    }

    ${theme.commonStyle.boxWrapper}
  }

  .closeBtn {
    width: 1.5em;
    height: 1.5em;

    svg {
      width: 100%;
      height: 100%;
      fill: ${theme.colors.black.dark};
    }
  }
`;
