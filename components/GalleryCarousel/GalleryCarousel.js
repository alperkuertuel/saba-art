import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import ArtPieceDetails from "../ArtPieceDetails/ArtPieceDetails";

export default function GallerySlider({ filteredCategory }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArtPiece, setSelectedArtPiece] = useState(null);

  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredCategory]);

  const openModal = (artPiece) => {
    setSelectedArtPiece(artPiece);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedArtPiece(null);
    setIsModalOpen(false);
  };

  // console.log(selectedArtPiece);

  return (
    <Wrapper>
      <Carousel
        showIndicators={false}
        dynamicHeight={true}
        showThumbs={false}
        selectedItem={selectedIndex}
        swipeScrollTolerance={100}
        onChange={(index) => setSelectedIndex(index)}
      >
        {filteredCategory.map((artPiece) => (
          <div key={artPiece.name}>
            <SliderImage src={artPiece.imageUrl} width={1000} height={1000} alt={artPiece.name} />
            <StyledLink onClick={() => openModal(artPiece)}>
              <StyledLegend>
                <q>{artPiece.name}</q> / {artPiece.date}
              </StyledLegend>
            </StyledLink>
          </div>
        ))}
      </Carousel>
      {isModalOpen && selectedArtPiece && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={closeModal}>
              <FontAwesomeIcon icon={faXmark} />
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
        </Modal>
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

const Modal = styled.div`
  /* Style your modal container */
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 5;
  overflow: auto;
`;

const ModalContent = styled.div`
  /* Style your modal content */
  background-color: #fff;
  padding: 1rem;
  height: 100vh;
  overflow: hidden;
`;

const CloseButton = styled.span`
  position: absolute;
  top: 20px;
  left: 20px;
  color: red;
  font-size: 2rem;
  cursor: pointer;
`;
