import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root {
    --primary-color: ${(props) => props.$primarycolor};
    --font-color: ${(props) => props.$fontcolor};
    --secondary-color: ${(props) => props.$secondarycolor};
    --tertiary-color: ${(props) => props.$tertiarycolor};
    --box-color: ${(props) => props.$boxcolor};
    --box-shadow: ${(props) => props.$boxshadow};
    --cool-brown: ${(props) => props.$coolbrown};
    --blue-grey: ${(props) => props.$bluegrey};
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
    max-width: 1280px;
    padding: 0 1rem;
  }

  section {
    margin: 2rem auto;
  }

  h1 {
    font-size: 1.8rem;
  }

  h2 {
    font-size: 1.3rem;
    margin-bottom: 1rem;
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
    font-size: 1rem;
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
