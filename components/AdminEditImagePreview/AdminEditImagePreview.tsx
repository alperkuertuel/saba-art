import Image from "next/image";
import { useState } from "react";

import ImageCropDialog from "../ImageCropDialog/ImageCropDialog";

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
    <article className="mx-0 my-6 flex items-center gap-4">
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
        className="h-[50px] w-auto rounded-[5px]"
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
