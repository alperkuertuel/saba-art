import ArtPiecesPreview from "@/components/ArtPiecesPreview/ArtPiecesPreview";
import CategoryFilter from "@/components/CategoryFilter/CategoryFilter";
import DisplayPreviewOptions from "@/components/DisplayPreviewOptions/DisplayPreviewOptions";
import FooterComponent from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import ImageCarousel from "@/components/Carousel/Carousel";
import ScrollUp from "@/components/ScrollUpButton/ScrollUpButton";
import WelcomingAbout from "@/components/WelcomingAndAbout/WelcomingAndAbout";
import Head from "next/head";

export default function HomePage({
  handleSetFilteredCategory,
  filteredCategory,
  scrollPercent,
  handleSetScrollPercentage,
  handleSetActive,
  active,
  size,
  handleSetGridRepeatMinsize,
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

        <h3>Wähle eine Kategorie aus:</h3>
        <CategoryFilter
          handleSetFilteredCategory={handleSetFilteredCategory}
          handleSetActive={handleSetActive}
          active={active}
        />
        {active && (
          <DisplayPreviewOptions handleSetGridRepeatMinsize={handleSetGridRepeatMinsize} />
        )}
        <ArtPiecesPreview
          filteredCategory={filteredCategory}
          size={size}
          handleSetScrollPercentage={handleSetScrollPercentage}
        />
        <ImageCarousel filteredCategory={filteredCategory} />
        <ScrollUp scrollPercent={scrollPercent} />
      </main>
      <FooterComponent />
    </>
  );
}
