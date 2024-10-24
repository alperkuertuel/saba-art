import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

interface ScrollUpProperties {
  scrollPercent: number;
}

export default function ScrollUpButton({ scrollPercent }: ScrollUpProperties) {
  const [backToTopButton, setBackToTopButton] = useState(false);

  useEffect(() => {
    if (scrollPercent >= 15) {
      setBackToTopButton(true);
    } else setBackToTopButton(false);
  }, [scrollPercent]);

  return (
    <>
      {backToTopButton && (
        <button
          className="fixed bottom-3 right-4 z-20 size-auto rounded-full border border-cool-color bg-primary-color shadow-md"
          aria-label="nach oben scrollen"
        >
          <FontAwesomeIcon
            className="p-3 text-xl text-font-color"
            icon={faChevronUp}
            onClick={() => window.scrollTo(0, 0)}
          />
        </button>
      )}
    </>
  );
}
