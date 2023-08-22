import ArtPiecesPreview from "@/components/ArtPiecesPreview/ArtPiecesPreview";
import CategoryFilter from "@/components/CategoryFilter/CategoryFilter";
import Header from "@/components/Header/Header";

export default function HomePage({ artPieces, handleSetArtPieces }) {
  return (
    <>
      <Header />
      <main>
        <CategoryFilter artPieces={artPieces} handleSetArtPieces={handleSetArtPieces} />
        <ArtPiecesPreview artPieces={artPieces} />
      </main>
    </>
  );
}
