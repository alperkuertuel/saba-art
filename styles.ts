import { createGlobalStyle } from "styled-components";

export type AppThemeDollar = {
  $primarycolor: string;
  $fontcolor: string;
  $secondarycolor: string;
  $tertiarycolor: string;
  $boxcolor: string;
  $boxshadow: string;
  $coolbrown: string;
  $highlight: string;
};

const GlobalStyle = createGlobalStyle<AppThemeDollar>`
  :root {
    --primary-color: ${(properties) => properties.$primarycolor};
    --font-color: ${(properties) => properties.$fontcolor};
    --secondary-color: ${(properties) => properties.$secondarycolor};
    --tertiary-color: ${(properties) => properties.$tertiarycolor};
    --box-color: ${(properties) => properties.$boxcolor};
    --box-shadow: ${(properties) => properties.$boxshadow};
    --cool-brown: ${(properties) => properties.$coolbrown};
    --highlight: ${(properties) => properties.$highlight};
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-size: 100%;
    background-color: var(--primary-color);
    color: var(--font-color);
  }

  main {
    margin: 6rem auto;
    max-width: 768px;
    padding: 0 .5rem;
  }

  section {
    margin: 2rem auto;
  }

  h1 {
    font-size: 1.8rem;
  }

  h2 {
    font-size: 1.3rem;
  }

  h3 {
    margin: 1rem 0 .5rem 0;
  }

  ul {
    list-style-type: none;
  }

  a {
    text-decoration: none;
    color: var(--secondary-color);
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;  
  }

  img {
    display: block;
  }
  
  input {
      line-height: 1.5rem;
      outline: none;
      border: none;
      color: var(--font-color);
  }

  button {
    color: var(--font-color);
    border: none;
    cursor: pointer;
    background: none;
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  
`;

export default GlobalStyle;
