import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import { ActiveCategory, ArtPieceType } from 'types/types';

import Button from '@/Button/Button';

import LoadingDots from '../LoadingDots/LoadingDots';

interface CategoryFilterProperties {
  handleSetFilteredCategory: (filteredCategory: ArtPieceType[]) => void;
  handleSetActiveCategory: (activeCategory: ActiveCategory) => void;
  activeCategory: ActiveCategory;
  likedArtPieces?: string[];
}

export default function CategoryFilter({
  handleSetFilteredCategory,
  handleSetActiveCategory,
  activeCategory,
  likedArtPieces,
}: CategoryFilterProperties) {
  const { data: session } = useSession();
  const { data, isLoading }: { data: ArtPieceType[]; isLoading: boolean } =
    useSWR('/api', {
      fallbackData: [],
    });

  const allCategories: string[] = data.map(
    (piece: ArtPieceType) => piece.category
  );
  const currentYear = new Date().getFullYear();
  const uniqueSet = new Set(allCategories);
  const uniqueCatagories = [...uniqueSet] as ActiveCategory[];

  function handleFilteredCategories(category: ActiveCategory) {
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

  function handleAvailable() {
    const availableFilter = data.filter(
      (piece: ArtPieceType) => piece.available === true
    );
    handleSetFilteredCategory(availableFilter);
    handleSetActiveCategory('Verfügbare');
  }

  function handleNotAvailable() {
    const notAvailableFilter = data.filter(
      (piece: ArtPieceType) => piece.available === false
    );
    handleSetFilteredCategory(notAvailableFilter);
    handleSetActiveCategory('Vergeben');
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
            <Button
              variant="categoryFilter"
              size="small"
              onClick={handleFilterAll}
            >
              Alle
              <span
                className="ml-2 rounded-lg border border-cool-color px-[5px] py-[3px] text-xs font-bold"
                style={{
                  backgroundColor:
                    activeCategory === 'Alle' ? 'var(--tertiary-color)' : '',
                }}
              >
                {data.length}
              </span>
            </Button>
          </li>
          {session && session.user?.role === 'Admin' && (
            <li>
              <Button
                variant="categoryFilter"
                size="small"
                onClick={handleAvailable}
              >
                Verfügbare
                <span
                  className="ml-2 rounded-lg border border-cool-color px-[5px] py-[3px] text-xs font-bold"
                  style={{
                    backgroundColor:
                      activeCategory === 'Verfügbare'
                        ? 'var(--tertiary-color)'
                        : '',
                  }}
                >
                  {
                    data.filter(
                      (piece: ArtPieceType) => piece.available === true
                    ).length
                  }
                </span>
              </Button>
            </li>
          )}
          {session && session.user?.role === 'Admin' && (
            <li>
              <Button
                variant="categoryFilter"
                size="small"
                onClick={handleNotAvailable}
              >
                Vergebene
                <span
                  className="ml-2 rounded-lg border border-cool-color px-[5px] py-[3px] text-xs font-bold"
                  style={{
                    backgroundColor:
                      activeCategory === 'Vergeben'
                        ? 'var(--tertiary-color)'
                        : '',
                  }}
                >
                  {
                    data.filter(
                      (piece: ArtPieceType) => piece.available === false
                    ).length
                  }
                </span>
              </Button>
            </li>
          )}
          {data.some((piece: ArtPieceType) => piece.date === currentYear) && (
            <li>
              <Button
                variant="categoryFilter"
                size="small"
                onClick={handleNewestArtPieces}
              >
                Neueste Bilder aus {currentYear}
                <span
                  className="ml-2 rounded-lg border border-cool-color px-[5px] py-[3px] text-xs font-bold"
                  style={{
                    backgroundColor:
                      activeCategory === 'Neue' ? 'var(--tertiary-color)' : '',
                  }}
                >
                  {
                    data.filter(
                      (piece: ArtPieceType) => piece.date === currentYear
                    ).length
                  }
                </span>
              </Button>
            </li>
          )}

          {uniqueCatagories.map((category) => (
            <li key={category}>
              <Button
                variant="categoryFilter"
                size="small"
                onClick={() => handleFilteredCategories(category)}
              >
                {category}
                <span
                  className="ml-2 rounded-lg border border-cool-color px-[5px] py-[3px] text-xs font-bold"
                  style={{
                    backgroundColor:
                      activeCategory === category
                        ? 'var(--tertiary-color)'
                        : '',
                  }}
                >
                  {
                    data.filter(
                      (piece: ArtPieceType) => piece.category === category
                    ).length
                  }
                </span>
              </Button>
            </li>
          ))}
          {likedArtPieces && likedArtPieces?.length > 0 && (
            <li>
              <Button
                variant="categoryFilter"
                size="small"
                onClick={handleLikedArtPieces}
              >
                Favoriten
                <span
                  className="ml-2 rounded-lg border border-cool-color px-[5px] py-[3px] text-xs font-bold"
                  style={{
                    backgroundColor:
                      activeCategory === 'Favoriten'
                        ? 'var(--tertiary-color)'
                        : '',
                  }}
                >
                  {likedArtPieces.length}
                </span>
              </Button>
            </li>
          )}
        </>
      )}
    </ul>
  );
}
