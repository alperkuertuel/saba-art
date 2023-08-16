import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";
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
      <Link href={`/admin`}>
        <StyledKey icon={faKey} />
      </Link>
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

const StyledKey = styled(FontAwesomeIcon)`
  position: fixed;
  right: 0;
  top: 0;
  font-size: 2rem;
  padding: 1rem;
  color: salmon;
`;
