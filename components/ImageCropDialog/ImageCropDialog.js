import { styled } from "styled-components";
import Cropper from "react-easy-crop";
import { useState } from "react";

export default function ImageCropDialog({
  fileImageUrl,
  cropInit,
  zoomInit,
  rotationInit,
  onCancel,
}) {
  if (zoomInit == null) {
    zoomInit = 1;
  }
  if (cropInit == null) {
    cropInit = { x: 0, y: 0 };
  }
  if (rotationInit == null) {
    rotationInit = 0;
  }

  const [zoom, setZoom] = useState(zoomInit || 1);
  const [crop, setCrop] = useState(cropInit);
  const [rotation, setRotation] = useState(rotationInit || 0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  function onCropChange(crop) {
    setCrop(crop);
  }

  function onZoomChange(zoom) {
    setZoom(zoom);
  }

  function onRotateChange(rotation) {
    setRotation(rotation);
  }

  return (
    <BackDrop>
      <CropContainer>
        <Cropper
          image={fileImageUrl}
          zoom={zoom}
          crop={crop}
          rotation={rotation}
          onCropChange={onCropChange}
          onZoomChange={onZoomChange}
          onRotateChange={onRotateChange}
        />
      </CropContainer>
      <Controls>
        <ControlsArea>
          Zoom:
          <ZoomSlider
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(event) => onZoomChange(event.target.value)}
          />
          Rotate:
          <RotateSlider
            type="range"
            min={0}
            max={360}
            step={1}
            value={rotation}
            onChange={(event) => onRotateChange(event.target.value)}
          />
          <ButtonArea>
            <StyledButton onClick={onCancel}>Cancel</StyledButton>
            <StyledButton>Reset</StyledButton>
            <StyledButton>Crop</StyledButton>
          </ButtonArea>
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

  z-index: 1;
`;

const CropContainer = styled.span`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 150px;
`;

const Controls = styled.span`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 150px;
  background: black;
`;

const ControlsArea = styled.span`
  color: white;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ZoomSlider = styled.input`
  width: 50%;
  margin: 5px;
`;

const RotateSlider = styled.input`
  width: 50%;
  margin: 5px;
`;

const ButtonArea = styled.span`
  display: flex;
  gap: 1rem;
  margin: 1rem;
`;

const StyledButton = styled.button`
  font-size: 0.8rem;
  background-color: white;
  padding: 5px;
  border-radius: 5px;
  text-transform: uppercase;
`;
