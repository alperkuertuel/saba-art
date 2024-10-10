import { faArrowLeftLong, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';

import FooterComponent from '@/Footer/Footer';
import Header from '@/Header/Header';
import ScrollUp from '@/ScrollUpButton/ScrollUpButton';

interface ImprintProperties {
  scrollPercent: number;
  handleSetScrollPercentage: (scrollPercent: number) => void;
}

export default function Imprint({
  scrollPercent,
  handleSetScrollPercentage,
}: ImprintProperties) {
  const router = useRouter();
  return (
    <>
      <Header
        scrollPercent={scrollPercent}
        handleSetScrollPercentage={handleSetScrollPercentage}
      />
      <main>
        <Link href="/">
          <FontAwesomeIcon icon={faArrowLeftLong} /> Zurück
        </Link>
        <h2>Impressum:</h2>
        <h3>Alper Kürtül</h3>
        <p>
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
        <ScrollUp scrollPercent={scrollPercent} />
      </main>
      <FooterComponent />
    </>
  );
}
