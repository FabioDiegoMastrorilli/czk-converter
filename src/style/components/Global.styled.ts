import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    @import url(${({ theme }) => theme.fonts.import});

    * {
        box-sizing: border-box;
    }

    html {
        font-size: ${({ theme }) => theme.fonts.size.base};
    }
    
    body {
        background-color: ${({ theme }) => theme.colors.background};
        color: ${({ theme }) => theme.colors.text[1]};
        font-family: ${({ theme }) => theme.fonts.family};
        margin: 0;
        padding: 8px;
    }
`;

export default GlobalStyle;
