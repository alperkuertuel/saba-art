import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";

export default function ArtPiecesPreview({ artPieces, filteredCategory }) {
  return (
    <GalleryWrapper>
      {filteredCategory &&
        filteredCategory.map(({ id, imageUrl, name, date, slug }) => (
          <GalleryCard key={id}>
            <figure>
              <Link href={`/art-pieces/${slug}`}>
                <StyledImage src={imageUrl} alt={name} width={1000} height={1000} />
              </Link>
              <Caption>
                <h2>{name}</h2>
                {date}
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
  border-radius: 5px 5px 0 0;
`;

const Caption = styled.figcaption`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
`;

const GalleryCard = styled.article`
  background-color: var(--box-color);
  border-radius: 5px;
  height: fit-content;
  box-shadow: var(--box-shadow);
`;
