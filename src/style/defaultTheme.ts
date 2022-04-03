import { DefaultTheme } from "styled-components";

const defaultTheme: DefaultTheme = {
  breakpoints: {
    md: "768px",
  },
  dark: false,
  colors: {
    background: "#ffffff",
    backgroundFocus: "#fefefe",
    border: "#dadce0",
    danger: "red",
    highlight: "#67eca2",
    text: {
      1: "#202124",
      2: "#70757a",
      3: "#dadce0",
    },
  },
  fonts: {
    import:
      "https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;700&display=swap",
    family: "'Noto Sans', sans-serif;",
    size: {
      base: "16px",
      1: "0.5rem",
      2: "0.8rem",
      3: "1rem",
      4: "2rem",
    },
  },
  spacing: {
    1: "4px",
    2: "8px",
    3: "12px",
    4: "16px",
    5: "24px",
  },
};

export default defaultTheme;
