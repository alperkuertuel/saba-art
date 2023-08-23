import ArtPieceForm from "@/components/AdminArtPieceForm/ArtPieceForm";
import Header from "@/components/Header/Header";
import ArtPiecesList from "@/components/AdminArtPiecesList/AdminArtPiecesList";

export default function AdminHomePage({
  artPieces,
  artPieceToEdit,
  handleSetArtPieces,
  handleArtPieceToEdit,
  fileImageUrl,
  handleSetFileImageUrl,
}) {
  const allowedFileSize = 614400;
  const maxWidth = 800; // max width of detail page
  const maxHeight = 800;
  function handleImageUpload(event) {
    const imageFile = event.target.files[0];

    if (imageFile) {
      const reader = new FileReader();
      reader.onload = function (load) {
        const img = new Image();
        img.onload = function () {
          // step 1: drawing in canvas and assigning width and height
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          const resizedImageData = canvas.toDataURL("image/webp", 0.7);
          console.log(resizedImageData);

          handleSetFileImageUrl(resizedImageData);
        };
        img.src = load.target.result;
      };
      reader.readAsDataURL(imageFile);
    }
  }

  function handleDeleteArtPiece(id) {
    const artPieceToDelete = artPieces.find((piece) => piece.id === id);
    const artPiecesWithoutDeletedArtPiece = artPieces.filter((piece) => piece.id !== id);

    const sureToDelete = confirm(`Are you sure you want to delete ${artPieceToDelete.name}`);
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
  }

  return (
    <>
      <Header />
      <main>
        <ArtPieceForm
          allowedFileSize={allowedFileSize}
          handleSetFileImageUrl={handleSetFileImageUrl}
          fileImageUrl={fileImageUrl}
          onSubmit={handleAddArtPiece}
          onChange={handleImageUpload}
        />
        <ArtPiecesList
          artPieceToEdit={artPieceToEdit}
          fileImageUrl={fileImageUrl}
          handleSetFileImageUrl={handleSetFileImageUrl}
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
