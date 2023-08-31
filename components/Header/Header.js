import styled from "styled-components";
import Link from "next/link";
import ProgressBar from "../ProgressBar/ProgressBar";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Header({ scrollPercent, handleSetScrollPercentage }) {
  const { data: session } = useSession();
  console.log("session", session);
  return (
    <StyledHeader>
      <ProgressBar
        scrollPercent={scrollPercent}
        handleSetScrollPercentage={handleSetScrollPercentage}
      />
      <h1>
        <Link href={`/`}>ArtistName</Link>
      </h1>
      <p>
        <q>pictures are memories</q>
      </p>
      <StyledLoginContainer>
        {session ? (
          <>
            <StyledButton onClick={signOut}>Logout</StyledButton>
            <p>Signed in as {session.user.email}</p>
          </>
        ) : (
          <StyledButton onClick={() => signIn()}>Login</StyledButton>
        )}
      </StyledLoginContainer>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  width: 100%;
  background-color: white;
  position: fixed;
  top: 0;
  padding: 0.5rem;
  border-bottom: 1px solid lightgrey;
  text-align: center;
  z-index: 1;
`;

const StyledLoginContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  font-size: 0.8rem;
  padding: 1rem;
`;

const StyledButton = styled.button`
  text-transform: uppercase;
  background-color: var(--secondary-color);
  color: white;
  padding: 0.8rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  font-size: inherit;
  &:hover {
    background-color: var(--tertiary-color);
    transition: background-color 0.2s ease;
    color: black;
  }
`;
