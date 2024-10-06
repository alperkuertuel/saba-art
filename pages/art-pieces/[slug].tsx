import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

import ArtPieceDetails from "@/ArtPieceDetails/art-piece-details";
import Header from "@/Header/page-header";
import LoadingDots from "@/LoadingDots/loading-dots";

import { ArtPiece } from "../_app";

type ShowDetailsProperties = {
  scrollPercent: number;
  handleSetScrollPercentage: (scrollPercent: number) => void;
};

export default function ShowDetails({ scrollPercent, handleSetScrollPercentage }: ShowDetailsProperties) {
  const router = useRouter();
  const { slug } = router.query;
  const { data, isLoading, isValidating } = useSWR(`/api`, { fallbackData: [] });
  const foundArtPiece = data.find((artpiece: ArtPiece) => artpiece.slug === slug);

  if (isLoading || !data || !slug || isValidating) {
    return (
      <h1 className="fixed top-1/2 w-full h-screen inline-block text-center">
        Wird geladen <LoadingDots />
      </h1>
    );
  } else if (!foundArtPiece) {
    return (
      <h1 className="fixed top-1/2 w-full h-screen inline-block text-center">
        Error 404 - Das Bild ist nicht vorhanden. <br /> <Link href={`/`}>Gehe zurück zur Galerie!</Link>
      </h1>
    );
  }
  return (
    <>
      <Head>
        <title>{foundArtPiece.name}</title>
        <meta name="description" content={foundArtPiece.description} />
      </Head>
      <Header scrollPercent={scrollPercent} handleSetScrollPercentage={handleSetScrollPercentage} />
      <main>
        <Link
          href="/"
          className="flex justify-center items-center gap-4 p-2 bg-box-color shadow-box-shadow text-lg rounded-[5px] mb-4"
        >
          <b>Zur online Kunst-Galerie!</b>
        </Link>
        <ArtPieceDetails
          _id={foundArtPiece._id}
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
