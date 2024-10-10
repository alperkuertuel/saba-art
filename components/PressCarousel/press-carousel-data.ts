export interface Article {
  _id: string;
  imageUrl: string;
  name: string;
  legendText: string;
  dateOfArticle: string;
  pdfLink: string;
}

const pressCarouselData = [
  {
    _id: "0",
    imageUrl: "/documents/auszug_allgemein.png",
    name: "Auszug meines Gästebuchs",
    legendText:
      "Das Zitat 'Erfolg ist so einsam und eiskalt wie der Nordpol' aus meinem Ausstellungs-Gästebuch betont, dass der Weg zum Erfolg oft von Isolation und emotionaler Kälte begleitet wird, bedingt durch die erforderlichen Herausforderungen und Opfer.",
    dateOfArticle: "15.03.1986",
    pdfLink: "/documents/auszug_allgemein.pdf",
  },
  {
    _id: "1",
    imageUrl: "/documents/vom_bosporus_zum_bodensee.png",
    name: "Vom Bospurus zum Bodensee",
    legendText: "Vom Bospurus zum Bodensee",
    dateOfArticle: "20.03.1986",
    pdfLink: "/documents/vom_bosporus_zum_bodensee_20-03-1986.pdf",
  },
  {
    _id: "2",
    imageUrl: "/documents/an_den_ufern_zweier_meere.png",
    name: "An den Ufern zweier Meere",
    legendText: "Dem Autor sei der Namensirrtum verziehen.",
    dateOfArticle: "29.06.1989",
    pdfLink: "/documents/an_den_ufern_zweier_meere_29-06-1989.pdf",
  },
  {
    _id: "3",
    imageUrl: "/documents/aus_dem_kulturleben.png",
    name: "Aus dem Kulturleben",
    legendText: "Aus dem Kulturleben",
    dateOfArticle: "01.01.1990",
    pdfLink: "/documents/aus_dem_kulturleben_1990.pdf",
  },
  {
    _id: "4",
    imageUrl: "/documents/suedliches_temperament_09-11-1995.png",
    name: "Südliches Temperament begegnet dem Allgäu",
    legendText: "Es war mir eine Freude mich mit den genannten Künstlerinnen aus Spanien und Peru auszutauschen.",
    dateOfArticle: "09.11.1995",
    pdfLink: "/documents/suedliches_temperament_09-11-1995.pdf",
  },
  {
    _id: "5",
    imageUrl: "/documents/kultur_am_ort.png",
    name: "Kultur am Ort",
    legendText: "Kultur am Ort",
    dateOfArticle: "25.02.1998",
    pdfLink: "/documents/kultur_am_ort_25-02-1998.pdf",
  },
  {
    _id: "6",
    imageUrl: "/documents/peruanische_geschichten.png",
    name: "Peruanische Geschichten",
    legendText: "Peruanische Geschichten",
    dateOfArticle: "17.12.2003",
    pdfLink: "/documents/peruanische_geschichten_17-12-03.pdf",
  },
  {
    _id: "7",
    imageUrl: "/documents/stille_motive.png",
    name: "Stille Motive",
    legendText:
      "Erscheinen in der AZ Kempten Nr. 249 unter der Rubrik Kultur am Ort. Ein Dank geht an die Stadtverwaltung Kempten, welche die Austellung in Kollaboration ermöglichte.",
    dateOfArticle: "28.10.2006",
    pdfLink: "/documents/stille_motive_28-10-2006.pdf",
  },
  {
    _id: "8",
    imageUrl: "/documents/vielfaeltige_kunstwelten.png",
    name: "Vielfältige Kunstwelten",
    legendText: "Sieben Künstler kommen für ein Wochenende im Thingers-Bürgersaal zusammen.",
    dateOfArticle: "2007",
    pdfLink: "/documents/vielfaeltige_kunstwelten.pdf",
  },
  {
    _id: "9",
    imageUrl: "/documents/kunstwelten_sind_zu_gast_2012.png",
    name: "Kunstwelten sind zu Gast",
    legendText: "Eine der schönsten Kollektivausstellungen im Bürgertreff Thingers",
    dateOfArticle: "2012",
    pdfLink: "/documents/kunstwelten_sind_zu_gast_2012.pdf",
  },
];

export default pressCarouselData;
