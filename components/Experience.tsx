import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "./Header";

const experiences = [
  {
    title: "Le vignoble du Jurançon",
    description: "Caves, dégustations et coteaux ondulants à perte de vue.",
    img: "/photos/vignoble.jpg",
  },
  {
    title: "Vallée d'Ossau & Pyrénées",
    description:
      "Randonnées, lacs d'altitude, fromages d'estive et villages de pierre.",
    img: "/photos/vignes-vallees.jpg",
  },
  {
    title: "Marchés & terroir béarnais",
    description:
      "Pêches de Monein, garbure, fromage de brebis et grands moments à table.",
    img: "/photos/autour.jpg",
  },
];

export function Experiences() {
  return (
    <section className="container py-24 lg:py-32">
      <SectionHeader
        eyebrow="Au cœur du Béarn"
        title={
          <>
            Un terroir riche en{" "}
            <em className="text-accent">expériences</em>
            <br />
            et en émotions.
          </>
        }
        description="Entre l'Océan et la Montagne, vue sur les Pyrénées : Pésaulhé est un point de départ idéal pour explorer le Béarn en toutes saisons."
        align="center"
        className="mb-16"
      />

      <div className="grid gap-6 md:grid-cols-3">
        {experiences.map((exp, i) => (
          <article
            key={exp.title}
            className="group relative overflow-hidden aspect-[3/4] cursor-pointer"
          >
            <Image
              src={exp.img}
              alt={exp.title}
              fill
              loading="lazy"
              className="object-cover transition-soft group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--surface-deep))] via-[hsl(var(--surface-deep))]/30 to-transparent" />
            <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
              <span className="eyebrow text-white/70 mb-3">{`0${i + 1}`}</span>
              <h3 className="font-display text-3xl mb-2">{exp.title}</h3>
              <p className="text-sm text-white/85 leading-relaxed">
                {exp.description}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link href="/lieu" className="btn-editorial">
          Explorer la région →
        </Link>
      </div>
    </section>
  );
}