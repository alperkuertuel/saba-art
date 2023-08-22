import styled from "styled-components";
import { uid } from "uid";

export default function CategoryFilter({ artPieces }) {
  const allCategories = artPieces.map((piece) => piece.category);

  return (
    <StyledCategoryFilter>
      {withoutDuplicates.map((category) => (
        <li key={uid()}>{category}</li>
      ))}
    </StyledCategoryFilter>
  );
}

const StyledCategoryFilter = styled.ul`
  margin: 1rem;
`;
