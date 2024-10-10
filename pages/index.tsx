import Head from 'next/head';

import ArtPiecesPreview from '@/ArtPiecesPreview/ArtPiecesPreview';
import CategoryFilter from '@/CategoryFilter/CategoryFilter';
import DisplayPreviewOptions from '@/DisplayPreviewOptions/DisplayPreviewOptions';
import FooterComponent from '@/Footer/Footer';
import GallerySliderPreview from '@/GallerySliderPreview/GallerySliderPreview';
import Header from '@/Header/Header';
import PressCarousel from '@/PressCarousel/PressCarousel';
import ScrollUp from '@/ScrollUpButton/ScrollUpButton';
import WelcomingAbout from '@/WelcomingAndAbout/WelcomingAndAbout';

import { ArtPieceType } from './_app';

interface HomePageProperties {
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

export default function HomePage({
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
}: HomePageProperties) {
  return (
    <>
      <Head>
        <title>saba-art - Bilder sind Erinnerungen</title>
        <meta name="description" content="Die online Kunst-Galerie von Saba." />
      </Head>
      <Header
        scrollPercent={scrollPercent}
        handleSetScrollPercentage={handleSetScrollPercentage}
      />
      <main>
        <WelcomingAbout />
        <PressCarousel />
        <section>
          <h2>Wähle eine Kategorie aus:</h2>
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
