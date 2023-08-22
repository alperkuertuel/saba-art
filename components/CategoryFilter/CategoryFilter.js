import styled from "styled-components";
import { uid } from "uid";

export default function CategoryFilter({ artPieces }) {
  const allCategories = artPieces.map((piece) => piece.category);

  // Ref: https://stackoverflow.com/questions/62054582/how-do-i-filter-all-items-that-occur-once-into-one-list-and-all-items-that-occur
  const uniqueSet = new Set(allCategories);
  const uniqueCatagories = [...uniqueSet];

  return (
    <StyledCategoryFilter>
      {uniqueCatagories.map((category) => (
        <li key={uid()}>
          <button>{category}</button>
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
