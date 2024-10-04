import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

import { AppTheme } from "../../pages/_app";

type ThemeChangerProperties = {
  handleSetTheme: (theme: AppTheme) => void;
  handleSetCurrentTheme: (currentTheme: string) => void;
  currentTheme: string;
};

export default function ThemeChanger({ handleSetTheme, handleSetCurrentTheme, currentTheme }: ThemeChangerProperties) {
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
      <ThemeSwitcher onClick={handleToggleTheme} aria-label="theme switcher">
        {currentTheme === "light" ? (
          <FontAwesomeIcon icon={faSun} aria-label="light mode off" />
        ) : (
          <FontAwesomeIcon icon={faMoon} aria-label="dark mode off" />
        )}
      </ThemeSwitcher>
    </>
  );
}

const ThemeSwitcher = styled.button`
  position: fixed;
  top: 20px;
  left: 20px;
  font-size: 1.3rem;
  color: var(--secondary-color);
  opacity: 0.8;
  width: 30px;
  height: 30px;
  background-color: var(--box-color);
  border-radius: 5px;
  &:focus {
    background-color: var(--highlight);
  }
`;
