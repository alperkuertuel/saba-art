import '../styles/global.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

import { AppProps } from 'next/app';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { useState } from 'react';
import useSWR, { SWRConfig } from 'swr';
import useLocalStorageState from 'use-local-storage-state';

export interface ArtPieceType {
  _id?: string;
  slug: string;
  imageUrl: string;
  name: string;
  date: number;
  available: boolean;
  description: string;
  category: string;
  technique: string;
  widthReal: string;
  heightReal: string;
}
interface MyAppProps extends AppProps {
  pageProps: {
    session: Session;
    [key: string]: unknown;
  };
}

const fetcher = (url: string) => fetch(url).then((response) => response.json());

export default function App({
  Component,
  pageProps: { session, ...pageProperties },
}: MyAppProps) {
  /* -- data-fetching states: -- */
  const { data } = useSWR<ArtPieceType[]>('/api', fetcher, {
    fallbackData: [],
  });

  const [filteredCategory, setFilteredCategory] = useState(data);
  function handleSetFilteredCategory(filteredCategory: ArtPieceType[]) {
    setFilteredCategory(filteredCategory);
  }

  const [artPieceToEdit, setArtPieceToEdit] = useState<ArtPieceType>();
  function handleSetArtPieceToEdit(artPieceToEdit: ArtPieceType) {
    setArtPieceToEdit(artPieceToEdit);
  }

  const [fileImageUrl, setfileImageUrl] = useState<string>('/img/preview.png');
  function handleSetFileImageUrl(fileImageUrl: string) {
    setfileImageUrl(fileImageUrl);
  }

  const [currentFormData, setCurrentFormData] = useState({
    name: '',
    date: new Date().getFullYear(),
    available: true,
    description: '',
    category: 'Impressionen',
    technique: 'Öl auf Leinwand',
    widthReal: '',
    heightReal: '',
  });

  function handleSetCurrentFormData(currentFormData: ArtPieceType) {
    setCurrentFormData(currentFormData);
  }

  /* -- gallery-view states: -- */
  const [scrollPercent, setScrollPercent] = useState(0);
  function handleSetScrollPercentage(scrollPercent: number) {
    setScrollPercent(scrollPercent);
  }

  const [activeCategory, setActiveCategory] = useState<string>();
  function handleSetActiveCategory(activeCategory: string) {
    setActiveCategory(activeCategory);
  }

  const [previewoption, setpreviewoption] = useState('130px');
  function handleSetPreviewOption(previewoption: string) {
    setpreviewoption(previewoption);
  }

  const [likedArtPieces, setLikedArtPieces] = useLocalStorageState<string[]>(
    'likedArtPieces',
    {
      defaultValue: [],
    }
  );

  function handleSetLikedArtPieces(likedArtPieces: string[]) {
    setLikedArtPieces(likedArtPieces);
  }

  return (
    <>
      <SWRConfig value={{ fetcher }}>
        <SessionProvider session={session}>
          <Component
            {...pageProperties}
            artPieceToEdit={artPieceToEdit}
            filteredCategory={filteredCategory}
            likedArtPieces={likedArtPieces}
            fileImageUrl={fileImageUrl}
            scrollPercent={scrollPercent}
            activeCategory={activeCategory}
            previewoption={previewoption}
            currentFormData={currentFormData}
            handleSetPreviewOption={handleSetPreviewOption}
            handleSetFileImageUrl={handleSetFileImageUrl}
            handleSetArtPieceToEdit={handleSetArtPieceToEdit}
            handleSetFilteredCategory={handleSetFilteredCategory}
            handleSetLikedArtPieces={handleSetLikedArtPieces}
            handleSetScrollPercentage={handleSetScrollPercentage}
            handleSetActiveCategory={handleSetActiveCategory}
            handleSetCurrentFormData={handleSetCurrentFormData}
          />
        </SessionProvider>
      </SWRConfig>
    </>
  );
}
