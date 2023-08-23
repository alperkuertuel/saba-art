import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root {
    --primary-color: whtie;
    --secondary-color: #391b0e;
    --tertiary-color: #a48676;
    --box-color: #f4f4f4;
    --box-shadow: rgba(0, 0, 0, 0.075) 0px 2px 4px 0px;
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
    max-width: 800px;
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
  
  input {
    line-height: 1.5rem;
  }
  
  img {
    display: block;
  }
  
a {
  text-decoration: none;
  color: var(--secondary-color);
}

`;
