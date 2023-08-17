import Image from "next/image";

export default function AdminImagePreview({ fileImageUrl, artPieceToEdit }) {
  return (
    <>
      {fileImageUrl && (
        <Image
          src={fileImageUrl}
          alt="upload image preview"
          height={50}
          width={50}
          quality={1}
        />
      )}
    </>
  );
}
