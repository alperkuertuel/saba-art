import { FacebookIcon, FacebookShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";

interface ShareButtonsProperties { slug: string }

export default function ShareButtons({ slug }: ShareButtonsProperties) {
  return (
    <ul className="flex justify-end gap-2">
      <li>
        <FacebookShareButton windowWidth={1000} windowHeight={400} url={`https://www.saba-art.com/art-pieces/${slug}`}>
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
      </li>
      <li>
        <WhatsappShareButton windowWidth={1000} windowHeight={1000} url={`https://www.saba-art.com/art-pieces/${slug}`}>
          <WhatsappIcon size={32} round={true} />
        </WhatsappShareButton>
      </li>
    </ul>
  );
}
