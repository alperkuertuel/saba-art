import ArtPieceForm from "@/components/AdminArtPieceForm/ArtPieceForm";
import Header from "@/components/Header/Header";
import ArtPiecesList from "@/components/AdminArtPiecesList/AdminArtPiecesList";
import { useState } from "react";

export default function AdminHomePage({
  artPieces,
  artPieceToEdit,
  handleSetArtPieces,
  handleArtPieceToEdit,
  fileImageUrl,
  handleSetFileImageUrl,
}) {
  function handleImageUpload(event) {
    const imageFile = event.target.files[0];

    if (imageFile && imageFile.size <= 600000) {
      const reader = new FileReader();
      reader.onload = function (load) {
        const url = load.target.result;
        handleSetFileImageUrl(url);
      };
      reader.readAsDataURL(imageFile);
    } else window.alert("Your file is to big!") || location.reload();
  }

  function handleDeleteArtPiece(id) {
    const artPieceToDelete = artPieces.find((piece) => piece.id === id);
    const artPiecesWithoutDeletedArtPiece = artPieces.filter(
      (piece) => piece.id !== id
    );

    if (!artPieceToDelete) {
      console.log("Art piece not found.");
      return;
    }

    const artPieceName = artPieceToDelete.name;
    console.log(artPieceName);
    const sureToDelete = confirm(
      `Are you sure you want to delete ${artPieceToDelete.name}`
    );
    if (sureToDelete) {
      handleSetArtPieces(artPiecesWithoutDeletedArtPiece);
    }
  }

  function handleAddArtPiece(newArtPieceData) {
    if (artPieces.some((piece) => piece.slug === newArtPieceData.slug)) {
      window.alert("Name already exists. Please choose a different name.");
    } else handleSetArtPieces([newArtPieceData, ...artPieces]);
  }

  function handleEditArtPiece(id) {
    const selectedArtPieceToEdit = artPieces.find((piece) => piece.id === id);
    handleArtPieceToEdit(selectedArtPieceToEdit);
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
          handleSetArtPieces={handleSetArtPieces}
        />
      </main>
    </>
  );
}
