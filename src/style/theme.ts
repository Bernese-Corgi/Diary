import baseStyled, {
  css,
  CSSProp,
  DefaultTheme,
  ThemedStyledInterface,
} from 'styled-components';

const colors = {
  black: {
    base: '#a5a3a4',
    light: '#DCDCDC',
    dark: '#545051',
  },
  white: '#F8F8FF',
  red: '#DC143C',
  yellow: '#F89B00',
  green: '#008D62',
  blue: '#00498C',
};

const commonStyle = {
  boxWrapper: `
    position: relative;

    &::after {
      content: '';
      width: 100%;
      height: 100%;
      background-color: #fff;
      border: 1px solid ${colors.black.base};
      border-radius: 5px;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
    }
    
    .title {
      position: absolute;
      top: -0.8em;
      font-size: 1.1em;
      display: inline-block;
      background-color: #fff;
      margin-left: 1em;
      border-radius: 5px;
    }

    .date {
      text-align: right;
    }
  `,
  transition: `
    transition: 300ms;
    transition-timing-function: 'ease-in-out';
    -webkit-transition: 300ms;
    -webkit-transition-timing-function: 'ease-in-out';
  `,
};

/* --------------------------- Responsive setting --------------------------- */
const sizes = {
  mobile: 320,
  tablet: 768,
  desktop: 1024,
};

type BackQuoteArgs = string[];

interface Media {
  mobile: (...args: BackQuoteArgs) => CSSProp | undefined;
  tablet: (...args: BackQuoteArgs) => CSSProp | undefined;
  desktop: (...args: BackQuoteArgs) => CSSProp | undefined;
}

const media: Media = {
  mobile: (...args: BackQuoteArgs) => undefined,
  tablet: (...args: BackQuoteArgs) => undefined,
  desktop: (...args: BackQuoteArgs) => undefined,
};

Object.keys(sizes).reduce((acc: Media, label: string) => {
  switch (label) {
    case 'desktop':
      acc.desktop = (...args: BackQuoteArgs) =>
        css`
          @media only screen and (min-width: ${sizes.desktop}px) {
            ${args}
          }
        `;
      break;
    case 'tablet':
      acc.tablet = (...args: BackQuoteArgs) =>
        css`
          @media only screen and (max-width: ${sizes.desktop}px) and (min-width: ${sizes.tablet}px) {
            ${args}
          }
        `;
      break;
    case 'mobile':
      acc.mobile = (...args: BackQuoteArgs) =>
        css`
          @media only screen and (max-width: ${sizes.tablet - 1}px) {
            ${args}
          }
        `;
      break;
    default:
      break;
  }
  return acc;
}, media);

const theme: DefaultTheme = {
  colors,
  commonStyle,
  sizes,
  media,
};

export const Styled = baseStyled as ThemedStyledInterface<DefaultTheme>;

export default theme;
