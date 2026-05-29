'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/admin/articles')
      .then(res => res.json())
      .then(setPosts)
      .catch(() => setPosts([]));
  }, []);

  return (
    <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
      <h1 className="text-5xl font-display mb-16 text-center italic">Le Journal de Pesaulhe & Noulibos</h1>
      <div className="grid gap-16">
        {posts.map((post, i) => (
          <Link href={`/blog/${post.id}`}>          
          <article key={i} className="flex flex-col md:flex-row gap-8 items-center border-b border-border pb-16">
            {post.image ? (
              <img src={post.image} alt={post.title} className="w-full md:w-1/3 aspect-video object-cover rounded bg-muted paper-texture" />
            ) : (
              <div className="w-full md:w-1/3 aspect-video bg-muted paper-texture" />
            )}
            <div className="flex-1">
              <span className="eyebrow mb-2">{post.date}</span>
              <h2 className="text-3xl font-display mb-4 hover:text-accent cursor-pointer transition-soft">{post.title}</h2>
              <p className="text-muted-foreground mb-6">{post.description}</p>
              <button className="btn-editorial">Lire l'article</button>
            </div>
          </article>
            </Link>
        ))}
      </div>
    </main>
  );
}