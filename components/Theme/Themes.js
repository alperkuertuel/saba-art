import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export default function ThemeChanger({ handleSetTheme, handleSetCurrentTheme, currentTheme }) {
  function handleToggleTheme() {
    if (currentTheme === "light") {
      handleSetTheme({
        primarycolor: "white",
        fontcolor: "black",
        secondarycolor: "#391b0e",
        tertiarycolor: "#a48676",
        boxcolor: "#f4f4f4",
        boxshadow: "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
        coolbrown: "#d9cbc4",
        highlight: "#dee1e6",
      });
      handleSetCurrentTheme("dark");
    } else {
      if (currentTheme === "dark") {
        handleSetTheme({
          primarycolor: "#282828",
          fontcolor: "#F8F8FF",
          secondarycolor: "#d9cbc4",
          tertiarycolor: "#a48676",
          boxcolor: "#382F2A",
          boxshadow: "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
          coolbrown: "#391b0e",
          highlight: "#4E3524",
        });
        handleSetCurrentTheme("light");
      }
    }
  }

  return (
    <>
      <ThemeSwitcher onClick={handleToggleTheme}>
        {currentTheme === "light" ? (
          <FontAwesomeIcon icon={faSun} />
        ) : (
          <FontAwesomeIcon icon={faMoon} />
        )}
      </ThemeSwitcher>
    </>
  );
}

const ThemeSwitcher = styled.button`
  font-size: 1.5rem;
  color: var(--secondary-color);
  opacity: 0.8;
`;
