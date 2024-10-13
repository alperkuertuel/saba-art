import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { ArtPieceType } from 'pages/_app';

import ArtPieceDetails from '@/ArtPieceDetails/ArtPieceDetails';
import Header from '@/Header/Header';

import ArtPiece from '../../db/art-piece-modal';
import databaseConnect from '../../db/connect';

interface ShowDetailsProperties {
  scrollPercent: number;
  handleSetScrollPercentage: (scrollPercent: number) => void;
  foundArtPiece: ArtPieceType | null;
}

export const getStaticPaths: GetStaticPaths = async () => {
  await databaseConnect();
  const artPieces: ArtPieceType[] = (await ArtPiece.find(
    {}
  ).lean()) as ArtPieceType[];
  const paths = artPieces.map((artPiece) => ({
    params: { slug: artPiece.slug },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  await databaseConnect();
  const { slug } = context.params!;
  const foundArtPiece = (await ArtPiece.findOne({
    slug,
  }).lean()) as ArtPieceType;

  // _id field contains a buffer object which needs to be converted to a string
  if (foundArtPiece) {
    foundArtPiece._id = foundArtPiece._id?.toString();
  }

  return {
    props: {
      foundArtPiece: structuredClone(foundArtPiece),
    },
    revalidate: 10,
  };
};

export default function SlugPage({
  scrollPercent,
  handleSetScrollPercentage,
  foundArtPiece,
}: ShowDetailsProperties) {
  if (!foundArtPiece) {
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
