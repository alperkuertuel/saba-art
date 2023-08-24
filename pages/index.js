import ArtPiecesPreview from "@/components/ArtPiecesPreview/ArtPiecesPreview";
import CategoryFilter from "@/components/CategoryFilter/CategoryFilter";
import Header from "@/components/Header/Header";
import Head from "next/head";

export default function HomePage({ artPieces, handleSetFilteredCategory, filteredCategory }) {
  return (
    <>
      <Head>
        <title>ArtistName - pictures are memories</title>
        <meta name="description" content="the gallery of ArtistName" />
      </Head>
      <Header />
      <main>
        <CategoryFilter
          artPieces={artPieces}
          handleSetFilteredCategory={handleSetFilteredCategory}
          filteredCategory={filteredCategory}
        />
        <ArtPiecesPreview artPieces={artPieces} filteredCategory={filteredCategory} />
      </main>
    </>
  );
}
