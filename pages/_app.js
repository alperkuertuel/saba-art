import GlobalStyle from "../styles";
import useLocalStorageState from "use-local-storage-state";
import artPiecesData from "@/db/data";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  const [artPieces, setArtPieces] = useLocalStorageState("artPieces", {
    defaultValue: [],
  });

  useEffect(() => setArtPieces(artPiecesData), [setArtPieces]);

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
