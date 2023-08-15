import Header from "@/components/Header/Header";
import ArtPieceDetails from "@/components/ArtPieceDetails/ArtPieceDetails";
import { useRouter } from "next/router";
import { styled } from "styled-components";

export default function ShowDetails({ artPieces }) {
  const router = useRouter();
  const { slug } = router.query;
  const foundArtPiece = artPieces.find((artpiece) => artpiece.slug === slug);

  if (!slug) {
    return (
      <main>
        <StyledErrorMessage>Loading...</StyledErrorMessage>
      </main>
    );
  }

  if (foundArtPiece !== slug) {
    return (
      <main>
        <StyledErrorMessage>404 art piece not found...</StyledErrorMessage>
      </main>
    );
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

const StyledErrorMessage = styled.h1`
  position: fixed;
  top: 50%;
  width: 100%;
  height: 100vh;
  display: inline-block;
  text-align: center;
`;
