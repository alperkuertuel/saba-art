import { useEffect } from "react";
import styled from "styled-components";

export default function ProgressBar({ scrollPercent, handleSetScrollPercentage }) {
  function handleScroll() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const maxScroll = documentHeight - windowHeight;
    const currentScrollPercent = Math.round((scrollY / maxScroll) * 100).toString();
    handleSetScrollPercentage(currentScrollPercent);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <ProgressBarContainer>
      <ProgressBarFill width={scrollPercent} />
    </ProgressBarContainer>
  );
}

const ProgressBarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 7px;
  background-color: var(--active-color);
`;
const ProgressBarFill = styled.div`
  height: 100%;
  background-color: var(--tertiary-color);
  width: ${(props) => props.width}%;
  transition: width 0.1s ease-in-out;
`;
