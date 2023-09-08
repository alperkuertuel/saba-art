import Image from "next/image";
import styled from "styled-components";

export default function LoadingDots() {
  return <LoadingDotsComponent src="/img/loading_dots.gif" width={20} height={5} alt="..." />;
}

const LoadingDotsComponent = styled(Image)`
  display: inline-block;
  width: 20;
  height: 5;
`;
