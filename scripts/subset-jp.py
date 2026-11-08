"""Réduit Dela Gothic One aux seuls caractères japonais utilisés dans le site.
Usage : pip install fonttools brotli && python3 scripts/subset-jp.py [chemin/DelaGothicOne-Regular.ttf]
À relancer si tu ajoutes du japonais dans le code."""
import pathlib, re, sys, urllib.request, io
from fontTools import subset
from fontTools.ttLib import TTFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
src = sys.argv[1] if len(sys.argv) > 1 else None
if not src:
    src = ROOT / '.fonts-cache' / 'DelaGothicOne-Regular.ttf'
    if not src.exists():
        src.parent.mkdir(exist_ok=True)
        urllib.request.urlretrieve('https://raw.githubusercontent.com/google/fonts/main/ofl/delagothicone/DelaGothicOne-Regular.ttf', src)
chars = set('・ー')
for f in list(ROOT.glob('app/**/*.tsx')) + list(ROOT.glob('lib/*.ts')):
    chars |= set(re.findall(r'[　-ヿ一-鿿]', f.read_text(encoding='utf-8')))
font = TTFont(src)
opts = subset.Options(); opts.flavor = 'woff2'; opts.name_IDs = []
s = subset.Subsetter(opts); s.populate(text=''.join(chars)); s.subset(font)
font.flavor = 'woff2'
out = ROOT / 'app' / 'fonts' / 'dela-gothic-jp-subset.woff2'
font.save(out)
print(len(chars), 'caractères ->', out.stat().st_size // 1024, 'Ko :', ''.join(sorted(chars)))
