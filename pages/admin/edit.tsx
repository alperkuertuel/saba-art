/* eslint-disable @typescript-eslint/no-misused-promises */
import Head from 'next/head';
import { ArtPieceType } from 'pages/_app';
import useSWR from 'swr';

import AdminArtPiecesEditList from '@/AdminArtPiecesEditList/AdminArtPiecesEditList';
import FooterComponent from '@/Footer/Footer';
import Header from '@/Header/Header';
import ScrollUp from '@/ScrollUpButton/ScrollUpButton';

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
  scrollPercent,
  handleSetScrollPercentage,
}: AdminHomePageProperties) {
  const { data }: { data: ArtPieceType[] } = useSWR('/api', {
    fallbackData: [],
  });

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
