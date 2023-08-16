import ArtPieceForm from "@/components/ArtPieceForm/ArtPieceForm";
import Header from "@/components/Header/Header";
import ArtPiecesList from "@/components/AdminArtPiecesList/AdminArtPiecesList";

export default function AdminHomePage({ artPieces, setArtPieces }) {
  function addArtPiece(newArtPieceData) {
    if (artPieces.some((piece) => piece.slug === newArtPieceData.slug)) {
      window.alert("Name already exists. Please choose a different name.");
    } else if (
      artPieces.some((piece) => piece.imageUrl === newArtPieceData.imageUrl)
    ) {
      window.alert(
        "Image is already in the Gallery. Please choose a different piture"
      );
    } else setArtPieces([...artPieces, newArtPieceData]);
  }

  return (
    <>
      <Header />
      <main>
        <ArtPieceForm onSubmit={addArtPiece} />
        <ArtPiecesList artPieces={artPieces} />
      </main>
    </>
  );
}
