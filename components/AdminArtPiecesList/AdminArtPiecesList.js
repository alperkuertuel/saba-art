import Image from "next/image";
import Link from "next/link";
const { styled } = require("styled-components");

export default function ArtPiecesList({ artPieces }) {
  return (
    <StyledSection>
      <ReverseList>
        {artPieces.map(({ slug, id, imageUrl, name }) => (
          <StyledItem key={id}>
            <Link href={`/art-pieces/${slug}`}>
              <StyledImage src={imageUrl} height={75} width={75} alt={name} />
            </Link>
            <p>
              Name: <q>{name}</q>
            </p>
          </StyledItem>
        ))}
      </ReverseList>
    </StyledSection>
  );
}

const StyledSection = styled.section`
  max-width: 600px;
  margin: 2rem auto;
`;

const ReverseList = styled.ul`
  display: flex;
  flex-direction: column-reverse;
`;

const StyledItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
`;

const StyledImage = styled(Image)`
  border-radius: 50%;
  border: 2px solid grey;
`;
