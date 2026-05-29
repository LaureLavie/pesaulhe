import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../../lib/db';
import { isAdminAuthenticated } from '../../../../lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!isAdminAuthenticated(req)) {
    res.status(401).json({ error: 'Non autorisé' });
    return;
  }
  try {
    if (req.method === 'GET') {
      const { rows } = await pool.query('SELECT * FROM articles ORDER BY id DESC');
      res.status(200).json(rows);
    } else if (req.method === 'POST') {
      const { title, description, content, image, date } = req.body;
      const result = await pool.query(
        'INSERT INTO articles (title, description, content, image, date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [title, description, content, image, date]
      );
      res.status(201).json(result.rows[0]);
    } else if (req.method === 'PUT') {
      const { id, title, description, content, image, date } = req.body;
      await pool.query(
        'UPDATE articles SET title=$1, description=$2, content=$3, image=$4, date=$5 WHERE id=$6',
        [title, description, content, image, date, id]
      );
      res.status(200).json({ success: true });
    } else if (req.method === 'DELETE') {
      const { id } = req.body;
      await pool.query('DELETE FROM articles WHERE id=$1', [id]);
      res.status(200).json({ success: true });
    } else {
      res.status(405).end();
    }
  } catch (e) {
    res.status(500).json({ error: 'Erreur serveur', details: e });
  }
}