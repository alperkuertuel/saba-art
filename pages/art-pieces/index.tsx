import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { ActiveCategory, ArtPieceType, PreviewOption } from 'types/types';

import ArtPiecesPreview from '@/ArtPiecesPreview/ArtPiecesPreview';
import CategoryFilter from '@/CategoryFilter/CategoryFilter';

interface ApiBackUpPageProperties {
  handleSetFilteredCategory: (filteredCategory: ArtPieceType[]) => void;
  filteredCategory: ArtPieceType[];
  activeCategory: ActiveCategory;
  handleSetActiveCategory: (activeCategory: ActiveCategory) => void;
  previewOption: PreviewOption;
  likedArtPieces: string[];
}

/////// ONLY PREVIEWS VISIBLE HERE WHEN ON API ROUTE ///////

export default function ApiBackUpPage({
  handleSetFilteredCategory,
  filteredCategory,
  handleSetActiveCategory,
  activeCategory,
  previewOption,
  likedArtPieces,
}: ApiBackUpPageProperties) {
  return (
    <section
      style={{
        margin: '1rem auto',
        maxWidth: '1280px',
        padding: '0 1rem',
      }}
    >
      <Link href="/">
        <FontAwesomeIcon icon={faArrowLeftLong} />
        {' BACK'}
      </Link>
      <CategoryFilter
        activeCategory={activeCategory}
        handleSetActiveCategory={handleSetActiveCategory}
        handleSetFilteredCategory={handleSetFilteredCategory}
      />
      <ArtPiecesPreview
        previewOption={previewOption}
        likedArtPieces={likedArtPieces}
        filteredCategory={filteredCategory}
      />
    </section>
  );
}
