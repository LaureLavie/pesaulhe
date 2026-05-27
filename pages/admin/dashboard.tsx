import { useEffect, useState, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import '../../app/globals.css';

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
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [previewName, setPreviewName] = useState('');
  const router = useRouter();

  const fetchArticles = () =>
    fetch('/api/admin/articles').then(async res => {
      if (res.status === 401) router.push('/admin-login');
      else setArticles(await res.json());
      setLoading(false);
    });

  useEffect(() => { fetchArticles(); }, [router]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreviewName(file.name);
    const reader = new FileReader();
    reader.onload = ev => setForm(f => ({ ...f, image: ev.target?.result as string }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.content || !form.date) return;
    setSaving(true);
    const method = editId ? 'PUT' : 'POST';
    await fetch('/api/admin/articles', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, id: editId }),
    });
    setSaving(false);
    resetForm();
    setLoading(true);
    fetchArticles();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cet article ?')) return;
    await fetch('/api/admin/articles', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setLoading(true);
    fetchArticles();
  };

  const handleEdit = (a: Article) => {
    setForm({ title: a.title, description: a.description, content: a.content, image: a.image, date: a.date });
    setEditId(a.id);
    setPreviewName('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setForm({ title: '', description: '', content: '', image: '', date: '' });
    setEditId(null);
    setPreviewName('');
  };

  if (loading) {
    return <div className="ad-loading">Chargement…</div>;
  }

  return (
    <>
     
      <div className="ad-root">

        <header className="ad-header">
          <p className="ad-eyebrow">
            <span className="ad-eyebrow-line" />
            Pesaulhe
            <span className="ad-eyebrow-line" />
          </p>
          <h1 className="ad-title">Tableau de bord</h1>
        </header>

        <div className="ad-layout">

          <section>
            <h2 className="ad-section-title">
              {editId ? "Modifier l'article" : 'Nouvel article'}
            </h2>
            <div className="ad-form-card">
              <form onSubmit={handleSubmit} noValidate>
                <div className="ad-form-grid">

                  {editId && (
                    <div className="ad-form-full">
                      <div className="ad-edit-banner">
                        Vous modifiez un article existant. Vos changements écraseront la version publiée.
                      </div>
                    </div>
                  )}

                  <div className="ad-field ad-form-full">
                    <label className="ad-label" htmlFor="f-title">Titre</label>
                    <input
                      id="f-title"
                      name="title"
                      className="ad-input"
                      value={form.title}
                      onChange={handleChange}
                      placeholder="Titre de l'article"
                      required
                    />
                  </div>

                  <div className="ad-field ad-form-full">
                    <label className="ad-label" htmlFor="f-desc">Description</label>
                    <input
                      id="f-desc"
                      name="description"
                      className="ad-input"
                      value={form.description}
                      onChange={handleChange}
                      placeholder="Courte description affichée sur la page blog"
                    />
                  </div>

                  <div className="ad-field ad-form-full">
                    <label className="ad-label" htmlFor="f-content">Contenu</label>
                    <textarea
                      id="f-content"
                      name="content"
                      className="ad-textarea"
                      value={form.content}
                      onChange={handleChange}
                      placeholder="Contenu complet de l'article…"
                      rows={6}
                    />
                  </div>

                  <div className="ad-field">
                    <label className="ad-label" htmlFor="f-date">Date</label>
                    <input
                      id="f-date"
                      name="date"
                      className="ad-input"
                      value={form.date}
                      onChange={handleChange}
                      placeholder="ex : Octobre 2025"
                    />
                  </div>

                  <div className="ad-field">
                    <span className="ad-label">Image</span>
                    <label className="ad-file-label" htmlFor="f-image">
                      ↑ Choisir un fichier
                    </label>
                    <input
                      id="f-image"
                      type="file"
                      accept="image/*"
                      className="ad-file-input"
                      onChange={handleImage}
                    />
                    {form.image && (
                      <div className="ad-preview">
                        <img src={form.image} alt="aperçu" />
                        <span className="ad-preview-name">{previewName || 'Image sélectionnée'}</span>
                      </div>
                    )}
                  </div>

                  <div className="ad-form-actions">
                    <button type="submit" className="ad-btn-primary" disabled={saving}>
                      {saving ? 'Enregistrement…' : editId ? "Enregistrer les modifications" : "Publier l'article"}
                    </button>
                    {editId && (
                      <button type="button" className="ad-btn-secondary" onClick={resetForm}>
                        Annuler
                      </button>
                    )}
                  </div>

                </div>
              </form>
            </div>
          </section>

          <section>
            <h2 className="ad-section-title">Articles publiés</h2>
            <div className="ad-divider">
              <span className="ad-divider-line" />
              <span className="ad-divider-diamond" />
              <span className="ad-divider-line" />
            </div>

            {articles.length === 0 ? (
              <div className="ad-empty">Aucun article pour le moment</div>
            ) : (
              <ul className="ad-list">
                {articles.map(a => (
                  <li key={a.id} className="ad-list-item">
                    <img src={a.image} alt="" className="ad-list-img" />
                    <div className="ad-list-body">
                      <div className="ad-list-title">{a.title}</div>
                      <div className="ad-list-desc">{a.description}</div>
                      <div className="ad-list-date">{a.date}</div>
                    </div>
                    <div className="ad-list-actions">
                      <button className="ad-action-edit" onClick={() => handleEdit(a)}>
                        Modifier
                      </button>
                      <button className="ad-action-delete" onClick={() => handleDelete(a.id)}>
                        Supprimer
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

        </div>
      </div>
    </>
  );
}