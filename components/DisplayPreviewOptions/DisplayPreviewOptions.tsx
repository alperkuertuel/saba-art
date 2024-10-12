import {
  faArrowRightArrowLeft,
  faSquare,
  faTableCellsLarge,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface DisplayPreviewOptionsProperties {
  handleSetPreviewOption: (previewOption: string) => void;
  previewoption: string;
}

export default function DisplayPreviewOptions({
  handleSetPreviewOption,
  previewoption,
}: DisplayPreviewOptionsProperties) {
  return (
    <>
      <button
        className="mr-6 rounded-[5px] p-2 text-xl shadow-box-style transition-colors duration-100 ease-in-out"
        style={{
          backgroundColor:
            previewoption === 'slideShow'
              ? 'var(--tertiary-color)'
              : 'var(--box-color)',
        }}
        onClick={() => handleSetPreviewOption('slideShow')}
      >
        <FontAwesomeIcon
          aria-label="show slider and drink some beer"
          icon={faArrowRightArrowLeft}
        />
      </button>
      <button
        className="mr-6 rounded-[5px] p-2 text-xl shadow-box-style transition-colors duration-100 ease-in-out"
        style={{
          backgroundColor:
            previewoption === '130px'
              ? 'var(--tertiary-color)'
              : 'var(--box-color)',
        }}
        onClick={() => handleSetPreviewOption('130px')}
      >
        <FontAwesomeIcon
          aria-label="show middle size grid and have some tortilla chips"
          icon={faTableCellsLarge}
        />
      </button>
      <button
        className="mr-6 rounded-[5px] p-2 text-xl shadow-box-style transition-colors duration-100 ease-in-out"
        style={{
          backgroundColor:
            previewoption === '280px'
              ? 'var(--tertiary-color)'
              : 'var(--box-color)',
        }}
        onClick={() => handleSetPreviewOption('280px')}
      >
        <FontAwesomeIcon
          aria-label="show large grid and listen to 2001 album by Dr. Dre"
          icon={faSquare}
        />
      </button>
    </>
  );
}
