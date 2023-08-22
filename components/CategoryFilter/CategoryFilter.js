export default function CategoryFilter({ artPieces }) {
  const allCategories = artPieces.map((piece) => piece.category);

  const withoutDuplicates = allCategories.filter(
    (item, index) => allCategories.indexOf(item) === index
  );

  console.log(withoutDuplicates);
  return (
    <p>
      <button>Filter</button>
    </p>
  );
}
