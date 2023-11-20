import {
  faArrowRightArrowLeft,
  faSquare,
  faTableCells,
  faTableCellsLarge,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styled from "styled-components";

export default function DisplayPreviewOptions({ handleSetGridRepeatMinsize, size }) {
  return (
    <>
      <StyledPreviewOptionButton
        onClick={() => handleSetGridRepeatMinsize("slideShow")}
        $size={size === "slideShow" ? "var(--cool-brown)" : "var(--highlight)"}
      >
        <FontAwesomeIcon aria-label="show slider" icon={faArrowRightArrowLeft} />
      </StyledPreviewOptionButton>
      <StyledPreviewOptionButton
        onClick={() => handleSetGridRepeatMinsize("80px")}
        $size={size === "80px" ? "var(--cool-brown)" : "var(--highlight)"}
      >
        <FontAwesomeIcon aria-label="show small grid" icon={faTableCells} />
      </StyledPreviewOptionButton>
      <StyledPreviewOptionButton
        onClick={() => handleSetGridRepeatMinsize("130px")}
        $size={size === "130px" ? "var(--cool-brown)" : "var(--highlight)"}
      >
        <FontAwesomeIcon aria-label="show middle size grid" icon={faTableCellsLarge} />
      </StyledPreviewOptionButton>
      <StyledPreviewOptionButton
        onClick={() => handleSetGridRepeatMinsize("280px")}
        $size={size === "280px" ? "var(--cool-brown)" : "var(--highlight)"}
      >
        <FontAwesomeIcon aria-label="show large grid" icon={faSquare} />
      </StyledPreviewOptionButton>
    </>
  );
}

const StyledPreviewOptionButton = styled.button`
  font-size: 1.5rem;
  margin-right: 1.5rem;
  padding: 0.5rem;
  border-radius: 5px;
  color: var(--tertiary-color);
  background-color: ${(props) => props.$size};
  transition: background-color 0.1s ease-in-out;
`;
