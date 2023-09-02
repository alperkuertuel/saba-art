import Image from "next/image";
import styled from "styled-components";
import useSWR from "swr";

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
    <StyledFilterSection>
      <StyledCategoryFilter>
        {isLoading ? (
          <li>
            Loading <LoadingDots src="/img/loading_dots.gif" width={20} height={5} alt="..." />
          </li>
        ) : (
          <>
            <li>
              <StyledButton
                $active={active === "All" ? "var(--tertiary-color)" : "none"}
                onClick={handleFilterAll}
              >
                All
                <CategoryCount>{data.length}</CategoryCount>
              </StyledButton>
            </li>
            <li>
              <StyledButton
                $active={active === "Newest" ? "var(--tertiary-color)" : "none"}
                onClick={handleNewestArtPieces}
              >
                Newest
                <CategoryCount>
                  {data.filter((piece) => piece.date === currentYear).length}
                </CategoryCount>
              </StyledButton>
            </li>

            {uniqueCatagories.map((category) => (
              <li key={category}>
                <StyledButton
                  $active={active === category ? "var(--tertiary-color)" : "none"}
                  onClick={() => handleFilteredCategories(category)}
                >
                  {category}
                  <CategoryCount>
                    {data.filter((count) => count.category === category).length}
                  </CategoryCount>
                </StyledButton>
              </li>
            ))}
          </>
        )}
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
  align-items: center;
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
  line-height: 1rem;
`;

const CategoryCount = styled.span`
  padding: 2px 5px;
  margin: 0 0 0 8px;
  border-radius: 40%;
  background-color: rgba(0, 0, 0, 0.1);
  font-size: 0.8rem;
  vertical-align: top;
`;

const LoadingDots = styled(Image)`
  display: inline-block;
  width: 20;
  height: 5;
`;
