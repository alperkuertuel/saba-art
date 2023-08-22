import GlobalStyle from "../styles";
import useLocalStorageState from "use-local-storage-state";
import artPiecesData from "@/db/data";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [artPieces, setArtPieces] = useLocalStorageState("artPieces", {
    defaultValue: artPiecesData,
  });
  const [artPieceToEdit, setArtPieceToEdit] = useState([]);
  let [fileImageUrl, setfileImageUrl] = useState("/img/preview.png");

  function handleArtPieceToEdit(artPieceToEdit) {
    setArtPieceToEdit(artPieceToEdit);
  }

  function handleSetArtPieces(artPieces) {
    setArtPieces(artPieces);
  }

  function handleSetFileImageUrl(fileImageUrl) {
    setfileImageUrl(fileImageUrl);
  }

  return (
    <>
      <GlobalStyle />
      <Component
        {...pageProps}
        artPieces={artPieces}
        artPieceToEdit={artPieceToEdit}
        fileImageUrl={fileImageUrl}
        handleSetFileImageUrl={handleSetFileImageUrl}
        handleArtPieceToEdit={handleArtPieceToEdit}
        handleSetArtPieces={handleSetArtPieces}
      />
    </>
  );
}
