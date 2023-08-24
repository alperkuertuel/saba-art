import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

export default function ArtPieceDetails({
  imageUrl,
  name,
  date,
  category,
  technique,
  description,
  widthReal,
  heightReal,
}) {
  return (
    <StyledSection>
      <figure>
        <StyledImage
          src={imageUrl}
          width={1000}
          height={1000}
          alt={name}
          priority={false}
          placeholder="blur"
          blurDataURL={
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPs7WqbCQAFgQI4fezTAAAAAABJRU5ErkJggg=="
          }
        />
      </figure>
      <DetailPageButtons>
        <li>
          <StyledButton href={`/`}>BACK</StyledButton>
        </li>
        <li>
          <button onClick={() => handleShareButton}>
            <StyledShareIcon icon={faShareNodes} />
          </button>
        </li>
      </DetailPageButtons>
      <StyledCaption>
        <StyledNameDate>
          <b>
            <q>{name}</q>
          </b>
          <p>{date}</p>
        </StyledNameDate>
        <p>Category: {category}</p>
        <p>Technique: {technique}</p>
        <p>
          Sizes: {widthReal}cm x {heightReal}cm
        </p>
        <StyledDescription>{description}</StyledDescription>
      </StyledCaption>
    </StyledSection>
  );
}

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  min-width: 280px;
  max-width: 800px; // witdth of upload resizing and converting
  margin: auto;
`;

const StyledImage = styled(Image)`
  object-fit: contain;
  width: 100%;
  height: 100%;
  max-height: 800px; // max height for very long pictures
  border-radius: 5px;
`;

const StyledNameDate = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledCaption = styled.figcaption`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledDescription = styled.p`
  text-align: justify;
`;

const DetailPageButtons = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledButton = styled(Link)`
  border: none;
  cursor: pointer;
  border-radius: 4px;
  background-color: var(--secondary-color);
  text-decoration: none;
  color: white;
  width: fit-content;
  padding: 5px 20px;
  &:hover {
    background-color: var(--tertiary-color);
  }
`;

const StyledShareIcon = styled(FontAwesomeIcon)`
  font-size: 1.5rem;
  color: var(--border-color);
  padding: 0.5rem;
`;
