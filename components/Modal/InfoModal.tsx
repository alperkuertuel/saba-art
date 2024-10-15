import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';

interface ModalProperties {
  children: React.ReactNode | string;
  closeAction: () => void;
  title?: string;
}

export const InfoModal = ({
  children,
  closeAction,
  title,
}: ModalProperties) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeAction();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeAction]);
  return (
    <div className="fixed left-0 top-0 z-30 size-full bg-black/70">
      <div className="fixed left-1/2 top-1/2 z-30 flex max-h-[90vh] w-[95%] max-w-screen-md -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 overflow-y-auto rounded-lg bg-primary-color p-4">
        <div className="flex w-full cursor-pointer justify-end text-xl">
          <FontAwesomeIcon icon={faCircleXmark} onClick={closeAction} />
        </div>
        {title && <h1 className="m-0 border-none">{title}</h1>}
        {children}
      </div>
    </div>
  );
};
