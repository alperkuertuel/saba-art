import Image from "next/image";
import styled from "styled-components";

export default function WelcomingAbout() {
  return (
    <WelcomingSection>
      <StyledWelcomingText>
        Hallo und herzlich willkommen in meiner online Kunst-Galerie!
      </StyledWelcomingText>
      <StyledAvatar priority={true} width={192} height={200} src="/img/saba-art.jpg" alt="Saba" />
      <StyledAboutParagraph>
        <q>Bilder sind Erinnerungen</q> finde ich, deshalb greife ich immer dann zu Pinsel und
        Farbe, wenn mich ein Erlebnis stark beeindruckt hat. Meine Bilder in Öl verbinden
        orientalische Empfindsamkeit mit dem Stil der europäischen Moderne. In meinen Werken setze
        ich mich überwiegend mit realen und phantastischen Formen auseinander.
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
