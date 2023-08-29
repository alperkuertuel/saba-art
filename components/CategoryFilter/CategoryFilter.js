import styled from "styled-components";
import useSWR from "swr";

export default function CategoryFilter({ handleSetFilteredCategory, handleSetActive, active }) {
  const { data } = useSWR("/api", { fallbackData: [] });
  const allCategories = data.map((piece) => piece.category);
  const currentYear = new Date().getFullYear().toString();
  const uniqueSet = new Set(allCategories);
  const uniqueCatagories = [...uniqueSet];
  // console.log(uniqueCatagories);

  function handleFilteredCategories(category) {
    if (uniqueCatagories.includes(category)) {
      const filter = data.filter((piece) => piece.category === category);
      handleSetFilteredCategory(filter);
      handleSetActive(category);
    }
  }

  function handleNewestArtPieces() {
    const yearFilter = data.filter((piece) => piece.date === currentYear);
    handleSetFilteredCategory(yearFilter);
    handleSetActive("Newest");
  }

  function handleFilterAll() {
    handleSetFilteredCategory(data);
    handleSetActive("All");
  }

  return (
    <StyledFilterSection>
      <StyledCategoryFilter>
        <li>
          <StyledButton
            $active={active === "All" ? "var(--tertiary-color)" : "none"}
            onClick={handleFilterAll}
          >
            All
          </StyledButton>
        </li>
        <li>
          <StyledButton
            $active={active === "Newest" ? "var(--tertiary-color)" : "none"}
            onClick={handleNewestArtPieces}
          >
            Newest
          </StyledButton>
        </li>
        {uniqueCatagories.map((category) => (
          <li key={category}>
            <StyledButton
              $active={active === category ? "var(--tertiary-color)" : "none"}
              onClick={() => handleFilteredCategories(category)}
            >
              {category}
            </StyledButton>
          </li>
        ))}
      </StyledCategoryFilter>
    </StyledFilterSection>
  );
}

const StyledFilterSection = styled.section`
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
  border: 1px solid ${(props) => props.$active};
  background-color: var(--box-color);
  transition: border 0.1s ease;
  padding: 0.5rem;
  border-radius: 5px;
  font-size: 1rem;
  box-shadow: var(--box-shadow);
`;
