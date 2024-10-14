import '../styles/global.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

import { AppProps } from 'next/app';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { useEffect, useState } from 'react';
import useSWR, { SWRConfig } from 'swr';
import { ActiveCategory, ArtPieceType, PreviewOption } from 'types/types';
import useLocalStorageState from 'use-local-storage-state';

const fetcher = (url: string) => fetch(url).then((response) => response.json());

export interface MyAppProps extends AppProps {
  pageProps: {
    session: Session;
    [key: string]: unknown;
  };
}

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

  const [fileImageUrl, setfileImageUrl] = useState<string>('/img/crop.png');
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

  const [activeCategory, setActiveCategory] = useState<ActiveCategory>();
  function handleSetActiveCategory(activeCategory: ActiveCategory) {
    setActiveCategory(activeCategory);
  }

  const [previewOption, setPreviewOption] =
    useState<PreviewOption>('smallGrid');
  function handleSetPreviewOption(previewOption: PreviewOption) {
    setPreviewOption(previewOption);
  }

  const [scrollPercent, setScrollPercent] = useState(0);
  function handleSetScrollPercentage(scrollPercent: number) {
    if (!activeCategory || previewOption !== 'slideShow') {
      setScrollPercent(scrollPercent);
    }
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

  useEffect(() => {
    if (data && data.length > 0 && likedArtPieces.length > 0) {
      const localStorageLikedArtPieces: string[] = JSON.parse(
        localStorage.getItem('likedArtPieces') ?? '[]'
      ) as string[];
      const favoriteArtPieces = data.filter((piece) =>
        localStorageLikedArtPieces.includes(piece._id)
      );
      handleSetFilteredCategory(favoriteArtPieces);
      handleSetActiveCategory('Favoriten');
      handleSetPreviewOption('smallGrid');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    // Check system preference for dark mode
    const systemPrefersDark = globalThis.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    setIsDarkMode(systemPrefersDark);

    // Add event listener to update dark mode based on system preference changes
    const mediaQuery = globalThis.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  function handleToggleDarkMode(isDarkMode: boolean) {
    setIsDarkMode(!isDarkMode);
  }

  return (
    <>
      <SWRConfig value={{ fetcher }}>
        <SessionProvider session={session}>
          <Component
            {...pageProperties}
            isDarkMode={isDarkMode}
            artPieceToEdit={artPieceToEdit}
            filteredCategory={filteredCategory}
            likedArtPieces={likedArtPieces}
            fileImageUrl={fileImageUrl}
            scrollPercent={scrollPercent}
            activeCategory={activeCategory}
            previewOption={previewOption}
            currentFormData={currentFormData}
            handleToggleDarkMode={handleToggleDarkMode}
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
