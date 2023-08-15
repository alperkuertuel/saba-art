import ArtPieceForm from "@/components/ArtPieceForm/ArtPieceForm";
import Header from "@/components/Header/Header";

export default function AdminHomePage() {
  function addArtPiece(data) {
    console.log(data);
  }

  return (
    <>
      <Header />
      <main>
        <ArtPieceForm onSubmit={addArtPiece} />
      </main>
    </>
  );
}
