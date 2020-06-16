import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
    ${reset}
    body{
        font-family: AppleSDGothicNeo;
    }
    &{
        box-sizing: border-box;
    }
    a{
        color: inherit;
        text-decoration: none;
    }
`;
