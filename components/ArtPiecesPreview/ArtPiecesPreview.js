import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import ArtPieceDetails from "../ArtPieceDetails/ArtPieceDetails";
import { useEffect } from "react";

export default function ArtPiecesPreview({ filteredCategory, previewoption }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArtPiece, setSelectedArtPiece] = useState(null);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isModalOpen]);

  const openModal = (artPiece) => {
    setSelectedArtPiece(artPiece);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedArtPiece(null);
    setIsModalOpen(false);
  };

  return (
    <GalleryWrapper $previewoption={previewoption}>
      {filteredCategory &&
        filteredCategory.map((artPiece) => (
          <GalleryCard key={artPiece._id}>
            <figure>
              <span onClick={() => openModal(artPiece)}>
                <StyledImage
                  src={artPiece.imageUrl}
                  alt={artPiece.name}
                  width={1000}
                  height={1000}
                  priority={true}
                />
              </span>
              {previewoption === "80px" ? (
                ""
              ) : (
                <Caption>
                  <b>
                    <q>{artPiece.name}</q>
                  </b>
                  {artPiece.date}
                </Caption>
              )}
            </figure>
          </GalleryCard>
        ))}
      {isModalOpen && selectedArtPiece && (
        <ModalContent>
          <CloseButton onClick={closeModal}>
            Schließen <FontAwesomeIcon icon={faXmark} />
          </CloseButton>
          <ArtPieceDetails
            closeModal={closeModal}
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

const ModalContent = styled.div`
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

const CloseButton = styled.button`
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
