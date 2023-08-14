import ArtPiecesPreview from "@/components/ArtPiecesPreview/ArtPiecesPreview";
import Header from "@/components/Header/Header";

export default function HomePage({ artPieces }) {
  return (
    <>
      <Header />
      <main>
        <ArtPiecesPreview artPieces={artPieces} />
      </main>
    </>
  );
}
