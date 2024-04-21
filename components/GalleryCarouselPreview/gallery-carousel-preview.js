import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import ArtPieceDetails from "../ArtPieceDetails/art-piece-details";

export default function GallerySliderPreview({
  filteredCategory,
  likedArtPieces,
  handleSetLikedArtPieces,
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArtPiece, setSelectedArtPiece] = useState();

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";
  }, [isModalOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredCategory]);

  function openModalGallerySlider(artPiece) {
    setSelectedArtPiece(artPiece);
    setIsModalOpen(true);
  }

  function closeModalGallerySlider() {
    setSelectedArtPiece(undefined);
    setIsModalOpen(false);
  }

  function handleLikeButton(artPieceId) {
    const isLiked = likedArtPieces.includes(artPieceId);
    if (isLiked) {
      const updatedLikedArtPieces = likedArtPieces.filter((id) => id !== artPieceId);
      handleSetLikedArtPieces(updatedLikedArtPieces);
    } else {
      handleSetLikedArtPieces([...likedArtPieces, artPieceId]);
    }
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
                {artPiece.name} - {artPiece.date}
              </StyledLegend>
            </StyledLink>
            <LikeButton onClick={() => handleLikeButton(artPiece._id)}>
              {likedArtPieces.includes(artPiece._id) ? (
                <FontAwesomeIcon icon={faHeart} />
              ) : (
                <FontAwesomeIcon icon={farHeart} />
              )}
            </LikeButton>
          </div>
        ))}
      </Carousel>

      {isModalOpen && selectedArtPiece && (
        <BackDrop>
          <ModalContent>
            <CloseButton onClick={closeModalGallerySlider}>
              Schließen <FontAwesomeIcon icon={faXmark} />
            </CloseButton>
            <ArtPieceDetails
              imageUrl={selectedArtPiece.imageUrl}
              name={selectedArtPiece.name}
              date={selectedArtPiece.date}
              available={selectedArtPiece.available}
              description={selectedArtPiece.description}
              category={selectedArtPiece.category}
              technique={selectedArtPiece.technique}
              widthReal={selectedArtPiece.widthReal}
              heightReal={selectedArtPiece.heightReal}
              slug={selectedArtPiece.slug}
            />
          </ModalContent>
        </BackDrop>
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
  height: 50vh;
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

const LikeButton = styled.button`
  position: absolute;
  font-size: 1.5rem;
  padding: 0.5rem;
  top: 0px;
  left: 47%;
  color: red;
`;

export const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 6;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  gap: 1rem;
  padding: 0.5rem;
  width: 95%;
  max-width: 768px;
  max-height: 90vh;
  background-color: var(--primary-color);
  z-index: 5;
  overflow-y: auto;
  border-radius: 5px;
`;

export const CloseButton = styled.button`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 0.5rem;
  color: var(--font-color);
  background-color: var(--box-color);
  box-shadow: var(--box-shadow);
  padding: 0.5rem;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
`;
