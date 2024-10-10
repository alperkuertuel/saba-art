import { ArtPieceType } from 'pages/_app';
import useSWR from 'swr';

import LoadingDots from '../LoadingDots/LoadingDots';

interface CategoryFilterProperties {
  handleSetFilteredCategory: (filteredCategory: ArtPieceType[]) => void;
  handleSetActiveCategory: (activecategory: string) => void;
  activeCategory: string;
  likedArtPieces?: string[];
}

export default function CategoryFilter({
  handleSetFilteredCategory,
  handleSetActiveCategory,
  activeCategory,
  likedArtPieces,
}: CategoryFilterProperties) {
  const { data, isLoading }: { data: ArtPieceType[]; isLoading: boolean } =
    useSWR('/api', {
      fallbackData: [],
    });
  const allCategories: string[] = data.map(
    (piece: ArtPieceType) => piece.category
  );
  const currentYear = new Date().getFullYear();
  const uniqueSet = new Set(allCategories);
  const uniqueCatagories = [...uniqueSet];

  function handleFilteredCategories(category: string) {
    if (uniqueCatagories.includes(category)) {
      const filter = data.filter(
        (piece: ArtPieceType) => piece.category === category
      );
      handleSetFilteredCategory(filter);
      handleSetActiveCategory(category);
    }
  }

  function handleNewestArtPieces() {
    const yearFilter = data.filter(
      (piece: ArtPieceType) => piece.date === currentYear
    );
    handleSetFilteredCategory(yearFilter);
    handleSetActiveCategory('Neue');
  }

  function handleFilterAll() {
    handleSetFilteredCategory(data);
    handleSetActiveCategory('Alle');
  }

  function handleLikedArtPieces() {
    const favoriteArtPieces = data.filter(
      (piece: ArtPieceType) => piece._id && likedArtPieces?.includes(piece._id)
    );
    handleSetFilteredCategory(favoriteArtPieces);
    handleSetActiveCategory('Favoriten');
  }

  return (
    <ul className="my-4 flex flex-wrap items-center gap-4">
      {isLoading ? (
        <li>
          Wird geladen <LoadingDots />
        </li>
      ) : (
        <>
          <li>
            <button
              className="rounded-[5px] bg-box-color p-2 text-base leading-4 shadow-box-shadow"
              onClick={handleFilterAll}
            >
              Alle
              <span
                className="ease ml-2 rounded-[5px] px-[5px] py-[3px] align-top text-sm transition-colors duration-200"
                style={{
                  backgroundColor:
                    activeCategory === 'Alle'
                      ? 'var(--cool-brown)'
                      : 'var(--highlight-color)',
                }}
              >
                {data.length}
              </span>
            </button>
          </li>
          {data.some((piece: ArtPieceType) => piece.date === currentYear) && (
            <li>
              <button
                className="rounded-[5px] bg-box-color p-2 text-base leading-4 shadow-box-shadow"
                onClick={handleNewestArtPieces}
              >
                Neueste Bilder aus {currentYear}
                <span
                  className="ease ml-2 rounded-[5px] px-[5px] py-[3px] align-top text-sm transition-colors duration-200"
                  style={{
                    backgroundColor:
                      activeCategory === 'Neue'
                        ? 'var(--cool-brown)'
                        : 'var(--highlight-color)',
                  }}
                >
                  {
                    data.filter(
                      (piece: ArtPieceType) => piece.date === currentYear
                    ).length
                  }
                </span>
              </button>
            </li>
          )}

          {uniqueCatagories.map((category) => (
            <li key={category}>
              <button
                className="rounded-[5px] bg-box-color p-2 text-base leading-4 shadow-box-shadow"
                onClick={() => handleFilteredCategories(category)}
              >
                {category}
                <span
                  className="ease ml-2 rounded-[5px] px-[5px] py-[3px] align-top text-sm transition-colors duration-200"
                  style={{
                    backgroundColor:
                      activeCategory === category
                        ? 'var(--cool-brown)'
                        : 'var(--highlight-color)',
                  }}
                >
                  {
                    data.filter(
                      (piece: ArtPieceType) => piece.category === category
                    ).length
                  }
                </span>
              </button>
            </li>
          ))}
          {likedArtPieces && likedArtPieces?.length > 0 && (
            <li>
              <button
                className="rounded-[5px] bg-box-color p-2 text-base leading-4 shadow-box-shadow"
                onClick={handleLikedArtPieces}
              >
                Favoriten
                <span
                  className="ease ml-2 rounded-[5px] px-[5px] py-[3px] align-top text-sm transition-colors duration-200"
                  style={{
                    backgroundColor:
                      activeCategory === 'Favoriten'
                        ? 'var(--cool-brown)'
                        : 'var(--highlight-color)',
                  }}
                >
                  {likedArtPieces.length}
                </span>
              </button>
            </li>
          )}
        </>
      )}
    </ul>
  );
}
