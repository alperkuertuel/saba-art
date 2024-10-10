import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { ArtPieceType } from 'pages/_app';

import ArtPiecesPreview from '@/ArtPiecesPreview/ArtPiecesPreview';
import CategoryFilter from '@/CategoryFilter/CategoryFilter';

interface ApiBackUpPageProperties {
  handleSetFilteredCategory: (filteredCategory: ArtPieceType[]) => void;
  filteredCategory: ArtPieceType[];
  activeCategory: string;
  handleSetActiveCategory: (activeCategory: string) => void;
}

export default function ApiBackUpPage({
  handleSetFilteredCategory,
  filteredCategory,
  handleSetActiveCategory,
  activeCategory,
}: ApiBackUpPageProperties) {
  return (
    <div
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
      <ArtPiecesPreview filteredCategory={filteredCategory} />
    </div>
  );
}
/////// ONLY PREVIEWS VISIBLE HERE ///////
