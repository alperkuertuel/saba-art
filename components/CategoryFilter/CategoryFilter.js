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

  function handleFilterAll() {
    handleSetFilteredCategory(artPieces);
  }

  return (
    <StyledNavigaton>
      <StyledCategoryFilter>
        <li>
          <StyledButton onClick={handleFilterAll}>All</StyledButton>
        </li>
        <li>
          <StyledNewestButton onClick={handleNewestArtPieces}>Newest</StyledNewestButton>
        </li>
        {uniqueCatagories.map((category) => (
          <li key={category}>
            <StyledButton onClick={() => handleFilteredCategories(category)}>
              {category}
            </StyledButton>
          </li>
        ))}
      </StyledCategoryFilter>
    </StyledNavigaton>
  );
}

const StyledNavigaton = styled.nav`
  display: inline-block;
  display: flex;
  gap: 0.5rem;
  margin: 1rem;
`;

const StyledCategoryFilter = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const StyledNewestButton = styled.button`
  padding: 0.5rem;
  border-radius: 5px;
  background: var(--box-color);
  height: fit-content;
  box-shadow: var(--box-shadow);
`;

const StyledButton = styled.button`
  background: var(--box-color);
  padding: 0.5rem;
  border-radius: 5px;
  font-size: 1rem;
  box-shadow: var(--box-shadow);
`;
