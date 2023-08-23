import GlobalStyle from "../styles";
import useLocalStorageState from "use-local-storage-state";
import artPiecesData from "@/db/data";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [artPieces, setArtPieces] = useLocalStorageState("artPieces", {
    defaultValue: artPiecesData,
  });
  const [artPieceToEdit, setArtPieceToEdit] = useState([]);
  const [fileImageUrl, setfileImageUrl] = useState("/img/preview.png");

  const [filteredCategory, setFilteredCategory] = useState(artPieces);

  function handleArtPieceToEdit(artPieceToEdit) {
    setArtPieceToEdit(artPieceToEdit);
  }

  function handleSetArtPieces(artPieces) {
    setArtPieces(artPieces);
  }

  function handleSetFileImageUrl(fileImageUrl) {
    setfileImageUrl(fileImageUrl);
  }

  function handleSetFilteredCategory(filteredCategory) {
    setFilteredCategory(filteredCategory);
  }

  return (
    <>
      <GlobalStyle />
      <Component
        {...pageProps}
        artPieces={artPieces}
        artPieceToEdit={artPieceToEdit}
        filteredCategory={filteredCategory}
        fileImageUrl={fileImageUrl}
        handleSetFileImageUrl={handleSetFileImageUrl}
        handleArtPieceToEdit={handleArtPieceToEdit}
        handleSetArtPieces={handleSetArtPieces}
        handleSetFilteredCategory={handleSetFilteredCategory}
      />
    </>
  );
}
