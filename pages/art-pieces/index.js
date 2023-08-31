import ArtPiecesPreview from "@/components/ArtPiecesPreview/ArtPiecesPreview";
import CategoryFilter from "@/components/CategoryFilter/CategoryFilter";
import Header from "@/components/Header/Header";
import Head from "next/head";

export default function HomePage({
  handleSetFilteredCategory,
  filteredCategory,
  scrollPercent,
  handleSetScrollPercentage,
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
          handleSetFilteredCategory={handleSetFilteredCategory}
          filteredCategory={filteredCategory}
        />
        <ArtPiecesPreview filteredCategory={filteredCategory} />
      </main>
    </>
  );
}
/////// INDEX.JS OF ART-PIECES TO DISPLAY AGAIN ALL ART-PIECES ///////
