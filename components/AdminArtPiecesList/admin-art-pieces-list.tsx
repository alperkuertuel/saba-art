import { faDownload, faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { ArtPiece } from "pages/_app";
import { Fragment, useState } from "react";

import ArtPiecesEditForm from "../AdminArtPiecesEditForm/admin-art-pieces-edit-form";
import CategoryFilter from "../CategoryFilter/category-filter";

type ArtPiecesListProperties = {
  handleSetScrollPercentage: (scrollPercentage: number) => void;
  handleSetFilteredCategory: (filteredCategory: ArtPiece[]) => void;
  handleSetActiveCategory: (activeCategory: string) => void;
  activeCategory: string;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  artPieceToEdit: ArtPiece;
  filteredCategory: ArtPiece[];
};

export default function ArtPiecesList({
  handleSetScrollPercentage,
  handleSetFilteredCategory,
  handleSetActiveCategory,
  activeCategory,
  onDelete,
  onEdit,
  artPieceToEdit,
  filteredCategory,
}: ArtPiecesListProperties) {
  const [toggleEditForm, setToggleEditForm] = useState(false);
  return (
    <section>
      <h2>Bearbeite oder lösche Kunstwerke:</h2>
      <CategoryFilter
        handleSetFilteredCategory={handleSetFilteredCategory}
        handleSetActiveCategory={handleSetActiveCategory}
        activeCategory={activeCategory}
      />
      <ul className="w-auto">
        {filteredCategory.map(({ slug, _id, imageUrl, name }) => (
          <Fragment key={_id}>
            <li className="flex flex-col content-center items-center w-auto gap-2 my-4 mx-0 p-2 rounded-[5px] shadow-box-shadow bg-box-color">
              <Link
                className="w-full rounded-[5px]"
                href={`/art-pieces/${slug}`}
                onClick={() => handleSetScrollPercentage(0)}
              >
                <Image
                  className="object-cover rounded-[5px] w-full h-[50px]"
                  src={imageUrl}
                  width={1000}
                  height={1000}
                  alt={name}
                  priority={false}
                />
              </Link>
              <q className="font-bold justify-self-start w-full">{name}</q>
              <div className="w-full flex justify-end">
                <button
                  aria-label="edit"
                  onClick={() => {
                    if (_id) {
                      onEdit(_id);
                      setToggleEditForm(!toggleEditForm);
                    }
                  }}
                >
                  <FontAwesomeIcon className="my-0 mx-4" icon={faPencil} />
                </button>
                <a href={imageUrl} download={name}>
                  <FontAwesomeIcon className="my-0 mx-4" icon={faDownload} />
                </a>
                <button onClick={() => _id && onDelete(_id)} aria-label="delete">
                  <FontAwesomeIcon className="my-0 mx-4" icon={faTrashCan} />
                </button>
              </div>
            </li>
            {artPieceToEdit && artPieceToEdit._id === _id && toggleEditForm && (
              <ArtPiecesEditForm
                handleSetFilteredCategory={handleSetFilteredCategory}
                filteredCategory={filteredCategory}
                artPieceToEdit={artPieceToEdit}
              />
            )}
          </Fragment>
        ))}
      </ul>
    </section>
  );
}
