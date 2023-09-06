import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import ImageCropDialog from "../ImageCropDialog/ImageCropDialog";

export default function AdminImagePreview({
  handleSetFileImageUrl,
  fileImageUrl,
  crop,
  zoom,
  rotation,
  aspect,
}) {
  const [selectedImageToCrop, setSelectedImageToCrop] = useState(null);

  function onCancel() {
    setSelectedImageToCrop(null);
  }
  console.log("fileImageUrl", fileImageUrl);
  console.log("selectedImageToCrop", selectedImageToCrop);

  return (
    <StyledPreview>
      {fileImageUrl === "/img/preview.png" ? "Upload preview:" : "Crop your image:"}
      {selectedImageToCrop && (
        <ImageCropDialog
          fileImageUrl={fileImageUrl}
          handleSetFileImageUrl={handleSetFileImageUrl}
          cropInit={crop}
          zoomInit={zoom}
          aspectInit={aspect}
          rotationInit={rotation}
          onCancel={onCancel}
          setSelectedImageToCrop={setSelectedImageToCrop}
        />
      )}
      <StyledImage
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
    </StyledPreview>
  );
}

const StyledPreview = styled.article`
  display: flex;
  gap: 1rem;
  margin: 1.5rem 0;
  align-items: center;
`;

const StyledImage = styled(Image)`
  border-radius: 5px;
  width: auto;
  height: 50px;
`;
