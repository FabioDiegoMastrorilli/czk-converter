import { DefaultTheme } from "styled-components";
import defaultTheme from "./defaultTheme";

const darkTheme: DefaultTheme = {
  ...defaultTheme,
  dark: true,
  colors: {
    ...defaultTheme.colors,
    background: "#202124",
    backgroundFocus: "#2f3137",
    border: "#9aa0a6",
    text: {
      1: "#e8eaed",
      2: "#9aa0a6",
      3: "#5f6368",
    },
  },
};

export default darkTheme;
