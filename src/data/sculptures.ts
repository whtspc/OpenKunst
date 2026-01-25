import type { Sculpture } from '../types/Sculpture';

// Placeholder for sculptures without available images
const NO_IMAGE = `${import.meta.env.BASE_URL}no-image.svg`;

// Real sculpture data from Dijk en Waard (Heerhugowaard area)
// Source: https://nl.wikipedia.org/wiki/Lijst_van_beelden_in_Dijk_en_Waard
// Images: Wikimedia Commons (CC BY-SA 3.0)
// Ordered: Nic Jonk first, then other sculptures with images, then no-image sculptures
export const sculptures: Sculpture[] = [
  // === Nic Jonk sculptures (featured) ===
  {
    id: '7',
    name: 'Aarde en Water',
    artist: 'Nic Jonk',
    year: null,
    description: 'Een sculptuur die de elementen aarde en water symboliseert, typisch voor het werk van Nic Jonk.',
    materials: ['Brons'],
    location: {
      lat: 52.6712,
      lng: 4.8356,
      address: 'Dolomiet',
      city: 'Heerhugowaard'
    },
    images: [
      'https://commons.wikimedia.org/wiki/Special:FilePath/Aarde_en_Water_Nic_Jonk_Heerhugowaard_Dolomiet.JPG?width=800'
    ],
    tags: ['brons', 'natuur', 'symbolisch']
  },
  {
    id: '8',
    name: 'De Wachter',
    artist: 'Nic Jonk',
    year: null,
    description: 'Een imposant bronzen beeld dat als wachter over de omgeving lijkt te waken.',
    materials: ['Brons'],
    location: {
      lat: 52.6598,
      lng: 4.8445,
      address: 'Westerweg',
      city: 'Heerhugowaard'
    },
    images: [
      'https://commons.wikimedia.org/wiki/Special:FilePath/De_Wachter_Nic_Jonk_Westerweg_Heerhugowaard.jpg?width=800'
    ],
    tags: ['brons', 'figuratief', 'monumentaal']
  },
  // === Other sculptures with images ===
  {
    id: '3',
    name: 'Pandabeer',
    artist: 'Klaas van de Berg',
    year: null,
    description: 'Een sculptuur van een pandabeer, vernoemd naar de straat waar het beeld staat: de Reuzenpandasingel.',
    materials: ['Steen'],
    location: {
      lat: 52.6589,
      lng: 4.8201,
      address: 'Reuzenpandasingel',
      city: 'Heerhugowaard'
    },
    images: [
      'https://commons.wikimedia.org/wiki/Special:FilePath/Pandabeer_Klaas_van_de_Berg_Reuzenpandasingel_Heerhugowaard.JPG?width=800'
    ],
    tags: ['steen', 'dier', 'figuratief']
  },
  {
    id: '4',
    name: 'Oostpoort-Arcadia',
    artist: 'Lucien den Arend',
    year: null,
    description: 'Een monumentaal kunstwerk in de Reina Prinsen-Geerligstuin, onderdeel van een serie landschapskunstwerken.',
    materials: ['Staal'],
    location: {
      lat: 52.6701,
      lng: 4.8412,
      address: 'Reina Prinsen-Geerligstuin',
      city: 'Heerhugowaard'
    },
    images: [
      'https://commons.wikimedia.org/wiki/Special:FilePath/Oostpoort-Arcadia_Lucien_den_Arend_Reina_Prinsen-Geerligstuin_Heerhugowaard.JPG?width=800'
    ],
    tags: ['staal', 'landschapskunst', 'monumentaal']
  },
  {
    id: '6',
    name: 'Vrouwen Uit Het Verzet',
    artist: 'Elly Baltus',
    year: null,
    description: 'Een monument ter ere van de vrouwen die tijdens de Tweede Wereldoorlog in het verzet actief waren.',
    materials: ['Brons'],
    location: {
      lat: 52.6645,
      lng: 4.8267,
      address: 'Oostertocht',
      city: 'Heerhugowaard'
    },
    images: [
      'https://commons.wikimedia.org/wiki/Special:FilePath/Vrouwen_Uit_Het_Verzet_Elly_Baltus_Oostertocht_Heerhugowaard.JPG?width=800'
    ],
    tags: ['brons', 'oorlogsmonument', 'figuratief']
  },
  {
    id: '9',
    name: 'Poezieboom',
    artist: 'Peter Louman',
    year: null,
    description: 'Een kunstwerk in de vorm van een boom met poëtische elementen, dat literatuur en natuur combineert.',
    materials: ['Metaal', 'Hout'],
    location: {
      lat: 52.6634,
      lng: 4.8178,
      address: 'Diamant',
      city: 'Heerhugowaard'
    },
    images: [
      'https://commons.wikimedia.org/wiki/Special:FilePath/Poezieboom_Peter_Louman_Diamant_Heerhugowaard.JPG?width=800'
    ],
    tags: ['metaal', 'literatuur', 'natuur']
  },
  {
    id: '10',
    name: 'Vrij als een vogel vogelvrij',
    artist: 'Roland de Jong-Orlando',
    year: null,
    description: 'Een sculptuur die het thema vrijheid verkent door de metafoor van een vogel.',
    materials: ['Brons'],
    location: {
      lat: 52.6556,
      lng: 4.8312,
      address: 'Zuid',
      city: 'Heerhugowaard'
    },
    images: [
      'https://commons.wikimedia.org/wiki/Special:FilePath/Vrij_als_een_vogel_vogelvrij_Roland_de_Jong-Orlando_Heerhugowaard.JPG?width=800'
    ],
    tags: ['brons', 'vogel', 'vrijheid']
  },
  {
    id: '11',
    name: 'Bloem in de knop - Pulserend hart',
    artist: 'Wieslaw Ozmina',
    year: null,
    description: 'Een abstract kunstwerk dat de energie van een bloem in knop en een kloppend hart uitbeeldt.',
    materials: ['Staal'],
    location: {
      lat: 52.6687,
      lng: 4.8234,
      address: 'Butterhuizen',
      city: 'Heerhugowaard'
    },
    images: [
      'https://commons.wikimedia.org/wiki/Special:FilePath/Bloem_in_de_knop-Pulserend_hart_Wies%C5%82aw_O%C5%BAmina_Heerhugowaard.JPG?width=800'
    ],
    tags: ['staal', 'abstract', 'natuur']
  },
  {
    id: '12',
    name: 'Capella',
    artist: 'Marcel Smink',
    year: null,
    description: 'Een sculptuur geïnspireerd op de heldere ster Capella, onderdeel van het sterrenbeeld Voerman.',
    materials: ['RVS'],
    location: {
      lat: 52.6623,
      lng: 4.8489,
      address: 'Gerrit Rietveldweg',
      city: 'Heerhugowaard'
    },
    images: [
      'https://commons.wikimedia.org/wiki/Special:FilePath/Capella_Marcel_Smink_Gerrit_Rietveldweg_Heerhugowaard1.JPG?width=800'
    ],
    tags: ['rvs', 'astronomie', 'abstract']
  },
  // === Sculptures without images ===
  {
    id: '1',
    name: 'Moeder en Kind',
    artist: 'Theo Mulder',
    year: null,
    description: 'Een bronzen sculptuur van een moeder met kind, geplaatst op het Raadhuisplein in het centrum van Heerhugowaard.',
    materials: ['Brons'],
    location: {
      lat: 52.6673,
      lng: 4.8305,
      address: 'Raadhuisplein',
      city: 'Heerhugowaard'
    },
    images: [NO_IMAGE],
    tags: ['brons', 'figuratief', 'familie']
  },
  {
    id: '2',
    name: 'Muzikale verbinding van drie pleinen',
    artist: 'Adriaan Rees',
    year: null,
    description: 'Een kunstwerk dat de drie pleinen van het Stadshart met elkaar verbindt door middel van muzikale elementen.',
    materials: ['Metaal'],
    location: {
      lat: 52.6652,
      lng: 4.8348,
      address: 'Stationsplein',
      city: 'Heerhugowaard'
    },
    images: [NO_IMAGE],
    tags: ['metaal', 'muziek', 'abstract']
  },
  {
    id: '5',
    name: 'Koffiepot',
    artist: 'Klaas Gubbels',
    year: null,
    description: 'Een karakteristiek beeld van een koffiepot door de bekende Nederlandse kunstenaar Klaas Gubbels, bekend om zijn koffiepot-thema.',
    materials: ['Brons'],
    location: {
      lat: 52.6668,
      lng: 4.8289,
      address: 'Stadshart',
      city: 'Heerhugowaard'
    },
    images: [NO_IMAGE],
    tags: ['brons', 'pop art', 'iconisch']
  },
  {
    id: '13',
    name: 'Aren',
    artist: 'Robert Mayo',
    year: null,
    description: 'Een sculptuur die verwijst naar de agrarische geschiedenis van de regio met graanaren als motief.',
    materials: ['Brons'],
    location: {
      lat: 52.6578,
      lng: 4.8156,
      address: 'Westtangent',
      city: 'Heerhugowaard'
    },
    images: [NO_IMAGE],
    tags: ['brons', 'landbouw', 'geschiedenis']
  },
  {
    id: '14',
    name: 'Speeltuin NAP',
    artist: 'Frank Halmans',
    year: null,
    description: 'Een kunstwerk in de openbare ruimte dat verwijst naar het Normaal Amsterdams Peil, relevant voor deze polder.',
    materials: ['Divers'],
    location: {
      lat: 52.6701,
      lng: 4.8178,
      address: 'Stadshart Noord',
      city: 'Heerhugowaard'
    },
    images: [NO_IMAGE],
    tags: ['interactief', 'water', 'speels']
  },
  {
    id: '15',
    name: 'Monument voor de Mensenrechten',
    artist: 'Onbekend',
    year: null,
    description: 'Een monument gewijd aan de Universele Verklaring van de Rechten van de Mens.',
    materials: ['Steen'],
    location: {
      lat: 52.6659,
      lng: 4.8334,
      address: 'Stadshart',
      city: 'Heerhugowaard'
    },
    images: [NO_IMAGE],
    tags: ['steen', 'monument', 'mensenrechten']
  }
];
