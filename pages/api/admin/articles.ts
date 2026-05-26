import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { isAdminAuthenticated } from '../../../lib/auth';

const DATA_PATH = path.join(process.cwd(), 'data', 'articles.json');

function readArticles() {
  if (!fs.existsSync(DATA_PATH)) return [];
  return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
}

function writeArticles(articles: any[]) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(articles, null, 2));
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!isAdminAuthenticated(req)) {
    res.status(401).json({ error: 'Non autorisé' });
    return;
  }
  if (req.method === 'GET') {
    res.status(200).json(readArticles());
  } else if (req.method === 'POST') {
    const { title, description, content, image, date } = req.body;
    const articles = readArticles();
    const newArticle = { id: Date.now().toString(), title, description, content, image, date };
    articles.push(newArticle);
    writeArticles(articles);
    res.status(201).json(newArticle);
  } else if (req.method === 'PUT') {
    const { id, title, description, content, image, date } = req.body;
    let articles = readArticles();
    articles = articles.map((a: any) => a.id === id ? { ...a, title, description, content, image, date } : a);
    writeArticles(articles);
    res.status(200).json({ success: true });
  } else if (req.method === 'DELETE') {
    const { id } = req.body;
    let articles = readArticles();
    articles = articles.filter((a: any) => a.id !== id);
    writeArticles(articles);
    res.status(200).json({ success: true });
  } else {
    res.status(405).end();
  }
}