"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// 1. Les données
const histoires = [
  {
    name: "Pesaulhe",
    tagline: "Le Refuge du Berger",
    gallery: [
      "https://res.cloudinary.com/immerswrite/image/upload/v1777379419/t%C3%A9l%C3%A9chargement_aa3pmg.jpg",
      "https://res.cloudinary.com/immerswrite/image/upload/v1777379419/t%C3%A9l%C3%A9chargement_1_s2arnd.jpg",
      "https://res.cloudinary.com/immerswrite/image/upload/v1777379419/t%C3%A9l%C3%A9chargement_2_laqbwg.jpg",
      "https://res.cloudinary.com/immerswrite/image/upload/v1777379419/t%C3%A9l%C3%A9chargement_4_hkllnr.jpg",
      "https://res.cloudinary.com/immerswrite/image/upload/v1777379419/t%C3%A9l%C3%A9chargement_6_ybtzkq.jpg",
    ],
  },
  {
    name: "Noulibos",
    tagline: "Ancienne ferme familiale depuis 1700",
    gallery: [
      "https://res.cloudinary.com/immerswrite/image/upload/v1777294482/entr%C3%A9e_b5hq3k.avif",
      "https://res.cloudinary.com/immerswrite/image/upload/v1777294522/vues_xtygjh.avif",
      "https://res.cloudinary.com/immerswrite/image/upload/v1777367278/noulibos_jc2vip.avif",
    ],
  },
];

// 2. Le composant Carrousel
function HistoireCard({ histoire }: { histoire: typeof histoires[0] }) {
  const [activePhoto, setActivePhoto] = useState(0);

  const nextSlide = (e: React.MouseEvent) => {
    e.preventDefault();
    setActivePhoto((prev) => (prev === histoire.gallery.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.preventDefault();
    setActivePhoto((prev) => (prev === 0 ? histoire.gallery.length - 1 : prev - 1));
  };

  return (
    <div className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative group">
        <div className="h-80 overflow-hidden bg-gray-100">
          <img
            src={histoire.gallery[activePhoto]}
            alt={`${histoire.name} - photo ${activePhoto + 1}`}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
            key={activePhoto}
          />
        </div>

        {/* Navigation */}
        <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={prevSlide}
            className="bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition-transform active:scale-90"
          >
            <ChevronLeft className="h-5 w-5 text-gray-800" />
          </button>
          <button
            onClick={nextSlide}
            className="bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition-transform active:scale-90"
          >
            <ChevronRight className="h-5 w-5 text-gray-800" />
          </button>
        </div>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/20 backdrop-blur-sm px-2 py-1 rounded-full">
          {histoire.gallery.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActivePhoto(idx)}
              className={cn(
                "h-1.5 w-1.5 rounded-full transition-all",
                activePhoto === idx ? "bg-white w-4" : "bg-white/50"
              )}
            />
          ))}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-900">{histoire.name}</h3>
        <p className="text-sm text-muted-foreground italic">{histoire.tagline}</p>
      </div>
    </div>
  );
}

// 3. La page principale
export default function Histoire() {
  return (
    <main className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center px-6">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ 
                backgroundImage: "url('https://res.cloudinary.com/immerswrite/image/upload/v1777377489/IMGP3287-3500_l7dvvl.jpg')",
                animation: "kenburns 20s infinite alternate" 
            }}
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="max-w-3xl">
          <div className="text-white flex items-center justify-center mb-6 uppercase tracking-widest text-sm">
            <span className="h-px w-8 bg-white mr-4" />
            Qui sommes-nous ?
            <span className="h-px w-8 bg-white ml-4" />
          </div>
          <h1 className="text-5xl md:text-7xl text-white font-bold mb-8">
            Notre histoire en <br /> quelques mots & images
          </h1>
        </div>
      </section>

      {/* Contenu Texte & Carrousels */}
      <section className="py-24 bg-stone-50 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-serif mb-16 text-center italic text-gray-800">
            Plabiengut a Noste!
          </h2>
          <img src="https://res.cloudinary.com/immerswrite/image/upload/v1777291127/maison_ieqof9.jpg"
            alt="Mylène et Jean-Paul Lavie, propriétaire de Pesaulhe & Noulibos"
            className="w-full h-auto mb-5 object-contain object-center" />

          <div className="flex flex-col gap-12 text-lg leading-relaxed text-gray-700">
            {/* Présentation Mylène & Jean-Paul */}
            <div className="space-y-6">
              <p>
                Coucou, c'est Mylène.<br /> Je suis née dans une petite ferme familiale du Béarn dans le terroir du Jurançon à Monein où j'ai pris racine.
                Avec mon mari Jean-Paul, nous travaillons toujours sur cette petite ferme familiale.
              </p>
              <p>
                Entre vignes, Blondes d'Aquitaine ou canards, nous prenons le temps d'aller chanter avec les Esbarrits, voyager... Passionnée de photos, nature et cuisine, je serai ravie de partager mes passions avec vous.
              </p>
            </div>

            {/* Section Détails Historiques */}
            <div className="space-y-6">
              <h2 className="text-3xl font-serif italic text-center mt-8">
                Pesaulhé: Le "Refuge" du Berger
              </h2>
              <p>
                Située sur les coteaux de Monein, Pesaulhé est une ancienne maison Béarnaise que nous avons restaurée en famille. Pour tous ceux qui recherchent le calme et la tranquillité.
              </p>
              <p>
                Dans cette maison datant de 1702, l'un des derniers occupants était "Jean le berger", un homme ayant cohabité avec l'ours de nos Pyrénées Béarnaises.
              </p>
              <p className="font-medium italic">
                Découvrez par ces photos l'évolution des travaux, d'une vieille grange à une rénovation complète achevée en 2016 !
              </p>
            </div>
            {/* Section Carrousels Dynamiques */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
              {histoires.map((histoire, index) => (
                <HistoireCard key={index} histoire={histoire} />
              ))}
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}