import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { ArtPiece } from "pages/_app";
import { useEffect, useState } from "react";

import ArtPieceDetails from "../ArtPieceDetails/art-piece-details";

type ArtPieceCategoryProperties = {
  filteredCategory: ArtPiece[];
  previewoption?: string;
  likedArtPieces?: string[];
  handleSetLikedArtPieces?: (likedArtPieces: string[]) => void;
};

export default function ArtPiecesPreview({
  filteredCategory,
  previewoption = "",
  likedArtPieces = [],
  handleSetLikedArtPieces = () => {},
}: ArtPieceCategoryProperties) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArtPiece, setSelectedArtPiece] = useState<ArtPiece>();

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";
  }, [isModalOpen]);

  function openModalFromGridView(artPiece: ArtPiece) {
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
      const updatedLikedArtPieces = likedArtPieces.filter((id) => id !== artPieceId);
      handleSetLikedArtPieces(updatedLikedArtPieces);
    } else {
      handleSetLikedArtPieces([...likedArtPieces, artPieceId]);
    }
  }

  return (
    <section
      className="grid gap-8 w-full"
      style={{ gridTemplateColumns: `repeat(auto-fit, minmax(${previewoption}, 1fr))` }}
    >
      {filteredCategory &&
        filteredCategory.map((artPiece) => (
          <article key={artPiece._id} className="bg-box-color p-[3px] rounded-[5px] h-fit shadow-box-shadow">
            <figure className="relative">
              <button
                onClick={() => openModalFromGridView(artPiece)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === "Space") {
                    openModalFromGridView(artPiece);
                  }
                }}
              >
                <Image
                  className="object-cover w-full h-full rounded-[5px]"
                  src={artPiece.imageUrl}
                  alt={artPiece.name}
                  width={1000}
                  height={1000}
                  priority={true}
                />
              </button>
              <button
                className="absolute text-xl p-2 top-0 left-0 text-rose-700"
                onClick={() => artPiece._id && handleLikeButton(artPiece._id)}
              >
                {artPiece._id && likedArtPieces.includes(artPiece._id) ? (
                  <FontAwesomeIcon icon={faHeart} />
                ) : (
                  <FontAwesomeIcon icon={farHeart} />
                )}
              </button>

              <figcaption className="flex justify-between flex-wrap gap-2 p-2">
                <b>
                  <q>{artPiece.name}</q>
                </b>
                {artPiece.date}
              </figcaption>
            </figure>
          </article>
        ))}
      {isModalOpen && selectedArtPiece && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 z-30">
          <div className="flex flex-col items-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-4 p-2 w-[95%] max-w-[768px] max-h-[90vh] bg-primary-color z-30 overflow-y-auto rounded-[5px]">
            <button
              className="sticky top-0 flex justify-center items-center w-full gap-2 text-font-color bg-box-color shadow-box-shadow p-2 rounded-[5px] text-base cursor-pointer"
              onClick={closeModalFromGridView}
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
    </section>
  );
}
