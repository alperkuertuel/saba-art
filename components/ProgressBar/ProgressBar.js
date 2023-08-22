import { useEffect, useState } from "react";
import { styled } from "styled-components";

export default function ProgressBar() {
  const [scrollPercent, setScrollPercent] = useState(0);

  function handleScroll() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const maxScroll = documentHeight - windowHeight;
    const currentScrollPercent = (scrollY / maxScroll) * 100;
    setScrollPercent(currentScrollPercent);
    console.log(currentScrollPercent);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

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
  background-color: var(--primary-color);
`;
const ProgressBarFill = styled.div`
  height: 100%;
  background-color: var(--tertiary-color);
  width: ${(props) => props.width}%;
`;
