import styled from "styled-components";
import Link from "next/link";
import ProgressBar from "../ProgressBar/ProgressBar";

export default function Header() {
  return (
    <StyledHeader>
      <ProgressBar />
      <h1>
        <Link href={`/`}>ArtistName</Link>
      </h1>
      <p>
        <q>pictures are memories</q>
      </p>
      <StyledLink href={`/admin`}>ADMIN</StyledLink>
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
`;

const StyledLink = styled(Link)`
  position: fixed;
  top: 0;
  left: 0;
  font-size: 0.8rem;
  padding: 1rem;
  color: #936946;
  letter-spacing: 2px;
  font-weight: bold;
`;
