import Head from 'next/head';

import AboutAndWelcoming from '@/AboutAndWelcoming/AboutAndWelcoming';
import Logo from '@/AboutAndWelcoming/Logo';
import FooterComponent from '@/Footer/Footer';
import Header from '@/Header/Header';
import ScrollUp from '@/ScrollUpButton/ScrollUpButton';

interface HomePageProperties {
  isDarkMode: boolean;
  handleToggleDarkMode: (isDarkMode: boolean) => void;
  scrollPercent: number;
  handleSetScrollPercentage: (scrollPercent: number) => void;
}

export default function HomePage({
  isDarkMode,
  handleToggleDarkMode,
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
        isDarkMode={isDarkMode}
        handleToggleDarkMode={handleToggleDarkMode}
        scrollPercent={scrollPercent}
        handleSetScrollPercentage={() => handleSetScrollPercentage(0)}
      />
      <main>
        <h1 className="border-none grayscale">
          <Logo isDarkMode={isDarkMode} />
        </h1>
        <AboutAndWelcoming />
        <ScrollUp scrollPercent={scrollPercent} />
      </main>
      <FooterComponent />
    </>
  );
}
