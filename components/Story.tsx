import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "./Header";

export function Story() {
  return (
    <section className="bg-surface-warm paper-texture">
      <div className="container py-24 lg:py-32 grid gap-16 lg:grid-cols-12 items-center">
        {/* Images */}
        <div className="lg:col-span-6 relative">
          <div className="aspect-[4/5] overflow-hidden shadow-editorial">
            <Image
              src="/public/farmhouse-detail.jpg"
              alt="Façade en pierre de la maison béarnaise"
              fill
              loading="lazy"
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="absolute -bottom-12 -right-4 lg:-right-12 w-2/3 aspect-[4/3] overflow-hidden shadow-frame border-8 border-background hidden md:block">
            <Image
              src="/public/maison.jpg"
              alt="Détail de la maison"
              fill
              loading="lazy"
              className="object-cover"
              sizes="33vw"
            />
          </div>
        </div>

        {/* Text */}
        <div className="lg:col-span-6 lg:pl-8">
          <SectionHeader
            eyebrow="Le refuge du berger · depuis 1702"
            title={
              <>
                Une maison de famille,
                <br />
                <em className="text-accent">restaurée</em> avec patience.
              </>
            }
          />
          <div className="mt-8 space-y-5 text-base lg:text-lg leading-relaxed text-foreground/80 max-w-xl">
            <p>
              Pésaulhé — « le refuge du berger » en béarnais — est une ancienne
              ferme du XVIII<sup>e</sup> siècle. Dans les années 1960, Jean le
              berger y passait l'hiver avec ses brebis, parmi les derniers à
              avoir cohabité avec l'ours des Pyrénées.
            </p>
            <p className="font-display italic text-xl text-foreground">
              « Nous avons souhaité garder le charme et l'authenticité de cette
              ferme béarnaise. Pour tous ceux qui recherchent le calme et la
              tranquillité. »
            </p>
            <p className="text-sm text-muted-foreground">— Mylène & Jean-Paul</p>
          </div>
          <div className="mt-10">
            <Link href="/a-propos" className="btn-editorial">
              Notre histoire en détail →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}