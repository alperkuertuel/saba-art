import Image from "next/image";

export default function WelcomingAbout() {
  return (
    <section className="flex flex-col gap-2 flex-wrap justify-center items-center">
      <h2 className="text-center text-secondary-color">
        Hallo und herzlich willkommen in meiner online Kunst-Galerie!
      </h2>
      <div className="relative flex justify-center items-center rounded-full">
        <Image
          className="rounded-full w-full h-full"
          priority={true}
          width={192}
          height={200}
          src="/img/saba-art.jpg"
          alt="Saba"
        />
      </div>
      <p>
        <q>Bilder sind Erinnerungen</q> finde ich, deshalb greife ich immer dann zu Pinsel und Farbe, wenn mich ein
        Erlebnis stark beeindruckt hat. Meine Bilder in Öl verbinden orientalische Empfindsamkeit mit dem Stil der
        europäischen Moderne. In meinen Werken setze ich mich überwiegend mit realen und phantastischen Formen
        auseinander.
      </p>
      <p>Die Bilder in der Galerie werden regelmäßig aktualisiert, es lohnt sich also öfter mal vorbeizuschauen.</p>
    </section>
  );
}
