import React from "react";
import { render, screen } from "@testing-library/react";
import ArtPiecesPreview from "./ArtPiecesPreview";
import artPiecesData from "@/db/data";

test("Each art piece's alt text is displayed", () => {
  render(<ArtPiecesPreview artPieces={artPiecesData} />);
  artPiecesData.forEach((piece) => {
    const imageElement = screen.getByAltText(piece.name);
    expect(imageElement).toHaveAttribute("alt", piece.name);
    expect(imageElement).toHaveAttribute(
      "src",
      expect.stringContaining(".jpg")
    );
  });
});

test("Each art piece's name is displayed", () => {
  render(<ArtPiecesPreview artPieces={artPiecesData} />);
  artPiecesData.forEach((piece) => {
    const nameElement = screen.getByText(piece.name);
    expect(nameElement).toBeInTheDocument(piece.name);
  });
});

test("Each art piece's date is displayed", () => {
  render(<ArtPiecesPreview artPieces={artPiecesData} />);
  artPiecesData.forEach((piece) => {
    const dateElement = screen.getByRole("generic");
    expect(dateElement).toBeInTheDocument(piece.date);
  });
});
