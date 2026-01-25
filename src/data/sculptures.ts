import type { Sculpture } from '../types/Sculpture';

// Real sculpture data from Dijk en Waard (Heerhugowaard area)
// Source: https://nl.wikipedia.org/wiki/Lijst_van_beelden_in_Dijk_en_Waard
export const sculptures: Sculpture[] = [
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
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=1200&fit=crop'
    ],
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
    images: [
      'https://images.unsplash.com/photo-1544413660-299165566b1d?w=800&h=1200&fit=crop'
    ],
    tags: ['metaal', 'muziek', 'abstract']
  },
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
      'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&h=1200&fit=crop'
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
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=1200&fit=crop'
    ],
    tags: ['staal', 'landschapskunst', 'monumentaal']
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
    images: [
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&h=1200&fit=crop'
    ],
    tags: ['brons', 'pop art', 'iconisch']
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
      address: 'Centrum',
      city: 'Heerhugowaard'
    },
    images: [
      'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=800&h=1200&fit=crop'
    ],
    tags: ['brons', 'oorlogsmonument', 'figuratief']
  },
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
      address: 'Noord',
      city: 'Heerhugowaard'
    },
    images: [
      'https://images.unsplash.com/photo-1561839561-b13bcfe95249?w=800&h=1200&fit=crop'
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
      address: 'Oost',
      city: 'Heerhugowaard'
    },
    images: [
      'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=800&h=1200&fit=crop'
    ],
    tags: ['brons', 'figuratief', 'monumentaal']
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
      address: 'West',
      city: 'Heerhugowaard'
    },
    images: [
      'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=1200&fit=crop'
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
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1200&fit=crop'
    ],
    tags: ['brons', 'vogel', 'vrijheid']
  },
  {
    id: '11',
    name: 'Bloem in de knop - Pulserend hart',
    artist: 'Wiesław Oźmina',
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
      'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&h=1200&fit=crop'
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
      address: 'De Draai',
      city: 'Heerhugowaard'
    },
    images: [
      'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800&h=1200&fit=crop'
    ],
    tags: ['rvs', 'astronomie', 'abstract']
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
    images: [
      'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800&h=1200&fit=crop'
    ],
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
    images: [
      'https://images.unsplash.com/photo-1567879265649-0f03e90ccca5?w=800&h=1200&fit=crop'
    ],
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
    images: [
      'https://images.unsplash.com/photo-1584811644165-33db3b146db5?w=800&h=1200&fit=crop'
    ],
    tags: ['steen', 'monument', 'mensenrechten']
  }
];
