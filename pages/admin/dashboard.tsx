import { useEffect, useState, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { parse } from 'cookie';
import '../../styles/admin.css';

interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  date: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};

  if (cookies['admin_auth'] !== 'admin_logged_in') {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    };
  }

  return { props: {} };
};

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
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      if (!res.ok) {                
        return;
      }
      const data = await res.json();
      setArticles(Array.isArray(data) ? data : []);      
    })
    .catch(err => {      
    })
    .finally(() => {
      setLoading(false);
    });

useEffect(() => { 
  fetchArticles(); 
}, []);

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

    try{
      const method = editId ? 'PUT' : 'POST';
      await fetch('/api/admin/articles', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, id: editId }),
      });
      setSaving(false);
      resetForm();
      await fetchArticles();

    } catch (error) {
      console.error('Erreur lors de la sauvegarde de l\'article:', error);
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cet article ?')) return;
    await fetch('/api/admin/articles', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });  
    await fetchArticles();
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
    return <div className="admin-loading">Chargement…</div>;
  }

  return (
    <>     
      <div className="admin-root">

        <header className="admin-header">
          <p className="admin-eyebrow">
            <span className="admin-eyebrow-line" />
            Pesaulhe
            <span className="admin-eyebrow-line" />
          </p>
          <h1 className="admin-title">Tableau de bord</h1>
        </header>

        <div className="admin-layout">

          <section>
            <h2 className="admin-section-title">
              {editId ? "Modifier l'article" : 'Nouvel article'}
            </h2>
            <div className="admin-form-card">
              <form onSubmit={handleSubmit} noValidate>
                <div className="admin-form-grid">

                  {editId && (
                    <div className="admin-form-full">
                      <div className="admin-edit-banner">
                        Vous modifiez un article existant. Vos changements écraseront la version publiée.
                      </div>
                    </div>
                  )}

                  <div className="admin-field admin-form-full">
                    <label className="admin-label" htmlFor="f-title">Titre</label>
                    <input
                      id="f-title"
                      name="title"
                      className="admin-input"
                      value={form.title}
                      onChange={handleChange}
                      placeholder="Titre de l'article"
                      required
                    />
                  </div>

                  <div className="admin-field admin-form-full">
                    <label className="admin-label" htmlFor="f-desc">Description</label>
                    <input
                      id="f-desc"
                      name="description"
                      className="admin-input"
                      value={form.description}
                      onChange={handleChange}
                      placeholder="Courte description affichée sur la page blog"
                    />
                  </div>

                  <div className="admin-field admin-form-full">
                    <label className="admin-label" htmlFor="f-content">Contenu</label>
                    <textarea
                      id="f-content"
                      name="content"
                      className="admin-textarea"
                      value={form.content}
                      onChange={handleChange}
                      placeholder="Contenu complet de l'article…"
                      rows={6}
                    />
                  </div>

                  <div className="admin-field">
                    <label className="admin-label" htmlFor="f-date">Date</label>
                    <input
                      id="f-date"
                      name="date"
                      className="admin-input"
                      value={form.date}
                      onChange={handleChange}
                      placeholder="ex : Octobre 2025"
                    />
                  </div>

                  <div className="admin-field">
                    <span className="admin-label">Image</span>
                    <label className="admin-file-label" htmlFor="f-image">
                      ↑ Choisir un fichier
                    </label>
                    <input
                      id="f-image"
                      type="file"
                      accept="image/*"
                      className="admin-file-input"
                      onChange={handleImage}
                    />
                    {form.image && (
                      <div className="admin-preview">
                        <img src={form.image} alt="aperçu" />
                        <span className="admin-preview-name">{previewName || 'Image sélectionnée'}</span>
                      </div>
                    )}
                  </div>

                  <div className="admin-form-actions">
                    <button type="submit" className="admin-btn-primary" disabled={saving}>
                      {saving ? 'Enregistrement…' : editId ? "Enregistrer les modifications" : "Publier l'article"}
                    </button>
                    {editId && (
                      <button type="button" className="admin-btn-secondary" onClick={resetForm}>
                        Annuler
                      </button>
                    )}
                  </div>

                </div>
              </form>
            </div>
          </section>

          <section>
            <h2 className="admin-section-title">Articles publiés</h2>
            <div className="admin-divider">
              <span className="admin-divider-line" />
              <span className="admin-divider-diamond" />
              <span className="admin-divider-line" />
            </div>

            {articles.length === 0 ? (
              <div className="admin-empty">Aucun article pour le moment</div>
            ) : (
              <ul className="admin-list">
                {articles.map(a => (
                  <li key={a.id} className="admin-list-item">
                    <img src={a.image} alt="" className="admin-list-img" />
                    <div className="admin-list-body">
                      <div className="admin-list-title">{a.title}</div>
                      <div className="admin-list-desc">{a.description}</div>
                      <div className="admin-list-date">{a.date}</div>
                    </div>
                    <div className="admin-list-actions">
                      <button className="admin-action-edit" onClick={() => handleEdit(a)}>
                        Modifier
                      </button>
                      <button className="admin-action-delete" onClick={() => handleDelete(a.id)}>
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