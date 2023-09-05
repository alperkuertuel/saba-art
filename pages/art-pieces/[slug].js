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
  handleSetScrollPercentage,
  handleSetActive,
  active,
}) {
  const router = useRouter();
  const { slug } = router.query;
  const { data, isLoading } = useSWR("/api", { fallbackData: [] });
  const foundArtPiece = data.find((artpiece) => artpiece.slug === slug);

  if (isLoading || !data || !slug) {
    return (
      <StyledErrorMessage>
        Loading <LoadingDots />
      </StyledErrorMessage>
    );
  } else if (!foundArtPiece) {
    return (
      <StyledErrorMessage>
        404 art piece not found. <br /> <Link href={`/`}>Go back to the gallery!</Link>
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
        handleSetScrollPercentage={() => handleSetScrollPercentage(0)}
      />
      <main>
        <ArtPieceDetails
          imageUrl={foundArtPiece.imageUrl}
          name={foundArtPiece.name}
          date={foundArtPiece.date}
          description={foundArtPiece.description}
          category={foundArtPiece.category}
          technique={foundArtPiece.technique}
          widthReal={foundArtPiece.widthReal}
          heightReal={foundArtPiece.heightReal}
          slug={foundArtPiece.slug}
          handleSetActive={handleSetActive}
          active={active}
        />
      </main>
    </>
  );
}

const StyledErrorMessage = styled.h1`
  position: fixed;
  top: 50%;
  width: 100%;
  height: 100vh;
  display: inline-block;
  text-align: center;
`;
