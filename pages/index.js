import ArtPiecesPreview from "@/components/ArtPiecesPreview/ArtPiecesPreview";
import PressCarousel from "@/components/PressCarousel/PressCarousel";
import CategoryFilter from "@/components/CategoryFilter/CategoryFilter";
import FooterComponent from "@/components/Footer/Footer";
import GallerySliderPreview from "@/components/GalleryCarouselPreview/GalleryCarousel";
import Header from "@/components/Header/Header";
import ScrollUp from "@/components/ScrollUpButton/ScrollUpButton";
import WelcomingAbout from "@/components/WelcomingAndAbout/WelcomingAndAbout";
import Head from "next/head";
import DisplayPreviewOptions from "@/components/DisplayPreviewOptions/DisplayPreviewOptions";

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
        <PressCarousel filteredCategory={filteredCategory} />
        <section>
          <h3>Wähle eine Kategorie aus:</h3>
          <CategoryFilter
            handleSetFilteredCategory={handleSetFilteredCategory}
            handleSetActiveCategory={handleSetActiveCategory}
            activeCategory={activeCategory}
          />
          {activeCategory && (
            <DisplayPreviewOptions
              handleSetPreviewOption={handleSetPreviewOption}
              previewoption={previewoption}
            />
          )}
          {activeCategory && previewoption === "slideShow" && (
            <GallerySliderPreview filteredCategory={filteredCategory} />
          )}
          {activeCategory && previewoption != "slideShow" && (
            <ArtPiecesPreview filteredCategory={filteredCategory} previewoption={previewoption} />
          )}
        </section>
        <ScrollUp scrollPercent={scrollPercent} />
      </main>
      <FooterComponent />
    </>
  );
}
