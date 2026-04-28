"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const chambres = [
  {
    slug: "roussanne",
    name: "La Roussanne",
    tagline: "Clin d'oeil sur la pêche de Monein.",
    price: "50€",
    capacity: "2 personnes",
    thumbnail:
      "https://res.cloudinary.com/immerswrite/image/upload/v1777293018/peches_myouyc.jpg",
    description:
      "Une pause paisible dans une ambiance d'autrefois. La Roussanne, c'est notre clin d’œil à la célèbre pêche de Monein. On y a installé un bel ensemble de meubles des années 30 que l'on a restaurés simplement pour garder leur authenticité. C'est une chambre calme et épurée, parfaite pour se reposer. Si vous aimez les réveils en douceur, vous allez l'adorer.",
    details: [
      "Lit double confortable",
      "Salle de bain privative avec douche à l'italienne",
      "Toilette séparée",
      "Petit-déjeuner inclus",
      "Espace salon avec canapé et frigo à coté de la chambre",
    ],
    gallery: [
      "https://res.cloudinary.com/immerswrite/image/upload/v1777293021/roussanne_ab8ja9.jpg",
      "https://res.cloudinary.com/immerswrite/image/upload/v1777293020/roussanne2_h8opqe.jpg",
      "https://res.cloudinary.com/immerswrite/image/upload/v1777293023/salle_bains_pesaulhe_z2lthl.jpg",
      "https://res.cloudinary.com/immerswrite/image/upload/v1777293016/salon_gnmfjv.jpg",
      "https://res.cloudinary.com/immerswrite/image/upload/v1777293020/petit_dej_mvv9jt.jpg",
    ],
  },
  {
    slug: "manseng-folies",
    name: "Manseng'Folies",
    tagline: "L'esprit du Vignoble du Jurançon",
    price: "60€",
    capacity: "5 personnes",
    thumbnail:
      "https://res.cloudinary.com/immerswrite/image/upload/v1777362072/mansengfoliesroom_keuxxy.avif",
    description:
      "Une grande chambre chaleureuse pour se sentir comme à la maison. Ici, on a voulu garder l'âme de la maison avec de beaux meubles en bois anciens auxquels on a redonné un coup de jeune. C'est une pièce spacieuse et mansardée où l'on se sent tout de suite bien. Le petit bonheur de cette chambre ? Son Velux tourné vers l'Ouest. Le soir, vous pourrez admirer les magnifiques lumières crépusculaires sur la campagne béarnaise directement depuis votre lit.",
    details: [
      "2 Lits doubles",
      "1 Lit simple",
      "Salle de bain avec douche italienne juste à côté de la chambre",
      "Toilette séparée",
      "un bureau pour travailler",
      "espace salon avec canapé et frigo à coté de la chambre",
      "petit-déjeuner inclus",
    ],
    gallery: [
      "https://res.cloudinary.com/immerswrite/image/upload/v1777364358/634824834_hkxn66.jpg",
      "https://res.cloudinary.com/immerswrite/image/upload/v1777293022/mansengfloies_wvb6mc.jpg",
      "https://res.cloudinary.com/immerswrite/image/upload/v1777293024/manseng_folies_oiwqpj.jpg",
      "https://res.cloudinary.com/immerswrite/image/upload/v1777293023/salle_bains_pesaulhe_z2lthl.jpg",
      "https://res.cloudinary.com/immerswrite/image/upload/v1777293016/salon_gnmfjv.jpg",
      "https://res.cloudinary.com/immerswrite/image/upload/v1777293020/petit_dej_mvv9jt.jpg",
    ],
  },
];

function ChambreCard({ chambre }: { chambre: (typeof chambres)[0] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState(0);

  return (
    <div className="group border-b border-border last:border-b-0">
      {/* Vignette + en-tête cliquable */}
      <div className="py-8">
        <div className="overflow-hidden shadow-editorial mb-6 aspect-[4/3] relative">
          <img
            src={chambre.thumbnail}
            alt={chambre.name}
            className="w-full h-full object-cover transition-soft group-hover:scale-105"
          />
        </div>

        {/* Titre cliquable */}
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="w-full text-left flex items-start justify-between gap-4 group/btn"
          aria-expanded={isOpen}
        >
          <div>
            <h3
              className={cn(
                "text-3xl font-display italic transition-soft",
                isOpen ? "text-accent" : "group-hover/btn:text-accent"
              )}
            >
              {chambre.name}
            </h3>
            <p className="text-muted-foreground mt-1">{chambre.tagline}</p>
          </div>

          <div className="flex items-center gap-4 shrink-0 mt-1">
            <span className="text-accent font-display text-lg italic">
              {chambre.price} / nuit
            </span>
            <span
              className={cn(
                "text-muted-foreground transition-transform duration-500",
                isOpen ? "rotate-180" : "rotate-0"
              )}
            >
              <ChevronDown size={20} />
            </span>
          </div>
        </button>
      </div>

      {/* Panneau dépliable */}
      <div
        className={cn(
          "grid transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
          isOpen
            ? "grid-rows-[1fr] opacity-100 mb-10"
            : "grid-rows-[0fr] opacity-0 mb-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="pt-2 pb-6">
            {/* Séparateur décoratif */}
            <div className="flex items-center gap-4 mb-8">
              <span className="rule flex-1" />
              <span className="eyebrow text-[0.6rem] text-accent tracking-[0.3em]">
                {chambre.capacity}
              </span>
              <span className="rule flex-1" />
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              {/* Galerie photos */}
              <div className="space-y-3">
                <div className="aspect-[4/3] overflow-hidden shadow-frame">
                  <img
                    src={chambre.gallery[activePhoto]}
                    alt={chambre.name}
                    className="w-full h-full object-cover transition-soft"
                  />
                </div>
                {chambre.gallery.length > 1 && (
                  <div className="flex gap-3">
                    {chambre.gallery.map((src, i) => (
                      <button
                        key={i}
                        onClick={() => setActivePhoto(i)}
                        className={cn(
                          "flex-1 aspect-[3/2] overflow-hidden transition-soft",
                          activePhoto === i
                            ? "ring-2 ring-accent ring-offset-2 opacity-100"
                            : "opacity-50 hover:opacity-80"
                        )}
                      >
                        <img
                          src={src}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Description + prestations */}
              <div className="flex flex-col justify-between gap-8">
                <div>
                  <p className="text-foreground/80 leading-relaxed text-sm font-sans">
                    {chambre.description}
                  </p>
                </div>

                <ul className="space-y-2">
                  {chambre.details.map((d, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      <span className="text-foreground/70">{d}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a href="/reservation" className="btn-hero btn-sm">
                    Réserver cette chambre
                  </a>
                  <a href="/contact" className="btn-outline btn-sm">
                    Nous contacter
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ChambresPage() {
  return (
    <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-16 fade-in-up">
        <span className="eyebrow justify-center mb-4">
          <span className="rule mr-2" /> Pesaulhe{" "}
          <span className="rule ml-2" />
        </span>
        <img src="https://res.cloudinary.com/immerswrite/image/upload/v1777293022/pesaulhe_hzuwff.jpg" alt="Pesaulhe" />
        <h1 className="text-5xl font-display italic mt-4">
          Les Chambres d'Hôtes
        </h1>
        <p className="mt-4 text-muted-foreground text-sm max-w-md mx-auto">
          Cliquez sur le nom d'une chambre pour découvrir ses prestations.
        </p>
      </div>

      <div>
        {chambres.map((chambre) => (
          <ChambreCard key={chambre.slug} chambre={chambre} />
        ))}
      </div>
    </main>
  );
}