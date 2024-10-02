import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import ArtPiecesPreview from "@/ArtPiecesPreview/art-pieces-preview";
import CategoryFilter from "@/CategoryFilter/category-filter";

import { ArtPiece } from "../_app";

type ApiBackUpPageProperties = {
  handleSetFilteredCategory: (filteredCategory: ArtPiece[]) => void;
  filteredCategory: ArtPiece[];
  activeCategory: string;
  handleSetActiveCategory: (activeCategory: string) => void;
};

export default function ApiBackUpPage({
  handleSetFilteredCategory,
  filteredCategory,
  handleSetActiveCategory,
  activeCategory,
}: ApiBackUpPageProperties) {
  return (
    <div
      style={{
        margin: "1rem auto",
        maxWidth: "1280px",
        padding: "0 1rem",
      }}
    >
      <Link href="/">
        <FontAwesomeIcon icon={faArrowLeftLong} />
        {" BACK"}
      </Link>
      <CategoryFilter
        activeCategory={activeCategory}
        handleSetActiveCategory={handleSetActiveCategory}
        handleSetFilteredCategory={handleSetFilteredCategory}
      />
      <ArtPiecesPreview filteredCategory={filteredCategory} />
    </div>
  );
}
/////// ONLY PREVIEWS VISIBLE HERE ///////
