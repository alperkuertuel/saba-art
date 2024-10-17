import Head from 'next/head';

import FooterComponent from '@/Footer/Footer';
import Header from '@/Header/Header';
import KontaktFormular from '@/Kontakt/KontaktFormular';
import ScrollUp from '@/ScrollUpButton/ScrollUpButton';

interface PressPageProperties {
  isDarkMode: boolean;
  handleToggleDarkMode: (isDarkMode: boolean) => void;
  scrollPercent: number;
  handleSetScrollPercentage: (scrollPercent: number) => void;
}

export default function PressPage({
  isDarkMode,
  handleToggleDarkMode,
  scrollPercent,
  handleSetScrollPercentage,
}: PressPageProperties) {
  return (
    <>
      <Head>
        <title>saba-art - Bilder sind Erinnerungen</title>
        <meta name="description" content="Die online Kunst-Galerie von Saba." />
      </Head>
      <Header
        isDarkMode={isDarkMode}
        handleToggleDarkMode={handleToggleDarkMode}
        scrollPercent={scrollPercent}
        handleSetScrollPercentage={handleSetScrollPercentage}
      />
      <main>
        <h1>Kontakt</h1>
        <KontaktFormular />
        <ScrollUp scrollPercent={scrollPercent} />
      </main>
      <FooterComponent />
    </>
  );
}
