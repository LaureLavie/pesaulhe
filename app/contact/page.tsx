
"use client";
import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setStatus("Envoi en cours...");
    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };

    const res = await fetch("/api/send-mail", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (res.ok) setStatus("Message envoyé avec succès !");
  };

  return (
    <main className="pt-32 pb-20 px-6 max-w-xl mx-auto">
      <h1 className="text-4xl font-display mb-8 text-center italic">Nous contacter</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="eyebrow mb-2">Nom</label>
          <input name="name" type="text" className="w-full p-3 bg-transparent border border-border focus:border-accent outline-none transition-soft" required />
        </div>
        <div>
          <label className="eyebrow mb-2">Email</label>
          <input name="email" type="email" className="w-full p-3 bg-transparent border border-border focus:border-accent outline-none" required />
        </div>
        <div>
          <label className="eyebrow mb-2">Message</label>
          <textarea name="message" rows={5} className="w-full p-3 bg-transparent border border-border focus:border-accent outline-none" required />
        </div>
        <button type="submit" className="btn-hero w-full uppercase">Envoyer</button>
        {status && <p className="text-center italic text-sm">{status}</p>}
      </form>
    </main>
  );
}