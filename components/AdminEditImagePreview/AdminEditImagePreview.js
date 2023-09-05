import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import ImageCropDialog from "../ImageCropDialog/ImageCropDialog";

export default function AdminImagePreview({ fileImageUrl }) {
  const [selectedImageToCrop, setSelectedImageToCrop] = useState(null);
  console.log(fileImageUrl);
  return (
    <StyledPreview>
      Preview:
      {fileImageUrl !== "/img/preview.png" ? (
        <ImageCropDialog
          fileImageUrl={fileImageUrl}
          cropInit={crop}
          zoomInit={zoom}
          aspectInit={aspect}
        />
      ) : null}
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

const StyledPreview = styled.p`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const StyledImage = styled(Image)`
  border-radius: 50%;
`;
