import ArtPieceForm from "@/components/AdminArtPieceForm/arti-piece-form";
import Header from "@/components/Header/page-header";
import ArtPiecesList from "@/components/AdminArtPiecesList/admin-art-pieces-list";
import useSWR from "swr";
import { useRouter } from "next/router";
import ScrollUp from "@/components/ScrollUpButton/scroll-up-button";
import Head from "next/head";
import FooterComponent from "@/components/Footer/footer";

export default function AdminHomePage({
  artPieceToEdit,
  handleSetFilteredCategory,
  filteredCategory,
  activeCategory,
  handleSetActiveCategory,
  handleSetArtPieceToEdit,
  fileImageUrl,
  handleSetFileImageUrl,
  scrollPercent,
  handleSetScrollPercentage,
  handleSetCurrentFormData,
  currentFormData,
  handleSetTheme,
  handleSetCurrentTheme,
  currentTheme,
}) {
  const router = useRouter();
  const { data } = useSWR("/api", { fallbackData: [] });
  const maxWidth = 800; // maxWidth of detail page
  const maxHeight = 800; // maxHeight of detail page

  function handleImageUpload(event) {
    let imageFile = event.target.files[0];
    // console.log(imageFile);

    if (imageFile === undefined) {
      return;
    }

    if (imageFile.type === "image/vnd.microsoft.icon" || imageFile.type === "image/gif") {
      return alert(
        `Der Dateityp Ihrer Bilddatei ist nicht erlaubt. Gültige Bilddateitypen sind .png, .jpg/jpeg und .webp Dateien!`
      );
    }

    if (imageFile) {
      const reader = new FileReader();
      reader.addEventListener("load", function (load) {
        const img = new Image();
        img.addEventListener("load", function () {
          if (imageFile.type === "image/webp") {
            alert(
              `Sie haben erfolgreich eine WebP-Bilddatei hochgeladen, die für die Galerie bereit ist! Füllen Sie das Formular aus, um das Kunstwerk zur Galerie hinzuzufügen.`
            );
            handleSetFileImageUrl(load.target.result);
            // console.log(load.target.result);
          } else {
            const canvas = document.createElement("canvas");
            let width = img.width;
            let height = img.height;

            if (height <= maxHeight && width <= maxWidth) {
              return alert(
                `Ihre Bildbreite oder -höhe ist kleiner als 800px. Um die Qualität zu erhalten, laden Sie ein Bild in größerer Größe hoch!`
              );
            }

            if (width > maxWidth) {
              height = (maxWidth / width) * height;
              width = maxWidth;
            } else if (height > maxHeight) {
              width = (maxHeight / height) * width;
              height = maxHeight;
            }

            canvas.width = width;
            canvas.height = height;

            const context = canvas.getContext("2d");
            context.drawImage(img, 0, 0, width, height);

            const resizedImageData = canvas.toDataURL("image/webp");
            alert(
              `Sie haben erfolgreich eine WebP-Bilddatei erstellt, die für die Galerie bereit ist! Füllen Sie das Formular aus, um das Kunstwerk zur Galerie hinzuzufügen.`
            );

            handleSetFileImageUrl(resizedImageData);
          }
        });
        img.src = load.target.result;
      });
      reader.readAsDataURL(imageFile);
    }
  }

  async function handleAddArtPiece(newArtPieceData) {
    if (data.some((piece) => piece.slug === newArtPieceData.slug)) {
      alert("Der Name existiert bereits. Bitte wählen Sie einen anderen Namen.");
    } else if (data.some((piece) => piece.imageUrl === newArtPieceData.imageUrl)) {
      window.alert(
        "Die Bilddatei existiert bereits in der Kunstgalerie. Bitte wählen Sie ein anderes Bild aus!"
      );
    } else if (newArtPieceData.imageUrl === "/img/preview.png" || !newArtPieceData) {
      alert("Sie können kein Kunstwerk ohne ein Bild hinzufügen!");
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
  }

  async function handleDeleteArtPiece(id) {
    const artPieceToDelete = data.find((piece) => piece._id === id);
    const sureToDelete = confirm(
      `Sind Sie sicher, dass Sie "${artPieceToDelete.name}" löschen möchten?`
    );
    if (sureToDelete) {
      await fetch(`/api/${id}`, {
        method: "DELETE",
      });
      alert(`Sie haben "${artPieceToDelete.name}" erfolgriech gelöscht!`);
    }
    const artPiecesWithoutDeletedArtPiece = filteredCategory.filter((piece) => piece._id !== id);
    handleSetFilteredCategory(artPiecesWithoutDeletedArtPiece);
  }

  return (
    <>
      <Head>
        <title>saba-art - Bilder sind Erinnerungen</title>
        <meta name="description" content="Die online Kunst-Galerie von Saba." />
      </Head>
      <Header
        scrollPercent={scrollPercent}
        handleSetScrollPercentage={handleSetScrollPercentage}
        handleSetTheme={handleSetTheme}
        handleSetCurrentTheme={handleSetCurrentTheme}
        currentTheme={currentTheme}
      />
      <main>
        <ArtPieceForm
          handleSetFileImageUrl={handleSetFileImageUrl}
          handleSetCurrentFormData={handleSetCurrentFormData}
          fileImageUrl={fileImageUrl}
          onSubmit={handleAddArtPiece}
          onChange={handleImageUpload}
          currentFormData={currentFormData}
        />
        <ArtPiecesList
          handleSetFilteredCategory={handleSetFilteredCategory}
          handleSetScrollPercentage={handleSetScrollPercentage}
          filteredCategory={filteredCategory}
          handleSetActiveCategory={handleSetActiveCategory}
          activeCategory={activeCategory}
          artPieceToEdit={artPieceToEdit}
          handleSetArtPieceToEdit={handleSetArtPieceToEdit}
          fileImageUrl={fileImageUrl}
          handleSetFileImageUrl={handleSetFileImageUrl}
          onEdit={handleArtPieceToEdit}
          onDelete={handleDeleteArtPiece}
        />
        <ScrollUp scrollPercent={scrollPercent} />
      </main>
      <FooterComponent />
    </>
  );
}
