import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

import ArtPieceForm from "@/AdminArtPieceForm/arti-piece-form";
import ArtPiecesList from "@/AdminArtPiecesList/admin-art-pieces-list";
import FooterComponent from "@/Footer/page-footer";
import Header from "@/Header/page-header";
import ScrollUp from "@/ScrollUpButton/scroll-up-button";

import { AppTheme, ArtPiece } from "./_app";

type AdminHomePageProperties = {
  artPieceToEdit: ArtPiece;
  handleSetFilteredCategory: (filteredCategory: ArtPiece[]) => void;
  filteredCategory: ArtPiece[];
  activeCategory: string;
  handleSetActiveCategory: (activeCategory: string) => void;
  handleSetArtPieceToEdit: (artPieceToEdit: ArtPiece) => void;
  fileImageUrl: string;
  handleSetFileImageUrl: (fileImageUrl: string | ArrayBuffer | null) => void;
  scrollPercent: number;
  handleSetScrollPercentage: (scrollPercent: number) => void;
  handleSetCurrentFormData: (currentFormData: ArtPiece) => void;
  currentFormData: ArtPiece;
  handleSetTheme: (theme: AppTheme) => void;
  handleSetCurrentTheme: (currentTheme: string) => void;
  currentTheme: string;
};

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
}: AdminHomePageProperties) {
  const router = useRouter();
  const { data } = useSWR("/api", { fallbackData: [] });
  const maxWidth = 800; // maxWidth of detail page
  const maxHeight = 800; // maxHeight of detail page

  function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const imageFile = event.target.files?.[0];

    if (!imageFile) {
      return;
    }

    if (imageFile.type === "image/vnd.microsoft.icon" || imageFile.type === "image/gif") {
      return alert(
        `Der Dateityp Ihrer Bilddatei ist nicht erlaubt. Gültige Bilddateitypen sind .png, .jpg/jpeg und .webp Dateien!`
      );
    }

    const reader = new FileReader();
    reader.addEventListener("load", function (loadEvent) {
      const img = new Image();
      img.addEventListener("load", function () {
        if (imageFile.type === "image/webp") {
          alert(
            `Sie haben erfolgreich eine WebP-Bilddatei hochgeladen, die für die Galerie bereit ist! Füllen Sie das Formular aus, um das Kunstwerk zur Galerie hinzuzufügen.`
          );

          const result = loadEvent.target?.result;
          if (typeof result === "string") {
            handleSetFileImageUrl(result);
          } else {
            console.error("Unexpected result type from file load event.");
          }
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
          context?.drawImage(img, 0, 0, width, height);

          const resizedImageData = canvas.toDataURL("image/webp");
          alert(
            `Sie haben erfolgreich eine WebP-Bilddatei erstellt, die für die Galerie bereit ist! Füllen Sie das Formular aus, um das Kunstwerk zur Galerie hinzuzufügen.`
          );

          handleSetFileImageUrl(resizedImageData);
        }
      });

      if (typeof loadEvent.target?.result === "string") {
        img.src = loadEvent.target.result;
      } else {
        console.error("Unexpected result type from file load event.");
      }
    });

    reader.readAsDataURL(imageFile);
  }

  async function handleAddArtPiece(newArtPieceData: ArtPiece) {
    if (data.some((piece: ArtPiece) => piece.slug === newArtPieceData.slug)) {
      alert("Der Name existiert bereits. Bitte wählen Sie einen anderen Namen.");
    } else if (data.some((piece: ArtPiece) => piece.imageUrl === newArtPieceData.imageUrl)) {
      window.alert("Die Bilddatei existiert bereits in der Kunstgalerie. Bitte wählen Sie ein anderes Bild aus!");
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

  function handleArtPieceToEdit(id: string) {
    const selectedArtPieceToEdit = data.find((piece: ArtPiece) => piece._id === id);
    handleSetArtPieceToEdit(selectedArtPieceToEdit);
  }

  async function handleDeleteArtPiece(id: string) {
    const artPieceToDelete = data.find((piece: ArtPiece) => piece._id === id);
    const sureToDelete = confirm(`Sind Sie sicher, dass Sie "${artPieceToDelete.name}" löschen möchten?`);
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
          onEdit={handleArtPieceToEdit}
          onDelete={handleDeleteArtPiece}
        />
        <ScrollUp scrollPercent={scrollPercent} />
      </main>
      <FooterComponent />
    </>
  );
}
