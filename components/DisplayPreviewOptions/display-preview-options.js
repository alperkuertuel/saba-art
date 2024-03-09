import {
  faArrowRightArrowLeft,
  faSquare,
  faTableCellsLarge,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styled from "styled-components";

export default function DisplayPreviewOptions({ handleSetPreviewOption, previewoption }) {
  return (
    <>
      <StyledPreviewOptionButton
        onClick={() => handleSetPreviewOption("slideShow")}
        $previewoption={previewoption === "slideShow" ? "var(--cool-brown)" : "var(--box-color)"}
      >
        <FontAwesomeIcon aria-label="show slider" icon={faArrowRightArrowLeft} />
      </StyledPreviewOptionButton>
      <StyledPreviewOptionButton
        onClick={() => handleSetPreviewOption("130px")}
        $previewoption={previewoption === "130px" ? "var(--cool-brown)" : "var(--box-color)"}
      >
        <FontAwesomeIcon aria-label="show middle size grid" icon={faTableCellsLarge} />
      </StyledPreviewOptionButton>
      <StyledPreviewOptionButton
        onClick={() => handleSetPreviewOption("280px")}
        $previewoption={previewoption === "280px" ? "var(--cool-brown)" : "var(--box-color)"}
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
  box-shadow: var(--box-shadow);
  color: var(--tertiary-color);
  background-color: ${(properties) => properties.$previewoption};
  transition: background-color 0.1s ease-in-out;
`;
