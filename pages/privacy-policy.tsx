import { faArrowLeftLong, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';

import FooterComponent from '@/Footer/Footer';
import Header from '@/Header/Header';
import ScrollUp from '@/ScrollUpButton/ScrollUpButton';

interface PrivacyPolicyPageProperties {
  isDarkMode: boolean;
  handleToggleDarkMode: (isDarkMode: boolean) => void;
  scrollPercent: number;
  handleSetScrollPercentage: (scrollPercent: number) => void;
}

export default function PrivacyPolicyPage({
  isDarkMode,
  handleToggleDarkMode,
  scrollPercent,
  handleSetScrollPercentage,
}: PrivacyPolicyPageProperties) {
  const router = useRouter();
  return (
    <>
      <Header
        isDarkMode={isDarkMode}
        handleToggleDarkMode={handleToggleDarkMode}
        scrollPercent={scrollPercent}
        handleSetScrollPercentage={handleSetScrollPercentage}
      />
      <main>
        <Link href="/">
          <FontAwesomeIcon icon={faArrowLeftLong} /> BACK
        </Link>
        <h2>Datenschutzerklärung</h2>
        <p>
          Mit der folgenden Datenschutzerklärung möchten wir Sie darüber
          aufklären, welche Arten Ihrer personenbezogenen Daten (nachfolgend
          auch kurz als Daten bezeichnet) wir zu welchen Zwecken und in welchem
          Umfang im Rahmen der Bereitstellung unserer Applikation verarbeiten.
        </p>
        <p>Die verwendeten Begriffe sind nicht geschlechtsspezifisch.</p>
        <p>Stand: 21. September 2023</p>
        <h3>Verantwortlicher</h3>
        <p>
          Alper Kürtül
          <br />
          Schwanitzstr. 3
          <br />
          98693 Ilmenau
        </p>

        <p>
          <button
            type="button"
            onClick={() => void router.push('mailto:alperkuertuel@hotmail.de')}
          >
            E-Mail <FontAwesomeIcon icon={faEnvelope} />
          </button>
        </p>
        <h3>Kontakt Datenschutzbeauftragter</h3>
        <p>
          <button
            type="button"
            onClick={() => void router.push('mailto:alperkuertuel@hotmail.de')}
          >
            E-Mail <FontAwesomeIcon icon={faEnvelope} />
          </button>
        </p>
        <h3>Übersicht der Verarbeitungen</h3>
        <p>
          Die nachfolgende Übersicht fasst die Arten der verarbeiteten Daten und
          die Zwecke ihrer Verarbeitung zusammen und verweist auf die
          betroffenen Personen.
        </p>
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
          <li>
            Bereitstellung unseres Onlineangebotes und Nutzerfreundlichkeit.
          </li>
        </ul>
        <h3>Maßgebliche Rechtsgrundlagen</h3>
        <h3>Sicherheitsmaßnahmen</h3>
        <p>
          Wir treffen nach Maßgabe der gesetzlichen Vorgaben unter
          Berücksichtigung des Stands der Technik, der Implementierungskosten
          und der Art, des Umfangs, der Umstände und der Zwecke der Verarbeitung
          sowie der unterschiedlichen Eintrittswahrscheinlichkeiten und des
          Ausmaßes der Bedrohung der Rechte und Freiheiten natürlicher Personen
          geeignete technische und organisatorische Maßnahmen, um ein dem Risiko
          angemessenes Schutzniveau zu gewährleisten.
        </p>
        <p>
          Zu den Maßnahmen gehören insbesondere die Sicherung der
          Vertraulichkeit, Integrität und Verfügbarkeit von Daten durch
          Kontrolle des physischen und elektronischen Zugangs zu den Daten als
          auch des sie betreffenden Zugriffs, der Eingabe, der Weitergabe, der
          Sicherung der Verfügbarkeit und ihrer Trennung. Des Weiteren haben wir
          Verfahren eingerichtet, die eine Wahrnehmung von Betroffenenrechten,
          die Löschung von Daten und Reaktionen auf die Gefährdung der Daten
          gewährleisten. Ferner berücksichtigen wir den Schutz personenbezogener
          Daten bereits bei der Entwicklung bzw. Auswahl von Hardware, Software
          sowie Verfahren entsprechend dem Prinzip des Datenschutzes, durch
          Technikgestaltung und durch datenschutzfreundliche Voreinstellungen.
        </p>
        <p>
          TLS/SSL-Verschlüsselung (https): Um die Daten der Benutzer, die über
          unsere Online-Dienste übertragen werden, zu schützen, verwenden wir
          TLS/SSL-Verschlüsselung. Secure Sockets Layer (SSL) ist die
          Standardtechnologie zur Sicherung von Internetverbindungen durch
          Verschlüsselung der zwischen einer Website oder App und einem Browser
          (oder zwischen zwei Servern) übertragenen Daten. Transport Layer
          Security (TLS) ist eine aktualisierte und sicherere Version von SSL.
          Hyper Text Transfer Protocol Secure (HTTPS) wird in der URL angezeigt,
          wenn eine Website durch ein SSL/TLS-Zertifikat gesichert ist.
        </p>
        <h3>Präsenzen in sozialen Netzwerken (Social Media)</h3>
        <p>
          Wir unterhalten Onlinepräsenzen innerhalb sozialer Netzwerke und
          verarbeiten in diesem Rahmen Daten der Nutzer, um mit den dort aktiven
          Nutzern zu kommunizieren oder um Informationen über uns anzubieten.
        </p>
        <p>
          Die Verarbeitung der personenbezogenen Daten der Nutzer erfolgt auf
          Grundlage unserer berechtigten Interessen an einer effektiven
          Information der Nutzer und Kommunikation mit den Nutzern gem. Art. 6
          Abs. 1 lit. f. DSGVO. Falls die Nutzer von den jeweiligen Anbietern um
          eine Einwilligung in die Datenverarbeitung gebeten werden (d.h., ihr
          Einverständnis z.B. über das Anhaken eines Kontrollkästchens erklären)
          ist die Rechtsgrundlage der Verarbeitung Art. 6 Abs. 1 lit. a., Art. 7
          DSGVO.
        </p>
        <p>
          Für eine detaillierte Darstellung der jeweiligen Verarbeitungen und
          der Widerspruchsmöglichkeiten (Opt-Out), verweisen wir auf die
          nachfolgend verlinkten Angaben der Anbieter.
        </p>
        <p>
          Auch im Fall von Auskunftsanfragen und der Geltendmachung von
          Nutzerrechten, weisen wir darauf hin, dass diese am effektivsten bei
          den Anbietern geltend gemacht werden können. Nur die Anbieter haben
          jeweils Zugriff auf die Daten der Nutzer und können direkt
          entsprechende Maßnahmen ergreifen und Auskünfte geben. Sollten Sie
          dennoch Hilfe benötigen, dann können Sie sich an uns wenden.
        </p>
        <p>
          <Link
            href="https://www.facebook.com/legal/terms/page_controller_addendum"
            target="_blank"
          >
            Facebook (Facebook Ireland Ltd., 4 Grand Canal Square, Grand Canal
            Harbour, Dublin 2, Irland) – Datenschutzerklärung
          </Link>
        </p>
        <p>
          Opt-Out: <br />
          <Link
            href="https://www.facebook.com/settings?tab=ads"
            target="_blank"
          >
            https://www.facebook.com/settings?tab=ads
          </Link>
          <br />
          <Link href="http://www.youronlinechoices.com" target="_blank">
            http://www.youronlinechoices.com
          </Link>
        </p>
        <p>
          Instagram (Instagram Inc., 1601 Willow Road, Menlo Park, CA, 94025,
          USA) – Datenschutzerklärung/ Opt-Out:
          <Link
            href="http://instagram.com/about/legal/privacy/"
            target="_blank"
          >
            http://instagram.com/about/legal/privacy/
          </Link>
        </p>
        <h3>Plugins und eingebettete Funktionen sowie Inhalte</h3>
        <p>
          Innerhalb unseres Onlineangebotes setzen wir auf Grundlage unserer
          berechtigten Interessen (d.h. Interesse an der Analyse, Optimierung
          und wirtschaftlichem Betrieb unseres Onlineangebotes im Sinne des Art.
          6 Abs. 1 lit. f. DSGVO) Inhalts- oder Serviceangebote von
          Drittanbietern ein, um deren Inhalte und Services, wie z.B. Videos
          oder Schriftarten einzubinden (nachfolgend einheitlich bezeichnet als
          Inhalte).
        </p>
        <p>
          Dies setzt immer voraus, dass die Drittanbieter dieser Inhalte, die
          IP-Adresse der Nutzer wahrnehmen, da sie ohne die IP-Adresse die
          Inhalte nicht an deren Browser senden könnten. Die IP-Adresse ist
          damit für die Darstellung dieser Inhalte erforderlich. Wir bemühen uns
          nur solche Inhalte zu verwenden, deren jeweilige Anbieter die
          IP-Adresse lediglich zur Auslieferung der Inhalte verwenden.
          Drittanbieter können ferner sogenannte Pixel-Tags (unsichtbare
          Grafiken, auch als Web Beacons bezeichnet) für statistische oder
          Marketingzwecke verwenden. Durch die Pixel-Tags können Informationen,
          wie der Besucherverkehr auf den Seiten dieser Website, ausgewertet
          werden. Die pseudonymen Informationen können ferner in Cookies auf dem
          Gerät der Nutzer gespeichert werden und unter anderem technische
          Informationen zum Browser und Betriebssystem, verweisende Webseiten,
          Besuchszeit sowie weitere Angaben zur Nutzung unseres Onlineangebotes
          enthalten, als auch mit solchen Informationen aus anderen Quellen
          verbunden werden.
        </p>
        <p>
          Youtube:
          <br />
          Wir binden die Videos der Plattform “YouTube” des Anbieters Google
          LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA, ein.
          Datenschutzerklärung:
          <br />
          <Link href="https://www.google.com/policies/privacy/" target="_blank">
            https://www.google.com/policies/privacy/
          </Link>
          <br />
          Opt-Out:{' '}
          <Link
            href="https://adssettings.google.com/authenticated"
            target="_blank"
          >
            https://adssettings.google.com/authenticated
          </Link>
        </p>
        <ScrollUp scrollPercent={scrollPercent} />
      </main>
      <FooterComponent />
    </>
  );
}
