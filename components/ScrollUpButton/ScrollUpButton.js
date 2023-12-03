import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function ScrollUp({ scrollPercent }) {
  const [backToTopButton, setBackToTopButton] = useState(false);

  useEffect(() => {
    if (scrollPercent >= 15) {
      setBackToTopButton(true);
    } else setBackToTopButton(false);
  }, [scrollPercent]);

  return (
    <>
      {backToTopButton && (
        <StyledScrollUpButton>
          <ArrowUp icon={faChevronUp} onClick={() => window.scrollTo(0, 0)} />
        </StyledScrollUpButton>
      )}
    </>
  );
}

const StyledScrollUpButton = styled.button`
  position: fixed;
  z-index: 4;
  bottom: 15px;
  right: 15px;
  background-color: var(--tertiary-color);
  border-radius: 50%;
`;

const ArrowUp = styled(FontAwesomeIcon)`
  color: var(--secondary-color);
  font-size: 2rem;
  padding: 0.5rem;
`;
