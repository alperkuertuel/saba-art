import ArtPiecesPreview from "@/components/ArtPiecesPreview/ArtPiecesPreview";
import CategoryFilter from "@/components/CategoryFilter/CategoryFilter";
import Header from "@/components/Header/Header";
import ScrollUp from "@/components/ScrollUpButton/ScrollUpButton";
import Head from "next/head";

export default function HomePage({
  handleSetFilteredCategory,
  filteredCategory,
  scrollPercent,
  handleSetScrollPercentage,
  handleSetActive,
  active,
}) {
  return (
    <>
      <Head>
        <title>ArtistName - pictures are memories</title>
        <meta name="description" content="the gallery of ArtistName" />
        <meta name="theme-color" content="white" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <Header scrollPercent={scrollPercent} handleSetScrollPercentage={handleSetScrollPercentage} />
      <main>
        <CategoryFilter
          handleSetFilteredCategory={handleSetFilteredCategory}
          handleSetActive={handleSetActive}
          active={active}
        />
        <ArtPiecesPreview filteredCategory={filteredCategory} />
        <ScrollUp scrollPercent={scrollPercent} />
      </main>
    </>
  );
}
