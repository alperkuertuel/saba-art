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

  return (
    <>
      <GlobalStyle />
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
          />
        </SessionProvider>
      </SWRConfig>
    </>
  );
}
