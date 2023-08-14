import GlobalStyle from "../styles";
import artPiecesData from "@/db/data_links";
import { useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";

export default function App({ Component, pageProps }) {
  const [artPieces, setArtPieces] = useLocalStorageState("artPieces", {
    defaultValue: [],
  });

  useEffect(() => {
    const chance = new Chance();
    const updatedArtPieces = artPiecesData.map((artPiece) => ({
      ...artPiece,
      date: chance.date({ string: true }),
      //name: chance.sentence({ words: 10 }),
      description: chance.sentence({ words: 40 }),
      heightReal: chance.natural({ min: 50, max: 200 }),
      widthReal: chance.natural({ min: 50, max: 200 }),
    }));
    setArtPieces(updatedArtPieces);
  }, [setArtPieces]);

  // console.log(artPieces);
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} artPieces={artPieces} />
    </>
  );
}
