import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
    ${reset}
    body{
        font-family: AppleSDGothicNeo, sans-serif;
    }
    &{
        box-sizing: border-box;
    }
    a{
        color: inherit;
        text-decoration: none;
    }
    .center{
        width: 100%;
        max-width: 1024px;
        box-sizing: border-box;
        margin: 0 auto;
        padding: 0 20px;
        @media only screen and (min-width: 768px) {
            padding: 0 42px;
        }
    }
`;
