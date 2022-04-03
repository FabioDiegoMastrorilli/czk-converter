import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    breakpoints: {
      md: string;
    };
    dark: boolean;
    colors: {
      background: string;
      backgroundFocus: string;
      border: string;
      danger: string;
      highlight: string;
      text: {
        1: string;
        2: string;
        3: string;
      };
    };
    fonts: {
      family: string;
      import: string;
      size: {
        base: string;
        1: string;
        2: string;
        3: string;
        4: string;
      };
    };
    spacing: {
      1: string;
      2: string;
      3: string;
      4: string;
      5: string;
    };
  }
}
