import { styled } from "styled-components";

export default function Header() {
  return (
    <StyledHeader>
      <h1>Saba Art</h1>
      <p>
        <q>pictures are memories</q>
      </p>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  width: 100%;
  position: fixed;
  padding: 1rem;
  border-bottom: 1px solid lightgrey;
  text-align: center;
`;
