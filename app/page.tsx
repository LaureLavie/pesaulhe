'use client'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center px-6">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {/* Image de fond avec ton animation Ken Burns */}
          <div 
            className="w-full h-full bg-[url('/hero-pesaulhe.jpg')] bg-cover bg-center ken-burns"
            style={{ backgroundImage: "url('https://res.cloudinary.com/immerswrite/image/upload/v1777291127/vignes-vallees_qnyogb.webp')" }} 
          />
          <div className="absolute inset-0 bg-black/30" /> {/* Overlay pour la lisibilité */}
        </div>

        <div className="max-w-3xl fade-in-up">
          <div className="text-white eyebrow justify-center mb-6">
            <span className="rule mr-4" />
            Bienvenue en Béarn
            <span className="rule ml-4" />
          </div>
          <h1 className="text-5xl md:text-7xl text-white mb-8">
            L'art de vivre en <br /> terre béarnaise
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/reservation" className="btn-hero">Réserver un séjour</Link>            
            <Link href="/blog" className="btn-ghost-light">Découvrir le terroir</Link>
          </div>
        </div>
      </section>

      {/* Section Textures (Utilise ta classe paper-texture) */}
      <section className="py-24 bg-surface-warm paper-texture px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl mb-6">Deux lieux, une seule âme</h2>
          <p className="text-muted-foreground leading-relaxed">
            Entre les chambres d'hôtes de charme à Pesaulhe et l'indépendance du gîte Noulibos...
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/chambres" className="btn-editorial">Chambres d'hôte Pesaulhe</Link>            
            <Link href="/gite" className="btn-editorial">Gîte Noulibos</Link>
          </div>
      </section>
    </main>
  )
}