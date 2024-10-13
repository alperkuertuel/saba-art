import Navigation from '@/Navigation/Navigation';
import ProgressBar from '@/ProgressBar/ProgressBar';

interface HeaderProperties {
  isDarkMode: boolean;
  handleToggleDarkMode: (isDarkMode: boolean) => void;
  scrollPercent: number;
  handleSetScrollPercentage: (scrollPercent: number) => void | undefined;
}

export default function Header({
  scrollPercent,
  handleSetScrollPercentage,
  isDarkMode,
  handleToggleDarkMode,
}: HeaderProperties) {
  return (
    <header className="fixed top-0 z-20 w-full">
      <Navigation
        isDarkMode={isDarkMode}
        handleToggleDarkMode={handleToggleDarkMode}
      />
      <ProgressBar
        scrollPercent={scrollPercent}
        handleSetScrollPercentage={handleSetScrollPercentage}
      />
    </header>
  );
}
