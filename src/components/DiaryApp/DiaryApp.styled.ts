import styled from 'styled-components';
import theme from 'style/theme';

export const NewUpdatedAlertWrapper = styled.div`
  height: 100px;
  margin: 1em;

  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;

  background-color: ${theme.colors.black.base}25;
  border-radius: 1em;

  font-size: 1.1em;

  .highlight {
    color: ${theme.colors.red};
  }

  ${theme.commonStyle.transition}
`;
