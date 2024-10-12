import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { ArtPieceType } from 'pages/_app';
import { useEffect, useState } from 'react';

import Button from '@/Button/Button';

import ArtPieceDetails from '../ArtPieceDetails/ArtPieceDetails';

interface ArtPieceCategoryProperties {
  filteredCategory: ArtPieceType[];
  previewoption?: string;
  likedArtPieces?: string[];
  handleSetLikedArtPieces?: (likedArtPieces: string[]) => void;
}

export default function ArtPiecesPreview({
  filteredCategory,
  previewoption = '',
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
        gridTemplateColumns: `repeat(auto-fit, minmax(${previewoption}, 1fr))`,
      }}
    >
      {filteredCategory?.map((artPiece) => (
        <article
          key={artPiece._id}
          className="h-fit rounded-[5px] bg-box-color p-[3px] shadow-box-style"
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
                className="size-full rounded-[5px] object-cover"
                src={artPiece.imageUrl}
                alt={artPiece.name}
                width={1000}
                height={1000}
                priority={true}
              />
            </button>
            <button
              className="absolute left-0 top-0 m-2 rounded-[5px] bg-highlight-color px-2 py-1 text-sm text-rose-700 shadow-box-style"
              onClick={() => artPiece._id && handleLikeButton(artPiece._id)}
            >
              {artPiece._id && likedArtPieces.includes(artPiece._id) ? (
                <FontAwesomeIcon icon={faHeart} />
              ) : (
                <FontAwesomeIcon icon={farHeart} />
              )}
            </button>

            <figcaption className="flex flex-wrap justify-between gap-2 p-2">
              <b>
                <q>{artPiece.name}</q>
              </b>
              {artPiece.date}
            </figcaption>
          </figure>
        </article>
      ))}
      {isModalOpen && selectedArtPiece && (
        <div className="fixed left-0 top-0 z-30 size-full bg-black/70">
          <div className="fixed left-1/2 top-1/2 z-30 flex max-h-[90vh] w-[95%] max-w-screen-md -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-4 overflow-y-auto rounded-[5px] bg-primary-color p-2">
            <Button
              variant="main"
              size="base"
              additionalStyles="sticky top-0"
              onClick={closeModalFromGridView}
            >
              Schließen <FontAwesomeIcon icon={faXmark} />
            </Button>
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
    </section>
  );
}
