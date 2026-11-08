"""Génère lib/planning.ts à partir de l'export .ics de myEfrei.
Usage : python3 scripts/planning-from-ics.py chemin/vers/planning.ics
Seuls le titre, les horaires et le mode (présentiel / distanciel) sont gardés : pas de noms d'enseignants ni de groupes."""
import json, re, sys, pathlib
from datetime import datetime, timezone
from zoneinfo import ZoneInfo

src = pathlib.Path(sys.argv[1]).read_text(encoding='utf-8').replace('\r\n', '\n').replace('\n ', '')
paris = ZoneInfo('Europe/Paris')
ev = []
for block in src.split('BEGIN:VEVENT')[1:]:
    g = lambda k: (re.search(rf'^{k}[^:]*:(.*)$', block, re.M) or [None, ''])[1].strip()
    def dt(v):
        return datetime.strptime(v, '%Y%m%dT%H%M%SZ').replace(tzinfo=timezone.utc).astimezone(paris)
    s, e = dt(g('DTSTART')), dt(g('DTEND'))
    desc = g('DESCRIPTION').replace('\\n', '\n')
    mode = 'Distanciel' if 'Distanciel' in desc else 'Présentiel'
    title = (g('SUMMARY').replace('\\,', ',')
             .replace('Conception et développement back-end - ', 'Back-end — ')
             .replace('Conception et développement front-end - ', 'Front-end — ')
             .replace('Intégration et déploiement continus - ', 'CI/CD — ')
             .replace('Professional english & documentary research', 'English & documentary research'))
    ev.append({'date': s.strftime('%Y-%m-%d'), 'start': s.strftime('%H:%M'), 'end': e.strftime('%H:%M'), 'title': title, 'mode': mode})
ev.sort(key=lambda x: (x['date'], x['start']))
out = pathlib.Path(__file__).resolve().parent.parent / 'lib' / 'planning.ts'
out.write_text(
    '// Généré par scripts/planning-from-ics.py depuis l\'export myEfrei — ne pas éditer à la main.\n'
    'export type Course = { date: string; start: string; end: string; title: string; mode: "Présentiel" | "Distanciel" };\n'
    'export const YEAR = { start: "2026-08-31", end: "2027-06-25" };\n'
    f'export const COURSES: Course[] = {json.dumps(ev, ensure_ascii=False, indent=0)};\n',
    encoding='utf-8')
print(len(ev), 'cours ->', out)
