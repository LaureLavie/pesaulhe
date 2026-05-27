import { useEffect, useState, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

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

  const styles = (
    <Head>      
      <style>{`
        .ad-root {
          min-height: 100vh;
          background-color: hsl(40 20% 97%);
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E");
          font-family: "Raleway", sans-serif;
          padding: 3rem 1.5rem 5rem;
          box-sizing: border-box;
        }
        .ad-header {
          text-align: center;
          margin-bottom: 3.5rem;
          animation: fadeInUp 0.7s ease-out forwards;
        }
        .ad-eyebrow {
          font-size: 0.65rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: hsl(30 10% 45%);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }
        .ad-eyebrow-line {
          display: inline-block;
          width: 2rem;
          height: 1px;
          background: hsl(30 10% 45%);
        }
        .ad-title {
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: 2.75rem;
          font-weight: 400;
          font-style: italic;
          color: hsl(30 15% 12%);
          margin: 0;
          line-height: 1.1;
        }
        .ad-section-title {
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: 1.5rem;
          font-weight: 400;
          font-style: italic;
          color: hsl(30 15% 12%);
          margin: 0 0 1.5rem 0;
        }
        .ad-layout {
          max-width: 900px;
          margin: 0 auto;
          display: grid;
          gap: 3rem;
        }
        .ad-form-card {
          background: hsl(40 20% 97%);
          border: 1px solid hsl(35 15% 82%);
          padding: 2.5rem 2.5rem 3rem;
          animation: fadeInUp 0.8s 0.1s ease-out both;
        }
        .ad-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.75rem 2rem;
        }
        .ad-form-full { grid-column: 1 / -1; }
        .ad-field { display: flex; flex-direction: column; gap: 0.5rem; }
        .ad-label {
          font-size: 0.65rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: hsl(30 10% 45%);
        }
        .ad-input {
          background: transparent;
          border: 0 none;
          border-bottom: 1px solid hsl(35 15% 82%);
          padding: 0.6rem 0;
          font-family: "Raleway", sans-serif;
          font-size: 0.9rem;
          font-weight: 300;
          color: hsl(30 15% 12%);
          transition: border-color 0.4s ease;
          outline: none;
          width: 100%;
          box-sizing: border-box;
        }
        .ad-input:focus { border-bottom-color: hsl(20 55% 45%); }
        .ad-input::placeholder { color: hsl(30 10% 65%); font-weight: 300; }
        .ad-textarea {
          background: transparent;
          resize: none;
          line-height: 1.7;
          min-height: 120px;
          border: 1px solid hsl(35 15% 82%);
          padding: 0.8rem;
          font-family: "Raleway", sans-serif;
          font-size: 0.9rem;
          font-weight: 300;
          color: hsl(30 15% 12%);
          transition: border-color 0.4s ease;
          outline: none;
          width: 100%;
          box-sizing: border-box;
        }
        .ad-textarea:focus { border-color: hsl(20 55% 45%); }
        .ad-textarea::placeholder { color: hsl(30 10% 65%); font-weight: 300; }
        .ad-file-label {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.1rem;
          border: 1px solid hsl(35 15% 82%);
          font-size: 0.7rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: hsl(30 10% 45%);
          cursor: pointer;
          transition: all 0.4s ease;
          width: fit-content;
        }
        .ad-file-label:hover { border-color: hsl(30 18% 20%); color: hsl(30 15% 12%); }
        .ad-file-input { display: none; }
        .ad-preview { margin-top: 0.75rem; display: flex; align-items: center; gap: 0.75rem; }
        .ad-preview img { width: 4.5rem; height: 3rem; object-fit: cover; border: 1px solid hsl(35 15% 82%); }
        .ad-preview-name { font-size: 0.75rem; color: hsl(30 10% 45%); font-weight: 300; }
        .ad-form-actions {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
          grid-column: 1 / -1;
        }
        .ad-btn-primary {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          padding: 0.9rem 1.5rem;
          background: hsl(30 18% 20%);
          color: hsl(40 20% 97%);
          border: 1px solid hsl(30 18% 20%);
          font-family: "Raleway", sans-serif;
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.5s ease;
        }
        .ad-btn-primary:hover { background: hsl(30 18% 28%); border-color: hsl(30 18% 28%); }
        .ad-btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
        .ad-btn-secondary {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.9rem 1.5rem;
          background: transparent;
          color: hsl(30 10% 45%);
          border: 1px solid hsl(35 15% 82%);
          font-family: "Raleway", sans-serif;
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.4s ease;
        }
        .ad-btn-secondary:hover { border-color: hsl(30 10% 45%); color: hsl(30 15% 12%); }
        .ad-divider { display: flex; align-items: center; gap: 1rem; margin: 0.5rem 0 1.75rem; }
        .ad-divider-line { flex: 1; height: 1px; background: hsl(35 15% 82%); }
        .ad-divider-diamond {
          width: 5px; height: 5px;
          background: hsl(42 72% 64%);
          transform: rotate(45deg);
          flex-shrink: 0;
        }
        .ad-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          border: 1px solid hsl(35 15% 82%);
        }
        .ad-list-item {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 1.25rem 1.5rem;
          background: hsl(40 20% 97%);
          transition: background 0.3s ease;
        }
        .ad-list-item:not(:last-child) { border-bottom: 1px solid hsl(35 15% 82%); }
        .ad-list-item:hover { background: hsl(40 28% 94%); }
        .ad-list-img {
          width: 5rem;
          height: 3.25rem;
          object-fit: cover;
          border: 1px solid hsl(35 15% 82%);
          flex-shrink: 0;
          background: hsl(40 12% 90%);
        }
        .ad-list-body { flex: 1; min-width: 0; }
        .ad-list-title {
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: 1.1rem;
          font-weight: 500;
          color: hsl(30 15% 12%);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 0.15rem;
        }
        .ad-list-desc {
          font-size: 0.8rem;
          font-weight: 300;
          color: hsl(30 10% 45%);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 0.2rem;
        }
        .ad-list-date {
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: hsl(30 10% 60%);
        }
        .ad-list-actions { display: flex; gap: 0.5rem; flex-shrink: 0; }
        .ad-action-edit {
          padding: 0.45rem 0.9rem;
          background: transparent;
          border: 1px solid hsl(35 15% 82%);
          color: hsl(30 15% 12%);
          font-family: "Raleway", sans-serif;
          font-size: 0.63rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.4s ease;
        }
        .ad-action-edit:hover { border-color: hsl(30 18% 20%); background: hsl(30 18% 20%); color: hsl(40 20% 97%); }
        .ad-action-delete {
          padding: 0.45rem 0.9rem;
          background: transparent;
          border: 1px solid hsl(35 15% 82%);
          color: hsl(30 10% 55%);
          font-family: "Raleway", sans-serif;
          font-size: 0.63rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.4s ease;
        }
        .ad-action-delete:hover { border-color: hsl(0 72% 51%); color: hsl(0 72% 51%); }
        .ad-empty {
          text-align: center;
          padding: 3rem 1rem;
          color: hsl(30 10% 55%);
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: 1.1rem;
          font-style: italic;
          border: 1px solid hsl(35 15% 82%);
        }
        .ad-edit-banner {
          padding: 0.75rem 1.25rem;
          background: hsl(42 72% 64% / 0.12);
          border-left: 3px solid hsl(42 72% 64%);
          font-size: 0.78rem;
          color: hsl(30 15% 12%);
          margin-bottom: 1.5rem;
        }
        .ad-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          font-family: "Cormorant Garamond", Georgia, serif;
          font-style: italic;
          font-size: 1.25rem;
          color: hsl(30 10% 45%);
          background: hsl(40 20% 97%);
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 600px) {
          .ad-form-grid { grid-template-columns: 1fr; }
          .ad-form-full { grid-column: 1; }
          .ad-form-actions { flex-direction: column; }
          .ad-title { font-size: 2rem; }
          .ad-form-card { padding: 1.75rem 1.5rem; }
          .ad-list-item { flex-wrap: wrap; }
          .ad-list-img { width: 4rem; height: 2.75rem; }
        }
      `}</style>
    </Head>
  );

  if (loading) return (
    <>
      {styles}
      <div className="ad-loading">Chargement…</div>
    </>
  );

  return (
    <>
      {styles}
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