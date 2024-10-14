import Image from 'next/image';
import { useState } from 'react';

import { InfoModal } from '@/Modal/DetailsModal';

import ImageCropDialog from '../ImageCropDialog/ImageCropDialog';

interface AdminImagePreviewProperties {
  handleSetFileImageUrl: (url: string) => void;
  fileImageUrl: string;
  crop?: { x: number; y: number };
  zoom?: number;
  rotation?: number;
  aspect?: { value: number; text: string };
}

export default function AdminEditImagePreview({
  handleSetFileImageUrl,
  fileImageUrl,
  crop,
  zoom,
  rotation,
  aspect,
}: AdminImagePreviewProperties) {
  const [selectedImageToCrop, setSelectedImageToCrop] = useState<string>();
  const [toggle, setToggle] = useState(false);

  function onCancel() {
    setSelectedImageToCrop(undefined);
  }

  function onReset() {
    setSelectedImageToCrop(undefined);
    handleSetFileImageUrl('/img/crop.png');
  }

  // console.log("fileImageUrl", fileImageUrl);
  // console.log("selectedImageToCrop", selectedImageToCrop);

  return (
    <>
      <article className="mx-0 my-6 flex items-center gap-4">
        {fileImageUrl === '/img/crop.png'
          ? 'Vorschau:'
          : 'Schneide dein Bild zurecht:'}
        {selectedImageToCrop && (
          <ImageCropDialog
            fileImageUrl={fileImageUrl}
            handleSetFileImageUrl={handleSetFileImageUrl}
            cropInit={crop}
            zoomInit={zoom}
            aspectInit={aspect}
            rotationInit={rotation}
            onCancel={onCancel}
            onReset={onReset}
            setSelectedImageToCrop={setSelectedImageToCrop}
          />
        )}
        <Image
          className="h-[35px] w-auto rounded-lg"
          src={fileImageUrl}
          priority={true}
          alt="image preview and crop functioniality"
          height={512}
          width={512}
          onClick={
            fileImageUrl === '/img/crop.png'
              ? () => setToggle(true)
              : () => setSelectedImageToCrop(fileImageUrl)
          }
        />
      </article>
      {toggle && (
        <InfoModal closeAction={() => setToggle(false)} title="Ups!">
          Du hast leider noch kein Bild ausgewählt.
        </InfoModal>
      )}
    </>
  );
}
