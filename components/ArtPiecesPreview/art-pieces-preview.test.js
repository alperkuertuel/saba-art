import React from "react";
import { render, screen } from "@testing-library/react";
import ArtPiecesPreview from "./art-pieces-preview";
import artPiecesData from "@/db/TestData/sample-data-for-test";

test("Each art piece's alt text is displayed", () => {
  render(<ArtPiecesPreview filteredCategory={artPiecesData} />);
  for (const piece of artPiecesData) {
    const imageElement = screen.getByAltText(piece.name);
    expect(imageElement).toHaveAttribute("alt", piece.name);
    expect(imageElement).toHaveAttribute("src", expect.stringContaining(".jpg"));
  }
});

test("Each art piece's name is displayed", () => {
  render(<ArtPiecesPreview filteredCategory={artPiecesData} />);
  for (const piece of artPiecesData) {
    const nameElement = screen.getByText(piece.name);
    expect(nameElement).toBeInTheDocument(piece.name);
  }
});

test("Each art piece's date is displayed", () => {
  render(<ArtPiecesPreview filteredCategory={artPiecesData} />);
  for (const piece of artPiecesData) {
    const dateElement = screen.getByRole("generic");
    expect(dateElement).toBeInTheDocument(piece.date);
  }
});
