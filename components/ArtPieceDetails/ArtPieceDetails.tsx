import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { ArtPieceType } from 'pages/_app';

import ShareButtons from './ShareButtons';

export default function ArtPieceDetails({
  imageUrl,
  name,
  date,
  available,
  category,
  technique,
  description,
  widthReal,
  heightReal,
  slug,
}: ArtPieceType) {
  return (
    <div className="flex max-w-[800px] flex-col gap-4">
      <figure>
        <Image
          className="pointer-events-none h-auto max-h-[800px] w-full rounded-[5px] object-contain"
          src={imageUrl}
          width={1000}
          height={1000}
          alt={name}
          priority={true}
        />
      </figure>
      <ShareButtons slug={slug} />
      <figcaption className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1>{name}</h1>
          <p>{date}</p>
        </div>
        <p className="flex items-center gap-4">
          Verfügbar:
          {available === true ? (
            <FontAwesomeIcon
              icon={faCheck}
              aria-label="Das Kunstwerk ist noch Verfügbar!"
            />
          ) : (
            <FontAwesomeIcon
              icon={faXmark}
              aria-label="Das Kunstwerk ist leider nicht mehr Verfügbar!"
            />
          )}
        </p>
        <p>Kategorie: {category}</p>
        <p>Verwendete Technik: {technique}</p>
        <p>
          Größe: {widthReal}cm x {heightReal}cm
        </p>
        <p className="text-justify">{description}</p>
      </figcaption>
    </div>
  );
}
