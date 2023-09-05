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
  const [zoom, setZoom] = useState(zoomInit || 1);
  const [crop, setCrop] = useState(cropInit);
  const [aspect, setAspect] = useState(aspectInit);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  function onCropChange(crop) {
    setCrop(crop);
  }

  function onZoomChange(zoom) {
    setZoom(zoom);
  }

  return (
    <BackDrop>
      <CropContainer>
        <Cropper
          image={fileImageUrl}
          zoom={zoom}
          crop={crop}
          onCropChange={onCropChange}
          onZoomChange={onZoomChange}
        />
      </CropContainer>
      <Controls>
        <ControlsArea>
          <ZoomSlider
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(event) => onZoomChange(event.target.value)}
          />
        </ControlsArea>
      </Controls>
    </BackDrop>
  );
}

const BackDrop = styled.span`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.7);
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const CropContainer = styled.span`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Controls = styled.span`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 80px;
  background: darkgrey;
`;

const ControlsArea = styled.span`
  display: block;
  text-align: center;
  width: 100%;
  height: 100%;
  color: white;
`;

const ZoomSlider = styled.input`
  width: 50%;
  background-color: var(--cool-brown);
`;
