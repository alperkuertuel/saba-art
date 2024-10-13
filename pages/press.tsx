import Head from 'next/head';

import FooterComponent from '@/Footer/Footer';
import Header from '@/Header/Header';
import PressCarousel from '@/PressCarousel/PressCarousel';
import ScrollUp from '@/ScrollUpButton/ScrollUpButton';

interface PressPageProperties {
  isDarkMode: boolean;
  handleToggleDarkMode: (isDarkMode: boolean) => void;
  scrollPercent: number;
  handleSetScrollPercentage: (scrollPercent: number) => void;
}

export default function PressPage({
  scrollPercent,
  handleSetScrollPercentage,
  isDarkMode,
  handleToggleDarkMode,
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
        handleSetScrollPercentage={() => handleSetScrollPercentage(0)}
      />
      <main>
        <h1>Presse</h1>
        <PressCarousel isDarkMode={isDarkMode} />
        <ScrollUp scrollPercent={scrollPercent} />
      </main>
      <FooterComponent />
    </>
  );
}
