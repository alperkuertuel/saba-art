import Link from "next/link";
import styled from "styled-components";
import { FacebookIcon, WhatsappIcon, WhatsappShareButton, FacebookShareButton } from "react-share";

export default function FooterComponent() {
  return (
    <StyledFooter>
      <ShareButtons>
        <li>
          <GreyShareFacebookIcon
            windowWidth={1000}
            windowHeight={400}
            url={`https://capstone-project-art-gallery-alper92.vercel.app/`}
          >
            <FacebookIcon size={30} round={true} aria-label="share on facebook" />
          </GreyShareFacebookIcon>
        </li>
        <li>
          <GreyShareWhatsAppIcon
            aria-label="share on whats app"
            windowWidth={1000}
            windowHeight={1000}
            url={`https://capstone-project-art-gallery-alper92.vercel.app/`}
            title={`I found this beautiful art gallery! Click the link for more: `}
          >
            <WhatsappIcon size={30} round={true} />
          </GreyShareWhatsAppIcon>
        </li>
      </ShareButtons>

      <ul>
        <DataItem>
          <Link href="/imprint">Imprint</Link>
        </DataItem>
        <DataItem>
          <Link href="/privacy-policy">Privacy Policy</Link>
        </DataItem>
      </ul>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  font-size: 0.7rem;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 0.5rem;
  border-top: 1px solid var(--tertiary-color);
  background-color: var(--cool-brown);
`;

const ShareButtons = styled.ul`
  display: flex;
  gap: 1rem;
`;

const DataItem = styled.li`
  margin: 5px;
`;

const GreyShareFacebookIcon = styled(FacebookShareButton)`
  filter: grayscale(0.8);
`;

const GreyShareWhatsAppIcon = styled(WhatsappShareButton)`
  filter: grayscale(0.8);
`;
