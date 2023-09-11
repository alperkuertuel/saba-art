import ArtPiecesPreview from "@/components/ArtPiecesPreview/ArtPiecesPreview";
import CategoryFilter from "@/components/CategoryFilter/CategoryFilter";
import DisplayGrid from "@/components/DisplayGridPreview/DisplayGridPreview";
import FooterComponent from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
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
        <title>ArtistName - pictures are memories</title>
        <meta name="description" content="the gallery of ArtistName" />
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
        <h3>Select a category:</h3>
        <CategoryFilter
          handleSetFilteredCategory={handleSetFilteredCategory}
          handleSetActive={handleSetActive}
          active={active}
        />
        {active && <DisplayGrid handleSetGridRepeatMinsize={handleSetGridRepeatMinsize} />}
        <ArtPiecesPreview
          filteredCategory={filteredCategory}
          size={size}
          handleSetScrollPercentage={handleSetScrollPercentage}
        />
        <ScrollUp scrollPercent={scrollPercent} />
      </main>
      <FooterComponent />
    </>
  );
}
