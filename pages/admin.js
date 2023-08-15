import ArtPieceForm from "@/components/ArtPieceForm/ArtPieceForm";
import Header from "@/components/Header/Header";
import useLocalStorageState from "use-local-storage-state";
import { useEffect } from "react";
import ArtPiecesList from "@/components/AdminArtPiecesList/AdminArtPiecesList";

export default function AdminHomePage() {
  const [adminArtPieces, setAdminArtPieces] = useLocalStorageState(
    "artPiecesAdmin",
    {
      defaultValue: [],
    }
  );

  console.log(adminArtPieces);

  useEffect(() => {
    const storedArtPieces = JSON.parse(localStorage.getItem("artPiecesAdmin"));
    if (storedArtPieces) {
      setAdminArtPieces(storedArtPieces);
    }
  }, [setAdminArtPieces]);

  function addArtPiece(newArtPieceData) {
    if (adminArtPieces.some((piece) => piece.slug === newArtPieceData.slug)) {
      window.alert("Slug already exists. Please choose a different name.");
    } else if (
      adminArtPieces.some(
        (piece) => piece.imageUrl === newArtPieceData.imageUrl
      )
    ) {
      window.alert(
        "Image is already in the Gallery. Please choose a different piture"
      );
    } else setAdminArtPieces([...adminArtPieces, newArtPieceData]);
  }

  return (
    <>
      <Header />
      <main>
        <ArtPieceForm onSubmit={addArtPiece} />
        <ArtPiecesList adminArtPieces={adminArtPieces} />
      </main>
    </>
  );
}
