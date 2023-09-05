import { styled } from "styled-components";
import Cropper from "react-easy-crop";
import { useState } from "react";

const aspectRatios = [
  { value: 4 / 3, text: "4/3" },
  { value: 16 / 9, text: "16/9" },
  { value: 1 / 2, text: "1/2" },
];

export default function ImageCropDialog({ fileImageUrl, cropInit, zoomInit, aspectInit }) {
  if (zoomInit == null) {
    zoomInit = 1;
  }
  if (cropInit == null) {
    cropInit = { x: 0, y: 0 };
  }
  if (aspectInit == null) {
    aspectInit = aspectRatios[0];
  }
  const [zoom, setZoom] = useState(zoomInit);
  const [crop, setCrop] = useState(cropInit);
  const [aspect, setAspect] = useState(aspectInit);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  function onCropChange(crop) {
    setCrop(crop);
  }

  return (
    <BackDrop>
      <CropContainer>
        <Cropper image={fileImageUrl} zoom={zoom} crop={crop} onCropChange={onCropChange} />
      </CropContainer>
      <Controls></Controls>
    </BackDrop>
  );
}

const BackDrop = styled.span``;

const CropContainer = styled.span``;

const Controls = styled.span``;
