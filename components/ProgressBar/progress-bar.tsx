import { useEffect } from "react";

type ProgressBarProperties = {
  scrollPercent: number;
  handleSetScrollPercentage: (scrollPercent: number) => void;
  width?: number;
};

export default function ProgressBar({ scrollPercent, handleSetScrollPercentage }: ProgressBarProperties) {
  function handleScroll() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const maxScroll = documentHeight - windowHeight;
    const currentScrollPercent = Math.round((scrollY / maxScroll) * 100);
    handleSetScrollPercentage(currentScrollPercent);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <div className="fixed top-0 left-0 w-[100%] h-[7px] bg-cool-brown">
      <div
        className="h-full bg-tertiary-color transition-width duration-100 ease-in-out"
        style={{ width: `${scrollPercent}%` }}
      />
    </div>
  );
}
