import Head from 'next/head';

import ArtPiecesPreview from '@/ArtPiecesPreview/ArtPiecesPreview';
import CategoryFilter from '@/CategoryFilter/CategoryFilter';
import DisplayPreviewOptions from '@/DisplayPreviewOptions/DisplayPreviewOptions';
import FooterComponent from '@/Footer/Footer';
import GallerySliderPreview from '@/GallerySliderPreview/GallerySliderPreview';
import Header from '@/Header/Header';
import ScrollUp from '@/ScrollUpButton/ScrollUpButton';

import { ArtPieceType } from './_app';

interface GalleryPageProperties {
  isDarkMode: boolean;
  handleToggleDarkMode: (isDarkMode: boolean) => void;
  handleSetFilteredCategory: (filteredCategory: ArtPieceType[]) => void;
  filteredCategory: ArtPieceType[];
  activeCategory: string;
  handleSetActiveCategory: (activeCategory: string) => void;
  fileImageUrl: string;
  handleSetFileImageUrl: (fileImageUrl: string | ArrayBuffer | null) => void;
  scrollPercent: number;
  previewoption: string;
  handleSetPreviewOption: (previewoption: string) => void;
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
  previewoption,
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
              previewoption={previewoption}
            />
          )}
          {activeCategory && previewoption === 'slideShow' && (
            <GallerySliderPreview
              filteredCategory={filteredCategory}
              likedArtPieces={likedArtPieces}
              handleSetLikedArtPieces={handleSetLikedArtPieces}
            />
          )}
          {activeCategory && previewoption != 'slideShow' && (
            <ArtPiecesPreview
              filteredCategory={filteredCategory}
              likedArtPieces={likedArtPieces}
              handleSetLikedArtPieces={handleSetLikedArtPieces}
              previewoption={previewoption}
            />
          )}
        </section>
        <ScrollUp scrollPercent={scrollPercent} />
      </main>
      <FooterComponent />
    </>
  );
}
