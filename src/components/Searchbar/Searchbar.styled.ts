import styled from 'styled-components';
import theme from '../../style/theme';

export const SearchbarWrapper = styled.div`
  position: relative;
`;

export const SearchbarInputFieldWrapper = styled.div`
  padding: 0 0.8em;

  border: 1px solid ${theme.colors.black.base}95;
  border-radius: 5em;

  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  input {
    flex-grow: 1;
    padding: 0.5em;
  }

  &:focus-within {
    border: 1px solid black;
  }

  &:hover {
    box-shadow: 0 0 1em rgba(0, 0, 0, 0.15);
  }

  /* svg icon */
  svg {
    display: block;
    fill: ${theme.colors.black.dark};
  }

  .searchIcon {
    height: 1em;
    width: 1em;
  }

  .closeIcon {
    width: 1.2em;
    height: 1.2em;
  }

  /* label, button */
  label,
  button {
    padding: 0.4em;
  }

  /* close button - hover, active 효과 */
  button:hover {
    svg {
      fill: ${theme.colors.red};
    }
  }

  button:active {
    svg {
      padding: 0.1em;
      ${theme.commonStyle.transition}
    }
  }

  ${theme.commonStyle.transition}
`;
