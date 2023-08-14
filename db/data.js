import { Chance } from "chance";

const chance = new Chance();

const artPieces = [
  {
    id: "1",
    slug: "voilette-blues",
    name: "Voilette Blues",
    description: chance.sentence({ words: 15 }),
    category: "Abstract",
    technique: "Oil",
    imageUrl:
      "https://cdn.pixabay.com/photo/2019/04/26/17/47/color-4158152_1280.jpg",
    heightReal: chance.natural({ min: 50, max: 200 }),
    widthReal: chance.natural({ min: 50, max: 200 }),
  },

  {
    id: "2",
    slug: "milky-way",
    name: "Milky Way",
    description: chance.sentence({ words: 8 }),
    category: "Impression",
    technique: "Oil",
    imageUrl:
      "https://cdn.pixabay.com/photo/2012/11/28/08/54/milky-way-67504_1280.jpg",
    heightReal: chance.natural({ min: 50, max: 200 }),
    widthReal: chance.natural({ min: 50, max: 200 }),
  },
  {
    id: "3",
    slug: "ocean-scene",
    name: "Ocean Scene",
    description: chance.sentence({ words: 18 }),
    category: "Landscape",
    technique: "Oil",
    imageUrl:
      "https://cdn.pixabay.com/photo/2013/02/24/18/15/andreas-achenbach-85762_1280.jpg",
    heightReal: chance.natural({ min: 50, max: 200 }),
    widthReal: chance.natural({ min: 50, max: 200 }),
  },
  {
    id: "4",
    slug: "mona-lisa",
    name: "Mona Lisa",
    description: chance.sentence({ words: 13 }),
    category: "Portrait",
    technique: "Oil",
    imageUrl:
      "https://cdn.pixabay.com/photo/2013/01/05/21/02/art-74050_1280.jpg",
    heightReal: chance.natural({ min: 50, max: 200 }),
    widthReal: chance.natural({ min: 50, max: 200 }),
  },
  {
    id: "5",
    slug: "forest-walk",
    name: "Forest Walk",
    description: chance.sentence({ words: 10 }),
    category: "Landscape",
    technique: "Oil",
    imageUrl:
      "https://cdn.pixabay.com/photo/2018/09/20/17/01/birch-3691340_1280.jpg",
    heightReal: chance.natural({ min: 50, max: 200 }),
    widthReal: chance.natural({ min: 50, max: 200 }),
  },
  {
    id: "6",
    slug: "fishermens-bay",
    name: "Fishermens Bay",
    description: chance.sentence({ words: 20 }),
    category: "Impression",
    technique: "Oil",
    imageUrl:
      "https://cdn.pixabay.com/photo/2013/02/24/18/32/sebastian-pether-85797_1280.jpg",
    heightReal: chance.natural({ min: 50, max: 200 }),
    widthReal: chance.natural({ min: 50, max: 200 }),
  },
  {
    id: "7",
    slug: "nordic-snow-hut",
    name: "Nordic Snow Hut",
    description: chance.sentence({ words: 12 }),
    category: "Impression",
    technique: "Oil",
    imageUrl:
      "https://cdn.pixabay.com/photo/2013/03/03/19/46/george-durrie-89656_1280.jpg",
    heightReal: chance.natural({ min: 50, max: 200 }),
    widthReal: chance.natural({ min: 50, max: 200 }),
  },
  {
    id: "8",
    slug: "spilled-coffee",
    name: "Spilled Coffee",
    description: chance.sentence({ words: 34 }),
    category: "Abstract",
    technique: "Acryl",
    imageUrl:
      "https://cdn.pixabay.com/photo/2017/06/01/02/17/abstract-2362258_1280.jpg",
    heightReal: chance.natural({ min: 50, max: 200 }),
    widthReal: chance.natural({ min: 50, max: 200 }),
  },
  {
    id: "9",
    slug: "florenz",
    name: "Florenz",
    description: chance.sentence({ words: 9 }),
    category: "Impression",
    technique: "Acryl",
    imageUrl:
      "https://cdn.pixabay.com/photo/2014/05/11/17/30/painting-342116_1280.jpg",
    heightReal: chance.natural({ min: 50, max: 200 }),
    widthReal: chance.natural({ min: 50, max: 200 }),
  },
  {
    id: "10",
    slug: "blue-blues",
    name: "Blue Blues",
    description: chance.sentence({ words: 6 }),
    category: "Abstract",
    technique: "Acryl",
    imageUrl:
      "https://cdn.pixabay.com/photo/2020/03/09/10/23/color-4915201_1280.jpg",
    heightReal: chance.natural({ min: 50, max: 200 }),
    widthReal: chance.natural({ min: 50, max: 200 }),
  },
  {
    id: "11",
    slug: "rainbow-blues",
    name: "Rainbow Blues",
    description: chance.sentence({ words: 10 }),
    category: "Abstract",
    technique: "Oil",
    imageUrl:
      "https://cdn.pixabay.com/photo/2018/02/04/09/09/art-3129359_1280.jpg",
    heightReal: chance.natural({ min: 50, max: 200 }),
    widthReal: chance.natural({ min: 50, max: 200 }),
  },
  {
    id: "12",
    slug: "grunge",
    name: "Grunge",
    description: chance.sentence({ words: 18 }),
    category: "Abstract",
    technique: "Oil",
    imageUrl:
      "https://cdn.pixabay.com/photo/2022/10/22/01/56/abstract-7538251_1280.jpg",
    heightReal: chance.natural({ min: 50, max: 200 }),
    widthReal: chance.natural({ min: 50, max: 200 }),
  },
  {
    id: "13",
    slug: "mountain-in-vietnam",
    name: "Mountain In Vietnam",
    description: chance.sentence({ words: 10 }),
    category: "Landscape",
    technique: "Oil",
    imageUrl:
      "https://cdn.pixabay.com/photo/2013/02/19/18/10/robert-duncanson-83429_1280.jpg",
    heightReal: chance.natural({ min: 50, max: 200 }),
    widthReal: chance.natural({ min: 50, max: 200 }),
  },
  {
    id: "14",
    slug: "izmir-mountain",
    name: "Izmir Mountain",
    description: chance.sentence({ words: 20 }),
    category: "Landscape",
    technique: "Oil",
    imageUrl:
      "https://cdn.pixabay.com/photo/2013/02/24/18/32/ramon-alsina-85796_1280.jpg",
    heightReal: chance.natural({ min: 50, max: 200 }),
    widthReal: chance.natural({ min: 50, max: 200 }),
  },
  {
    id: "15",
    slug: "ephesus",
    name: "Ephesus",
    description: chance.sentence({ words: 10 }),
    category: "Impression",
    technique: "Oil",
    imageUrl:
      "https://cdn.pixabay.com/photo/2013/02/14/03/57/christen-kobk-81509_1280.jpg",
    heightReal: chance.natural({ min: 50, max: 200 }),
    widthReal: chance.natural({ min: 50, max: 200 }),
  },
  {
    id: "16",
    slug: "mersin-bay-1811",
    name: "Mersin Bay 1811",
    description: chance.sentence({ words: 10 }),
    category: "Impression",
    technique: "Oil",
    imageUrl:
      "https://cdn.pixabay.com/photo/2013/03/09/19/14/ivan-alvazovsky-91987_1280.jpg",
    heightReal: chance.natural({ min: 50, max: 200 }),
    widthReal: chance.natural({ min: 50, max: 200 }),
  },
  {
    id: "17",
    slug: "stormy-north",
    name: "Stormy North",
    description: chance.sentence({ words: 10 }),
    category: "Impression",
    technique: "Oil",
    imageUrl:
      "https://cdn.pixabay.com/photo/2013/03/08/15/51/johan-dahl-91590_1280.jpg",
    heightReal: chance.natural({ min: 50, max: 200 }),
    widthReal: chance.natural({ min: 50, max: 200 }),
  },
  {
    id: "18",
    slug: "alps",
    name: "Alps",
    description: chance.sentence({ words: 10 }),
    category: "Landscape",
    technique: "Oil",
    imageUrl:
      "https://cdn.pixabay.com/photo/2013/03/02/22/21/caspar-friedrich-89414_1280.jpg",
    heightReal: chance.natural({ min: 50, max: 200 }),
    widthReal: chance.natural({ min: 50, max: 200 }),
  },
];

export default artPieces;
