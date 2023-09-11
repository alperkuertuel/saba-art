import Image from "next/image";
import styled from "styled-components";

export default function WelcomingAbout() {
  return (
    <WelcomingSection>
      <StyledAvatar width={100} height={100} src="/img/avatar.jpg" alt="Avatar" />

      <StyledWelcomingText>
        Hello, I am Vincent. Welcome to my online art gallery!
      </StyledWelcomingText>
      <StyledAboutParagraph>
        As an artist who enjoys working with oil and acrylic paints, I strive to create paintings
        that incorporate vibrant colors and intricate details, with the goal of immersing viewers in
        a world of imagination.
      </StyledAboutParagraph>
    </WelcomingSection>
  );
}

const WelcomingSection = styled.section`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const StyledWelcomingText = styled.h2`
  width: 200px;
`;

const StyledAvatar = styled(Image)`
  border-radius: 50%;
  filter: grayscale(0.8);
`;

const StyledAboutParagraph = styled.p`
  text-align: justify;
  max-width: 100%;
`;
