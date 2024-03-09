import ArtPiecesPreview from "@/components/ArtPiecesPreview/art-pieces-preview";
import CategoryFilter from "@/components/CategoryFilter/category-filter";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function HomePage({
  handleSetFilteredCategory,
  filteredCategory,
  handleSetActiveCategory,
  activeCategory,
}) {
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
        filteredCategory={filteredCategory}
      />
      <ArtPiecesPreview filteredCategory={filteredCategory} />
    </div>
  );
}
/////// ONLY PREVIEWS VISIBLE HERE ///////
