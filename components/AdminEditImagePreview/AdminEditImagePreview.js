import Image from "next/image";
import styled from "styled-components";

export default function AdminImagePreview({ fileImageUrl }) {
  return (
    <StyledPreview>
      Preview:
      <StyledImage src={fileImageUrl} alt="upload image preview" height={40} width={40} />
    </StyledPreview>
  );
}

const StyledPreview = styled.p`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const StyledImage = styled(Image)`
  border-radius: 50%;
`;