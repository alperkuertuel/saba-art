import Image from "next/image";
import { styled } from "styled-components";

export default function ArtPiecesPreview({ artPieces }) {
  return (
    <GalleryWrapper>
      {artPieces.map(({ id, imageUrl, name, date }) => (
        <GalleryCard key={id}>
          <figure>
            <StyledImage src={imageUrl} alt={name} width={1000} height={500} />
            <Caption>
              <q>{name}</q>
              <b>{date}</b>
            </Caption>
          </figure>
        </GalleryCard>
      ))}
    </GalleryWrapper>
  );
}

const GalleryWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  grid-gap: 4rem;
  width: 100%;
  max-width: 1280px;
  padding: 1rem;
  margin: 0 auto;
`;

const StyledImage = styled(Image)`
  object-fit: contain;
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;

const Caption = styled.figcaption`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
`;

const GalleryCard = styled.article`
  background-color: lightgrey;
  border-radius: 5px;
  height: fit-content;
`;
