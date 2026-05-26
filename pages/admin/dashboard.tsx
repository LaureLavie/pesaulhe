import { useEffect, useState, ChangeEvent } from 'react';
import { useRouter } from 'next/router';

interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  date: string;
}

export default function AdminDashboard() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [form, setForm] = useState({ title: '', description: '', content: '', image: '', date: '' });
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/admin/articles').then(async res => {
      if (res.status === 401) router.push('/admin-login');
      else setArticles(await res.json());
      setLoading(false);
    });
  }, [router]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setForm(f => ({ ...f, image: ev.target?.result as string }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.content || !form.date) return;
    const method = editId ? 'PUT' : 'POST';
    const body = { ...form, id: editId };
    await fetch('/api/admin/articles', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    setForm({ title: '', description: '', content: '', image: '', date: '' });
    setEditId(null);
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

  const handleEdit = (a: Article) => {
    setForm({ title: a.title, description: a.description, content: a.content, image: a.image, date: a.date });
    setEditId(a.id);
  };

  if (loading) return <div className="p-8">Chargement...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard Admin Blog</h1>
      <form onSubmit={handleSubmit} className="mb-8 flex flex-col gap-2 max-w-xl">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Titre" className="border p-2 rounded" />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2 rounded" />
        <textarea name="content" value={form.content} onChange={handleChange} placeholder="Contenu texte" className="border p-2 rounded" />
        <input name="date" value={form.date} onChange={handleChange} placeholder="Date (ex: Octobre 2025)" className="border p-2 rounded" />
        <input type="file" accept="image/*" onChange={handleImage} className="border p-2 rounded" />
        {form.image && <img src={form.image} alt="aperçu" className="w-32 h-20 object-cover mt-2" />}
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">{editId ? 'Modifier' : 'Ajouter'}</button>
        {editId && <button type="button" onClick={() => { setEditId(null); setForm({ title: '', description: '', content: '', image: '', date: '' }); }} className="text-sm text-gray-500">Annuler modification</button>}
      </form>
      <ul>
        {articles.map(a => (
          <li key={a.id} className="flex items-center gap-4 mb-2 bg-white p-2 rounded shadow">
            <img src={a.image} alt="visuel" className="w-20 h-14 object-cover rounded" />
            <div className="flex-1">
              <div className="font-semibold">{a.title}</div>
              <div className="text-sm text-gray-500">{a.description}</div>
              <div className="text-xs text-gray-400">{a.date}</div>
            </div>
            <button onClick={() => handleEdit(a)} className="bg-blue-500 text-white px-2 py-1 rounded">Modifier</button>
            <button onClick={() => handleDelete(a.id)} className="bg-red-500 text-white px-2 py-1 rounded">Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}