import { useState } from 'react';
import { useRouter } from 'next/router';
import '../app/globals.css';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();    
    setError('');
    setLoading(true);
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    
    if (res.ok) {
      router.push('/admin/dashboard');
    } else {
      setError('Mot de passe incorrect');
    }
    
  };

  return (
    <>
      <div className="al-root">
        <div className="al-card">
          <div className="al-ornament">
            <span className="al-ornament-line" />
            <span className="al-ornament-diamond" />
            <span className="al-ornament-line" />
          </div>

          <p className="al-eyebrow">Espace privé</p>
          <h1 className="al-title">Connexion</h1>

          <form onSubmit={handleSubmit} noValidate>
            <div className="al-field">
              <label className="al-label" htmlFor="al-password">Mot de passe</label>
              <input
                id="al-password"
                type="password"
                className="al-input"
                placeholder="••••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            {error && <p className="al-error">{error}</p>}

            <button type="submit" className="al-btn" disabled={loading}>
              {loading ? 'Vérification…' : 'Accéder au tableau de bord'}
              {!loading && <span className="al-btn-arrow">→</span>}
            </button>
          </form>

          <p className="al-footer">Pesaulhe &nbsp;·&nbsp; Administration</p>
        </div>
      </div>
    </>
  );
}