import GlobalStyle from "../styles";
import artPiecesData from "@/db/data_links";
import { useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";

export default function App({ Component, pageProps }) {
  const [artPieces, setArtPieces] = useLocalStorageState("artPieces", {
    defaultValue: [],
  });

  // console.log(artPieces);
  return (
    <>
      <GlobalStyle />
      <Component
        {...pageProps}
        artPieces={artPieces}
        setArtPieces={setArtPieces}
      />
    </>
  );
}
