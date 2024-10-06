import { ArtPiece } from "pages/_app";
import React from "react";
import useSWR from "swr";

import LoadingDots from "../LoadingDots/loading-dots";

type CategoryFilterProperties = {
  handleSetFilteredCategory: (filteredCategory: ArtPiece[]) => void;
  handleSetActiveCategory: (activecategory: string) => void;
  activeCategory: string;
  likedArtPieces?: string[];
};

export default function CategoryFilter({
  handleSetFilteredCategory,
  handleSetActiveCategory,
  activeCategory,
  likedArtPieces,
}: CategoryFilterProperties) {
  const { data, isLoading } = useSWR("/api", { fallbackData: [] });
  const allCategories: string[] = data.map((piece: ArtPiece) => piece.category);
  const currentYear = new Date().getFullYear();
  const uniqueSet = new Set(allCategories);
  const uniqueCatagories = [...uniqueSet];

  function handleFilteredCategories(category: string) {
    if (uniqueCatagories.includes(category)) {
      const filter = data.filter((piece: ArtPiece) => piece.category === category);
      handleSetFilteredCategory(filter);
      handleSetActiveCategory(category);
    }
  }

  function handleNewestArtPieces() {
    const yearFilter = data.filter((piece: ArtPiece) => piece.date === currentYear);
    handleSetFilteredCategory(yearFilter);
    handleSetActiveCategory("Neue");
  }

  function handleFilterAll() {
    handleSetFilteredCategory(data);
    handleSetActiveCategory("Alle");
  }

  function handleLikedArtPieces() {
    const favoriteArtPieces = data.filter((piece: ArtPiece) => piece._id && likedArtPieces?.includes(piece._id));
    handleSetFilteredCategory(favoriteArtPieces);
    handleSetActiveCategory("Favoriten");
  }

  return (
    <ul className="flex flex-wrap items-center gap-4 my-4">
      {isLoading ? (
        <li>
          Wird geladen <LoadingDots />
        </li>
      ) : (
        <>
          <li>
            <button
              className="bg-box-color p-2 rounded-[5px] text-base shadow-box-shadow leading-4"
              onClick={handleFilterAll}
            >
              Alle
              <span
                className="transition-colors duration-200 ease px-[5px] py-[3px] ml-2 rounded-[5px] text-sm align-top"
                style={{ backgroundColor: activeCategory === "Alle" ? "var(--cool-brown)" : "var(--highlight-color)" }}
              >
                {data.length}
              </span>
            </button>
          </li>
          {data.some((piece: ArtPiece) => piece.date === currentYear) && (
            <li>
              <button
                className="bg-box-color p-2 rounded-[5px] text-base shadow-box-shadow leading-4"
                onClick={handleNewestArtPieces}
              >
                Neueste Bilder aus {currentYear}
                <span
                  className="transition-colors duration-200 ease px-[5px] py-[3px] ml-2 rounded-[5px] text-sm align-top"
                  style={{
                    backgroundColor: activeCategory === "Neue" ? "var(--cool-brown)" : "var(--highlight-color)",
                  }}
                >
                  {data.filter((piece: ArtPiece) => piece.date === currentYear).length}
                </span>
              </button>
            </li>
          )}

          {uniqueCatagories.map((category) => (
            <li key={category}>
              <button
                className="bg-box-color p-2 rounded-[5px] text-base shadow-box-shadow leading-4"
                onClick={() => handleFilteredCategories(category)}
              >
                {category}
                <span
                  className="transition-colors duration-200 ease px-[5px] py-[3px] ml-2 rounded-[5px] text-sm align-top"
                  style={{
                    backgroundColor: activeCategory === category ? "var(--cool-brown)" : "var(--highlight-color)",
                  }}
                >
                  {data.filter((piece: ArtPiece) => piece.category === category).length}
                </span>
              </button>
            </li>
          ))}
          {likedArtPieces && likedArtPieces?.length > 0 && (
            <li>
              <button
                className="bg-box-color p-2 rounded-[5px] text-base shadow-box-shadow leading-4"
                onClick={handleLikedArtPieces}
              >
                Favoriten
                <span
                  className="transition-colors duration-200 ease px-[5px] py-[3px] ml-2 rounded-[5px] text-sm align-top"
                  style={{
                    backgroundColor: activeCategory === "Favoriten" ? "var(--cool-brown)" : "var(--highlight-color)",
                  }}
                >
                  {likedArtPieces.length}
                </span>
              </button>
            </li>
          )}
        </>
      )}
    </ul>
  );
}
