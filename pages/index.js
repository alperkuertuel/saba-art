import ArtPiecesPreview from "@/components/ArtPiecesPreview/ArtPiecesPreview";
import Header from "@/components/Header/Header";
import artPiecesData from "@/db/data";
import { useState } from "react";

export default function HomePage() {
  const [artPieces, setArtPieces] = useState(artPiecesData);
  return (
    <>
      <Header />
      <main>
        <ArtPiecesPreview artPieces={artPieces} />
      </main>
    </>
  );
}
