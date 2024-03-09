import styled from "styled-components";
import Link from "next/link";
import ProgressBar from "../ProgressBar/progress-bar";
import ThemeChanger from "../ThemeChanger/themes";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Header({
  scrollPercent,
  handleSetScrollPercentage,
  handleSetTheme,
  handleSetCurrentTheme,
  currentTheme,
}) {
  const { data: session } = useSession();
  //console.log("session", session);
  return (
    <StyledHeader>
      <ProgressBar
        scrollPercent={scrollPercent}
        handleSetScrollPercentage={handleSetScrollPercentage}
      />
      <h1>
        <Link href={`/`}>
          <StyledLogo
            priority={true}
            src={currentTheme === "light" ? "/img/logo_dark.png" : "/img/logo.png"}
            alt="saba-art"
            width={170}
            height={45}
          />
        </Link>
      </h1>
      <ThemeChanger
        handleSetTheme={handleSetTheme}
        handleSetCurrentTheme={handleSetCurrentTheme}
        currentTheme={currentTheme}
      />
      {session && session.user.role === "Admin" ? (
        <Link href="/admin">
          <Greeting>
            <StyledLoginAvatar
              src={
                session.user.image ??
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAAPklEQVR42u3OsQ0AAAQAMBIvm73uDtJe0KyOiWNSWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlr6eXoBiucrxq1KGkAAAAAASUVORK5CYII="
              }
              width={30}
              height={30}
              alt="user avatar"
            />
            {session.user.role}
          </Greeting>
        </Link>
      ) : (
        <Greeting>{session && `Hallo, ` + session.user.name}</Greeting>
      )}
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  width: 100%;
  background-color: var(--cool-brown);
  position: fixed;
  top: 0;
  padding: 0.2rem;
  border-bottom: 1px solid var(--tertiary-color);
  text-align: center;
  z-index: 3; // needed for the slide-show
`;

const StyledLogo = styled(Image)`
  margin: 0.5rem auto;
`;

const Greeting = styled.p`
  font-size: 0.8rem;
  position: fixed;
  right: 20px;
  top: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledLoginAvatar = styled(Image)`
  border-radius: 50%;
`;
