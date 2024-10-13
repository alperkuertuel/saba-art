import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';

import Button from '@/Button/Button';

interface ModalProperties {
  children: React.ReactNode | string;
  closeAction: () => void;
  confirmAction?: () => void;
  title?: string;
}

export const DetailsModal = ({
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

export const MessageModal = ({
  closeAction,
  confirmAction,
  title,
  children,
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
      <div className="fixed left-1/2 top-1/2 z-30 flex max-h-[50vh] w-[95%] max-w-screen-md -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 overflow-y-auto rounded-lg bg-primary-color p-4">
        <div className="flex w-full cursor-pointer justify-end text-xl">
          <FontAwesomeIcon icon={faCircleXmark} onClick={closeAction} />
        </div>
        {title && <h1>{title}</h1>}
        <p>{children}</p>
        <div className="flex justify-center gap-2">
          <Button
            variant="main"
            size="small"
            additionalStyles="sticky top-0"
            onClick={confirmAction}
          >
            Bestätigen
          </Button>
          <Button
            variant="main"
            size="small"
            additionalStyles="sticky top-0"
            onClick={closeAction}
          >
            Abbrechen
          </Button>
        </div>
      </div>
    </div>
  );
};
