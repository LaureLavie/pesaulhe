
export default function GitePage() {
  return (
    <main className="pt-32 pb-20 px-6 paper-texture">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 fade-in-up">
            <span className="eyebrow mb-4">Campagne, calme et bons moments</span>
            <h1 className="text-5xl font-display mb-6">Le Gîte Noulibos</h1>
            <p className="text-lg leading-relaxed text-foreground/80 mb-6">
              Une maison béarnaise typique entièrement aménagée pour accueillir jusqu'à 12 personnes. 
              Profitez d'une grange privative et d'un accès à la forêt de la ferme.
            </p>
            <p className="text-accent text-bold mb-2">
            Un séjour au cœur d'une ferme béarnaise qui vit.
            </p>
            <p className="text-foreground/80 mb-4">
              Le gîte est installé dans l'ancien corps de notre petite ferme familiale, toujours en activité. Si vous cherchez un endroit pour déconnecter vraiment, vous y êtes : nous sommes en pleine nature, dans une jolie vallée entourée de bois, avec un petit ruisseau qui coule juste à côté. Le calme y est roi. <br />
              On est aussi idéalement placés pour découvrir la région : vous êtes à seulement 1h de l'océan (Biarritz, Saint-Jean-de-Luz), 1h des stations de ski des Pyrénées (Gourette, La Pierre Saint-Martin) et 30 minutes de Pau.
            </p>
            <p className="text-accent text-bold mb-2">
            Le logement : Simplicité & détente.
            </p>
            <p className="text-foreground/80 mb-4">
            L'intérieur est resté simple et authentique, dans l'esprit "maison de campagne". 
            <br />Mais le petit plus, c'est la grange attenante qui fait partie du gîte. On l'a transformée en un immense espace de détente rien que pour vous.
            <br />C’est l’endroit parfait pour se retrouver en famille ou entre amis, peu importe la météo !</p>
            <ul className="space-y-3 mb-8 italic">
              <li>• 5 chambres spacieuses</li>
              <li>• Cuisine équipée & Cheminée</li>
              <li>• Coin cinéma avec vidéoprojecteur et grand écran</li>
              <li>• Table de ping-pong, Billard français, Baby-foot</li>
            </ul>
            <button className="btn-outline">Voir les disponibilités</button>
          </div>
          <div className="flex-1 shadow-frame w-full aspect-square bg-muted" />
        </div>
      </div>
    </main>
  );
}