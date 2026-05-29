import pool from '../../../lib/db';

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const article = await pool.query('SELECT * FROM articles WHERE id = $1', [params.id]);
  const articleData = article.rows[0];

  if (!articleData) {
    return <main className="pt-32 px-6 text-center"><h1>Article non trouvé</h1></main>;
  }

  return (
    <main className="pt-32 pb-20 px-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-display mb-6">{articleData.title}</h1>
      <p className="text-sm text-gray-500 mb-8">{articleData.date}</p>

      {articleData.image && (
        <img src={articleData.image} alt={articleData.title} className="w-full aspect-video object-cover rounded mb-8" />
      )}
      <div className="prose prose-lg text-justify">
        {articleData.content}
    </div>
  </main>
  );
}