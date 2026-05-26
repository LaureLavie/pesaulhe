import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function AdminDashboard() {
  const [articles, setArticles] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/admin/articles').then(async res => {
      if (res.status === 401) router.push('/admin-login');
      else setArticles(await res.json());
      setLoading(false);
    });
  }, [router]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/admin/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
    setTitle(''); setContent('');
    setLoading(true);
    fetch('/api/admin/articles').then(async res => setArticles(await res.json()));
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    await fetch('/api/admin/articles', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setLoading(true);
    fetch('/api/admin/articles').then(async res => setArticles(await res.json()));
    setLoading(false);
  };

  if (loading) return <div className="p-8">Chargement...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard Admin</h1>
      <form onSubmit={handleAdd} className="mb-8 flex gap-2">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Titre" className="border p-2 rounded w-1/3" />
        <input value={content} onChange={e => setContent(e.target.value)} placeholder="Contenu" className="border p-2 rounded w-1/2" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Ajouter</button>
      </form>
      <ul>
        {articles.map(a => (
          <li key={a.id} className="flex items-center gap-4 mb-2 bg-white p-2 rounded shadow">
            <span className="font-semibold">{a.title}</span>
            <span className="flex-1">{a.content}</span>
            <button onClick={() => handleDelete(a.id)} className="bg-red-500 text-white px-2 py-1 rounded">Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
