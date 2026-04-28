"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Données des pièces ────────────────────────────────────────────────────────
const pieces = [
  {
    id: "sejour",
    label: "Séjour & Salle à manger",
    photos: [
      "https://res.cloudinary.com/immerswrite/image/upload/v1777293077/salon_hezvxu.avif",
      "https://res.cloudinary.com/immerswrite/image/upload/v1777293048/salon1_xiynqe.avif",
      "https://res.cloudinary.com/immerswrite/image/upload/v1777366767/87d38b1d-9d0a-4d22-be12-fb07791d749d_fdfltq.avif",
    ],
  },
  {
    id: "cuisine",
    label: "Cuisine équipée",
    photos: [
      "https://res.cloudinary.com/immerswrite/image/upload/v1777366853/87d38b1d-9d0a-4d22-be12-fb07791d749d_lzwdbu.avif",
      "https://res.cloudinary.com/immerswrite/image/upload/v1777366852/0259cacd-8676-4c6a-b5bb-ec7f7358569f_zjjhev.avif",
    ],
  },
  {
    id: "chambres",
    label: "Les 5 Chambres",
    photos: [
      "https://res.cloudinary.com/immerswrite/image/upload/v1777294479/chambre_tkwcru.avif",
      "https://res.cloudinary.com/immerswrite/image/upload/v1777294480/chambre_3_v99uly.avif",
      "https://res.cloudinary.com/immerswrite/image/upload/v1777294480/chambre_4_xnbujr.avif",
      "https://res.cloudinary.com/immerswrite/image/upload/v1777294480/chambre_5_fnl691.avif",
      "https://res.cloudinary.com/immerswrite/image/upload/v1777294479/chambre_6_zlc5uo.avif",
    ],
  },
  {
    id: "sanitaires",
    label: "Salle de bain",
    photos: [
      "https://res.cloudinary.com/immerswrite/image/upload/v1777293041/salle_bain_etage_rgntoi.avif",
      "https://res.cloudinary.com/immerswrite/image/upload/v1777367278/sallabinrdc_rh3smd.avif",
    ],
  },
  {
    id: "exterieur",
    label: "Vue & Extérieur",
    photos: [
      "https://res.cloudinary.com/immerswrite/image/upload/v1777294522/vues_xtygjh.avif",
      "https://res.cloudinary.com/immerswrite/image/upload/v1777294482/entr%C3%A9e_b5hq3k.avif",
    ],
  },
  {
    id: "grange",
    label: "La Grange",
    photos: [
      "https://res.cloudinary.com/immerswrite/image/upload/v1777294483/grange_xt0scc.avif",
    ],
  },
];

// ─── Carrousel ────────────────────────────────────────────────────────────────
function Carousel({ photos, label }: { photos: string[]; label: string }) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const go = useCallback(
    (dir: "left" | "right") => {
      if (animating) return;
      setDirection(dir);
      setAnimating(true);
      setTimeout(() => {
        setCurrent((c) =>
          dir === "right"
            ? (c + 1) % photos.length
            : (c - 1 + photos.length) % photos.length
        );
        setAnimating(false);
      }, 350);
    },
    [animating, photos.length]
  );

  // Autoplay
  useEffect(() => {
    if (photos.length <= 1) return;
    const timer = setInterval(() => go("right"), 5000);
    return () => clearInterval(timer);
  }, [go, photos.length]);

  return (
    <div className="relative overflow-hidden shadow-frame aspect-[16/9] group/carousel">
      {/* Image principale */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-500",
          animating ? "opacity-0" : "opacity-100"
        )}
      >
        <img
          src={photos[current]}
          alt={`${label} — photo ${current + 1}`}
          className="w-full h-full object-contain object-center"
        />
        {/* Gradient bas */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Compteur */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={cn(
              "h-[2px] transition-all duration-400",
              i === current
                ? "bg-white w-8 opacity-100"
                : "bg-white/50 w-4 opacity-60 hover:opacity-90"
            )}
            aria-label={`Photo ${i + 1}`}
          />
        ))}
      </div>

      {/* Flèches */}
      {photos.length > 1 && (
        <>
          <button
            onClick={() => go("left")}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center bg-black/30 hover:bg-black/50 text-white transition-soft opacity-0 group-hover/carousel:opacity-100"
            aria-label="Photo précédente"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => go("right")}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center bg-black/30 hover:bg-black/50 text-white transition-soft opacity-0 group-hover/carousel:opacity-100"
            aria-label="Photo suivante"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}
    </div>
  );
}

// ─── Page principale ───────────────────────────────────────────────────────────
export default function GitePage() {
  const [activePiece, setActivePiece] = useState(0);

  return (
    <main className="pt-32 pb-24 paper-texture">

      {/* ── En-tête ── */}
      <header className="max-w-4xl mx-auto px-6 text-center mb-20 fade-in-up">
        <span className="eyebrow justify-center mb-5">
          <span className="rule mr-3" />
          Campagne, calme et bons moments
          <span className="rule ml-3" />
        </span>
        <h1 className="text-5xl md:text-6xl font-display italic mb-6">
          Le Gîte Noulibos
        </h1>
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          Une ancienne ferme béarnaise du XVIII<sup>e</sup> siècle, entièrement
          aménagée dans le respect de son âme. Noulibos vous ouvre ses portes pour des séjours en famille ou entre
          amis, dans un cadre d'exception entre vignes du Jurançon et
          montagnes pyrénéennes.
        </p>
      </header>

      {/* ── Chiffres clés ── */}
      <section className="bg-surface-warm border-y border-border py-10 mb-20">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "12", unit: "personnes", label: "Capacité max." },
            { value: "5", unit: "chambres", label: "spacieuses" },
            { value: "150 m²", unit: "", label: "Surface habitable" },
            { value: "À partir de", unit: "120€ / nuit", label: "Tarif fixe" },
          ].map((item, i) => (
            <div key={i}>
              <div className="font-display text-3xl md:text-4xl italic text-foreground leading-none">
                {item.value}
                {item.unit && (
                  <span className="block text-base md:text-lg text-accent mt-1">
                    {item.unit}
                  </span>
                )}
              </div>
              <p className="eyebrow justify-center mt-2 text-[0.6rem]">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Description narrative ── */}
      <section className="max-w-4xl mx-auto px-6 mb-20">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <span className="eyebrow mb-4">
              <span className="rule mr-2" /> L'esprit des lieux
            </span>
            <h2 className="text-3xl font-display italic mb-5">
              Un séjour au cœur d'une ferme béarnaise qui vit.
            </h2>
            <p className="text-foreground/75 leading-relaxed mb-5 text-sm">
            Le gîte est installé dans l'ancien corps de notre petite ferme familiale, toujours en activité. 
            <br />Si vous cherchez un endroit pour déconnecter vraiment, vous y êtes : nous sommes en pleine nature, dans une jolie vallée entourée de bois, avec un petit ruisseau qui coule juste à côté. Le calme y est roi.
            <br />On est aussi idéalement placés pour découvrir la région : vous êtes à seulement 1h de l'océan (Biarritz, Saint-Jean-de-Luz), 1h des stations de ski des Pyrénées (Gourette, La Pierre Saint-Martin) et 30 minutes de Pau.
            </p>
           
          </div>
          <div>
            <span className="eyebrow mb-4">
              <span className="rule mr-2" /> La vie au gîte
            </span>
            <h2 className="text-3xl font-display italic mb-5">
            Le logement : Simplicité et détente
            </h2>
            <p className="text-foreground/75 leading-relaxed mb-5 text-sm">
            L'intérieur est resté simple et authentique, dans l'esprit "maison de campagne". 
            <br />Mais le ptit plus, c'est la grange attenante qui fait partie du gîte. On l'a transformée en un immense espace de détente rien que pour vous.
            <br />C’est l’endroit parfait pour se retrouver en famille ou entre amis, peu importe la météo !
            </p>
            <ul className="space-y-3">
              <li className="text-foreground/75 leading-relaxed text-sm"> <strong>Côté loisirs :</strong> Un vrai billard français, un baby-foot et une table de ping-pong pour des tournois improvisés.</li>
              <li className="text-foreground/75 leading-relaxed text-sm"> <strong>Côté détente :</strong> Un coin cinéma avec vidéoprojecteur et grand écran pour vos soirées films.</li>
              <li className="text-foreground/75 leading-relaxed text-sm"> <strong>L'esprit du lieu :</strong> Un accueil sans chichis, de l'espace pour s'amuser et toute la tranquillité du Béarn autour de vous.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── Galerie par pièce ── */}
      <section className="max-w-6xl mx-auto px-6 mb-20">
        <div className="text-center mb-10">
          <span className="eyebrow justify-center mb-4">
            <span className="rule mr-2" /> Visite virtuelle
            <span className="rule ml-2" />
          </span>
          <h2 className="text-3xl md:text-4xl font-display italic">
            Pièce par pièce
          </h2>
        </div>

        {/* Onglets des pièces */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {pieces.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActivePiece(i)}
              className={cn(
                "text-xs uppercase tracking-[0.18em] font-medium px-5 py-2.5 border transition-soft",
                activePiece === i
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-foreground/60 hover:border-foreground/40 hover:text-foreground"
              )}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Carrousel actif */}
        <div className="max-w-3xl mx-auto">
          <Carousel
            key={pieces[activePiece].id}
            photos={pieces[activePiece].photos}
            label={pieces[activePiece].label}
          />
          <p className="text-center eyebrow justify-center mt-4 text-[0.65rem]">
            {pieces[activePiece].label}
            <span className="ml-2 text-muted-foreground normal-case tracking-normal font-normal">
              — {pieces[activePiece].photos.length} photo
              {pieces[activePiece].photos.length > 1 ? "s" : ""}
            </span>
          </p>
        </div>
      </section>

      {/* ── Prestations ── */}
      <section className="bg-surface-warm border-y border-border py-16 mb-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="eyebrow justify-center mb-4">
              <span className="rule mr-2" /> Ce qui vous attend
              <span className="rule ml-2" />
            </span>
            <h2 className="text-3xl font-display italic">Équipements & Services</h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-8">
            {[
              {
                titre: "Hébergement",
                items: [
                  "5 chambres spacieuses",
                  "Capacité 12 personnes",
                  "Literie confortable",
                  "Linge de maison fourni",
                ],
              },
              {
                titre: "Cuisine & Repas",
                items: [
                  "Cuisine entièrement équipée",
                  "Grand réfrigérateur américain",
                  "Lave-vaisselle & four à gaz",
                  "Longue table de 12 couverts",
                ],
              },
              {
                titre: "Séjour & Détente",
                items: [
                  "Salon avec cheminée",
                  "Terrasse extérieure avec barbecue",
                  "Accès au bois et au ruisseau",
                ],
              },
              {
                titre: "Loisirs",
                items: [
                  "Grange — cinéma maison",
                  "Billard & Babyfoot",
                  "Jeux de société",
                  "Table de ping-pong",
                ],
              },
              {
                titre: "Confort",
                items: [
                  "Wi-Fi gratuit",
                  "Chauffage cheminée au bois",
                  "Parking extérieur",
                  "Lit bébé sur demande",
                ],
              },
              {
                titre: "Aux alentours",
                items: [
                  "Cave de Gan — 20 min",
                  "Oloron-Sainte-Marie — 20 min",
                  "Pau — 30 min",
                  "Ski — 45 min",
                  "Mer — 1h",
                ],
              },
            ].map((bloc, i) => (
              <div key={i}>
                <h3 className="eyebrow mb-3 text-foreground">
                  <span className="rule mr-2" />
                  {bloc.titre}
                </h3>
                <ul className="space-y-1.5">
                  {bloc.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <span className="mt-[7px] w-1 h-1 rounded-full bg-accent shrink-0" />
                      <span className="text-foreground/70">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-7 italic ">
          Séjour minimum 2 nuits. Supplément personnes supplémentaires sur devis.
          Ménage de fin de séjour inclus. Disponibilité du gîte de Avril à Novembre. Contactez-nous pour les séjours en hiver ou hors saison.
        </p>
      </section>

      
      {/* ── CTA ── */}
      <section className="max-w-xl mx-auto px-6 text-center">
        <span className="eyebrow justify-center mb-4">
          <span className="rule mr-2" /> Votre prochain séjour
          <span className="rule ml-2" />
        </span>
        <h2 className="text-3xl font-display italic mb-4">
          Prêt à poser vos valises ?
        </h2>
        <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
          Vérifiez les disponibilités ou contactez-nous directement pour toute
          demande.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/reservation" className="btn-hero">
            Voir les disponibilités
          </a>
          <a href="/contact" className="btn-outline">
            Nous contacter
          </a>
        </div>
      </section>
    </main>
  );
}