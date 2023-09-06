import styled from "styled-components";
import Link from "next/link";
import ProgressBar from "../ProgressBar/ProgressBar";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";

export default function Header({ scrollPercent, handleSetScrollPercentage }) {
  const { data: session } = useSession();
  //console.log("session", session);
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
      {session && session.user.role === "Admin" ? (
        <Link href="/admin">
          <Greeting>
            <StyledLoginAvatar
              src={
                session.user.image
                  ? session.user.image
                  : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAAPklEQVR42u3OsQ0AAAQAMBIvm73uDtJe0KyOiWNSWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlr6eXoBiucrxq1KGkAAAAAASUVORK5CYII="
              }
              width={30}
              height={30}
              alt="user avatar"
            />
            {session.user.role}
          </Greeting>
        </Link>
      ) : (
        <Greeting>{session && `Hello, ` + session.user.name}</Greeting>
      )}
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  width: 100%;
  background-color: var(--cool-brown);
  position: fixed;
  top: 0;
  padding: 0.5rem;
  border-bottom: 1px solid var(--border-color);
  text-align: center;
  z-index: 1;
`;

const StyledLoginContainer = styled.div`
  position: fixed;
  top: 10px;
  left: 15px;
  font-size: 0.8rem;
  padding: 0.5rem;
`;

const Greeting = styled.p`
  font-size: 0.8rem;
  position: fixed;
  right: 5px;
  top: 5px;
  width: 50px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledLoginLock = styled(FontAwesomeIcon)`
  color: var(--secondary-color);
`;

const StyledLoginAvatar = styled(Image)`
  border-radius: 50%;
  display: block;
  text-align: center;
`;
