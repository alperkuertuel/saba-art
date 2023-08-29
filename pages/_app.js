import GlobalStyle from "../styles";
import useLocalStorageState from "use-local-storage-state";
import artPiecesData from "@/db/BackUp/data";
import { useEffect, useState } from "react";
import { SWRConfig } from "swr";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({ Component, pageProps }) {
  const { data } = useSWR("/api", fetcher, { fallbackData: [] });
  console.log(data);

  const [artPieces, setArtPieces] = useState(data);

  const [artPieceToEdit, setArtPieceToEdit] = useState([]);
  const [fileImageUrl, setfileImageUrl] = useState("/img/preview.png");

  const [filteredCategory, setFilteredCategory] = useState();

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
          fetcher,
          refreshInterval: 1000,
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
