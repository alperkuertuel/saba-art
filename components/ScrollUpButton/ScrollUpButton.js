import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export default function ScrollUp({ scrollPercentage }) {
  function handleAppear() {
    console.log("hi");
  }

  return (
    <StyledScrollUpButton onClick={() => handleAppear()}>
      <ArrowUp icon={faArrowUp} />
    </StyledScrollUpButton>
  );
}

const StyledScrollUpButton = styled.button`
  position: fixed;
  bottom: 0;
  right: 0;
`;

const ArrowUp = styled(FontAwesomeIcon)`
  font-size: 2rem;
`;
