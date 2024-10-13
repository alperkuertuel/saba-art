/* eslint-disable @typescript-eslint/no-misused-promises */
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ArtPieceType } from 'pages/_app';
import React, { useState } from 'react';
import useSWR from 'swr';

import AdminArtPieceAddForm from '@/AdminArtPieceAddForm/AdminArtPieceAddForm';
import FooterComponent from '@/Footer/Footer';
import Header from '@/Header/Header';
import { DetailsModal } from '@/Modal/Modal';
import ScrollUp from '@/ScrollUpButton/ScrollUpButton';

interface AdminHomePageProperties {
  fileImageUrl: string;
  handleSetFileImageUrl: (fileImageUrl: string | ArrayBuffer | null) => void;
  scrollPercent: number;
  handleSetScrollPercentage: (scrollPercent: number) => void;
  handleSetCurrentFormData: (currentFormData: ArtPieceType) => void;
  currentFormData: ArtPieceType;
}

export default function AdminHomePage({
  fileImageUrl,
  handleSetFileImageUrl,
  scrollPercent,
  handleSetScrollPercentage,
  handleSetCurrentFormData,
  currentFormData,
}: AdminHomePageProperties) {
  const router = useRouter();
  const [modalContext, setModalContext] = useState<string>();
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
      return setModalContext('imgTypeNotAllowed');
    }

    const reader = new FileReader();
    reader.addEventListener('load', function (loadEvent) {
      const img = new Image();
      img.addEventListener('load', function () {
        if (imageFile.type === 'image/webp') {
          const result = loadEvent.target?.result;
          if (typeof result === 'string') {
            handleSetFileImageUrl(result);
          }
        } else {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          if (height <= maxHeight && width <= maxWidth) {
            return setModalContext('imgWidthHeight');
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
      }
    });

    reader.readAsDataURL(imageFile);
  }

  async function handleAddArtPiece(newArtPieceData: ArtPieceType) {
    if (
      data.some((piece: ArtPieceType) => piece.slug === newArtPieceData.slug)
    ) {
      return setModalContext('slugExists');
    } else if (
      data.some(
        (piece: ArtPieceType) => piece.imageUrl === newArtPieceData.imageUrl
      )
    ) {
      return setModalContext('imgExists');
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
        return setModalContext('responseError');
      }
      await router.push(`/art-pieces/${newArtPieceData.slug}`);
    }
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
        <h1>Füge ein neues Kunstwerk hinzu:</h1>
        <AdminArtPieceAddForm
          handleSetFileImageUrl={handleSetFileImageUrl}
          handleSetCurrentFormData={handleSetCurrentFormData}
          fileImageUrl={fileImageUrl}
          onSubmit={handleAddArtPiece}
          onChange={handleImageUpload}
          currentFormData={currentFormData}
        />
        <ScrollUp scrollPercent={scrollPercent} />
      </main>
      <FooterComponent />
      {modalContext === 'slugExists' && (
        <DetailsModal title="Ups!" closeAction={() => setModalContext('close')}>
          Der Name des Kunstwerkes existiert bereits. Bitte wählen Sie einen
          anderen Namen.
        </DetailsModal>
      )}
      {modalContext === 'imgExists' && (
        <DetailsModal title="Ups!" closeAction={() => setModalContext('close')}>
          Das Kunstwerk existiert bereits. Bitte wählen Sie einen Anderes aus.
        </DetailsModal>
      )}
      {modalContext === 'imgTypeNotAllowed' && (
        <DetailsModal title="Ups!" closeAction={() => setModalContext('close')}>
          Der Dateityp Ihrer Bilddatei ist nicht erlaubt. Gültige Bilddateitypen
          sind .png, .jpg/jpeg und .webp Dateien!
        </DetailsModal>
      )}
      {modalContext === 'imgWidthHeight' && (
        <DetailsModal title="Ups!" closeAction={() => setModalContext('close')}>
          Deine Bildbreite oder -höhe ist kleiner als 800 Pixel. Bitte wähle ein
          größeres Bild.
        </DetailsModal>
      )}
      {modalContext === 'responseError' && (
        <DetailsModal title="Ups!" closeAction={() => setModalContext('close')}>
          Beim Hochladen ist leider ein Fehler aufgetreten. Bitte versuchen es
          später noch einmal oder kontaktiere den Entwickler.
        </DetailsModal>
      )}
    </>
  );
}
