import Navigation from '@/Navigation/Navigation';
import ProgressBar from '@/ProgressBar/ProgressBar';

interface HeaderProperties {
  scrollPercent: number;
  handleSetScrollPercentage: (scrollPercent: number) => void | undefined;
}

export default function Header({
  scrollPercent,
  handleSetScrollPercentage,
}: HeaderProperties) {
  return (
    <header className="fixed top-0 z-20 w-full">
      <Navigation />
      <ProgressBar
        scrollPercent={scrollPercent}
        handleSetScrollPercentage={handleSetScrollPercentage}
      />
    </header>
  );
}
