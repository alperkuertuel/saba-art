import Image from 'next/image';

export default function AboutAndWelcoming() {
  return (
    <section>
      <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
        <Image
          className="rounded-full border-2 border-secondary-color drop-shadow-xl"
          priority={true}
          width={192}
          height={200}
          src={'/img/saba.jpg'}
          alt="Saba"
        />
        <p className="md:w-1/2">
          <q>Bilder sind Erinnerungen</q> finde ich, deshalb greife ich immer
          dann zu Pinsel und Farbe, wenn mich ein Erlebnis stark beeindruckt
          hat. Meine Bilder in Öl verbinden orientalische Empfindsamkeit mit dem
          Stil der europäischen Moderne. In meinen Werken setze ich mich
          überwiegend mit realen und phantastischen Formen auseinander.
        </p>
      </div>
    </section>
  );
}
