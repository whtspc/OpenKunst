import type { Sculpture } from '../types/Sculpture';

// Mock sculpture data - using placeholder images
// In production, these would come from an API
export const sculptures: Sculpture[] = [
  {
    id: '1',
    name: 'The Thinker',
    artist: 'Auguste Rodin',
    year: 1904,
    description: 'A bronze sculpture depicting a nude male figure sitting on a rock with his chin resting on one hand as though deep in thought. Originally named "The Poet", it was part of a commission for a doorway surround called The Gates of Hell.',
    materials: ['Bronze'],
    location: {
      lat: 52.3676,
      lng: 4.9041,
      address: 'Museumplein 6',
      city: 'Amsterdam'
    },
    images: [
      'https://images.unsplash.com/photo-1561839561-b13bcfe95249?w=800&h=1200&fit=crop',
      'https://images.unsplash.com/photo-1544413660-299165566b1d?w=800&h=1200&fit=crop'
    ],
    tags: ['bronze', 'figurative', 'classical']
  },
  {
    id: '2',
    name: 'Cloud Gate',
    artist: 'Anish Kapoor',
    year: 2006,
    description: 'A public sculpture that is the centerpiece of AT&T Plaza at Millennium Park. Made up of 168 stainless steel plates welded together, its highly polished exterior has no visible seams.',
    materials: ['Stainless Steel'],
    location: {
      lat: 52.3702,
      lng: 4.8952,
      address: 'Vondelpark',
      city: 'Amsterdam'
    },
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=1200&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1200&fit=crop'
    ],
    tags: ['steel', 'contemporary', 'reflective']
  },
  {
    id: '3',
    name: 'Charging Bull',
    artist: 'Arturo Di Modica',
    year: 1989,
    description: 'A bronze sculpture that stands in the Financial District of Manhattan. It symbolizes aggressive financial optimism and prosperity.',
    materials: ['Bronze'],
    location: {
      lat: 52.3731,
      lng: 4.8922,
      address: 'Dam Square',
      city: 'Amsterdam'
    },
    images: [
      'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=800&h=1200&fit=crop',
      'https://images.unsplash.com/photo-1590845947376-2638caa89309?w=800&h=1200&fit=crop'
    ],
    tags: ['bronze', 'animal', 'symbolic']
  },
  {
    id: '4',
    name: 'Spiral Jetty',
    artist: 'Robert Smithson',
    year: 1970,
    description: 'An earthwork sculpture built on the northeastern shore of the Great Salt Lake. Made of mud, salt crystals, basalt rocks, and water, the sculpture forms a 1,500-foot-long spiral.',
    materials: ['Basalt', 'Earth', 'Salt crystals'],
    location: {
      lat: 52.3792,
      lng: 4.8994,
      address: 'Central Station Area',
      city: 'Amsterdam'
    },
    images: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=1200&fit=crop',
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=1200&fit=crop'
    ],
    tags: ['earthwork', 'land art', 'environmental']
  },
  {
    id: '5',
    name: 'LOVE',
    artist: 'Robert Indiana',
    year: 1970,
    description: 'An iconic pop art sculpture featuring the word LOVE in bold letters with a tilted O. Originally designed as a Christmas card, it became one of the most recognizable images of the 20th century.',
    materials: ['Cor-Ten Steel'],
    location: {
      lat: 52.3600,
      lng: 4.8852,
      address: 'Leidseplein',
      city: 'Amsterdam'
    },
    images: [
      'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&h=1200&fit=crop',
      'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=1200&fit=crop'
    ],
    tags: ['pop art', 'typography', 'iconic']
  },
  {
    id: '6',
    name: 'The Little Mermaid',
    artist: 'Edvard Eriksen',
    year: 1913,
    description: 'A bronze statue based on the fairy tale of the same name by Danish author Hans Christian Andersen. Displayed on a rock by the waterside, it has become an icon of the city.',
    materials: ['Bronze'],
    location: {
      lat: 52.3555,
      lng: 4.9012,
      address: 'Rembrandtplein',
      city: 'Amsterdam'
    },
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1200&fit=crop',
      'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800&h=1200&fit=crop'
    ],
    tags: ['bronze', 'figurative', 'fairy tale']
  },
  {
    id: '7',
    name: 'Manneken Pis',
    artist: 'Jérôme Duquesnoy',
    year: 1619,
    description: 'A landmark small bronze fountain sculpture depicting a naked little boy urinating into the fountain basin. It is the most famous symbol of the city and a beloved landmark.',
    materials: ['Bronze'],
    location: {
      lat: 52.3488,
      lng: 4.9035,
      address: 'Albert Cuypstraat',
      city: 'Amsterdam'
    },
    images: [
      'https://images.unsplash.com/photo-1567879265649-0f03e90ccca5?w=800&h=1200&fit=crop',
      'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800&h=1200&fit=crop'
    ],
    tags: ['bronze', 'fountain', 'humorous']
  },
  {
    id: '8',
    name: 'Angel of the North',
    artist: 'Antony Gormley',
    year: 1998,
    description: 'A contemporary steel sculpture of an angel standing 20 metres tall with wings measuring 54 metres across. It is a landmark structure built to last at least 100 years.',
    materials: ['Steel', 'Concrete foundation'],
    location: {
      lat: 52.3822,
      lng: 4.8811,
      address: 'Jordaan District',
      city: 'Amsterdam'
    },
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=1200&fit=crop',
      'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=1200&fit=crop'
    ],
    tags: ['steel', 'monumental', 'contemporary']
  },
  {
    id: '9',
    name: 'Venus de Milo',
    artist: 'Alexandros of Antioch',
    year: null,
    description: 'An ancient Greek marble sculpture created sometime between 150 and 125 BC. It is believed to depict Aphrodite, the Greek goddess of love and beauty.',
    materials: ['Marble'],
    location: {
      lat: 52.3645,
      lng: 4.8717,
      address: 'Oud-West',
      city: 'Amsterdam'
    },
    images: [
      'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=800&h=1200&fit=crop',
      'https://images.unsplash.com/photo-1584811644165-33db3b146db5?w=800&h=1200&fit=crop'
    ],
    tags: ['marble', 'classical', 'ancient']
  },
  {
    id: '10',
    name: 'Balloon Dog',
    artist: 'Jeff Koons',
    year: 1994,
    description: 'Part of a series of sculptures in stainless steel with transparent color coating. The work is a reflection of innocence and celebration, reminiscent of party decorations.',
    materials: ['Stainless Steel'],
    location: {
      lat: 52.3590,
      lng: 4.9150,
      address: 'Oosterpark',
      city: 'Amsterdam'
    },
    images: [
      'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800&h=1200&fit=crop',
      'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=800&h=1200&fit=crop'
    ],
    tags: ['steel', 'pop art', 'playful']
  }
];
