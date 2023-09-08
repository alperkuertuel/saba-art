import styled from "styled-components";

export default function ThemeChanger({ handleSetTheme }) {
  function handleTheme() {
    handleSetTheme({
      primarycolor: "#282828",
      fontcolor: "#d9cbc4",
      secondarycolor: "#d9cbc4",
      tertiarycolor: "#a48676",
      boxcolor: "#5C4033",
      boxshadow: "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
      coolbrown: "#391b0e",
      bluegrey: "#dee1e6",
    });
  }
  console.log("I got triggered!");
  return (
    <>
      <ThemeSwitcher onClick={handleTheme}>ThemeSwitch</ThemeSwitcher>
    </>
  );
}

const ThemeSwitcher = styled.button``;

// primarycolor: "white",
// fontcolor: "black",
// secondarycolor: "#391b0e",
// tertiarycolor: "#a48676",
// boxcolor: "#f4f4f4",
// boxshadow: "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
// coolbrown: "#d9cbc4",
// bluegrey: "#dee1e6",
