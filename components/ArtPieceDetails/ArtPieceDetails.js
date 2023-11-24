import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  handleSetActiveCategory,
  activeCategory,
}) {
  function handlePreserveActiveState() {
    if (activeCategory === "All") {
      handleSetActiveCategory("All");
    } else if (activeCategory === "Newest") {
      handleSetActiveCategory("Newest");
    } else handleSetActiveCategory(category);
  }
  return (
    <StyledSection>
      <figure>
        <StyledImage src={imageUrl} width={1000} height={1000} alt={name} priority={true} />
      </figure>

      <ButtonList>
        <li>
          {activeCategory && (
            <StyledBackButton onClick={() => handlePreserveActiveState} href={`/`}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </StyledBackButton>
          )}
        </li>
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
  display: grid;
  grid-template-columns: 1fr 32px 32px;
  align-items: center;
  gap: 0.5rem;
`;

const StyledBackButton = styled(Link)`
  background-color: var(--cool-brown);
  color: var(--font-color);
  padding: 0.3rem 0.5rem 0.3rem 0.5rem;
  border-radius: 5px;
  text-transform: uppercase;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    background-color: var(--tertiary-color);
    transition: background-color 0.2s ease;
  }
`;
