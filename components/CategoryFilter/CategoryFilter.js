import styled from "styled-components";
import { uid } from "uid";

export default function CategoryFilter({ artPieces }) {
  const allCategories = artPieces.map((piece) => piece.category);
  console.log(allCategories);

  const withoutDuplicates = allCategories.filter(
    (item, index) => allCategories.indexOf(item) != index
  );

  const duplicated = [1, 2, 3, 2, 3, 4, 3, 5];
  const uniqSet = new Set(duplicated);
  console.log([...uniqSet]); // Should be [1, 2, 3, 4, 5]

  console.log(withoutDuplicates);
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
