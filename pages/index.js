import ArtPiecesPreview from "@/components/ArtPiecesPreview/ArtPiecesPreview";
import CategoryFilter from "@/components/CategoryFilter/CategoryFilter";
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
}) {
  return (
    <>
      <Head>
        <title>ArtistName - pictures are memories</title>
        <meta name="description" content="the gallery of ArtistName" />
      </Head>
      <Header scrollPercent={scrollPercent} handleSetScrollPercentage={handleSetScrollPercentage} />
      <main>
        <WelcomingAbout />
        <CategoryFilter
          handleSetFilteredCategory={handleSetFilteredCategory}
          handleSetActive={handleSetActive}
          active={active}
        />
        <ArtPiecesPreview filteredCategory={filteredCategory} />
        <ScrollUp scrollPercent={scrollPercent} />
      </main>
      <FooterComponent />
    </>
  );
}
