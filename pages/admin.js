import ArtPieceForm from "@/components/AdminArtPieceForm/ArtPieceForm";
import Header from "@/components/Header/Header";
import ArtPiecesList from "@/components/AdminArtPiecesList/AdminArtPiecesList";
import { useState } from "react";

export default function AdminHomePage({ artPieces, setArtPieces }) {
  const [artPieceToEdit, setArtPieceToEdit] = useState([]);
  const [fileImageUrl, setfileImageUrl] = useState(null);

  function handleImageUpload(event) {
    const imageFile = event.target.files[0];
    console.log(imageFile);

    // todo: validation with file info (size, type, length): console.log(event.target.files);
    if (imageFile && imageFile.size <= 600000) {
      const reader = new FileReader();
      reader.onload = function (load) {
        const url = load.target.result;
        setfileImageUrl(url);
      };
      reader.readAsDataURL(imageFile);
      console.log(imageFile);
    } else window.alert("Your file is to big!");
  }

  function handleDeleteArtPiece(id) {
    const artPiecesWithoutDeletedArtPiece = artPieces.filter(
      (piece) => piece.id !== id
    );
    setArtPieces(artPiecesWithoutDeletedArtPiece);
  }

  function handleAddArtPiece(newArtPieceData) {
    if (artPieces.some((piece) => piece.slug === newArtPieceData.slug)) {
      window.alert("Name already exists. Please choose a different name.");
    } else setArtPieces([newArtPieceData, ...artPieces]);
    console.log(artPieces);
  }

  function handleEditArtPiece(id) {
    const selectedArtPieceToEdit = artPieces.find((piece) => piece.id === id);
    setArtPieceToEdit(selectedArtPieceToEdit);
    console.log(id);
  }

  return (
    <>
      <Header />
      <main>
        <ArtPieceForm
          fileImageUrl={fileImageUrl}
          onSubmit={handleAddArtPiece}
          onChange={handleImageUpload}
        />
        <ArtPiecesList
          artPieceToEdit={artPieceToEdit}
          fileImageUrl={fileImageUrl}
          onSubmit={handleEditArtPiece}
          onEdit={handleEditArtPiece}
          onDelete={handleDeleteArtPiece}
          artPieces={artPieces}
          setArtPieces={setArtPieces}
        />
      </main>
    </>
  );
}
