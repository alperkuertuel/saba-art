import Link from "next/link";
import styled from "styled-components";
import { FacebookIcon, WhatsappIcon, WhatsappShareButton, FacebookShareButton } from "react-share";
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession, signIn, signOut } from "next-auth/react";

export default function FooterComponent() {
  const { data: session } = useSession();
  return (
    <StyledFooter>
      <ShareButtons>
        <li>
          <GreyShareFacebookIcon
            windowWidth={1000}
            windowHeight={400}
            url={`https://saba-art.com/`}
          >
            <FacebookIcon size={30} round={true} aria-label="share on facebook" />
          </GreyShareFacebookIcon>
        </li>
        <li>
          <GreyShareWhatsAppIcon
            aria-label="share on whats app"
            windowWidth={1000}
            windowHeight={1000}
            url={`https://saba-art.com/`}
          >
            <WhatsappIcon size={30} round={true} />
          </GreyShareWhatsAppIcon>
        </li>
      </ShareButtons>

      <ul>
        <DataItem>
          <Link href="/imprint">Impressum</Link>
        </DataItem>
        <DataItem>
          <Link href="/privacy-policy">Datenschutz</Link>
        </DataItem>
        <DataItem>&copy; saba-art 2023</DataItem>
      </ul>

      <StyledLoginContainer>
        {session && session.user.role === "Admin" ? (
          <>
            <button onClick={signOut} aria-label="sign out">
              <StyledLoginLock icon={faLockOpen} aria-label="opened lock" />
            </button>
          </>
        ) : (
          <button onClick={() => signIn()} aria-label="sign in">
            <StyledLoginLock icon={faLock} aria-label="closed lock" />
          </button>
        )}
      </StyledLoginContainer>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  font-size: 0.7rem;

  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-top: 1px solid var(--tertiary-color);
  background-color: var(--cool-brown);
`;

const ShareButtons = styled.ul`
  display: flex;
  gap: 1rem;
  margin-left: 0.5rem;
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

const StyledLoginContainer = styled.div`
  font-size: 0.8rem;
  padding: 0.3rem;
  border-radius: 5px;
  opacity: 0.7;
  background-color: var(--box-color);
  &:focus {
    background-color: var(--highlight);
  }
`;

const StyledLoginLock = styled(FontAwesomeIcon)`
  color: var(--secondary-color);
`;
