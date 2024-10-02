import "@fortawesome/fontawesome-svg-core/styles.css";

import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import React, { useEffect, useState } from "react";
import useSWR, { SWRConfig } from "swr";
import useLocalStorageState from "use-local-storage-state";

import GlobalStyle from "../styles";

export type ArtPiece = {
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
};

export type AppTheme = {
  primarycolor: string;
  fontcolor: string;
  secondarycolor: string;
  tertiarycolor: string;
  boxcolor: string;
  boxshadow: string;
  coolbrown: string;
  highlight: string;
};

const fetcher = (url: string) => fetch(url).then((response) => response.json());

export default function App({ Component, pageProps: { session, ...pageProperties } }: AppProps) {
  /* -- data-fetching states: -- */
  const { data } = useSWR("/api", fetcher, { fallbackData: [] });
  const [filteredCategory, setFilteredCategory] = useState(data);
  function handleSetFilteredCategory(filteredCategory: string) {
    setFilteredCategory(filteredCategory);
  }

  const [artPieceToEdit, setArtPieceToEdit] = useState<ArtPiece>();
  function handleSetArtPieceToEdit(artPieceToEdit: ArtPiece) {
    setArtPieceToEdit(artPieceToEdit);
  }

  const [fileImageUrl, setfileImageUrl] = useState("/img/preview.png");
  function handleSetFileImageUrl(fileImageUrl: string) {
    setfileImageUrl(fileImageUrl);
  }

  const [currentFormData, setCurrentFormData] = useState({
    name: "",
    date: new Date().getFullYear(),
    available: true,
    description: "",
    category: "Impressionen",
    technique: "Öl auf Leinwand",
    widthReal: "",
    heightReal: "",
  });

  function handleSetCurrentFormData(currentFormData: ArtPiece) {
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

  const [previewoption, setpreviewoption] = useState("130px");
  function handleSetPreviewOption(previewoption: string) {
    setpreviewoption(previewoption);
  }

  const [likedArtPieces, setLikedArtPieces] = useLocalStorageState<string[]>("likedArtPieces", {
    defaultValue: [],
  });

  function handleSetLikedArtPieces(likedArtPieces: string[]) {
    setLikedArtPieces(likedArtPieces);
  }

  /* -- theme-states: -- */
  const [currentTheme, setCurrentTheme] = useLocalStorageState("mode", { defaultValue: "dark" });
  function handleSetCurrentTheme(currentTheme: string) {
    setCurrentTheme(currentTheme);
  }

  const [theme, setTheme] = useLocalStorageState<AppTheme>("theme-color-set", {
    defaultValue: {
      primarycolor: "white",
      fontcolor: "black",
      secondarycolor: "#391b0e",
      tertiarycolor: "#a48676",
      boxcolor: "#f4f4f4",
      boxshadow: "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
      coolbrown: "#d9cbc4",
      highlight: "#dee1e6",
    },
  });

  function handleSetTheme(theme: AppTheme) {
    setTheme(theme);
  }

  /* -- set meta-tag for mobile devices -- */
  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor && theme && theme.coolbrown) {
      metaThemeColor.setAttribute("content", theme.coolbrown);
    }
  }, [theme]);

  return (
    <>
      <GlobalStyle
        $primarycolor={theme.primarycolor}
        $fontcolor={theme.fontcolor}
        $secondarycolor={theme.secondarycolor}
        $tertiarycolor={theme.tertiarycolor}
        $boxcolor={theme.boxcolor}
        $boxshadow={theme.boxshadow}
        $coolbrown={theme.coolbrown}
        $highlight={theme.highlight}
      />
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
            currentTheme={currentTheme}
            handleSetCurrentTheme={handleSetCurrentTheme}
            currentFormData={currentFormData}
            handleSetPreviewOption={handleSetPreviewOption}
            handleSetFileImageUrl={handleSetFileImageUrl}
            handleSetArtPieceToEdit={handleSetArtPieceToEdit}
            handleSetFilteredCategory={handleSetFilteredCategory}
            handleSetLikedArtPieces={handleSetLikedArtPieces}
            handleSetScrollPercentage={handleSetScrollPercentage}
            handleSetActiveCategory={handleSetActiveCategory}
            handleSetCurrentFormData={handleSetCurrentFormData}
            handleSetTheme={handleSetTheme}
          />
        </SessionProvider>
      </SWRConfig>
    </>
  );
}
