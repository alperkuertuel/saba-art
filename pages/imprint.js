import Header from "@/components/Header/Header";
import ScrollUp from "@/components/ScrollUpButton/ScrollUpButton";
import { faArrowLeftLong, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Imprint({ scrollPercent, handleSetScrollPercentage }) {
  const router = useRouter();
  return (
    <>
      <Header scrollPercent={scrollPercent} handleSetScrollPercentage={handleSetScrollPercentage} />
      <main>
        <Link href="/">
          <FontAwesomeIcon icon={faArrowLeftLong} /> Zurück
        </Link>
        <h2>Impressum:</h2>
        <h3>Sabahaddin Kürtül</h3>
        <p>
          H&#x131;d&#x131;rl&#x131;k Mah. 5172/1 Sok. 7/82
          <br />
          35460 Seferihisar Izmir, Turkey
          <br />
          <button type="button" onClick={() => router.push("mailto:sabakuertuel@gmail.com")}>
            E-Mail <FontAwesomeIcon icon={faEnvelope} />
          </button>
        </p>
        <h3>Web Entwickler</h3>
        <p>
          Alper Kürtül
          <br />
          <button type="button" onClick={() => router.push("mailto:alperkuertuel@hotmail.de")}>
            E-Mail <FontAwesomeIcon icon={faEnvelope} />
          </button>
        </p>
        <ScrollUp scrollPercent={scrollPercent} />
      </main>
    </>
  );
}
