
import Image from "next/image";

export default function ChambresPage() {
  const chambres = [
    { name: "La Roussanne", desc: "Douceur et lumière avec vue sur les Pyrénées.", price: "50€" },
    { name: "Manseng'Folies", desc: "Authenticité des poutres apparentes et mobilier chiné.", price: "80€" },
  ];

  return (
    <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16 fade-in-up">
        <span className="eyebrow justify-center mb-4"><span className="rule mr-2" /> Pesaulhe <span className="rule ml-2" /></span>
        <h1 className="text-5xl font-display italic">Les Chambres d'Hôtes</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {chambres.map((chambre, i) => (
          <div key={i} className="group">
            <div className="overflow-hidden shadow-editorial mb-6 aspect-[4/3] relative">
              <div className="w-full h-full bg-muted transition-soft group-hover:scale-105 paper-texture" />
            </div>
            <h3 className="text-2xl font-display mb-2">{chambre.name}</h3>
            <p className="text-muted-foreground mb-4">{chambre.desc}</p>
            <span className="text-accent font-medium">À partir de {chambre.price} / nuit</span>
          </div>
        ))}
      </div>
    </main>
  );
}