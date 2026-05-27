import { useState } from 'react';
import { useRouter } from 'next/router';

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
      <style>{`        
        .al-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: hsl(40 20% 97%);
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E");
          font-family: "Raleway", sans-serif;
          padding: 2rem;
        }

        .al-card {
          width: 100%;
          max-width: 420px;
          background: hsl(40 20% 97%);
          border: 1px solid hsl(35 15% 82%);
          padding: 3.5rem 3rem;
          animation: fadeInUp 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .al-ornament {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .al-ornament-line {
          flex: 1;
          height: 1px;
          background: hsl(35 15% 82%);
        }

        .al-ornament-diamond {
          width: 6px;
          height: 6px;
          background: hsl(42 72% 64%);
          transform: rotate(45deg);
          flex-shrink: 0;
        }

        .al-eyebrow {
          text-align: center;
          font-family: "Raleway", sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: hsl(30 10% 45%);
          margin-bottom: 0.75rem;
        }

        .al-title {
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: 2.25rem;
          font-weight: 400;
          font-style: italic;
          color: hsl(30 15% 12%);
          text-align: center;
          margin: 0 0 2.5rem 0;
          line-height: 1.2;
        }

        .al-field {
          margin-bottom: 1.5rem;
        }

        .al-label {
          display: block;
          font-family: "Raleway", sans-serif;
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: hsl(30 10% 45%);
          margin-bottom: 0.6rem;
        }

        .al-input {
          width: 100%;
          border: 0 none;
          border-bottom: 1px solid hsl(35 15% 82%);
          background: transparent;
          padding: 0.65rem 0;
          font-family: "Raleway", sans-serif;
          font-size: 0.95rem;
          font-weight: 300;
          color: hsl(30 15% 12%);
          transition: border-color 0.4s ease;
          outline: none;
          box-sizing: border-box;
        }

        .al-input:focus {
          border-bottom-color: hsl(20 55% 45%);
        }

        .al-input::placeholder {
          color: hsl(30 10% 65%);
          font-weight: 300;
        }

        .al-error {
          font-family: "Raleway", sans-serif;
          font-size: 0.75rem;
          color: hsl(0 72% 51%);
          letter-spacing: 0.06em;
          margin-bottom: 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .al-error::before {
          content: '—';
          color: hsl(0 72% 51%);
        }

        .al-btn {
          width: 100%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 1rem 2rem;
          background: hsl(30 18% 20%);
          color: hsl(40 20% 97%);
          border: 1px solid hsl(30 18% 20%);
          font-family: "Raleway", sans-serif;
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          margin-top: 1rem;
        }

        .al-btn:hover:not(:disabled) {
          background: hsl(30 18% 28%);
          border-color: hsl(30 18% 28%);
        }

        .al-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .al-btn-arrow {
          font-size: 0.85rem;
          transition: transform 0.4s ease;
        }

        .al-btn:hover:not(:disabled) .al-btn-arrow {
          transform: translateX(4px);
        }

        .al-footer {
          text-align: center;
          margin-top: 2.5rem;
          font-family: "Raleway", sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: hsl(30 10% 60%);
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

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