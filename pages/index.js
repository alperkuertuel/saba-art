import ArtPiecesPreview from "@/components/ArtPiecesPreview/art-pieces-preview";
import PressCarousel from "@/components/PressCarousel/press-carousel";
import CategoryFilter from "@/components/CategoryFilter/category-filter";
import FooterComponent from "@/components/Footer/page-footer";
import GallerySliderPreview from "@/components/GalleryCarouselPreview/gallery-carousel-preview";
import Header from "@/components/Header/page-header";
import ScrollUp from "@/components/ScrollUpButton/scroll-up-button";
import WelcomingAbout from "@/components/WelcomingAndAbout/welcoming-and-about";
import Head from "next/head";
import DisplayPreviewOptions from "@/components/DisplayPreviewOptions/display-preview-options";

export default function HomePage({
  handleSetFilteredCategory,
  filteredCategory,
  scrollPercent,
  handleSetScrollPercentage,
  handleSetActiveCategory,
  activeCategory,
  previewoption,
  handleSetPreviewOption,
  handleSetTheme,
  handleSetCurrentTheme,
  currentTheme,
  likedArtPieces,
  handleSetLikedArtPieces,
}) {
  return (
    <>
      <Head>
        <title>saba-art - Bilder sind Erinnerungen</title>
        <meta name="description" content="Die online Kunst-Galerie von Saba." />
      </Head>
      <Header
        scrollPercent={scrollPercent}
        handleSetScrollPercentage={handleSetScrollPercentage}
        handleSetTheme={handleSetTheme}
        handleSetCurrentTheme={handleSetCurrentTheme}
        currentTheme={currentTheme}
      />
      <main>
        <WelcomingAbout />
        <PressCarousel filteredCategory={filteredCategory} currentTheme={currentTheme} />
        <section>
          <h2>Wähle eine Kategorie aus:</h2>
          <CategoryFilter
            handleSetFilteredCategory={handleSetFilteredCategory}
            handleSetActiveCategory={handleSetActiveCategory}
            handleSetLikedArtPieces={handleSetLikedArtPieces}
            activeCategory={activeCategory}
            likedArtPieces={likedArtPieces}
          />
          {activeCategory && (
            <DisplayPreviewOptions
              handleSetPreviewOption={handleSetPreviewOption}
              previewoption={previewoption}
            />
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
