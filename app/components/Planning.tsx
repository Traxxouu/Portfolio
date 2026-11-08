'use client';

import { useMemo, useState } from 'react';
import { COURSES, YEAR, type Course } from '@/lib/planning';

// Une couleur stable par module, prise dans la palette du site
const COLORS = ['#e3171b', '#fcee0a', '#02d7f2', '#efe6d2', '#9c8cff', '#e0a526', '#2bb3a3', '#ff6b9a'];
// ordre de première apparition : deux modules qui se suivent n'ont jamais la même couleur
const MODULES = Array.from(new Set(COURSES.map((c) => c.title.replace(/^Soutenance /i, ''))));
const colorOf = (title: string) => COLORS[MODULES.indexOf(title.replace(/^Soutenance /i, '')) % COLORS.length] || COLORS[0];

const WEEKDAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
const pad = (n: number) => String(n).padStart(2, '0');
const iso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parse = (s: string) => {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
};

function byDay() {
  const map = new Map<string, Course[]>();
  for (const c of COURSES) map.set(c.date, [...(map.get(c.date) || []), c]);
  return map;
}

export function Planning({ today: todayProp }: { today: string }) {
  const days = useMemo(byDay, []);
  const today = todayProp;
  const firstCourse = COURSES[0]?.date || today;
  const lastCourse = COURSES[COURSES.length - 1]?.date || today;
  const start = today < firstCourse ? firstCourse : today > lastCourse ? lastCourse : today;

  const [month, setMonth] = useState(() => {
    const d = parse(start);
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const nextDay = COURSES.find((c) => c.date >= today)?.date;
  const [selected, setSelected] = useState<string>(days.has(today) ? today : nextDay || start);

  // grille du mois (lundi en premier)
  const cells = useMemo(() => {
    const first = new Date(month.getFullYear(), month.getMonth(), 1);
    const offset = (first.getDay() + 6) % 7;
    const count = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    const out: (Date | null)[] = Array(offset).fill(null);
    for (let i = 1; i <= count; i++) out.push(new Date(month.getFullYear(), month.getMonth(), i));
    while (out.length % 7) out.push(null);
    return out;
  }, [month]);

  const minMonth = parse(firstCourse.slice(0, 8) + '01');
  const maxMonth = parse(lastCourse.slice(0, 8) + '01');
  const canPrev = month > minMonth;
  const canNext = month < maxMonth;
  const shift = (n: number) => setMonth((m) => new Date(m.getFullYear(), m.getMonth() + n, 1));

  // avancement de l'année scolaire
  const t0 = parse(YEAR.start).getTime();
  const t1 = parse(YEAR.end).getTime();
  const progress = Math.min(100, Math.max(0, ((parse(today).getTime() - t0) / (t1 - t0)) * 100));
  const done = COURSES.filter((c) => c.date < today).length;

  const sel = days.get(selected) || [];
  const monthLabel = month.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
  const selLabel = parse(selected).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
  const monthModules = Array.from(
    new Set(COURSES.filter((c) => c.date.startsWith(iso(month).slice(0, 7))).map((c) => c.title.replace(/^Soutenance /i, ''))),
  );

  return (
    <div className="plan">
      <div className="plan-top">
        <div className="plan-progress">
          <div className="plan-progress-head">
            <span className="label dim">Année scolaire 2026 — 2027</span>
            <span className="label yellow">{Math.round(progress)} %</span>
          </div>
          <div className="plan-bar" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100} aria-label="Avancement de l’année">
            <span style={{ width: `${progress}%` }} />
          </div>
          <div className="plan-progress-foot label dim">
            <span>31 août</span>
            <span className="plan-done">
              {done} / {COURSES.length} demi-journées passées
            </span>
            <span>25 juin</span>
          </div>
        </div>
      </div>

      <div className="plan-grid">
        <div className="panel cut plan-cal">
          <div className="panel-in">
            <div className="plan-cal-head">
              <button className="plan-nav" onClick={() => shift(-1)} disabled={!canPrev} aria-label="Mois précédent">
                ←
              </button>
              <p className="f-display plan-month">{monthLabel}</p>
              <button className="plan-nav" onClick={() => shift(1)} disabled={!canNext} aria-label="Mois suivant">
                →
              </button>
            </div>
            <div className="plan-week">
              {WEEKDAYS.map((w) => (
                <span key={w} className="label dim">{w}</span>
              ))}
            </div>
            <div className="plan-days">
              {cells.map((d, i) => {
                if (!d) return <span key={i} className="plan-day is-empty" />;
                const k = iso(d);
                const list = days.get(k) || [];
                const weekend = d.getDay() === 0 || d.getDay() === 6;
                return (
                  <button
                    key={k}
                    className={`plan-day ${list.length ? 'has' : ''} ${k === today ? 'is-today' : ''} ${k === selected ? 'is-sel' : ''} ${weekend ? 'is-we' : ''} ${k < today ? 'is-past' : ''}`}
                    onClick={() => setSelected(k)}
                    aria-label={`${d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}${list.length ? ` : ${list[0].title}` : ''}`}
                  >
                    <span className="plan-num">{d.getDate()}</span>
                    {list.length > 0 && (
                      <>
                        <span className="plan-dot" style={{ background: colorOf(list[0].title) }} />
                        <span className="plan-name">{list[0].title}</span>
                      </>
                    )}
                  </button>
                );
              })}
            </div>
            {monthModules.length > 0 && (
              <div className="plan-legend">
                {monthModules.map((m) => (
                  <span key={m} className="plan-legend-item">
                    <span style={{ background: colorOf(m) }} />
                    {m}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="plan-detail">
          <p className="label red">{selected === today ? 'Aujourd’hui' : 'Jour sélectionné'}</p>
          <p className="f-display plan-detail-day">{selLabel}</p>
          {sel.length ? (
            <ul className="plan-sessions">
              {sel.map((c, i) => (
                <li key={i} className="plan-session" style={{ borderColor: colorOf(c.title) }}>
                  <span className="label dim">
                    {c.start} — {c.end}
                  </span>
                  <span className="plan-session-title">{c.title}</span>
                  <span className={`label ${c.mode === 'Distanciel' ? 'yellow' : 'dim'}`}>{c.mode}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="dim">Pas de cours ce jour-là : entreprise, projets YourWeb ou révisions.</p>
          )}
          {nextDay && nextDay !== selected && (
            <button className="arrow-link label plan-next" onClick={() => { setSelected(nextDay); const d = parse(nextDay); setMonth(new Date(d.getFullYear(), d.getMonth(), 1)); }}>
              <span>Prochain cours : {parse(nextDay).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
              <span aria-hidden className="arrow">→</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
