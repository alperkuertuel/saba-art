import { faArrowRightArrowLeft, faSquare, faTableCellsLarge } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type DisplayPreviewOptionsProperties = {
  handleSetPreviewOption: (previewOption: string) => void;
  previewoption: string;
};

export default function DisplayPreviewOptions({
  handleSetPreviewOption,
  previewoption,
}: DisplayPreviewOptionsProperties) {
  return (
    <>
      <button
        className="text-xl mr-6 p-2 rounded-[5px] shadow-box-shadow text-tertiary-color transition-colors duration-100 ease-in-out"
        style={{ backgroundColor: previewoption === "slideShow" ? "var(--cool-brown)" : "var(--box-color)" }}
        onClick={() => handleSetPreviewOption("slideShow")}
      >
        <FontAwesomeIcon aria-label="show slider" icon={faArrowRightArrowLeft} />
      </button>
      <button
        className="text-xl mr-6 p-2 rounded-[5px] shadow-box-shadow text-tertiary-color transition-colors duration-100 ease-in-out"
        style={{ backgroundColor: previewoption === "130px" ? "var(--cool-brown)" : "var(--box-color)" }}
        onClick={() => handleSetPreviewOption("130px")}
      >
        <FontAwesomeIcon aria-label="show middle size grid" icon={faTableCellsLarge} />
      </button>
      <button
        className="text-xl mr-6 p-2 rounded-[5px] shadow-box-shadow text-tertiary-color transition-colors duration-100 ease-in-out"
        style={{ backgroundColor: previewoption === "280px" ? "var(--cool-brown)" : "var(--box-color)" }}
        onClick={() => handleSetPreviewOption("280px")}
      >
        <FontAwesomeIcon aria-label="show large grid" icon={faSquare} />
      </button>
    </>
  );
}
