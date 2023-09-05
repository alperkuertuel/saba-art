import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import ImageCropDialog from "../ImageCropDialog/ImageCropDialog";

export default function AdminImagePreview({ fileImageUrl, crop, zoom, rotation }) {
  const [selectedImageToCrop, setSelectedImageToCrop] = useState(null);
  console.log(fileImageUrl);
  return (
    <StyledPreview>
      Preview:
      {selectedImageToCrop && (
        <ImageCropDialog
          fileImageUrl={fileImageUrl}
          cropInit={crop}
          zoomInit={zoom}
          rotationInit={rotation}
        />
      )}
      <StyledImage
        src={fileImageUrl}
        alt="upload image preview"
        height={40}
        width={40}
        onClick={() => setSelectedImageToCrop(fileImageUrl)}
      />
    </StyledPreview>
  );
}

const StyledPreview = styled.article`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const StyledImage = styled(Image)`
  border-radius: 50%;
`;
