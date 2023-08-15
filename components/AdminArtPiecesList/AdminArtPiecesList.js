import Image from "next/image";
const { styled } = require("styled-components");

export default function ArtPiecesList({ adminArtPieces }) {
  return (
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
