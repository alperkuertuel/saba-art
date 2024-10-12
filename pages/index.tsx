import Head from 'next/head';

import FooterComponent from '@/Footer/Footer';
import Header from '@/Header/Header';
import ScrollUp from '@/ScrollUpButton/ScrollUpButton';
import WelcomingAndAbout from '@/WelcomingAndAbout/WelcomingAndAbout';

interface HomePageProperties {
  scrollPercent: number;
  handleSetScrollPercentage: (scrollPercent: number) => void;
}

export default function HomePage({
  scrollPercent,
  handleSetScrollPercentage,
}: HomePageProperties) {
  return (
    <>
      <Head>
        <title>saba-art - Bilder sind Erinnerungen</title>
        <meta name="description" content="Die online Kunst-Galerie von Saba." />
      </Head>
      <Header
        scrollPercent={scrollPercent}
        handleSetScrollPercentage={handleSetScrollPercentage}
      />
      <main>
        <h1>Home</h1>
        <WelcomingAndAbout />
        <ScrollUp scrollPercent={scrollPercent} />
      </main>
      <FooterComponent />
    </>
  );
}
