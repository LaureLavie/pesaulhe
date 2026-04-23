import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-[hsl(var(--surface-deep))] text-white">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/photos/hero-pyrenees.jpg"
          alt="Vue sur les vignes du Jurançon et les Pyrénées au coucher du soleil"
          fill
          priority
          className="object-cover ken-burns"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--surface-deep))]/30 via-[hsl(var(--surface-deep))]/10 to-[hsl(var(--surface-deep))]/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container min-h-[100svh] flex flex-col justify-end pb-20 lg:pb-28 pt-32">
        <div className="max-w-3xl fade-in-up">
          <div className="eyebrow text-white/80 mb-6">
            <span className="rule mr-3 bg-white" />
            Chambres d'hôtes & gîte de charme · Béarn
          </div>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl leading-[0.95] tracking-tight">
            Entre vignes,
            <br />
            <em className="text-secondary">vallées</em> & Pyrénées.
          </h1>
          <p className="mt-8 text-lg lg:text-xl text-white/85 max-w-xl leading-relaxed font-light">
            Une ancienne maison béarnaise de 1702, posée sur les coteaux de
            Monein, au cœur du vignoble du Jurançon. Le calme, la pierre, le
            temps qui se pose.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/reserver" className="btn-hero btn-lg">
              Réserver un séjour
            </Link>
            <Link href="/chambres" className="btn-ghost-light btn-lg">
              Découvrir les chambres
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-white/70">
        <span className="text-[0.65rem] uppercase tracking-[0.3em]">
          Faire défiler
        </span>
        <div className="w-px h-10 bg-white/40 animate-pulse" />
      </div>
    </section>
  );
}