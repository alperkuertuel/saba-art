import Image from "next/image";
import Link from "next/link";
import { FacebookIcon, WhatsappIcon, WhatsappShareButton, FacebookShareButton } from "react-share";
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
  slug,
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

      <ButtonList>
        <li>
          <StyledBackButton href={`/`}>BACK</StyledBackButton>
        </li>
        <li>
          <FacebookShareButton
            windowWidth={1000}
            windowHeight={400}
            url={`https://capstone-project-git-feat-sharing-functionality-alper92.vercel.app/art-pieces/${slug}`}
          >
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
        </li>
        <li>
          <WhatsappShareButton
            windowWidth={1000}
            windowHeight={1000}
            url={`https://capstone-project-git-feat-sharing-functionality-alper92.vercel.app/art-pieces/${slug}`}
            title={name}
          >
            <WhatsappIcon size={32} round={true} />
          </WhatsappShareButton>
        </li>
      </ButtonList>
      <StyledCaption>
        <StyledNameDate>
          <h1>{name}</h1>
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
  max-width: 800px; // max width of resizing during upload
  margin: auto;
`;

const StyledImage = styled(Image)`
  object-fit: contain;
  width: 100%;
  height: 100%;
  max-height: 800px; // max height of resizing during upload
  border-radius: 5px;
`;

const StyledNameDate = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledCaption = styled.figcaption`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledDescription = styled.p`
  text-align: justify;
`;

const ButtonList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 32px 32px;
  align-items: center;
  gap: 0.5rem;
`;

const StyledBackButton = styled(Link)`
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
