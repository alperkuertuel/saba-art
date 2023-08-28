import GlobalStyle from "../styles";
import useLocalStorageState from "use-local-storage-state";
import artPiecesData from "@/db/BackUp/data";
import { useState } from "react";
import { SWRConfig } from "swr";

export default function App({ Component, pageProps }) {
  const [artPieces, setArtPieces] = useLocalStorageState("artPieces", {
    defaultValue: artPiecesData,
  });
  const [artPieceToEdit, setArtPieceToEdit] = useState([]);
  const [fileImageUrl, setfileImageUrl] = useState("/img/preview.png");

  const [filteredCategory, setFilteredCategory] = useState(artPieces);

  const [scrollPercent, setScrollPercent] = useState(0);
  const [active, setActive] = useState();

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

  function handleSetScrollPercentage(scrollPercent) {
    setScrollPercent(scrollPercent);
  }

  function handleSetActive(active) {
    setActive(active);
  }

  return (
    <>
      <GlobalStyle />
      <SWRConfig
        value={{
          fetcher: async (...args) => {
            const response = await fetch(...args);
            if (!response.ok) {
              throw new Error(`Request with ${JSON.stringify(args)} failed.`);
            }
            return await response.json();
          },
        }}
      >
        <Component
          {...pageProps}
          artPieces={artPieces}
          artPieceToEdit={artPieceToEdit}
          filteredCategory={filteredCategory}
          fileImageUrl={fileImageUrl}
          scrollPercent={scrollPercent}
          active={active}
          handleSetFileImageUrl={handleSetFileImageUrl}
          handleArtPieceToEdit={handleArtPieceToEdit}
          handleSetArtPieces={handleSetArtPieces}
          handleSetFilteredCategory={handleSetFilteredCategory}
          handleSetScrollPercentage={handleSetScrollPercentage}
          handleSetActive={handleSetActive}
        />
      </SWRConfig>
    </>
  );
}
