import Image from "next/image";
import styled from "styled-components";

export default function WelcomingAbout() {
  return (
    <WelcomingSection>
      <StyledWelcomingText>
        Hallo und herzlich willkommen in meiner online Kunst-Galerie!
      </StyledWelcomingText>
      <StyledAvatar priority={true} width={150} height={150} src="/img/saba-art.jpg" alt="Saba" />
      <StyledAboutParagraph>
        Meine Bilder in Öl verbinden orientalische Empfindsamkeit mit dem Stil der europäischen
        Moderne.
      </StyledAboutParagraph>
      <StyledAboutParagraph>
        Die Bilder in der Galerie werden regelmäßig aktualisiert, es lohnt sich also öfter mal
        vorbeizuschauen.
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
  width: 50%;
  text-align: center;
  color: var(--secondary-color);
`;

const StyledAvatar = styled(Image)`
  border-radius: 50%;
  border: 1px solid var(--tertiary-color);
`;

const StyledAboutParagraph = styled.p`
  text-align: justify;
  max-width: 100%;
`;
