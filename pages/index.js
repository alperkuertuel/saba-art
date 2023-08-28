import ArtPiecesPreview from "@/components/ArtPiecesPreview/ArtPiecesPreview";
import CategoryFilter from "@/components/CategoryFilter/CategoryFilter";
import Header from "@/components/Header/Header";
import ScrollUp from "@/components/ScrollUpButton/ScrollUpButton";
import Head from "next/head";

export default function HomePage({
  artPieces,
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
        <CategoryFilter
          handleSetActive={handleSetActive}
          active={active}
          artPieces={artPieces}
          handleSetFilteredCategory={handleSetFilteredCategory}
          filteredCategory={filteredCategory}
        />
        <ArtPiecesPreview artPieces={artPieces} filteredCategory={filteredCategory} />
        <ScrollUp scrollPercent={scrollPercent} />
      </main>
    </>
  );
}
