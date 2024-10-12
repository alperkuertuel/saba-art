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
        className="mr-6 rounded-[5px] p-2 text-xl text-tertiary-color shadow-box-style transition-colors duration-100 ease-in-out"
        style={{
          backgroundColor:
            previewoption === 'slideShow'
              ? 'var(--cool-color)'
              : 'var(--box-color)',
        }}
        onClick={() => handleSetPreviewOption('slideShow')}
      >
        <FontAwesomeIcon
          aria-label="show slider"
          icon={faArrowRightArrowLeft}
        />
      </button>
      <button
        className="mr-6 rounded-[5px] p-2 text-xl text-tertiary-color shadow-box-style transition-colors duration-100 ease-in-out"
        style={{
          backgroundColor:
            previewoption === '130px'
              ? 'var(--cool-color)'
              : 'var(--box-color)',
        }}
        onClick={() => handleSetPreviewOption('130px')}
      >
        <FontAwesomeIcon
          aria-label="show middle size grid"
          icon={faTableCellsLarge}
        />
      </button>
      <button
        className="mr-6 rounded-[5px] p-2 text-xl text-tertiary-color shadow-box-style transition-colors duration-100 ease-in-out"
        style={{
          backgroundColor:
            previewoption === '280px'
              ? 'var(--cool-color)'
              : 'var(--box-color)',
        }}
        onClick={() => handleSetPreviewOption('280px')}
      >
        <FontAwesomeIcon aria-label="show large grid" icon={faSquare} />
      </button>
    </>
  );
}
