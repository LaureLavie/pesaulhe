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
    <div className="min-h-screen bg-background p-8 flex flex-col items-center">
      <h1 className="text-4xl font-display font-bold mb-10 text-center italic tracking-tight text-primary">Dashboard Admin Blog</h1>
      <form onSubmit={handleSubmit} className="mb-12 w-full max-w-xl bg-white/90 rounded-2xl shadow-editorial p-8 flex flex-col gap-5 border border-border">
        <div>
          <label className="block text-sm font-medium text-primary mb-1">Titre</label>
          <input name="title" value={form.title} onChange={handleChange} placeholder="Titre" className="w-full border border-border rounded-lg p-3 focus:ring-2 focus:ring-accent focus:outline-none transition-soft font-display text-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium text-primary mb-1">Description</label>
          <input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border border-border rounded-lg p-3 focus:ring-2 focus:ring-accent focus:outline-none transition-soft" />
        </div>
        <div>
          <label className="block text-sm font-medium text-primary mb-1">Contenu texte</label>
          <textarea name="content" value={form.content} onChange={handleChange} placeholder="Contenu texte" rows={5} className="w-full border border-border rounded-lg p-3 focus:ring-2 focus:ring-accent focus:outline-none transition-soft resize-none" />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-primary mb-1">Date</label>
            <input name="date" value={form.date} onChange={handleChange} placeholder="Date (ex: Octobre 2025)" className="w-full border border-border rounded-lg p-3 focus:ring-2 focus:ring-accent focus:outline-none transition-soft" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-primary mb-1">Image</label>
            <input type="file" accept="image/*" onChange={handleImage} className="w-full border border-border rounded-lg p-2 focus:ring-2 focus:ring-accent focus:outline-none transition-soft bg-white" />
          </div>
        </div>
        {form.image && (
          <div className="flex flex-col items-center mt-2">
            <span className="text-xs text-muted-foreground mb-1">Aperçu de l'image</span>
            <img src={form.image} alt="aperçu" className="w-40 h-28 object-cover rounded-lg shadow-soft border border-border" />
          </div>
        )}
        <div className="flex gap-4 mt-2">
          <button type="submit" className="flex-1 bg-accent text-accent-foreground font-semibold py-3 rounded-lg shadow-editorial hover:bg-accent/90 transition-soft text-lg">{editId ? 'Modifier' : 'Ajouter'}</button>
          {editId && <button type="button" onClick={() => { setEditId(null); setForm({ title: '', description: '', content: '', image: '', date: '' }); }} className="flex-1 bg-muted text-muted-foreground font-semibold py-3 rounded-lg border border-border hover:bg-muted/80 transition-soft">Annuler</button>}
        </div>
      </form>
      <ul className="w-full max-w-2xl space-y-4">
        {articles.map(a => (
          <li key={a.id} className="flex items-center gap-4 bg-white rounded-xl shadow-soft p-4 border border-border">
            <img src={a.image} alt="visuel" className="w-20 h-14 object-cover rounded-lg border border-border bg-muted" />
            <div className="flex-1 min-w-0">
              <div className="font-display font-semibold text-lg truncate">{a.title}</div>
              <div className="text-sm text-muted-foreground truncate">{a.description}</div>
              <div className="text-xs text-gray-400">{a.date}</div>
            </div>
            <button onClick={() => handleEdit(a)} className="bg-blue-500 text-white px-3 py-1 rounded-lg font-medium hover:bg-blue-600 transition-soft">Modifier</button>
            <button onClick={() => handleDelete(a.id)} className="bg-red-500 text-white px-3 py-1 rounded-lg font-medium hover:bg-red-600 transition-soft">Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );