import Header from "@/components/Header/Header";
import ArtPieceDetails from "@/components/ArtPieceDetails/ArtPieceDetails";
import { useRouter } from "next/router";
import styled from "styled-components";
import Link from "next/link";
import Head from "next/head";
import useSWR from "swr";
import LoadingDots from "@/components/LoadingDots/LoadingDots";

export default function ShowDetails({
  scrollPercent,
  handleSetTheme,
  handleSetScrollPercentage,
  handleSetCurrentTheme,
  currentTheme,
}) {
  const router = useRouter();
  const { slug } = router.query;
  const { data, isLoading, isValidating } = useSWR(`/api`, { fallbackData: [] });
  const foundArtPiece = data.find((artpiece) => artpiece.slug === slug);

  if (isLoading || !data || !slug || isValidating) {
    return (
      <StyledErrorMessage>
        Wird geladen <LoadingDots />
      </StyledErrorMessage>
    );
  } else if (!foundArtPiece) {
    return (
      <StyledErrorMessage>
        Error 404 - Das Bild ist nicht vorhanden. <br />{" "}
        <Link href={`/`}>Gehe zurück zur Galerie!</Link>
      </StyledErrorMessage>
    );
  }
  return (
    <>
      <Head>
        <title>{foundArtPiece.name}</title>
        <meta name="description" content={foundArtPiece.description} />
      </Head>
      <Header
        scrollPercent={scrollPercent}
        handleSetScrollPercentage={handleSetScrollPercentage}
        handleSetTheme={handleSetTheme}
        handleSetCurrentTheme={handleSetCurrentTheme}
        currentTheme={currentTheme}
      />
      <main>
        <StyledBackLink href="/">
          <b>Zur online Kunst-Galerie!</b>
        </StyledBackLink>
        <ArtPieceDetails
          imageUrl={foundArtPiece.imageUrl}
          name={foundArtPiece.name}
          date={foundArtPiece.date}
          description={foundArtPiece.description}
          category={foundArtPiece.category}
          available={foundArtPiece.available}
          technique={foundArtPiece.technique}
          widthReal={foundArtPiece.widthReal}
          heightReal={foundArtPiece.heightReal}
          slug={foundArtPiece.slug}
        />
      </main>
    </>
  );
}

const StyledBackLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  align-items: center;
  padding: 0.5rem;
  background-color: var(--box-color);
  box-shadow: var(--box-shadow);
  font-size: 1.2rem;
  border-radius: 5px;
  margin-bottom: 1rem;
`;

const StyledErrorMessage = styled.h1`
  position: fixed;
  top: 50%;
  width: 100%;
  height: 100vh;
  display: inline-block;
  text-align: center;
`;
