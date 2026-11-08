'use client';

import { useState } from 'react';

type State = 'idle' | 'sending' | 'ok' | 'error';

export function ContactForm() {
  const [state, setState] = useState<State>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setState('sending');
    setError('');
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || 'Envoi impossible');
      setState('ok');
      form.reset();
    } catch (err) {
      setState('error');
      setError(err instanceof Error ? err.message : 'Envoi impossible');
    }
  }

  if (state === 'ok') {
    return (
      <div className="panel cut form-done">
        <div className="panel-in">
          <p className="label yellow">● Message envoyé</p>
          <p className="f-display form-done-title">Merci, je te réponds vite.</p>
          <button className="arrow-link label" onClick={() => setState('idle')} style={{ background: 'none', border: 0, borderBottom: '1px solid var(--red)', cursor: 'pointer' }}>
            <span>Envoyer un autre message</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="form-row">
        <label className="field">
          <span className="label dim">Prénom</span>
          <input name="firstName" required autoComplete="given-name" />
        </label>
        <label className="field">
          <span className="label dim">Nom</span>
          <input name="lastName" required autoComplete="family-name" />
        </label>
      </div>
      <label className="field">
        <span className="label dim">Email</span>
        <input name="email" type="email" required autoComplete="email" />
      </label>
      <label className="field">
        <span className="label dim">Sujet</span>
        <select name="subject" required defaultValue="">
          <option value="" disabled>Choisir…</option>
          <option>Projet de site web</option>
          <option>Application / développement sur mesure</option>
          <option>Collaboration</option>
          <option>Autre</option>
        </select>
      </label>
      <label className="field">
        <span className="label dim">Message</span>
        <textarea name="message" required rows={6} />
      </label>
      {state === 'error' && <p className="form-error label">{error}</p>}
      <button type="submit" className="btn btn-red" disabled={state === 'sending'}>
        <span>{state === 'sending' ? 'Envoi…' : 'Envoyer'}</span>
        <span aria-hidden className="arrow">→</span>
      </button>
    </form>
  );
}
