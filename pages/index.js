import ArtPiecesPreview from "@/components/ArtPiecesPreview/ArtPiecesPreview";
import CategoryFilter from "@/components/CategoryFilter/CategoryFilter";
import Header from "@/components/Header/Header";

export default function HomePage({ artPieces, handleSetFilteredCategory, filteredCategory }) {
  return (
    <>
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
