import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      black: {
        base: string;
        light: string;
        dark: string;
      };
      white: string;
      red: string;
      yellow: string;
      green: string;
      blue: string;
    };
    commonStyle: {
      boxWrapper: string;
      transition: string;
    };
    sizes: {
      [key: string]: number;
    };
    media: {
      mobile: (...args: BackQuoteArgs) => CSSProp | undefined;
      tablet: (...args: BackQuoteArgs) => CSSProp | undefined;
      desktop: (...args: BackQuoteArgs) => CSSProp | undefined;
    };
  }
}
