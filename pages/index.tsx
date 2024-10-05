import Head from "next/head";
import React from "react";

import ArtPiecesPreview from "@/ArtPiecesPreview/art-pieces-preview";
import CategoryFilter from "@/CategoryFilter/category-filter";
import DisplayPreviewOptions from "@/DisplayPreviewOptions/display-preview-options";
import FooterComponent from "@/Footer/page-footer";
import GallerySliderPreview from "@/GalleryCarouselPreview/gallery-carousel-preview";
import Header from "@/Header/page-header";
import PressCarousel from "@/PressCarousel/press-carousel";
import ScrollUp from "@/ScrollUpButton/scroll-up-button";
import WelcomingAbout from "@/WelcomingAndAbout/welcoming-and-about";

import { ArtPiece } from "./_app";

type HomePageProperties = {
  handleSetFilteredCategory: (filteredCategory: ArtPiece[]) => void;
  filteredCategory: ArtPiece[];
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
  handleSetCurrentFormData: (currentFormData: ArtPiece) => void;
  currentFormData: ArtPiece;
};

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
      <Header scrollPercent={scrollPercent} handleSetScrollPercentage={handleSetScrollPercentage} />
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
            <DisplayPreviewOptions handleSetPreviewOption={handleSetPreviewOption} previewoption={previewoption} />
          )}
          {activeCategory && previewoption === "slideShow" && (
            <GallerySliderPreview
              filteredCategory={filteredCategory}
              likedArtPieces={likedArtPieces}
              handleSetLikedArtPieces={handleSetLikedArtPieces}
            />
          )}
          {activeCategory && previewoption != "slideShow" && (
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
