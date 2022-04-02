import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    dark: boolean;
    colors: {
      background: string;
      backgroundFocus: string;
      border: string;
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
