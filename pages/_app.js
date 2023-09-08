import "@fortawesome/fontawesome-svg-core/styles.css";
import GlobalStyle from "../styles";
import { useState } from "react";
import { SWRConfig } from "swr";
import useSWR from "swr";
import { SessionProvider } from "next-auth/react";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const { data } = useSWR("/api", fetcher, { fallbackData: [] });

  const [artPieceToEdit, setArtPieceToEdit] = useState([]);
  const [fileImageUrl, setfileImageUrl] = useState("/img/preview.png");

  const [filteredCategory, setFilteredCategory] = useState(data);

  const [scrollPercent, setScrollPercent] = useState(0);

  const [active, setActive] = useState();

  const [size, setGridRepeatMinSize] = useState("280px");

  const [currentFormData, setCurrentFormData] = useState({
    name: "",
    date: "",
    description: "",
    category: "Impression",
    technique: "Oil",
    widthReal: "",
    heightReal: "",
  });

  function handleSetArtPieceToEdit(artPieceToEdit) {
    setArtPieceToEdit(artPieceToEdit);
  }

  function handleSetFileImageUrl(fileImageUrl) {
    setfileImageUrl(fileImageUrl);
  }

  function handleSetFilteredCategory(filteredCategory) {
    setFilteredCategory(filteredCategory);
  }

  function handleSetScrollPercentage(scrollPercent) {
    setScrollPercent(scrollPercent);
  }

  function handleSetActive(active) {
    setActive(active);
  }

  function handleSetGridRepeatMinsize(size) {
    setGridRepeatMinSize(size);
  }

  function handleSetCurrentFormData(currentFormData) {
    setCurrentFormData(currentFormData);
  }

  function handleSetTheme(theme) {
    setTheme(theme);
  }
  const [theme, setTheme] = useState({
    primarycolor: "white",
    fontcolor: "black",
    secondarycolor: "#391b0e",
    tertiarycolor: "#a48676",
    boxcolor: "#f4f4f4",
    boxshadow: "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
    coolbrown: "#d9cbc4",
    bluegrey: "#dee1e6",
  });

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
        $bluegrey={theme.bluegrey}
      />

      <SWRConfig value={{ fetcher }}>
        <SessionProvider session={session}>
          <Component
            {...pageProps}
            artPieceToEdit={artPieceToEdit}
            filteredCategory={filteredCategory}
            fileImageUrl={fileImageUrl}
            scrollPercent={scrollPercent}
            active={active}
            size={size}
            currentFormData={currentFormData}
            handleSetGridRepeatMinsize={handleSetGridRepeatMinsize}
            handleSetFileImageUrl={handleSetFileImageUrl}
            handleSetArtPieceToEdit={handleSetArtPieceToEdit}
            handleSetFilteredCategory={handleSetFilteredCategory}
            handleSetScrollPercentage={handleSetScrollPercentage}
            handleSetActive={handleSetActive}
            handleSetCurrentFormData={handleSetCurrentFormData}
            handleSetTheme={handleSetTheme}
          />
        </SessionProvider>
      </SWRConfig>
    </>
  );
}
