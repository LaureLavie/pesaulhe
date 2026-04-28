
export default function BlogPage() {
  const posts = [
    { title: "Récolte des oranges au jardin", date: "Octobre 2025", category: "Vie à la ferme" },
    { title: "Nouveau : Achat d'un babyfoot", date: "Septembre 2024", category: "Services" },
  ];

  return (
    <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
      <h1 className="text-5xl font-display mb-16 text-center italic">Le Journal de Pesaulhe & Noulibos</h1>
      <div className="grid gap-16">
        {posts.map((post, i) => (
          <article key={i} className="flex flex-col md:flex-row gap-8 items-center border-b border-border pb-16">
            <div className="w-full md:w-1/3 aspect-video bg-muted paper-texture" />
            <div className="flex-1">
              <span className="eyebrow mb-2">{post.category} — {post.date}</span>
              <h2 className="text-3xl font-display mb-4 hover:text-accent cursor-pointer transition-soft">{post.title}</h2>
              <p className="text-muted-foreground mb-6">Découvrez les coulisses de notre quotidien dans le Béarn...</p>
              <button className="btn-editorial">Lire l'article</button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}