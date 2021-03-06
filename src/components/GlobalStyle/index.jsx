import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scrollbar-width: thin;
}

*::-webkit-scrollbar{
    width: 5px;
}

*::-webkit-scrollbar-thumb{
    background-color: #9c9a9a;
    border-radius: 20px;
    border: transparent;
}


html {
    font-size: 16px;
}

body {
    font-family: 'Lato', sans-serif;
    
}

`;

export default GlobalStyle;
