
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #F2FFE9;
  }

  h1, h2 {
    color: #333;
  }

  button {
    cursor: pointer;
  }
`;

export default GlobalStyles;
