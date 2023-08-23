import styled from "styled-components";

export default function CategoryFilter({ artPieces, handleSetFilteredCategory }) {
  const allCategories = artPieces.map((piece) => piece.category);
  const currentYear = new Date().getFullYear().toString();
  const uniqueSet = new Set(allCategories);
  const uniqueCatagories = [...uniqueSet];

  function handleFilteredCategories(category) {
    if (uniqueCatagories.includes(category)) {
      const filter = artPieces.filter((piece) => piece.category === category);
      handleSetFilteredCategory(filter);
    }
  }

  function handleNewestArtPieces() {
    const yearFilter = artPieces.filter((piece) => piece.date === currentYear);
    handleSetFilteredCategory(yearFilter);
  }

  return (
    <StyledCategoryFilter>
      <StyledNewestButton onClick={handleNewestArtPieces}>Newest</StyledNewestButton>
      {uniqueCatagories.map((category) => (
        <li key={category}>
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
