import {
  faArrowRightArrowLeft,
  faSquare,
  faTableCellsLarge,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PreviewOption } from 'types/types';

interface DisplayPreviewOptionsProperties {
  handleSetPreviewOption: (previewOption: PreviewOption) => void;
  previewOption: PreviewOption;
}

export default function DisplayPreviewOptions({
  handleSetPreviewOption,
  previewOption,
}: DisplayPreviewOptionsProperties) {
  return (
    <>
      <button
        className="mr-6 rounded-lg p-2 py-1 text-xl shadow-box-style transition-colors duration-100 ease-in-out"
        style={{
          backgroundColor:
            previewOption === 'slideShow'
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
        className="mr-6 rounded-lg p-2 py-1 text-xl shadow-box-style transition-colors duration-100 ease-in-out"
        style={{
          backgroundColor:
            previewOption === 'smallGrid'
              ? 'var(--tertiary-color)'
              : 'var(--box-color)',
        }}
        onClick={() => handleSetPreviewOption('smallGrid')}
      >
        <FontAwesomeIcon
          aria-label="show middle size grid and have some tortilla chips"
          icon={faTableCellsLarge}
        />
      </button>
      <button
        className="mr-6 rounded-lg p-2 py-1 text-xl shadow-box-style transition-colors duration-100 ease-in-out"
        style={{
          backgroundColor:
            previewOption === 'mediumGrid'
              ? 'var(--tertiary-color)'
              : 'var(--box-color)',
        }}
        onClick={() => handleSetPreviewOption('mediumGrid')}
      >
        <FontAwesomeIcon
          aria-label="show large grid and listen to 2001 album by Dr. Dre"
          icon={faSquare}
        />
      </button>
    </>
  );
}
