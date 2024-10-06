import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { ArtPiece } from "pages/_app";
import { FacebookIcon, FacebookShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";

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
}: ArtPiece) {
  return (
    <div className="flex max-w-[800px] gap-4 flex-col">
      <figure>
        <Image
          className="object-contain pointer-events-none w-full h-auto max-h-[800px] rounded-[5px]"
          src={imageUrl}
          width={1000}
          height={1000}
          alt={name}
          priority={true}
        />
      </figure>
      <ul className="flex justify-end gap-2">
        <li>
          <FacebookShareButton
            windowWidth={1000}
            windowHeight={400}
            url={`https://www.saba-art.com/art-pieces/${slug}`}
          >
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
        </li>
        <li>
          <WhatsappShareButton
            windowWidth={1000}
            windowHeight={1000}
            url={`https://www.saba-art.com/art-pieces/${slug}`}
          >
            <WhatsappIcon size={32} round={true} />
          </WhatsappShareButton>
        </li>
      </ul>
      <figcaption className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h1>{name}</h1>
          <p>{date}</p>
        </div>
        <p className="flex items-center gap-4">
          Verfügbar:
          {available === true ? (
            <FontAwesomeIcon icon={faCheck} aria-label="Das Kunstwerk ist noch Verfügbar!" />
          ) : (
            <FontAwesomeIcon icon={faXmark} aria-label="Das Kunstwerk ist leider nicht mehr Verfügbar!" />
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
