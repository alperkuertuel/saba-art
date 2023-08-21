import styled from "styled-components";
import Link from "next/link";

export default function Header() {
  return (
    <StyledHeader>
      <h1>
        <Link href={`/`}>ArtistName</Link>
      </h1>
      <p>
        <q>pictures are memories</q>
      </p>
      <StyledLink href={`/admin`}>ADMIN PAGE</StyledLink>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  width: 100%;
  background-color: white;
  position: fixed;
  top: 0;
  padding: 1rem;
  border-bottom: 1px solid lightgrey;
  text-align: center;
`;

const StyledLink = styled(Link)`
  font-size: 1rem;
  padding: 1rem;
  color: salmon;
`;
