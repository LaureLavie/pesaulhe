
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils"; 

const navLinks = [
  { name: "Accueil", href: "/" },
  { name: "Chambres d'Hôtes", href: "/chambres" },
  { name: "Gîte", href: "/gite" },
  { name: "Notre Histoire", href: "/histoire" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Effet pour changer le fond au scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500 px-6 py-4",
        scrolled ? "bg-background/90 backdrop-blur-md border-b border-border shadow-soft" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo / Nom du domaine */}
        <Link href="/" className="group">
          <span className="font-display text-2xl tracking-widest uppercase transition-soft group-hover:text-accent">
            Pesaulhe
          </span>
          <span className="block text-[10px] tracking-[0.3em] uppercase text-muted-foreground text-black hover:text-accent">
            & Noulibos
          </span>
        </Link>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "btn-editorial border-none p-0 lowercase first-letter:uppercase",
                pathname === link.href ? "text-accent underline" : "text-foreground/70  text-black hover:text-accent"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link href="/reservation" className="btn-hero btn-sm ml-4">
            Réserver
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-accent" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Menu Mobile Overlay */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-background border-b border-border p-8 flex flex-col gap-6 md:hidden fade-in-up">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="font-display text-2xl italic border-b border-border/50 pb-2"
            >
              {link.name}
            </Link>
          ))}
          <Link href="/reservation" className="btn-hero w-full" onClick={() => setIsOpen(false)}>
            Réserver mon séjour
          </Link>
        </div>
      )}
    </nav>
  );
}