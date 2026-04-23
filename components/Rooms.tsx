import Link from "next/link";
import Image from "next/image";
import { SectionHeader } from "./Header";
import { rooms } from "@/data/rooms";

export function Rooms() {
  return (
    <section className="container py-24 lg:py-32">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
        <SectionHeader
          eyebrow="Nos hébergements"
          title={
            <>
              Trois manières{" "}
              <em className="text-accent">de s'y poser.</em>
            </>
          }
          description="Deux chambres d'hôtes au charme d'antan dans la maison familiale, et un gîte indépendant pour qui souhaite prendre racine quelques jours."
        />
        <Link href="/chambres" className="btn-editorial shrink-0">
          Voir tous les hébergements →
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room, i) => (
          <Link
            key={room.slug}
            href={`/chambres/${room.slug}`}
            className="group block"
          >
            <div className="aspect-[4/5] overflow-hidden bg-muted mb-6 relative">
              <Image
                src={room.image}
                alt={room.name}
                fill
                loading="lazy"
                className="object-cover transition-soft group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-3xl tracking-tight">
                  {room.name}
                </h3>
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  dès{" "}
                  <span className="text-foreground font-medium">
                    {room.price}€
                  </span>
                </span>
              </div>
              <p className="font-display italic text-accent text-lg">
                {room.tagline}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {room.excerpt}
              </p>
              <div className="text-xs uppercase tracking-[0.22em] text-foreground/70 pt-2">
                {room.capacity} →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}