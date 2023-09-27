import Link from "next/link";
import styled from "styled-components";
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession, signIn, signOut } from "next-auth/react";

export default function FooterComponent() {
  const { data: session } = useSession();
  return (
    <StyledFooter>
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
  position: fixed;
  z-index: 2;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
  border-top: 1px solid var(--tertiary-color);
  background-color: var(--cool-brown);
`;

const DataItem = styled.li`
  margin: 5px;
`;

const StyledLoginContainer = styled.div`
  font-size: 0.5rem;
  border-radius: 5px;
  opacity: 0.7;
  background-color: var(--box-color);
`;

const StyledLoginLock = styled(FontAwesomeIcon)`
  color: var(--secondary-color);
  padding: 0.3rem;
`;
