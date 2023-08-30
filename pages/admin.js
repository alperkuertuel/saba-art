import ArtPieceForm from "@/components/AdminArtPieceForm/ArtPieceForm";
import Header from "@/components/Header/Header";
import ArtPiecesList from "@/components/AdminArtPiecesList/AdminArtPiecesList";
import useSWR from "swr";
import { useRouter } from "next/router";

export default function AdminHomePage({
  artPieceToEdit,
  handleSetArtPieceToEdit,
  fileImageUrl,
  handleSetFileImageUrl,
  scrollPercent,
  handleSetScrollPercentage,
}) {
  const router = useRouter();
  const { data } = useSWR("/api", { fallbackData: [] });
  const maxWidth = 800; // maxWidth of detail page
  const maxHeight = 800; // maxHeight of detail page
  function handleImageUpload(event) {
    const imageFile = event.target.files[0];

    if (imageFile) {
      const reader = new FileReader();
      reader.onload = function (load) {
        const img = new Image();
        img.onload = function () {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height = (maxWidth / width) * height;
            width = maxWidth;
          } else if (height > maxHeight) {
            width = (maxHeight / height) * width;
            height = maxHeight;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          const resizedImageData = canvas.toDataURL("image/webp", 0.7);
          console.log(resizedImageData);

          handleSetFileImageUrl(resizedImageData);
        };
        img.src = load.target.result;
      };
      reader.readAsDataURL(imageFile);
    }
  }

  async function handleAddArtPiece(newArtPieceData) {
    if (data.some((piece) => piece.slug === newArtPieceData.slug)) {
      alert("Name already exists. Please choose a different name.");
    } else {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newArtPieceData),
      });

      if (!response.ok) {
        console.error(response.status);
        return;
      }
      router.push(`/art-pieces/${newArtPieceData.slug}`);
    }
  }

  function handleArtPieceToEdit(id) {
    const selectedArtPieceToEdit = data.find((piece) => piece._id === id);
    handleSetArtPieceToEdit(selectedArtPieceToEdit);
    // console.log(artPieceToEdit);
    // initially I wanted to use this handler function to create the patch request, but it didnt work at all! now it is just there to open up the form after clicking the pen i still do not want to give up on this :)
  }

  async function handleDeleteArtPiece(id) {
    const artPieceToDelete = data.find((piece) => piece._id === id);
    const sureToDelete = confirm(`Are you sure you want to delete ${artPieceToDelete.name}`);
    if (sureToDelete) {
      await fetch(`/api/${id}`, {
        method: "DELETE",
      });
    }
  }

  return (
    <>
      <Header scrollPercent={scrollPercent} handleSetScrollPercentage={handleSetScrollPercentage} />
      <main>
        <ArtPieceForm
          handleSetFileImageUrl={handleSetFileImageUrl}
          fileImageUrl={fileImageUrl}
          onSubmit={handleAddArtPiece}
          onChange={handleImageUpload}
        />
        <ArtPiecesList
          artPieceToEdit={artPieceToEdit}
          handleSetArtPieceToEdit={handleSetArtPieceToEdit}
          fileImageUrl={fileImageUrl}
          handleSetFileImageUrl={handleSetFileImageUrl}
          onEdit={handleArtPieceToEdit}
          onDelete={handleDeleteArtPiece}
        />
      </main>
    </>
  );
}
