import Header from "@/components/Header/Header";
import ArtPieceDetails from "@/components/ArtPieceDetails/ArtPieceDetails";
import { useRouter } from "next/router";

export default function ShowDetails({ artPieces }) {
  const router = useRouter();
  const { slug } = router.query;
  const foundArtPiece = artPieces.find((artpiece) => artpiece.slug === slug);

  if (!slug) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <main>
        <ArtPieceDetails
          imageUrl={foundArtPiece.imageUrl}
          name={foundArtPiece.name}
          date={foundArtPiece.date}
          description={foundArtPiece.description}
          category={foundArtPiece.category}
          technique={foundArtPiece.technique}
        />
      </main>
    </>
  );
}
