/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';

import Button from '@/Button/Button';

import getCroppedImg from './crop-image';

const aspectRatios = [
  { value: 1 / 1, text: '1/1' }, // 1
  { value: 2 / 1, text: '2/1' }, // 2
  { value: 1 / 2, text: '1/2' }, // 0.5
  { value: 2 / 3, text: '2/3' }, // 0.67
  { value: 4 / 3, text: '4/3' }, // 1.33
  { value: 3 / 4, text: '3/4' }, // 0.75
  { value: 16 / 9, text: '16/9' }, // 1.77
  { value: 9 / 16, text: '9/16' }, // 0.56
];

interface ImageCropDialogProperties {
  fileImageUrl: string;
  handleSetFileImageUrl: (url: string) => void;
  setSelectedImageToCrop: (value: undefined) => void;
  cropInit?: { x: number; y: number };
  zoomInit?: number;
  rotationInit?: number;
  aspectInit?: { value: number; text: string };
  onCancel: () => void;
  onReset: () => void;
}

export default function ImageCropDialog({
  fileImageUrl,
  handleSetFileImageUrl,
  setSelectedImageToCrop,
  cropInit = { x: 0, y: 0 },
  zoomInit = 1,
  rotationInit = 0,
  aspectInit = aspectRatios[0],
  onCancel,
  onReset,
}: ImageCropDialogProperties) {
  const [zoom, setZoom] = useState(zoomInit);
  const [crop, setCrop] = useState(cropInit);
  const [rotation, setRotation] = useState(rotationInit);
  const [aspect, setAspect] = useState(aspectInit);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  }>();

  function onCropChange(crop: { x: number; y: number }) {
    setCrop(crop);
  }

  function onZoomChange(zoom: number) {
    setZoom(zoom);
  }

  function onRotateChange(rotation: number) {
    setRotation(rotation);
  }

  function onAspectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = Number.parseFloat(event.target.value);
    const ratio = aspectRatios.find((ratio) => ratio.value === value);
    if (ratio) {
      setAspect(ratio);
    }
  }

  function onCropComplete(
    croppedArea: Area,
    croppedAreaPixels: { x: number; y: number; width: number; height: number }
  ) {
    setCroppedAreaPixels(croppedAreaPixels);
  }

  async function onCrop() {
    if (croppedAreaPixels) {
      const croppedImageUrl = await getCroppedImg(
        fileImageUrl,
        croppedAreaPixels,
        rotation
      );
      handleSetFileImageUrl(croppedImageUrl);
      setSelectedImageToCrop(undefined);
    }
  }

  return (
    <div className="fixed inset-0 z-30 bg-black/80">
      <div className="fixed inset-x-0 bottom-[250px] top-0 w-full">
        <Cropper
          image={fileImageUrl}
          zoom={zoom}
          crop={crop}
          aspect={aspect.value}
          rotation={rotation}
          onCropChange={onCropChange}
          onZoomChange={onZoomChange}
          onRotationChange={onRotateChange}
          onCropComplete={onCropComplete}
        />
      </div>
      <div className="fixed bottom-0 h-[250px] w-full bg-primary-color">
        <div className="flex w-full flex-col items-start gap-2 p-2">
          <label htmlFor="zoom">Zoom:</label>
          <input
            className="m-1 h-[25px] w-full appearance-none bg-secondary-color opacity-70 outline-none transition-opacity duration-200 hover:opacity-100"
            type="range"
            id="zoom"
            name="zoom"
            min={0.8}
            max={3}
            step={0.01}
            value={zoom}
            onChange={(event) =>
              onZoomChange(Number.parseFloat(event.target.value))
            }
          />
          <label htmlFor="rotate">Rotate:</label>
          <input
            className="m-1 h-[25px] w-full appearance-none bg-secondary-color opacity-70 outline-none transition-opacity duration-200 hover:opacity-100"
            type="range"
            id="rotate"
            name="rotate"
            min={-360}
            max={360}
            step={0.01}
            value={rotation}
            onChange={(event) =>
              onRotateChange(Number.parseFloat(event.target.value))
            }
          />
          <fieldset className="flex items-center border-none">
            <label htmlFor="aspect-ratio">Select aspect ratio:</label>
            <select
              className="ml-2 w-auto rounded-lg border border-tertiary-color bg-primary-color py-1 text-center text-font-color outline-none"
              id="aspect-ratio"
              name="aspect-ratio"
              onChange={onAspectChange}
            >
              {aspectRatios.map((ratio) => (
                <option
                  key={ratio.text}
                  value={ratio.value}
                  defaultValue={ratio.value ?? aspect.value}
                >
                  {ratio.text}
                </option>
              ))}
            </select>
          </fieldset>
          <div className="my-2 flex gap-2">
            <Button onClick={onCancel}>Cancel</Button>
            <Button onClick={onReset}>Reset</Button>
            <Button onClick={onCrop}>Crop</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
