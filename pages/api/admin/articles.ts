import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../lib/db';
import { isAdminAuthenticated } from '../../../lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { rows } = await pool.query('SELECT * FROM articles ORDER BY id DESC');
    res.status(200).json(rows);
    return;
  }
  if (!isAdminAuthenticated(req)) {
    res.status(401).json({ error: 'Non autorisé' });
    return;
  }
  try {
  } catch (e) {
    res.status(500).json({ error: 'Erreur serveur', details: e });
  }
};