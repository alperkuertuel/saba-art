import { useEffect } from 'react';

interface ProgressBarProperties {
  scrollPercent: number;
  handleSetScrollPercentage: (scrollPercent: number) => void;
  width?: number;
}

export default function ProgressBar({
  scrollPercent,
  handleSetScrollPercentage,
}: ProgressBarProperties) {
  function handleScroll() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const maxScroll = documentHeight - windowHeight;
    const currentScrollPercent = Math.round((scrollY / maxScroll) * 100);
    handleSetScrollPercentage(currentScrollPercent);
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <div className="fixed left-0 top-0 h-[7px] w-full bg-cool-color">
      <div
        className="h-full bg-tertiary-color duration-100 ease-in-out"
        style={{ width: `${scrollPercent}%` }}
      />
    </div>
  );
}