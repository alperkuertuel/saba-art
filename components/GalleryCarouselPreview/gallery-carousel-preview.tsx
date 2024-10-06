import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { ArtPiece } from "pages/_app";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";

import ArtPieceDetails from "../ArtPieceDetails/art-piece-details";

type GallerySliderPreviewProperties = {
  filteredCategory: ArtPiece[];
  likedArtPieces: string[];
  handleSetLikedArtPieces: (likedArtPieces: string[]) => void;
};

export default function GallerySliderPreview({
  filteredCategory,
  likedArtPieces,
  handleSetLikedArtPieces,
}: GallerySliderPreviewProperties) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArtPiece, setSelectedArtPiece] = useState<ArtPiece>();

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";
  }, [isModalOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredCategory]);

  function openModalGallerySlider(artPiece: ArtPiece) {
    setSelectedArtPiece(artPiece);
    setIsModalOpen(true);
  }

  function closeModalGallerySlider() {
    setSelectedArtPiece(undefined);
    setIsModalOpen(false);
  }

  function handleLikeButton(artPieceId: string) {
    const isLiked = likedArtPieces.includes(artPieceId);
    if (isLiked) {
      const updatedLikedArtPieces = likedArtPieces.filter((id) => id !== artPieceId);
      handleSetLikedArtPieces(updatedLikedArtPieces);
    } else {
      handleSetLikedArtPieces([...likedArtPieces, artPieceId]);
    }
  }

  return (
    <div className="my-8 relative">
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
            <Image
              className="object-contain h-[50vh]"
              src={artPiece.imageUrl}
              width={1000}
              height={1000}
              alt={artPiece.name}
            />
            <button
              className="absolute top-0 right-0 h-full w-full cursor-pointer"
              onClick={() => openModalGallerySlider(artPiece)}
            >
              <div className="absolute text-font-color bg-box-color block p-2 bottom-0 right-0 w-full h-auto">
                {artPiece.name} - {artPiece.date}
              </div>
            </button>
            <button
              className="absolute text-xl p-2 top-0 left-[47%] text-rose-700"
              onClick={() => artPiece._id && handleLikeButton(artPiece._id)}
            >
              {artPiece._id && likedArtPieces.includes(artPiece._id) ? (
                <FontAwesomeIcon icon={faHeart} />
              ) : (
                <FontAwesomeIcon icon={farHeart} />
              )}
            </button>
          </div>
        ))}
      </Carousel>

      {isModalOpen && selectedArtPiece && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 z-30">
          <div className="flex flex-col items-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-4 p-2 w-[95%] max-w-[768px] max-h-[90vh] bg-primary-color z-30 overflow-y-auto rounded-[5px]">
            <button
              className="sticky top-0 flex justify-center items-center w-full gap-2 text-font-color bg-box-color shadow-box-shadow p-2 rounded-[5px] text-base cursor-pointer"
              onClick={closeModalGallerySlider}
            >
              Schließen <FontAwesomeIcon icon={faXmark} />
            </button>
            <ArtPieceDetails
              _id={selectedArtPiece._id}
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
          </div>
        </div>
      )}
    </div>
  );
}
