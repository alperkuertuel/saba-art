import styled from "styled-components";
import useSWR from "swr";
import LoadingDots from "../LoadingDots/LoadingDots";

export default function CategoryFilter({ handleSetFilteredCategory, handleSetActive, active }) {
  const { data, isLoading } = useSWR("/api", { fallbackData: [] });
  const allCategories = data.map((piece) => piece.category);
  const currentYear = new Date().getFullYear().toString();
  const uniqueSet = new Set(allCategories);
  const uniqueCatagories = [...uniqueSet];

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
    <StyledCategoryFilter>
      {isLoading ? (
        <li>
          Loading <LoadingDots />
        </li>
      ) : (
        <>
          <li>
            <StyledButton onClick={handleFilterAll}>
              All
              <CategoryCount $active={active === "All" ? "var(--cool-brown)" : "var(--blue-grey)"}>
                {data.length}
              </CategoryCount>
            </StyledButton>
          </li>
          <li>
            <StyledButton
              $active={active === "Newest" ? "var(--cool-brown)" : "var(--blue-grey)"}
              onClick={handleNewestArtPieces}
            >
              Newest from {currentYear}
              <CategoryCount
                $active={active === "Newest" ? "var(--cool-brown)" : "var(--blue-grey)"}
              >
                {data.filter((piece) => piece.date === currentYear).length}
              </CategoryCount>
            </StyledButton>
          </li>

          {uniqueCatagories.map((category) => (
            <li key={category}>
              <StyledButton onClick={() => handleFilteredCategories(category)}>
                {category}
                <CategoryCount
                  $active={active === category ? "var(--cool-brown)" : "var(--blue-grey)"}
                >
                  {data.filter((count) => count.category === category).length}
                </CategoryCount>
              </StyledButton>
            </li>
          ))}
        </>
      )}
    </StyledCategoryFilter>
  );
}

const StyledCategoryFilter = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const StyledButton = styled.button`
  background-color: var(--box-color);
  padding: 0.5rem;
  border-radius: 5px;
  font-size: 1rem;
  box-shadow: var(--box-shadow);
  line-height: 1rem;
`;

const CategoryCount = styled.span`
  transition: background-color 0.2s ease;
  padding: 3px 5px;
  margin: 0 0 0 8px;
  border-radius: 5px;
  background-color: ${(props) => props.$active};
  font-size: 0.8rem;
  vertical-align: top;
`;
