import Link from "next/link";
import { Mail, MapPin } from "lucide-react";

const navLinks = [
  { href: "/ou-dormir", label: "Chambres d'hôtes & Gîte" },
  { href: "/a-propos", label: "À propos" },
  { href: "/explorer", label: "Le Béarn" },
  { href: "/contact", label: "Contact" },
  { href: "/reserver", label: "Réserver" },
];

export function Footer() {
  return (
    <footer className="bg-surface-deep text-white/80">
      <div className="container py-16 lg:py-20 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
        {/* Brand */}
        <div className="space-y-4">
          <div className="font-display text-2xl text-white">Maison Pesaulhe & Gîte Noulibos</div>
          <p className="eyebrow text-white/50 text-[0.65rem]">
            Chambres d'hôtes & gîte · Béarn
          </p>
          <p className="text-sm leading-relaxed text-white/60 max-w-xs">
            Anciennes fermes béarnaises de 1700 sur les coteaux de Monein,
            au cœur du vignoble du Jurançon.
          </p>
        </div>

        {/* Nav */}
        <nav className="space-y-3">
          <div className="eyebrow text-white/40 mb-5">Navigation</div>
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block text-sm text-white/70 hover:text-white transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Contact */}
        <div className="space-y-4">
          <div className="eyebrow text-white/40 mb-5">Contact</div>
          <div className="flex items-center gap-3 text-sm text-white/70">
            <MapPin className="size-4 text-secondary shrink-0" />
            <span>Quartier Ucha, 12 Chemin Pesaulhe, 64360 Monein</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-white/70">
            <Mail className="size-4 text-secondary shrink-0" />
            <a
              href="mailto:mylene.lavie@gmail.com"
              className="hover:text-white transition-colors"
            >
              mylene.lavie@gmail.com
            </a>
          </div>
          <div className="flex gap-4 pt-4">
            <a
              href="https://www.booking.com/hotel/fr/pesaulhe.fr.html"
              target="_blank"
              rel="noreferrer"
              className="text-xs uppercase tracking-widest text-white/50 hover:text-secondary transition-colors"
            >
              Booking
            </a>
            <a
              href="https://www.airbnb.fr/rooms/34531525?source_impression_id=p3_1777291392_P3UhBm10WMkAsanz"
              target="_blank"
              rel="noreferrer"
              className="text-xs uppercase tracking-widest text-white/50 hover:text-secondary transition-colors"
            >
              Airbnb
            </a>
          </div>
        </div>
      </div>

      <div className="container border-t border-white/10 py-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-white/30">
        <span>© {new Date().getFullYear()} Maison Pesaulhe. Tous droits réservés.</span>
        <span className="font-display italic text-white/10">Plabiengut a Noste</span>
      </div>
    </footer>
  );
}