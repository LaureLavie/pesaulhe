import type { NextApiRequest, NextApiResponse } from 'next';
import { ADMIN_PASSWORD, setAdminCookie, clearAdminCookie } from '../../../lib/auth';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
      setAdminCookie(res);
      res.status(200).json({ success: true });
    } else {
      clearAdminCookie(res);
      res.status(401).json({ error: 'Mot de passe incorrect' });
    }
  } else {
    res.status(405).end();
  }
}
