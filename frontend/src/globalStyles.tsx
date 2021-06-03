import { createGlobalStyle } from "styled-components/macro";

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: inherit; /* 모든 엘리먼트의 box-sizing 값을 border-box로 설정 */
    }

    body {
        margin: 0;
        padding: 0;
        font-family: 'Noto Sans KR', sans-serif;
        box-sizing: border-box;
        overflow-x: hidden;
        background: ${({ theme }) => theme.body};
        color: ${({ theme }) => theme.text};
        transition: all 0.4s linear;
        
    }

    #root {
        min-height: 100%;
    }

    html {
        height: 100%;
    }

    a {
        text-decoration: none
    }

    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace
    }
`;

export default GlobalStyle;
