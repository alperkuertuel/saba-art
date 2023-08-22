export default function CategoryFilter({ artPieces }) {
  const allCategories = artPieces.map((piece) => piece.category);
  console.log(allCategories);
  return (
    <p>
      <button>Filter</button>
    </p>
  );
}
