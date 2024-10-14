import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import also needed for GalleryCarousel!

import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { ArtPieceType } from 'types/types';

import { DetailsModal } from '@/Modal/Modal';

import ArtPieceDetails from '../ArtPieceDetails/ArtPieceDetails';

interface GallerySliderPreviewProperties {
  filteredCategory: ArtPieceType[];
  likedArtPieces: string[];
  handleSetLikedArtPieces: (likedArtPieces: string[]) => void;
}

export default function GallerySliderPreview({
  filteredCategory,
  likedArtPieces,
  handleSetLikedArtPieces,
}: GallerySliderPreviewProperties) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArtPiece, setSelectedArtPiece] = useState<ArtPieceType>();

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : 'auto';
  }, [isModalOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredCategory]);

  function openModalGallerySlider(artPiece: ArtPieceType) {
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
      const updatedLikedArtPieces = likedArtPieces.filter(
        (id) => id !== artPieceId
      );
      handleSetLikedArtPieces(updatedLikedArtPieces);
    } else {
      handleSetLikedArtPieces([...likedArtPieces, artPieceId]);
    }
  }

  return (
    <section>
      <div className="relative m-4 mx-auto">
        <Carousel
          axis={'horizontal'}
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
            <div key={artPiece.name} className="w-full">
              <Image
                className="h-[50vh] object-contain"
                src={artPiece.imageUrl}
                width={1000}
                height={1000}
                alt={artPiece.name}
              />
              <button
                className="absolute right-0 top-0 size-full cursor-pointer"
                onClick={() => openModalGallerySlider(artPiece)}
              >
                <div className="absolute bottom-0 right-0 block h-auto w-full bg-box-color p-2 text-font-color">
                  {artPiece.name} - {artPiece.date}
                </div>
              </button>
              <button
                className="absolute bottom-[2px] right-40 rounded-lg bg-secondary-color px-2 py-1 text-xl text-rose-700 shadow-box-style"
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
          <DetailsModal closeAction={closeModalGallerySlider}>
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
          </DetailsModal>
        )}
      </div>
    </section>
  );
}
