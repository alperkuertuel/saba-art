import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArtPieceType } from 'pages/_app';
import useSWR from 'swr';

import ArtPieceDetails from '@/ArtPieceDetails/ArtPieceDetails';
import Header from '@/Header/Header';
import LoadingDots from '@/LoadingDots/LoadingDots';

interface ShowDetailsProperties {
  scrollPercent: number;
  handleSetScrollPercentage: (scrollPercent: number) => void;
}

export default function ShowDetails({
  scrollPercent,
  handleSetScrollPercentage,
}: ShowDetailsProperties) {
  const router = useRouter();
  const { slug } = router.query;
  const {
    data,
    isLoading,
    isValidating,
  }: { data: ArtPieceType[]; isLoading: boolean; isValidating: boolean } =
    useSWR(`/api`, { fallbackData: [] });
  const foundArtPiece = data.find(
    (artpiece: ArtPieceType) => artpiece.slug === slug
  );

  if (isLoading || !data || !slug || isValidating) {
    return (
      <h1 className="fixed top-1/2 inline-block h-screen w-full text-center">
        Wird geladen <LoadingDots />
      </h1>
    );
  } else if (!foundArtPiece) {
    return (
      <h1 className="fixed top-1/2 inline-block h-screen w-full text-center">
        Error 404 - Das Bild ist nicht vorhanden. <br />{' '}
        <Link href={`/`}>Gehe zurück zur Galerie!</Link>
      </h1>
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
      />
      <main>
        <Link
          href="/"
          className="mb-4 flex items-center justify-center gap-4 rounded-[5px] bg-box-color p-2 text-lg shadow-box-shadow"
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
