import ArtPiecesPreview from "@/components/ArtPiecesPreview/ArtPiecesPreview";
import CategoryFilter from "@/components/CategoryFilter/CategoryFilter";
import Header from "@/components/Header/Header";

export default function HomePage({ artPieces }) {
  return (
    <>
      <Header />
      <main>
        <CategoryFilter />
        <ArtPiecesPreview artPieces={artPieces} />
      </main>
    </>
  );
}
