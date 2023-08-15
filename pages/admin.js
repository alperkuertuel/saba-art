import ArtPieceForm from "@/components/ArtPieceForm/ArtPieceForm";
import Header from "@/components/Header/Header";
import useLocalStorageState from "use-local-storage-state";
import { useEffect } from "react";
import Image from "next/image";
import { styled } from "styled-components";

export default function AdminHomePage() {
  const [adminArtPieces, setAdminArtPieces] = useLocalStorageState(
    "artPiecesAdmin",
    {
      defaultValue: [],
    }
  );

  console.log(adminArtPieces);

  useEffect(() => {
    const storedArtPieces = JSON.parse(localStorage.getItem("artPiecesAdmin"));
    if (storedArtPieces) {
      setAdminArtPieces(storedArtPieces);
    }
  }, [setAdminArtPieces]);

  function addArtPiece(newArtPieceData) {
    setAdminArtPieces([...adminArtPieces, newArtPieceData]);
  }

  return (
    <>
      <Header />
      <main>
        <ArtPieceForm onSubmit={addArtPiece} />
        <StyledSection>
          {adminArtPieces.map(({ id, imageUrl, name }) => (
            <ul key={id}>
              <StyledItem>
                <Image src={imageUrl} height={50} width={50} alt={name} />
                <p>
                  Name: <q>{name}</q>
                </p>
              </StyledItem>
            </ul>
          ))}
        </StyledSection>
      </main>
    </>
  );
}

const StyledSection = styled.section`
  max-width: 600px;
  margin: 2rem auto;
`;

const StyledItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
`;
