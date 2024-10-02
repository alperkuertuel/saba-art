import { useEffect } from "react";
import styled from "styled-components";

type ProgressBarProperties = {
  scrollPercent: number;
  handleSetScrollPercentage: (scrollPercent: number) => void;
  width?: number;
};

type ProgressBarFillProperties = {
  width: number;
};

export default function ProgressBar({ scrollPercent, handleSetScrollPercentage }: ProgressBarProperties) {
  function handleScroll() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const maxScroll = documentHeight - windowHeight;
    const currentScrollPercent = Math.round((scrollY / maxScroll) * 100);
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
  background-color: var(--cool-brown);
`;
const ProgressBarFill = styled.div<ProgressBarFillProperties>`
  height: 100%;
  background-color: var(--tertiary-color);
  width: ${(properties) => properties.width}%;
  transition: width 0.1s ease-in-out;
`;
