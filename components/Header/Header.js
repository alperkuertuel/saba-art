import { styled } from "styled-components";

export default function Header() {
  return (
    <StyledHeader>
      <h1>VincentArte</h1>
      <p>
        <q>pictures are memories</q>
      </p>
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
