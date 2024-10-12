/* eslint-disable @typescript-eslint/no-misused-promises */
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';

import AdminArtPieceAddForm from '@/AdminArtPieceAddForm/AdminArtPieceAddForm';
import AdminArtPiecesEditList from '@/AdminArtPiecesEditList/AdminArtPiecesEditList';
import FooterComponent from '@/Footer/Footer';
import Header from '@/Header/Header';
import ScrollUp from '@/ScrollUpButton/ScrollUpButton';

import { ArtPieceType } from './_app';

interface AdminHomePageProperties {
  artPieceToEdit: ArtPieceType;
  handleSetFilteredCategory: (filteredCategory: ArtPieceType[]) => void;
  filteredCategory: ArtPieceType[];
  activeCategory: string;
  handleSetActiveCategory: (activeCategory: string) => void;
  handleSetArtPieceToEdit: (artPieceToEdit: ArtPieceType) => void;
  fileImageUrl: string;
  handleSetFileImageUrl: (fileImageUrl: string | ArrayBuffer | null) => void;
  scrollPercent: number;
  handleSetScrollPercentage: (scrollPercent: number) => void;
  handleSetCurrentFormData: (currentFormData: ArtPieceType) => void;
  currentFormData: ArtPieceType;
}

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
}: AdminHomePageProperties) {
  const router = useRouter();
  const { data }: { data: ArtPieceType[] } = useSWR('/api', {
    fallbackData: [],
  });
  const maxWidth = 800; // maxWidth of detail page
  const maxHeight = 800; // maxHeight of detail page

  function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const imageFile = event.target.files?.[0];

    if (!imageFile) {
      return;
    }

    if (
      imageFile.type === 'image/vnd.microsoft.icon' ||
      imageFile.type === 'image/gif'
    ) {
      return alert(
        `Der Dateityp Ihrer Bilddatei ist nicht erlaubt. Gültige Bilddateitypen sind .png, .jpg/jpeg und .webp Dateien!`
      );
    }

    const reader = new FileReader();
    reader.addEventListener('load', function (loadEvent) {
      const img = new Image();
      img.addEventListener('load', function () {
        if (imageFile.type === 'image/webp') {
          const result = loadEvent.target?.result;
          if (typeof result === 'string') {
            handleSetFileImageUrl(result);
          } else {
            console.error('Unexpected result type from file load event.');
          }
        } else {
          const canvas = document.createElement('canvas');
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

          const context = canvas.getContext('2d');
          context?.drawImage(img, 0, 0, width, height);

          const resizedImageData = canvas.toDataURL('image/webp');

          handleSetFileImageUrl(resizedImageData);
        }
      });

      if (typeof loadEvent.target?.result === 'string') {
        img.src = loadEvent.target.result;
      } else {
        console.error('Unexpected result type from file load event.');
      }
    });

    reader.readAsDataURL(imageFile);
  }

  // THIS MIGHT BE NOT THE CORRECT SPOT FOR A FETCH WILL BE MOVED WITH TANSTACK INTEGRATION
  async function handleAddArtPiece(newArtPieceData: ArtPieceType) {
    if (
      data.some((piece: ArtPieceType) => piece.slug === newArtPieceData.slug)
    ) {
      alert(
        'Der Name existiert bereits. Bitte wählen Sie einen anderen Namen.'
      );
    } else if (
      data.some(
        (piece: ArtPieceType) => piece.imageUrl === newArtPieceData.imageUrl
      )
    ) {
      globalThis.alert(
        'Die Bilddatei existiert bereits in der Kunstgalerie. Bitte wählen Sie ein anderes Bild aus!'
      );
    } else if (
      newArtPieceData.imageUrl === '/img/preview.png' ||
      !newArtPieceData
    ) {
      alert('Sie können kein Kunstwerk ohne ein Bild hinzufügen!');
    } else {
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newArtPieceData),
      });
      if (!response.ok) {
        console.error(response.status);
        return;
      }
      await router.push(`/art-pieces/${newArtPieceData.slug}`);
    }
  }

  function handleArtPieceToEdit(id: string) {
    const selectedArtPieceToEdit = data.find(
      (piece: ArtPieceType) => piece._id === id
    );
    handleSetArtPieceToEdit(selectedArtPieceToEdit!);
  }

  async function handleDeleteArtPiece(id: string) {
    const artPieceToDelete = data.find(
      (piece: ArtPieceType) => piece._id === id
    );
    const sureToDelete = confirm(
      `Sind Sie sicher, dass Sie "${artPieceToDelete?.name}" löschen möchten?`
    );
    if (sureToDelete) {
      await fetch(`/api/${id}`, {
        method: 'DELETE',
      });
      alert(`Sie haben "${artPieceToDelete?.name}" erfolgriech gelöscht!`);
    }
    const artPiecesWithoutDeletedArtPiece = filteredCategory.filter(
      (piece) => piece._id !== id
    );
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
      />
      <main>
        <AdminArtPieceAddForm
          handleSetFileImageUrl={handleSetFileImageUrl}
          handleSetCurrentFormData={handleSetCurrentFormData}
          fileImageUrl={fileImageUrl}
          onSubmit={handleAddArtPiece}
          onChange={handleImageUpload}
          currentFormData={currentFormData}
        />
        <AdminArtPiecesEditList
          handleSetFilteredCategory={handleSetFilteredCategory}
          filteredCategory={filteredCategory}
          artPieceToEdit={artPieceToEdit}
          handleSetScrollPercentage={handleSetScrollPercentage}
          handleSetActiveCategory={handleSetActiveCategory}
          activeCategory={activeCategory}
          onDelete={handleDeleteArtPiece}
          onEdit={handleArtPieceToEdit}
        />
        <ScrollUp scrollPercent={scrollPercent} />
      </main>
      <FooterComponent />
    </>
  );
}
