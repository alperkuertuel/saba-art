import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: system-ui;
    font-size: 100%;
  }

  main {
    margin: 7rem auto;
  }

  ul {
    list-style-type: none;
  }

`;
