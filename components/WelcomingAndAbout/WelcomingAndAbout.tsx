import Image from 'next/image';

export default function WelcomingAndAbout() {
  return (
    <section className="flex flex-col flex-wrap items-center justify-center gap-2">
      <p>
        <q>Bilder sind Erinnerungen</q> finde ich, deshalb greife ich immer dann
        zu Pinsel und Farbe, wenn mich ein Erlebnis stark beeindruckt hat. Meine
        Bilder in Öl verbinden orientalische Empfindsamkeit mit dem Stil der
        europäischen Moderne. In meinen Werken setze ich mich überwiegend mit
        realen und phantastischen Formen auseinander.
      </p>
      <div className="relative flex items-center justify-center rounded-full">
        <Image
          className="size-full rounded-full"
          priority={true}
          width={192}
          height={200}
          src="/img/saba-art.jpg"
          alt="Saba"
        />
      </div>
    </section>
  );
}
