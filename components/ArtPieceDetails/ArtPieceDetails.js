import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { FacebookIcon, WhatsappIcon, WhatsappShareButton, FacebookShareButton } from "react-share";
import styled from "styled-components";

export default function ArtPieceDetails({
  imageUrl,
  name,
  date,
  available,
  category,
  technique,
  description,
  widthReal,
  heightReal,
  slug,
}) {
  return (
    <StyledContainer>
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
        <StyledAvailable>
          Verfügbar:
          {available === true ? (
            <FontAwesomeIcon icon={faCheck} title="Das Bild ist noch Verfügbar!" />
          ) : (
            <FontAwesomeIcon icon={faXmark} title="Das Bild ist leider nicht mehr Verfügbar!" />
          )}
        </StyledAvailable>
        <p>Kategorie: {category}</p>
        <p>Verwendete Technik: {technique}</p>
        <p>
          Größe: {widthReal}cm x {heightReal}cm
        </p>
        <StyledDescription>{description}</StyledDescription>
      </StyledCaption>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  max-width: 800px; // max width of resizing during upload
  gap: 1rem;
  flex-direction: column;
`;

const StyledImage = styled(Image)`
  object-fit: contain;
  pointer-events: none;
  width: 100%;
  height: 70vh;
  max-height: 800px; // max height of resizing during upload
  border-radius: 5px;
`;

const StyledNameDate = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledAvailable = styled.p`
  display: flex;
  align-items: center;
  gap: 1rem;
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
  gap: 0.5rem;
`;
