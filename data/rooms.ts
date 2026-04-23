export interface Room {
  slug: string;
  name: string;
  image: string;
  price: number;
  tagline: string;
  excerpt: string;
  capacity: string;
}

export const rooms: Room[] = [
  {
    slug: "chambre-antan",
    name: "L'Antan",
    image: "/images/rooms/antan.jpg", 
    price: 95,
    tagline: "Le charme des vieux parquets",
    excerpt: "Une immersion dans le temps avec tout le confort moderne. Cette chambre située dans la maison principale offre une vue imprenable sur le jardin.",
    capacity: "2 personnes",
  },
  {
    slug: "chambre-boheme",
    name: "La Bohème",
    image: "/images/rooms/boheme.jpg",
    price: 110,
    tagline: "Douceur et poésie",
    excerpt: "Une atmosphère lumineuse aux tons naturels. Idéale pour une escapade romantique sous le signe de la sérénité et de la lecture.",
    capacity: "2 personnes",
  },
  {
    slug: "gite-independant",
    name: "Le Gîte",
    image: "/images/rooms/gite.jpg",
    price: 150,
    tagline: "Comme à la maison",
    excerpt: "Une petite maison de pierre totalement indépendante avec cuisine équipée et terrasse privée pour vivre à votre propre rythme.",
    capacity: "Jusqu'à 4 personnes",
  },
];