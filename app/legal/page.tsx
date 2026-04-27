

export default function LegalPage() {
  return (
    <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-display italic mb-8">Mentions Légales</h1>
      <div className="prose prose-slate">
        <p>
          Propriétaire : Famille [Nom], Pesaulhe, 32460 Le Houga.
          <br />
          Hébergement : Vercel Inc.
        </p>
        {/* Ajoute ici le reste des informations légales */}
      </div>
    </main>
  );
}