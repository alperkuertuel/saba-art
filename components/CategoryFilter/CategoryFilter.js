import Link from "next/link";
import styled from "styled-components";
import { uid } from "uid";

export default function CategoryFilter({ artPieces, handleSetFilteredCategory }) {
  const allCategories = artPieces.map((piece) => piece.category);
  const currentYear = new Date().getFullYear();

  // Ref: https://stackoverflow.com/questions/62054582/how-do-i-filter-all-items-that-occur-once-into-one-list-and-all-items-that-occur
  const uniqueSet = new Set(allCategories);
  const uniqueCatagories = [...uniqueSet];

  function handleFilteredCategories(category) {
    if (uniqueCatagories.includes(category)) {
      const filter = artPieces.filter((piece) => piece.category === category);
      handleSetFilteredCategory(filter);
    }
  }

  function handleNewestArtPieces() {
    const yearFilter = artPieces.filter(
      (piece) => new Date(piece.date).getFullYear() === currentYear
    );
    handleSetFilteredCategory(yearFilter);
  }

  return (
    <StyledCategoryFilter>
      <StyledNewestButton onClick={handleNewestArtPieces}>Newest</StyledNewestButton>
      {uniqueCatagories.map((category) => (
        <li key={uid()}>
          <StyledButton onClick={() => handleFilteredCategories(category)}>{category}</StyledButton>
        </li>
      ))}
    </StyledCategoryFilter>
  );
}

const StyledCategoryFilter = styled.ul`
  margin: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const StyledButton = styled.button`
  border: none;
  background: var(--box-color);
  padding: 0.5rem;
  border-radius: 5px;
  box-shadow: var(--box-shadow);
  font-size: 1rem;
`;

const StyledNewestButton = styled.button`
  border: none;
  background: var(--box-color);
  padding: 0.5rem;
  border-radius: 5px;
  box-shadow: var(--box-shadow);
  font-size: 1rem;
`;
