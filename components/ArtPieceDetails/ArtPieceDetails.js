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
        <StyledImage src={imageUrl} width={1000} height={1000} alt={name} />
      </figure>
      <StyledButton href={`/`}>BACK</StyledButton>
      <StyledCaption>
        <StyledNameDate>
          <q>{name}</q>
          <b>{date}</b>
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
  max-width: 700px;
  margin: auto;
`;

const StyledImage = styled(Image)`
  object-fit: contain;
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;

const StyledNameDate = styled.p`
  display: flex;
  justify-content: space-between;
  font-size: 1.5rem;
`;

const StyledCaption = styled.figcaption`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledDescription = styled.p`
  text-align: justify;
`;

const StyledButton = styled(Link)`
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-size: 1.2rem;
  background-color: grey;
  text-decoration: none;
  color: white;
  width: fit-content;
  padding: 5px 20px;
  &:hover {
    background-color: black;
  }
`;
