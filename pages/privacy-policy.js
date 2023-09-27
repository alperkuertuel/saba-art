import FooterComponent from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import ScrollUp from "@/components/ScrollUpButton/ScrollUpButton";
import { faArrowLeftLong, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import styled from "styled-components";

export default function PrivacyPolicy({
  scrollPercent,
  handleSetScrollPercentage,
  handleSetTheme,
  handleSetCurrentTheme,
  currentTheme,
}) {
  return (
    <>
      <Header
        scrollPercent={scrollPercent}
        handleSetScrollPercentage={handleSetScrollPercentage}
        handleSetTheme={handleSetTheme}
        handleSetCurrentTheme={handleSetCurrentTheme}
        currentTheme={currentTheme}
      />
      <main>
        <Link href="/">
          <FontAwesomeIcon icon={faArrowLeftLong} /> BACK
        </Link>
        <h2>Datenschutzerklärung</h2>
        <StyledParagraph>
          Mit der folgenden Datenschutzerklärung möchten wir Sie darüber aufklären, welche Arten
          Ihrer personenbezogenen Daten (nachfolgend auch kurz als Daten bezeichnet) wir zu welchen
          Zwecken und in welchem Umfang im Rahmen der Bereitstellung unserer Applikation
          verarbeiten.
        </StyledParagraph>
        <StyledParagraph>
          Die verwendeten Begriffe sind nicht geschlechtsspezifisch.
        </StyledParagraph>
        <StyledParagraph>Stand: 21. September 2023</StyledParagraph>
        <h3>Verantwortlicher</h3>
        <StyledParagraph>
          Alper Kürtül
          <br />
          Schwanitzstr. 3
          <br />
          98693 Ilmenau
        </StyledParagraph>

        <StyledParagraph>
          E-Mail:{" "}
          <Link href="mailto:alperkuertuel@hotmail.de">
            <FontAwesomeIcon icon={faEnvelope} />
          </Link>
        </StyledParagraph>
        <h3>Kontakt Datenschutzbeauftragter</h3>
        <StyledParagraph>
          E-Mail:{" "}
          <Link href="mailto:alperkuertuel@hotmail.de">
            <FontAwesomeIcon icon={faEnvelope} />
          </Link>
        </StyledParagraph>
        <h3>Übersicht der Verarbeitungen</h3>
        <StyledParagraph>
          Die nachfolgende Übersicht fasst die Arten der verarbeiteten Daten und die Zwecke ihrer
          Verarbeitung zusammen und verweist auf die betroffenen Personen.
        </StyledParagraph>
        <h3>Arten der verarbeiteten Daten</h3>
        <ul>
          <li>Kontaktdaten.</li>
          <li>Inhaltsdaten.</li>
          <li>Nutzungsdaten.</li>
          <li>Meta-, Kommunikations- und Verfahrensdaten.</li>
          <li>Event-Daten (Facebook).</li>
        </ul>
        <h3>Kategorien betroffener Personen</h3>
        <ul>
          <li>Nutzer.</li>
        </ul>
        <h3>Zwecke der Verarbeitung</h3>
        <ul>
          <li>Kontaktanfragen und Kommunikation.</li>
          <li>Feedback.</li>
          <li>Marketing.</li>
          <li>Profile mit nutzerbezogenen Informationen.</li>
          <li>Bereitstellung unseres Onlineangebotes und Nutzerfreundlichkeit.</li>
        </ul>
        <h3>Maßgebliche Rechtsgrundlagen</h3>
        <h3>Sicherheitsmaßnahmen</h3>
        <StyledParagraph>
          Wir treffen nach Maßgabe der gesetzlichen Vorgaben unter Berücksichtigung des Stands der
          Technik, der Implementierungskosten und der Art, des Umfangs, der Umstände und der Zwecke
          der Verarbeitung sowie der unterschiedlichen Eintrittswahrscheinlichkeiten und des
          Ausmaßes der Bedrohung der Rechte und Freiheiten natürlicher Personen geeignete technische
          und organisatorische Maßnahmen, um ein dem Risiko angemessenes Schutzniveau zu
          gewährleisten.
        </StyledParagraph>
        <StyledParagraph>
          Zu den Maßnahmen gehören insbesondere die Sicherung der Vertraulichkeit, Integrität und
          Verfügbarkeit von Daten durch Kontrolle des physischen und elektronischen Zugangs zu den
          Daten als auch des sie betreffenden Zugriffs, der Eingabe, der Weitergabe, der Sicherung
          der Verfügbarkeit und ihrer Trennung. Des Weiteren haben wir Verfahren eingerichtet, die
          eine Wahrnehmung von Betroffenenrechten, die Löschung von Daten und Reaktionen auf die
          Gefährdung der Daten gewährleisten. Ferner berücksichtigen wir den Schutz
          personenbezogener Daten bereits bei der Entwicklung bzw. Auswahl von Hardware, Software
          sowie Verfahren entsprechend dem Prinzip des Datenschutzes, durch Technikgestaltung und
          durch datenschutzfreundliche Voreinstellungen.
        </StyledParagraph>
        <StyledParagraph>
          TLS/SSL-Verschlüsselung (https): Um die Daten der Benutzer, die über unsere Online-Dienste
          übertragen werden, zu schützen, verwenden wir TLS/SSL-Verschlüsselung. Secure Sockets
          Layer (SSL) ist die Standardtechnologie zur Sicherung von Internetverbindungen durch
          Verschlüsselung der zwischen einer Website oder App und einem Browser (oder zwischen zwei
          Servern) übertragenen Daten. Transport Layer Security (TLS) ist eine aktualisierte und
          sicherere Version von SSL. Hyper Text Transfer Protocol Secure (HTTPS) wird in der URL
          angezeigt, wenn eine Website durch ein SSL/TLS-Zertifikat gesichert ist.
        </StyledParagraph>
        <h3>Präsenzen in sozialen Netzwerken (Social Media)</h3>
        <StyledParagraph>
          Wir unterhalten Onlinepräsenzen innerhalb sozialer Netzwerke und verarbeiten in diesem
          Rahmen Daten der Nutzer, um mit den dort aktiven Nutzern zu kommunizieren oder um
          Informationen über uns anzubieten.
        </StyledParagraph>
        <StyledParagraph>
          Die Verarbeitung der personenbezogenen Daten der Nutzer erfolgt auf Grundlage unserer
          berechtigten Interessen an einer effektiven Information der Nutzer und Kommunikation mit
          den Nutzern gem. Art. 6 Abs. 1 lit. f. DSGVO. Falls die Nutzer von den jeweiligen
          Anbietern um eine Einwilligung in die Datenverarbeitung gebeten werden (d.h., ihr
          Einverständnis z.B. über das Anhaken eines Kontrollkästchens erklären) ist die
          Rechtsgrundlage der Verarbeitung Art. 6 Abs. 1 lit. a., Art. 7 DSGVO.
        </StyledParagraph>
        <StyledParagraph>
          Für eine detaillierte Darstellung der jeweiligen Verarbeitungen und der
          Widerspruchsmöglichkeiten (Opt-Out), verweisen wir auf die nachfolgend verlinkten Angaben
          der Anbieter.
        </StyledParagraph>
        <StyledParagraph>
          Auch im Fall von Auskunftsanfragen und der Geltendmachung von Nutzerrechten, weisen wir
          darauf hin, dass diese am effektivsten bei den Anbietern geltend gemacht werden können.
          Nur die Anbieter haben jeweils Zugriff auf die Daten der Nutzer und können direkt
          entsprechende Maßnahmen ergreifen und Auskünfte geben. Sollten Sie dennoch Hilfe
          benötigen, dann können Sie sich an uns wenden.
        </StyledParagraph>
        <StyledParagraph>
          <Link
            href="https://www.facebook.com/legal/terms/page_controller_addendum"
            target="_blank"
          >
            Facebook (Facebook Ireland Ltd., 4 Grand Canal Square, Grand Canal Harbour, Dublin 2,
            Irland) – Datenschutzerklärung
          </Link>
        </StyledParagraph>
        <StyledParagraph>
          Opt-Out: <br />
          <Link href="https://www.facebook.com/settings?tab=ads" target="_blank">
            https://www.facebook.com/settings?tab=ads
          </Link>
          <br />
          <Link href="http://www.youronlinechoices.com" target="_blank">
            http://www.youronlinechoices.com
          </Link>
        </StyledParagraph>
        <StyledParagraph>
          Instagram (Instagram Inc., 1601 Willow Road, Menlo Park, CA, 94025, USA) –
          Datenschutzerklärung/ Opt-Out:
          <Link href="http://instagram.com/about/legal/privacy/" target="_blank">
            http://instagram.com/about/legal/privacy/
          </Link>
        </StyledParagraph>
        <h3>Plugins und eingebettete Funktionen sowie Inhalte</h3>
        <StyledParagraph>
          Innerhalb unseres Onlineangebotes setzen wir auf Grundlage unserer berechtigten Interessen
          (d.h. Interesse an der Analyse, Optimierung und wirtschaftlichem Betrieb unseres
          Onlineangebotes im Sinne des Art. 6 Abs. 1 lit. f. DSGVO) Inhalts- oder Serviceangebote
          von Drittanbietern ein, um deren Inhalte und Services, wie z.B. Videos oder Schriftarten
          einzubinden (nachfolgend einheitlich bezeichnet als Inhalte).
        </StyledParagraph>
        <StyledParagraph>
          Dies setzt immer voraus, dass die Drittanbieter dieser Inhalte, die IP-Adresse der Nutzer
          wahrnehmen, da sie ohne die IP-Adresse die Inhalte nicht an deren Browser senden könnten.
          Die IP-Adresse ist damit für die Darstellung dieser Inhalte erforderlich. Wir bemühen uns
          nur solche Inhalte zu verwenden, deren jeweilige Anbieter die IP-Adresse lediglich zur
          Auslieferung der Inhalte verwenden. Drittanbieter können ferner sogenannte Pixel-Tags
          (unsichtbare Grafiken, auch als Web Beacons bezeichnet) für statistische oder
          Marketingzwecke verwenden. Durch die Pixel-Tags können Informationen, wie der
          Besucherverkehr auf den Seiten dieser Website, ausgewertet werden. Die pseudonymen
          Informationen können ferner in Cookies auf dem Gerät der Nutzer gespeichert werden und
          unter anderem technische Informationen zum Browser und Betriebssystem, verweisende
          Webseiten, Besuchszeit sowie weitere Angaben zur Nutzung unseres Onlineangebotes
          enthalten, als auch mit solchen Informationen aus anderen Quellen verbunden werden.
        </StyledParagraph>
        <StyledParagraph>
          Youtube:
          <br />
          Wir binden die Videos der Plattform “YouTube” des Anbieters Google LLC, 1600 Amphitheatre
          Parkway, Mountain View, CA 94043, USA, ein. Datenschutzerklärung:
          <br />
          <Link href="https://www.google.com/policies/privacy/" target="_blank">
            https://www.google.com/policies/privacy/
          </Link>
          <br />
          Opt-Out:{" "}
          <Link href="https://adssettings.google.com/authenticated" target="_blank">
            https://adssettings.google.com/authenticated
          </Link>
        </StyledParagraph>
        <ScrollUp scrollPercent={scrollPercent} />
      </main>
      <FooterComponent />
    </>
  );
}

const StyledParagraph = styled.p`
  margin: 0.5rem 0;
`;
