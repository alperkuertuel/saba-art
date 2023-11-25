import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import ArtPieceDetails from "../ArtPieceDetails/ArtPieceDetails";

export default function GallerySliderPreview({ filteredCategory }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArtPiece, setSelectedArtPiece] = useState(null);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isModalOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredCategory]);

  function openModalGallerySlider(artPiece) {
    setSelectedArtPiece(artPiece);
    setIsModalOpen(true);
  }

  function closeModalGallerySlider() {
    setSelectedArtPiece(null);
    setIsModalOpen(false);
  }

  return (
    <Wrapper>
      <Carousel
        showIndicators={false}
        dynamicHeight={true}
        showThumbs={false}
        infiniteLoop={true}
        selectedItem={selectedIndex}
        onChange={(index) => setSelectedIndex(index)}
        preventMovementUntilSwipeScrollTolerance={true}
        swipeScrollTolerance={100}
      >
        {filteredCategory.map((artPiece) => (
          <div key={artPiece.name}>
            <SliderImage src={artPiece.imageUrl} width={1000} height={1000} alt={artPiece.name} />
            <StyledLink onClick={() => openModalGallerySlider(artPiece)}>
              <StyledLegend>
                <q>{artPiece.name}</q> / {artPiece.date}
              </StyledLegend>
            </StyledLink>
          </div>
        ))}
      </Carousel>
      {isModalOpen && selectedArtPiece && (
        <ModalContent>
          <CloseButton onClick={closeModalGallerySlider}>
            Schließen <FontAwesomeIcon icon={faXmark} />
          </CloseButton>
          <ArtPieceDetails
            imageUrl={selectedArtPiece.imageUrl}
            name={selectedArtPiece.name}
            date={selectedArtPiece.date}
            description={selectedArtPiece.description}
            category={selectedArtPiece.category}
            technique={selectedArtPiece.technique}
            widthReal={selectedArtPiece.widthReal}
            heightReal={selectedArtPiece.heightReal}
            slug={selectedArtPiece.slug}
          />
        </ModalContent>
      )}
    </Wrapper>
  );
}

const StyledLink = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
  cursor: pointer;
`;

const SliderImage = styled(Image)`
  object-fit: contain;
  height: 60vh;
`;

const Wrapper = styled.div`
  margin: 2rem 0;
  position: relative;
`;

const StyledLegend = styled.span`
  position: absolute;
  color: var(--font-color);
  background-color: var(--box-color);
  display: block;
  padding: 0.5rem;
  bottom: 0px;
  right: 0px;
  width: 100%;
  height: auto;
`;

export const ModalContent = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  padding: 0.5rem;
  width: 100%;
  height: 100vh;
  background-color: var(--primary-color);
  z-index: 5;
  overflow: auto;
`;

export const CloseButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  color: var(--font-color);
  background-color: var(--box-color);
  box-shadow: var(--box-shadow);
  padding: 0.5rem;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
`;
