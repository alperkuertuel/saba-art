import { faHeart, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import ArtPieceDetails from "../ArtPieceDetails/art-piece-details";
import { useEffect } from "react";
import {
  BackDrop,
  CloseButton,
  ModalContent,
} from "../GalleryCarouselPreview/gallery-carousel-preview";
import artPiecesData from "@/db/TestData/sample-data-for-test";

export default function ArtPiecesPreview({
  filteredCategory,
  previewoption,
  likedArtPieces,
  handleSetLikedArtPieces,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArtPiece, setSelectedArtPiece] = useState();

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";
  }, [isModalOpen]);

  function openModalFromGridView(artPiece) {
    setSelectedArtPiece(artPiece);
    setIsModalOpen(true);
  }

  function closeModalFromGridView() {
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
    <GalleryWrapper $previewoption={previewoption}>
      {filteredCategory &&
        filteredCategory.map((artPiece) => (
          <GalleryCard key={artPiece._id}>
            <Figure>
              <button
                onClick={() => openModalFromGridView(artPiece)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === "Space") {
                    openModalFromGridView(artPiece);
                  }
                }}
              >
                <StyledImage
                  src={artPiece.imageUrl}
                  alt={artPiece.name}
                  width={1000}
                  height={1000}
                  priority={true}
                />
              </button>
              <LikeButton onClick={() => handleLikeButton(artPiece._id)}>
                {likedArtPieces.includes(artPiece._id) ? (
                  <FontAwesomeIcon icon={faHeart} />
                ) : (
                  <FontAwesomeIcon icon={farHeart} />
                )}
              </LikeButton>

              <Caption>
                <b>
                  <q>{artPiece.name}</q>
                </b>
                {artPiece.date}
              </Caption>
            </Figure>
          </GalleryCard>
        ))}
      {isModalOpen && selectedArtPiece && (
        <BackDrop>
          <ModalContent>
            <CloseButton onClick={closeModalFromGridView}>
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
    </GalleryWrapper>
  );
}

const GalleryWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(${(properties) => properties.$previewoption}, 1fr)
  );
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

const Figure = styled.figure`
  position: relative;
`;

const LikeButton = styled.button`
  position: absolute;
  font-size: 1.5rem;
  padding: 0.5rem;
  top: 0px;
  left: 0px;
  color: red;
`;

// The model styles are imported from GalleryCarousel.js!
