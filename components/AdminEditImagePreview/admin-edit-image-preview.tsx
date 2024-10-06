import Image from "next/image";
import { useState } from "react";

import ImageCropDialog from "../ImageCropDialog/image-crop-dialog";

type AdminImagePreviewProperties = {
  handleSetFileImageUrl: (url: string) => void;
  fileImageUrl: string;
  crop?: { x: number; y: number };
  zoom?: number;
  rotation?: number;
  aspect?: { value: number; text: string };
};

export default function AdminImagePreview({
  handleSetFileImageUrl,
  fileImageUrl,
  crop,
  zoom,
  rotation,
  aspect,
}: AdminImagePreviewProperties) {
  const [selectedImageToCrop, setSelectedImageToCrop] = useState<string>();

  function onCancel() {
    setSelectedImageToCrop(undefined);
  }

  function onReset() {
    setSelectedImageToCrop(undefined);
    handleSetFileImageUrl("/img/preview.png");
  }

  // console.log("fileImageUrl", fileImageUrl);
  // console.log("selectedImageToCrop", selectedImageToCrop);

  return (
    <article className="flex gap-4 my-6 mx-0 items-center">
      {fileImageUrl === "/img/preview.png" ? "Vorschau:" : "Schneide dein Bild zurecht:"}
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
        className="rounded-[5px] w-auto h-[50px]"
        src={fileImageUrl}
        priority={true}
        alt="image preview and crop functioniality"
        height={512}
        width={512}
        onClick={
          fileImageUrl === "/img/preview.png"
            ? () => alert("Upload an image to start the cropping!")
            : () => setSelectedImageToCrop(fileImageUrl)
        }
      />
    </article>
  );
}
