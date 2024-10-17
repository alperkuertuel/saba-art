import Head from 'next/head';
import { ActiveCategory, ArtPieceType, PreviewOption } from 'types/types';

import ArtPiecesPreview from '@/ArtPiecesPreview/ArtPiecesPreview';
import CategoryFilter from '@/CategoryFilter/CategoryFilter';
import DisplayPreviewOptions from '@/DisplayPreviewOptions/DisplayPreviewOptions';
import FooterComponent from '@/Footer/Footer';
import GallerySliderPreview from '@/GallerySliderPreview/GallerySliderPreview';
import Header from '@/Header/Header';
import ScrollUp from '@/ScrollUpButton/ScrollUpButton';

interface GalleryPageProperties {
  isDarkMode: boolean;
  handleToggleDarkMode: (isDarkMode: boolean) => void;
  handleSetFilteredCategory: (filteredCategory: ArtPieceType[]) => void;
  filteredCategory: ArtPieceType[];
  activeCategory: ActiveCategory;
  handleSetActiveCategory: (activeCategory: ActiveCategory) => void;
  fileImageUrl: string;
  handleSetFileImageUrl: (fileImageUrl: string | ArrayBuffer | null) => void;
  scrollPercent: number;
  previewOption: PreviewOption;
  handleSetPreviewOption: (previewOption: PreviewOption) => void;
  likedArtPieces: string[];
  handleSetLikedArtPieces: (likedArtPieces: string[]) => void;
  handleSetScrollPercentage: (scrollPercent: number) => void;
  handleSetCurrentFormData: (currentFormData: ArtPieceType) => void;
  currentFormData: ArtPieceType;
}

export default function GalleryPage({
  isDarkMode,
  handleToggleDarkMode,
  handleSetFilteredCategory,
  filteredCategory,
  scrollPercent,
  handleSetScrollPercentage,
  handleSetActiveCategory,
  activeCategory,
  previewOption,
  handleSetPreviewOption,
  likedArtPieces,
  handleSetLikedArtPieces,
}: GalleryPageProperties) {
  return (
    <>
      <Head>
        <title>saba-art - Bilder sind Erinnerungen</title>
        <meta name="description" content="Die online Kunst-Galerie von Saba." />
      </Head>
      <Header
        isDarkMode={isDarkMode}
        handleToggleDarkMode={handleToggleDarkMode}
        scrollPercent={scrollPercent}
        handleSetScrollPercentage={handleSetScrollPercentage}
      />
      <main>
        <h1>Galerie</h1>
        <section>
          <p>
            Hier finden Sie eine Auswahl meiner Kunstwerke. Klicken Sie auf eine
            Kategorie, und anschliessend auf eine Anzeigeoption.
          </p>
          <CategoryFilter
            handleSetFilteredCategory={handleSetFilteredCategory}
            handleSetActiveCategory={handleSetActiveCategory}
            activeCategory={activeCategory}
            likedArtPieces={likedArtPieces}
          />
          {activeCategory && (
            <DisplayPreviewOptions
              handleSetPreviewOption={handleSetPreviewOption}
              previewOption={previewOption}
            />
          )}
          {activeCategory && previewOption === 'slideShow' && (
            <GallerySliderPreview
              filteredCategory={filteredCategory}
              likedArtPieces={likedArtPieces}
              handleSetLikedArtPieces={handleSetLikedArtPieces}
            />
          )}
          {activeCategory && previewOption != 'slideShow' && (
            <ArtPiecesPreview
              filteredCategory={filteredCategory}
              likedArtPieces={likedArtPieces}
              handleSetLikedArtPieces={handleSetLikedArtPieces}
              previewOption={previewOption}
            />
          )}
        </section>
        <ScrollUp scrollPercent={scrollPercent} />
      </main>
      <FooterComponent />
    </>
  );
}
