import { ArtPiece } from "pages/_app";
import React from "react";
import styled from "styled-components";
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
    <StyledCategoryFilter>
      {isLoading ? (
        <li>
          Wird geladen <LoadingDots />
        </li>
      ) : (
        <>
          <li>
            <StyledButton onClick={handleFilterAll}>
              Alle
              <CategoryCount $activecategory={activeCategory === "Alle" ? "var(--cool-brown)" : "var(--highlight)"}>
                {data.length}
              </CategoryCount>
            </StyledButton>
          </li>
          {data.some((piece: ArtPiece) => piece.date === currentYear).length > 0 && (
            <li>
              <StyledButton
                $activecategory={activeCategory === "Neue" ? "var(--cool-brown)" : "var(--highlight)"}
                onClick={handleNewestArtPieces}
              >
                Neueste Bilder aus {currentYear}
                <CategoryCount $activecategory={activeCategory === "Neue" ? "var(--cool-brown)" : "var(--highlight)"}>
                  {data.filter((piece: ArtPiece) => piece.date === currentYear).length}
                </CategoryCount>
              </StyledButton>
            </li>
          )}

          {uniqueCatagories.map((category) => (
            <li key={category}>
              <StyledButton onClick={() => handleFilteredCategories(category)}>
                {category}
                <CategoryCount $activecategory={activeCategory === category ? "var(--cool-brown)" : "var(--highlight)"}>
                  {data.filter((piece: ArtPiece) => piece.category === category).length}
                </CategoryCount>
              </StyledButton>
            </li>
          ))}
          {likedArtPieces && likedArtPieces?.length > 0 && (
            <li>
              <StyledButton
                $activecategory={activeCategory === "Favoriten" ? "var(--cool-brown)" : "var(--highlight)"}
                onClick={handleLikedArtPieces}
              >
                Favoriten
                <CategoryCount
                  $activecategory={activeCategory === "Favoriten" ? "var(--cool-brown)" : "var(--highlight)"}
                >
                  {likedArtPieces.length}
                </CategoryCount>
              </StyledButton>
            </li>
          )}
        </>
      )}
    </StyledCategoryFilter>
  );
}

const StyledCategoryFilter = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
`;

const StyledButton = styled.button<{ $activecategory?: string }>`
  background-color: var(--box-color);
  padding: 0.5rem;
  border-radius: 5px;
  font-size: 1rem;
  box-shadow: var(--box-shadow);
  line-height: 1rem;
`;

const CategoryCount = styled.span<{ $activecategory: string }>`
  transition: background-color 0.2s ease;
  padding: 3px 5px;
  margin: 0 0 0 8px;
  border-radius: 5px;
  background-color: ${(properties) => properties.$activecategory};
  font-size: 0.8rem;
  vertical-align: top;
`;
