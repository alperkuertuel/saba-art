import ArtPieceForm from "@/components/ArtPieceForm/ArtPieceForm";
import Header from "@/components/Header/Header";
import ArtPiecesList from "@/components/AdminArtPiecesList/AdminArtPiecesList";
import { useState } from "react";

export default function AdminHomePage({ artPieces, setArtPieces }) {
  const [artPieceToEdit, setArtPieceToEdit] = useState([]);

  function addArtPiece(newArtPieceData) {
    if (artPieces.some((piece) => piece.slug === newArtPieceData.slug)) {
      window.alert("Name already exists. Please choose a different name.");
    } else if (
      artPieces.some((piece) => piece.imageUrl === newArtPieceData.imageUrl)
    ) {
      window.alert(
        "Image is already in the Gallery. Please choose a different piture"
      );
    } else setArtPieces([newArtPieceData, ...artPieces]);
  }
  function handleToEditArtPiece(id) {
    const selectedArtPieceToEdit = artPieces.find((piece) => piece.id === id);
    setArtPieceToEdit(selectedArtPieceToEdit);
  }
  //console.log(artPieceToEdit);
  return (
    <>
      <Header />
      <main>
        <ArtPieceForm onSubmit={addArtPiece} artPieceToEdit={artPieceToEdit} />
        <ArtPiecesList artPieces={artPieces} onEdit={handleToEditArtPiece} />
      </main>
    </>
  );
}
