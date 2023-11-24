import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

export default function ArtPiecesPreview({
  filteredCategory,
  previewoption,
  handleSetScrollPercentage,
}) {
  return (
    <GalleryWrapper $previewoption={previewoption}>
      {filteredCategory &&
        filteredCategory.map(({ _id, imageUrl, name, date, slug }) => (
          <GalleryCard key={_id}>
            <figure>
              <Link href={`/art-pieces/${slug}`} onClick={() => handleSetScrollPercentage("0")}>
                <StyledImage src={imageUrl} alt={name} width={1000} height={1000} priority={true} />
              </Link>
              {previewoption === "80px" ? (
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
  grid-template-columns: repeat(auto-fit, minmax(${(props) => props.$previewoption}, 1fr));
  grid-gap: 2rem;
  width: 100%;
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
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.5rem;
`;

const GalleryCard = styled.article`
  background-color: var(--box-color);
  padding: 3px;
  border-radius: 5px;
  height: fit-content;
  box-shadow: var(--box-shadow);
`;
