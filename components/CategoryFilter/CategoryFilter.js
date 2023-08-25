import { useEffect, useState } from "react";
import styled from "styled-components";

export default function CategoryFilter({ artPieces, handleSetFilteredCategory }) {
  const allCategories = artPieces.map((piece) => piece.category);
  const currentYear = new Date().getFullYear().toString();
  const uniqueSet = new Set(allCategories);
  const uniqueCatagories = [...uniqueSet];
  const [active, setActive] = useState("All");

  function handleFilteredCategories(category) {
    if (uniqueCatagories.includes(category)) {
      const filter = artPieces.filter((piece) => piece.category === category);
      handleSetFilteredCategory(filter);
      setActive(category);
    }
  }

  function handleNewestArtPieces() {
    const yearFilter = artPieces.filter((piece) => piece.date === currentYear);
    handleSetFilteredCategory(yearFilter);
    setActive("Newest");
  }

  function handleFilterAll() {
    handleSetFilteredCategory(artPieces);
    setActive("All");
  }

  return (
    <StyledNavigaton>
      <StyledCategoryFilter>
        <li>
          <StyledButton $active={active === "All" ? 1 : 0.5} onClick={handleFilterAll}>
            All
          </StyledButton>
        </li>
        <li>
          <StyledButton $active={active === "Newest" ? 1 : 0.5} onClick={handleNewestArtPieces}>
            Newest
          </StyledButton>
        </li>
        {uniqueCatagories.map((category) => (
          <li key={category}>
            <StyledButton
              $active={active === category ? 1 : 0.5}
              onClick={() => handleFilteredCategories(category)}
            >
              {category}
            </StyledButton>
          </li>
        ))}
      </StyledCategoryFilter>
    </StyledNavigaton>
  );
}

const StyledNavigaton = styled.section`
  display: flex;
  gap: 0.5rem;
  margin: 1rem;
`;

const StyledCategoryFilter = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const StyledButton = styled.button`
  opacity: ${(props) => props.$active};
  background-color: var(--box-color);
  transition: opacity 0.2s ease-out;
  padding: 0.5rem;
  border-radius: 5px;
  font-size: 1rem;
  box-shadow: var(--box-shadow);
`;
