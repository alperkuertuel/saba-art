/* eslint-disable @typescript-eslint/no-misused-promises */
import Head from 'next/head';
import { ArtPieceType } from 'pages/_app';
import useSWR from 'swr';

import AdminArtPiecesEditList from '@/AdminArtPiecesEditList/AdminArtPiecesEditList';
import FooterComponent from '@/Footer/Footer';
import Header from '@/Header/Header';
import ScrollUp from '@/ScrollUpButton/ScrollUpButton';

interface AdminHomePageProperties {
  isDarkMode: boolean;
  handleToggleDarkMode: (isDarkMode: boolean) => void;
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
  isDarkMode,
  handleToggleDarkMode,
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
    const deleteBoundary = confirm(
      `Möchten Sie das Kunstwerk ${artPieceToDelete?.name} wirklich löschen?`
    );
    if (deleteBoundary) {
      await fetch(`/api/${id}`, {
        method: 'DELETE',
      });
      alert(`Das Kunstwerk ${artPieceToDelete?.name} wurde gelöscht.`);
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
        isDarkMode={isDarkMode}
        handleToggleDarkMode={handleToggleDarkMode}
        scrollPercent={scrollPercent}
        handleSetScrollPercentage={handleSetScrollPercentage}
      />
      <main>
        <h1>Bearbeite oder lösche Kunstwerke:</h1>
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
