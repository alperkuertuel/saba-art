import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

export default function ArtPiecesPreview({ filteredCategory, size }) {
  console.log(size);
  return (
    <GalleryWrapper size={size}>
      {filteredCategory &&
        filteredCategory.map(({ _id, imageUrl, name, date, slug }) => (
          <GalleryCard key={_id}>
            <figure>
              <Link href={`/art-pieces/${slug}`}>
                <StyledImage src={imageUrl} alt={name} width={1000} height={1000} priority={true} />
              </Link>
              {size === "50px" ? (
                ""
              ) : (
                <Caption>
                  <b>
                    <q>{name}</q>
                  </b>
                  {date}
                </Caption>
              )}
            </figure>
          </GalleryCard>
        ))}
    </GalleryWrapper>
  );
}

const GalleryWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${(props) => props.size}, 1fr));
  grid-gap: 4rem;
  width: 100%;
  max-width: 1280px;
`;

const StyledImage = styled(Image)`
  object-fit: cover;
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
  background-color: var(--box-color);
  border-radius: 5px;
  height: fit-content;
  box-shadow: var(--box-shadow);
`;
