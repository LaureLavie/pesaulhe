
export default function GitePage() {
  return (
    <main className="pt-32 pb-20 px-6 paper-texture">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 fade-in-up">
            <span className="eyebrow mb-4">Indépendance & Confort</span>
            <h1 className="text-5xl font-display mb-6">Le Gîte Noulibos</h1>
            <p className="text-lg leading-relaxed text-foreground/80 mb-6">
              Une maison béarnaise typique entièrement aménagée pour accueillir jusqu'à 12 personnes. 
              Profitez d'une grange privative et d'un accès à la forêt de la ferme.
            </p>
            <ul className="space-y-3 mb-8 italic">
              <li>• 5 chambres spacieuses</li>
              <li>• Cuisine équipée & Cheminée</li>
              <li>• Terrasse </li>
              <li>• Grange, Cinéma, Billard, Babyfoot</li>
            </ul>
            <button className="btn-outline">Voir les disponibilités</button>
          </div>
          <div className="flex-1 shadow-frame w-full aspect-square bg-muted" />
        </div>
      </div>
    </main>
  );
}