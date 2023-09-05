import ArtPiecesPreview from "@/components/ArtPiecesPreview/ArtPiecesPreview";
import CategoryFilter from "@/components/CategoryFilter/CategoryFilter";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function HomePage({
  handleSetFilteredCategory,
  filteredCategory,
  handleSetActive,
  active,
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
        active={active}
        handleSetActive={handleSetActive}
        handleSetFilteredCategory={handleSetFilteredCategory}
        filteredCategory={filteredCategory}
      />
      <ArtPiecesPreview filteredCategory={filteredCategory} />
    </div>
  );
}
/////// ONLY PREVIEWS VISIBLE HERE ///////
