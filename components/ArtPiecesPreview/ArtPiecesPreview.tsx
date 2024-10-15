import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ArtPieceType, PreviewOption } from 'types/types';

import { InfoModal } from '@/Modal/InfoModal';

import ArtPieceDetails from '../ArtPieceDetails/ArtPieceDetails';

interface ArtPieceCategoryProperties {
  filteredCategory: ArtPieceType[];
  previewOption: PreviewOption;
  likedArtPieces: string[];
  handleSetLikedArtPieces?: (likedArtPieces: string[]) => void;
}

export default function ArtPiecesPreview({
  filteredCategory,
  previewOption,
  likedArtPieces = [],
  handleSetLikedArtPieces,
}: ArtPieceCategoryProperties) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArtPiece, setSelectedArtPiece] = useState<ArtPieceType>();

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : 'auto';
  }, [isModalOpen]);

  function openModalFromGridView(artPiece: ArtPieceType) {
    setSelectedArtPiece(artPiece);
    setIsModalOpen(true);
  }

  function closeModalFromGridView() {
    setSelectedArtPiece(undefined);
    setIsModalOpen(false);
  }

  function handleLikeButton(artPieceId: string) {
    const isLiked = likedArtPieces.includes(artPieceId);
    if (isLiked) {
      const updatedLikedArtPieces = likedArtPieces.filter(
        (id) => id !== artPieceId
      );
      if (handleSetLikedArtPieces)
        handleSetLikedArtPieces(updatedLikedArtPieces);
    } else {
      if (handleSetLikedArtPieces)
        handleSetLikedArtPieces([...likedArtPieces, artPieceId]);
    }
  }

  return (
    <section
      className="grid w-full gap-8"
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(${previewOption && '130px'}, 1fr))`,
      }}
    >
      {filteredCategory?.map((artPiece) => (
        <article
          key={artPiece._id}
          className="h-fit rounded-lg bg-box-color p-[3px] shadow-box-style"
        >
          <figure className="relative">
            <button
              onClick={() => openModalFromGridView(artPiece)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === 'Space') {
                  openModalFromGridView(artPiece);
                }
              }}
            >
              <Image
                className="size-full rounded-lg object-cover"
                src={artPiece.imageUrl}
                alt={artPiece.name}
                width={1000}
                height={1000}
                priority={true}
              />
            </button>
            <button
              className="absolute left-0 top-0 m-2 rounded-lg bg-secondary-color px-2 py-1 text-sm text-rose-700 shadow-box-style"
              onClick={() => artPiece._id && handleLikeButton(artPiece._id)}
            >
              {artPiece._id && likedArtPieces.includes(artPiece._id) ? (
                <FontAwesomeIcon icon={faHeart} />
              ) : (
                <FontAwesomeIcon icon={farHeart} />
              )}
            </button>

            <figcaption className="flex flex-wrap justify-between gap-2 p-2">
              <q className="hyphens-auto">{artPiece.name}</q>
              {artPiece.date}
            </figcaption>
          </figure>
        </article>
      ))}
      {isModalOpen && selectedArtPiece && (
        <InfoModal closeAction={closeModalFromGridView}>
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
        </InfoModal>
      )}
    </section>
  );
}
