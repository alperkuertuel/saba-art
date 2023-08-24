import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root {
    --primary-color: whtie;
    --secondary-color: #391b0e;
    --tertiary-color: #a48676;
    --box-color: #f4f4f4;
    --box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    --border-color: #938270;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-size: 100%;
    background-color: var(--primary-color);
  }

  main {
    margin: 6rem auto;
    max-width: 1280px;
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.3rem;
  }

  ul {
    list-style-type: none;
  }

  a {
    text-decoration: none;
    color: var(--secondary-color);
  }

  img {
    display: block;
  }
  
  input {
      line-height: 1.5rem;
      outline: none;
      border: none;
  }

  button {
    font-size: 1rem;
    border: none;
    cursor: pointer;
  }
  
`;
