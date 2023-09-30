import { faSquare, faTableCells, faTableCellsLarge } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styled from "styled-components";

export default function DisplayPreviewOptions({ handleSetGridRepeatMinsize }) {
  return (
    <>
      <StyledPreviewOptionButton onClick={() => handleSetGridRepeatMinsize("80px")}>
        <FontAwesomeIcon aria-label="show small grid" icon={faTableCells} />
      </StyledPreviewOptionButton>
      <StyledPreviewOptionButton onClick={() => handleSetGridRepeatMinsize("130px")}>
        <FontAwesomeIcon aria-label="show middle size grid" icon={faTableCellsLarge} />
      </StyledPreviewOptionButton>
      <StyledPreviewOptionButton onClick={() => handleSetGridRepeatMinsize("280px")}>
        <FontAwesomeIcon aria-label="show large grid" icon={faSquare} />
      </StyledPreviewOptionButton>
    </>
  );
}

const StyledPreviewOptionButton = styled.button`
  font-size: 1.8rem;
  margin-right: 1.5rem;
  color: var(--tertiary-color);
`;
