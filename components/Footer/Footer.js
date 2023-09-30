import Link from "next/link";
import styled from "styled-components";
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
        <DataItem>
          {session && session.user.role === "Admin" ? (
            <>
              <span onClick={signOut} aria-label="sign out">
                &copy; saba-art 2023
              </span>
            </>
          ) : (
            <span onClick={() => signIn()} aria-label="sign in">
              &copy; saba-art 2023
            </span>
          )}
        </DataItem>
      </ul>
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
