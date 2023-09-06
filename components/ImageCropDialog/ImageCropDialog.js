import { styled } from "styled-components";
import Cropper from "react-easy-crop";
import { useState } from "react";
import getCroppedImg from "./cropImage";

const aspectRatios = [
  { value: 4 / 3, text: "4/3" },
  { value: 16 / 9, text: "16/9" },
  { value: 9 / 16, text: "9/16" },
];

export default function ImageCropDialog({
  fileImageUrl,
  handleSetFileImageUrl,
  setSelectedImageToCrop,
  cropInit,
  zoomInit,
  rotationInit,
  aspectInit,
  onCancel,
}) {
  if (zoomInit == null) {
    zoomInit = 1;
  }
  if (cropInit == null) {
    cropInit = { x: 0, y: 0 };
  }
  if (aspectInit == null) {
    aspectInit = aspectRatios[0];
  }
  if (rotationInit == null) {
    rotationInit = 0;
  }

  const [zoom, setZoom] = useState(zoomInit || 1);
  const [crop, setCrop] = useState(cropInit);
  const [rotation, setRotation] = useState(rotationInit || 0);
  const [aspect, setAspect] = useState(aspectInit);
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

  function onAspectChange(event) {
    const value = event.target.value;
    const ratio = aspectRatios.find((ratio) => ratio.value == value);
    setAspect(ratio);
  }

  function onCropComplete(croppedArea, croppedAreaPixels) {
    setCroppedAreaPixels(croppedAreaPixels);
  }

  async function onCrop() {
    const croppedImageUrl = await getCroppedImg(fileImageUrl, croppedAreaPixels, rotation);
    handleSetFileImageUrl(croppedImageUrl);
    setSelectedImageToCrop(null);
  }

  return (
    <BackDrop>
      <CropContainer>
        <Cropper
          image={fileImageUrl}
          zoom={zoom}
          crop={crop}
          aspect={aspect.value}
          rotation={rotation}
          onCropChange={onCropChange}
          onZoomChange={onZoomChange}
          onRotateChange={onRotateChange}
          onCropComplete={onCropComplete}
        />
      </CropContainer>
      <Controls>
        <ControlsArea>
          Zoom:
          <Slider
            type="range"
            min={1}
            max={3}
            step={0.01}
            value={zoom}
            onChange={(event) => onZoomChange(event.target.value)}
          />
          Rotate:
          <Slider
            type="range"
            min={-360}
            max={360}
            step={0.01}
            value={rotation}
            onChange={(event) => onRotateChange(event.target.value)}
          />
          <SelectContainer>
            Select aspect ratio:
            <AspectRatioSelector onChange={onAspectChange}>
              {aspectRatios.map((ratio) => (
                <option
                  key={ratio.text}
                  value={ratio.value}
                  selected={ratio.value === aspect.value}
                >
                  {ratio.text}
                </option>
              ))}
            </AspectRatioSelector>
          </SelectContainer>
          <ButtonArea>
            <StyledButton onClick={onCancel}>Cancel</StyledButton>
            <StyledButton onClick={onCrop}>Crop</StyledButton>
          </ButtonArea>
        </ControlsArea>
      </Controls>
    </BackDrop>
  );
}

const BackDrop = styled.span`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.8);
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
  bottom: 200px;
`;

const Controls = styled.span`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 205px;
  background: black;
`;

const ControlsArea = styled.span`
  font-size: 1rem;
  color: white;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Slider = styled.input`
  width: 50%;
  margin: 5px;
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  height: 25px;
  background: var(--blue-grey);
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  &:hover {
    opacity: 1;
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    background: var(--border-color);
    cursor: pointer;
  }
  &::-moz-range-thumb {
    width: 25px;
    height: 25px;
    background: #04aa6d;
    cursor: pointer;
  }
`;

const SelectContainer = styled.span`
  display: flex;
  align-items: center;
`;

const AspectRatioSelector = styled.select`
  text-align: center;
  outline: none;
  display: inline-block;
  width: auto;
  border: 1px solid var(--border-color);
  border-radius: 5px;
  padding: 2px;
  margin: 5px;
`;

const ButtonArea = styled.span`
  display: flex;
  gap: 1rem;
  margin: 0.5rem;
`;

const StyledButton = styled.button`
  text-transform: uppercase;
  background-color: var(--secondary-color);
  color: white;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 5px;
  text-decoration: none;
  font-size: 1rem;
  &:hover {
    background-color: var(--tertiary-color);
    transition: background-color 0.2s ease;
    color: black;
  }
`;
