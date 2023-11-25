import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
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
        <StyledImage src={imageUrl} width={1000} height={1000} alt={name} priority={true} />
      </figure>
      <ButtonList>
        <li>
          <FacebookShareButton
            windowWidth={1000}
            windowHeight={400}
            url={`https://www.saba-art.com/art-pieces/${slug}`}
          >
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
        </li>
        <li>
          <WhatsappShareButton
            windowWidth={1000}
            windowHeight={1000}
            url={`https://www.saba-art.com/art-pieces/${slug}`}
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
        <p>Kategorie: {category}</p>
        <p>Verwendete Technik: {technique}</p>
        <p>
          Größe: {widthReal}cm x {heightReal}cm
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
  min-width: 280px;
  max-width: 800px; // max width of resizing during upload
`;

const StyledImage = styled(Image)`
  object-fit: contain;
  pointer-events: none;
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
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 0.5rem;
`;
