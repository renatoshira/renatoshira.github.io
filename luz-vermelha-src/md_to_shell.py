#!/usr/bin/env python3
"""First draft of shell.html from the essay script (terapia-de-luz-vermelha.md).

Takes the dopamine shell as the page template (head, CSS, top bar, chrome
script) and fills the body from the script: section kicker and headline,
prose paragraphs with data-i18n keys, one widget container per WIDGET block
(title, instruction, empty .wbody, caption), method note and sources.
Editorial markers ([S], [NV], [CONFERIR: ...]) are stripped from the prose.
"""
import html
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent
MD = (ROOT.parent / "terapia-de-luz-vermelha.md").read_text(encoding="utf-8")
TPL = (ROOT.parent / "cortisol-src" / "shell.html").read_text(encoding="utf-8")


def clean(t):
    t = re.sub(r"\s*`\[CONFERIR[^`]*\]`", "", t)
    t = re.sub(r"\s*\[CONFERIR[^\]]*\]", "", t)
    t = re.sub(r"\s*\[(S|NV|V)\]", "", t)
    t = re.sub(r"\*\*\[destaque\]\*\*\s*([^.!?]*[.!?])", r'<span class="mark">\1</span>', t)
    t = re.sub(r"\*\*([^*]+)\*\*", r"<b>\1</b>", t)
    t = re.sub(r"(?<![\w*])\*([^*\n]+)\*(?!\w)", r"<em>\1</em>", t)
    t = re.sub(r"`([^`]+)`", r"<code>\1</code>", t)
    t = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", r'<a href="\2">\1</a>', t)
    # curly quotes only in text, never inside HTML tags
    parts = re.split(r"(<[^>]+>)", t)
    parts = [x if x.startswith("<") else x.replace(' "', " “").replace('" ', "” ").replace('"', "”") for x in parts]
    return "".join(parts).strip()


title = re.search(r"^# (.+)$", MD, re.M).group(1).strip()
sub = re.search(r"Subtítulo para o hero: \*(.+?)\*\s*$", MD, re.M).group(1).strip()

parts = re.split(r"^## ", MD, flags=re.M)
sections, method, refs = [], [], ""
for p in parts[1:]:
    head, _, body = p.partition("\n")
    head = head.strip()
    if head.startswith("Nota de método"):
        method = [clean(x[2:]) for x in body.split("\n") if x.startswith("- ")]
        continue
    if head.startswith("Fontes principais"):
        refs = "<br>\n  ".join(clean(x) for x in body.split("\n\n") if x.strip() and not x.startswith("---"))
        continue
    m = re.match(r"(\d\d) · (.+)", head)
    if not m:
        continue
    sections.append((m.group(1), m.group(2), body))

out = []
for num, topic, body in sections:
    sid = "s" + num
    hl = re.search(r"^### (.+)$", body, re.M).group(1).strip()
    out.append('<!-- %s -->\n<section class="wrap reveal" id="%s">' % (num, sid))
    out.append('  <div class="step" data-i18n="%s.step">%s · %s</div>' % (sid, num, html.escape(topic)))
    out.append('  <h2 class="part" data-i18n="%s.h">%s</h2>' % (sid, clean(hl)))
    pn = 0
    blocks = re.split(r"\n\s*\n", body.split("\n", 1)[1] if body.startswith("###") else body)
    for b in blocks:
        b = b.strip()
        if not b or b.startswith("### ") or b == "---":
            continue
        if b.startswith("> **WIDGET"):
            lines = [l[1:].strip() for l in b.split("\n") if l.startswith(">")]
            wid = re.search(r"WIDGET\s+(\S+)", lines[0]).group(1)
            f = {}
            for l in lines[1:]:
                mm = re.match(r"\*\*([^*:]+):\*\*\s*(.*)", l)
                if mm:
                    f[mm.group(1).lower()] = mm.group(2)
            wide = ' wide' if wid in ("l00", "l01", "l02", "l04", "l05", "l07", "l10") else ''
            out.append('  <div class="widget%s" id="%s">' % (wide, wid))
            out.append('    <div class="wtag"><span class="dot"></span><span data-i18n="%s.tag"><b class="wt">%s</b><span class="wdo">%s</span></span></div>'
                       % (wid, clean(f.get("título", "")), clean(f.get("instrução", ""))))
            out.append('    <div class="wbody"></div>')
            out.append('    <div class="wcap" data-i18n="%s.cap">%s</div>' % (wid, clean(f.get("legenda", ""))))
            out.append('  </div>')
            continue
        if b.startswith(">"):
            continue
        pn += 1
        cls = ' class="lead"' if pn == 1 else ''
        out.append('  <p%s data-i18n="%s.p%d">%s</p>' % (cls, sid, pn, clean(b.replace("\n", " "))))
    out.append('</section>\n')

out.append('<!-- MÉTODO -->\n<section class="wrap reveal" id="s-metodo">\n  <div class="step" data-i18n="m.step">Nota de método</div>\n  <ul class="tight" style="font-size:14px">')
for i, m in enumerate(method, 1):
    out.append('    <li data-i18n="m.l%d">%s</li>' % (i, m))
out.append('  </ul>\n</section>\n')
out.append('<!-- FONTES -->\n<section class="wrap reveal" id="s-fontes">\n  <div class="step" data-i18n="f.step">Fontes principais</div>\n  <p class="refs" data-i18n="f.refs">\n  %s\n  </p>\n  <div class="foot" data-i18n="f.foot">%s · ensaio interativo · novembro de 2026</div>\n</section>\n' % (refs, html.escape(title)))
body_html = "\n".join(out)

hero = '''<!-- HERO -->
<header class="hero wrap">
  <div class="eyebrow" data-i18n="hero.eyebrow">Ensaio interativo · novembro de 2026</div>
  <h1 data-i18n="hero.h1">
    <span class="mark">Terapia de luz vermelha</span>
    <span class="mark l2">funciona?</span>
  </h1>
  <div class="sub" data-i18n="hero.sub">%s</div>
  <div class="byline" data-i18n="hero.byline">por Renato Shirakashi</div>
</header>

''' % clean(sub)

s = TPL
a = s.index("<!-- HERO -->")
z = s.index('<script src="https://cdnjs.cloudflare.com/ajax/libs/matter-js')
s = s[:a] + hero + body_html + "\n" + s[z:]

# meta, title, palette, top bar
desc = "A luz vermelha funciona para algumas coisas e quase nada para a maioria das promessas. Onde a evidência é forte, quanto de luz um aparelho precisa entregar e quais são os riscos."
s = re.sub(r"<title[^>]*>.*?</title>", '<title data-i18n="meta.title">%s</title>' % title, s)
s = re.sub(r'(<meta name="description" content=")[^"]*', r"\g<1>" + desc, s)
s = re.sub(r'(<meta (?:property="og:description"|name="twitter:description") content=")[^"]*', r"\g<1>" + desc, s)
s = re.sub(r'(<meta (?:property="og:title"|name="twitter:title") content=")[^"]*', r"\g<1>" + title, s)
s = s.replace("como-baixar-o-cortisol.html", "terapia-de-luz-vermelha.html").replace("og-cortisol.png", "og-luz-vermelha.png")
s = re.sub(r"--dopa:#e8553e;.*?--pausa-soft:rgba\(14,122,124,\.15\);",
    "--rubi:#ef2a6b;--rubi-txt:#c0185a;--infra:#5a1a4a;--rubi-soft:rgba(239,42,107,.15);--infra-soft:rgba(90,26,74,.15);"
    "--dopa:#ef2a6b;--dopa-soft:rgba(239,42,107,.15);--pausa:#5a1a4a;--pausa-soft:rgba(90,26,74,.15);"
    "--alta:#ef2a6b;--alta-txt:#c0185a;--baixa:#5a1a4a;--alta-soft:rgba(239,42,107,.15);--baixa-soft:rgba(90,26,74,.15);--plana:#9a9a9a;", s, flags=re.S)
s = s.replace(">Cortisol · 2026<", ">Luz vermelha · 2026<")
s = re.sub(r'\s*<!-- companion neuron \(filled by companion\.js\) -->\s*<div id="companion"[^>]*></div>', "", s)
# section 01 on the dark band
s = s.replace('<section class="wrap reveal" id="s01">', '<section class="wrap reveal night-band" id="s01">')
s = s.replace("</style>", """  .night-band{background:#0f1020;color:#f2f2f2;box-shadow:0 0 0 100vmax #0f1020;clip-path:inset(0 -100vmax);padding-top:70px;padding-bottom:70px;margin-top:40px;margin-bottom:40px;--ink:#f2f2f2;--dim:#b9b9c8;--line:#2c2e48;--rubi:#ff6a95;--rubi-txt:#ff6a95}
  .night-band .step,.night-band h2.part{color:#f2f2f2}
  .night-band .gl{border-bottom-color:#b9b9c8}
</style>""", 1)
(ROOT / "shell.html").write_text(s, encoding="utf-8")
print("sections", len(sections), "widgets", body_html.count('class="widget'), "method", len(method))
