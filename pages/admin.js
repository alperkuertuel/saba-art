import ArtPieceForm from "@/components/ArtPieceForm/ArtPieceForm";
import Header from "@/components/Header/Header";
import ArtPiecesList from "@/components/AdminArtPiecesList/AdminArtPiecesList";
import { useState } from "react";

export default function AdminHomePage({ artPieces, setArtPieces }) {
  const [artPieceToEdit, setArtPieceToEdit] = useState([]);
  const [fileImageUrl, setfileImageUrl] = useState(null);

  function handleFileChange(event) {
    const imageFile = event.target.files[0];
    // todo: validation with file info (size, type, length): console.log(event.target.files);
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = function (load) {
        const url = load.target.result;
        console.log(url);
        setfileImageUrl(url);
      };
      reader.readAsDataURL(imageFile);
    }
  }

  function handleAddArtPiece(newArtPieceData) {
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

  function handleDeleteArtPiece(id) {
    const artPiecesWithoutDeletedArtPiece = artPieces.filter(
      (piece) => piece.id !== id
    );
    setArtPieces(artPiecesWithoutDeletedArtPiece);
  }

  return (
    <>
      <Header />
      <main>
        <ArtPieceForm
          onSubmit={handleAddArtPiece}
          artPieceToEdit={artPieceToEdit}
          fileImageUrl={fileImageUrl}
          onChange={handleFileChange}
        />
        <ArtPiecesList
          artPieces={artPieces}
          onEdit={handleToEditArtPiece}
          onDelete={handleDeleteArtPiece}
        />
      </main>
    </>
  );
}
