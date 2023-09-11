import { faSquare, faTableCells, faTableCellsLarge } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export default function DisplayGrid({ handleSetGridRepeatMinsize }) {
  return (
    <>
      <StyledGridButton onClick={() => handleSetGridRepeatMinsize("80px")}>
        <FontAwesomeIcon aria-label="show small grid" icon={faTableCells} />
      </StyledGridButton>
      <StyledGridButton onClick={() => handleSetGridRepeatMinsize("130px")}>
        <FontAwesomeIcon aria-label="show middle size grid" icon={faTableCellsLarge} />
      </StyledGridButton>
      <StyledGridButton onClick={() => handleSetGridRepeatMinsize("280px")}>
        <FontAwesomeIcon aria-label="show large grid" icon={faSquare} />
      </StyledGridButton>
    </>
  );
}

const StyledGridButton = styled.button`
  font-size: 1.5rem;
  margin-right: 1rem;
  color: var(--tertiary-color);
  &:focus {
    color: var(--secondary-color);
  }
`;
