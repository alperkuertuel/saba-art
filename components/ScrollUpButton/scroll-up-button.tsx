import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

type ScrollUpProperties = {
  scrollPercent: number;
};

export default function ScrollUp({ scrollPercent }: ScrollUpProperties) {
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
          className="fixed z-20 w-auto h-auto rounded-full bottom-3 right-4 bg-tertiary-color"
          aria-label="nach oben scrollen"
        >
          <FontAwesomeIcon
            className="text-secondary-color p-3 text-2xl"
            icon={faChevronUp}
            onClick={() => window.scrollTo(0, 0)}
          />
        </button>
      )}
    </>
  );
}
