"""Build PixPlay Learning (static, bilingual) into the React site's public/ folder.

Run:  python3 learning/build.py
Writes public/en/, public/zh/, public/lp/ (assets) and public/sitemap.xml. Vite copies public/ into dist/ on build,
and Netlify serves these static files before the React catch-all (netlify.toml sends "/" to /zh/ or /en/).
Content lives in content.py (UI text, paths, tools) and guides.py (the guides).
"""
import html
import json
import os
import shutil
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from content import LANGS, SITE, UI, PATHS, TOOLS, TOOL_CATS, TESTING, DISCLOSURE, TYPES, ABOUT, FREE_PDF  # noqa: E402
from guides import GUIDES  # noqa: E402
import media  # noqa: E402

media.apply(GUIDES)

HERE = os.path.dirname(os.path.abspath(__file__))
PUBLIC = os.path.join(os.path.dirname(HERE), "public")
VERSION = "3"
TRACK_FILE = os.path.join(HERE, "stats_url.txt")
TRACK_URL = open(TRACK_FILE).read().strip() if os.path.exists(TRACK_FILE) else ""
TOOL_BY_KEY = {t["key"]: t for t in TOOLS}
PATH_BY_KEY = {p["key"]: p for p in PATHS}
esc = html.escape
CUR = ' aria-current="page"'
BLANK = ' target="_blank" rel="noopener"'

ICONS = {
    "home": '<svg viewBox="0 0 24 24"><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/></svg>',
    "missions": '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/></svg>',
    "library": '<svg viewBox="0 0 24 24"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5zM4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5"/></svg>',
    "tools": '<svg viewBox="0 0 24 24"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z"/></svg>',
    "saved": '<svg viewBox="0 0 24 24"><path d="M6 3h12v18l-6-4.5L6 21z"/></svg>',
    "share": '<svg viewBox="0 0 24 24"><path d="M12 3v13M7 8l5-5 5 5M5 14v6h14v-6"/></svg>',
    "arrow": '<svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>',
}


# ------------------------------------------------------------------------------------------------ helpers
def url(lang, rel=""):
    return f"/{lang}/{rel}" if rel else f"/{lang}/"


def lesson_list(path):
    """[(slug, live, en_title, zh_title)] for a path."""
    out = []
    for item in path["lessons"]:
        if isinstance(item, str):
            g = GUIDES[item]
            out.append((item, True, g["en"]["title"], g["zh"]["title"]))
        else:
            slug, en, zh = item
            out.append((slug, slug in GUIDES, en, zh))
    return out


def find_lesson(slug):
    for p in PATHS:
        for s, live, en, zh in lesson_list(p):
            if s == slug:
                return p, live, {"en": en, "zh": zh}
    raise KeyError(slug)


def live_slugs(path):
    return [s for s, live, _, _ in lesson_list(path) if live]


def tool_href(t):
    return t["ref"] or t["url"]


def tool_rel(t):
    return "sponsored noopener" if t["ref"] else "noopener"


def tool_card(lang, key):
    t, u = TOOL_BY_KEY[key], UI[lang]
    what, who = t[lang]
    badge = f'<span class="badge use">{u["we_use"]}</span>'
    plan = f'<span class="badge">{u["free_plan"] if t["free"] else u["paid_only"]}</span>'
    return f'''<div class="tool">
  <div class="tool-top"><b class="tool-name">{esc(t["name"])}</b>{badge}{plan}</div>
  <p>{esc(what)}</p>
  <p class="who">👉 {esc(who)}</p>
  <a class="btn btn-line" href="{tool_href(t)}" target="_blank" rel="{tool_rel(t)}" data-out="{key}">{u["visit"]} {esc(t["name"])} ↗</a>
</div>'''


def next_card(lang, slug):
    path, live, titles = find_lesson(slug)
    u = UI[lang]
    if live:
        g = GUIDES[slug]
        return f'''<a class="next" href="{url(lang, "guides/" + slug + "/")}">
  <span class="next-k">{u["next"]}</span><b>{esc(g[lang]["title"])}</b><span class="next-m">{g["minutes"]} {u["min"]}</span>{ICONS["arrow"]}</a>'''
    return f'''<div class="next soon"><span class="next-k">{u["next"]} · {u["coming"]}</span><b>{esc(titles[lang])}</b></div>'''


def mission_card(lang, key):
    p, u = PATH_BY_KEY[key], UI[lang]
    title, desc, outcome = p[lang]
    return f'''<a class="mcard" href="{url(lang, "missions/" + key + "/")}" style="--c:{p["color"]}">
  <span class="mcard-k">🎯 {u["mission_label"]}</span>
  <span class="mcard-t"><span class="path-i">{p["icon"]}</span><b>{esc(title)}</b></span>
  <span class="mcard-g"><small>{u["you_get"]}:</small> {esc(outcome)}</span>
  <span class="btn">{u["start_mission"]} →</span>
</a>'''


def render_blocks(lang, slug, blocks):
    u, out, chk = UI[lang], [], 0
    for b in blocks:
        kind = b[0]
        if kind == "p":
            out.append(f"<p>{b[1]}</p>")
        elif kind == "h2":
            out.append(f"<h2>{esc(b[1])}</h2>")
        elif kind in ("ul", "ol"):
            out.append(f"<{kind}>" + "".join(f"<li>{x}</li>" for x in b[1]) + f"</{kind}>")
        elif kind == "tip":
            out.append(f'<div class="note tip">💡 <div>{b[1]}</div></div>')
        elif kind == "warn":
            out.append(f'<div class="note warn">⚠️ <div>{b[1]}</div></div>')
        elif kind == "copy":
            out.append(f'''<div class="copybox"><div class="copy-head"><span>{esc(b[1])}</span>
<button class="copy-btn" type="button" data-copied="{u["copy_done"]}">{u["copy"]}</button></div><pre>{esc(b[2])}</pre></div>''')
        elif kind == "check":
            items = []
            for x in b[1]:
                items.append(f'<label class="chk"><input type="checkbox" data-chk="{slug}:{chk}"><span>{esc(x)}</span></label>')
                chk += 1
            out.append(f'<div class="checklist"><div class="checklist-h">✅ {u["checklist"]}</div>{"".join(items)}</div>')
        elif kind == "table":
            head = "".join(f"<th>{esc(h)}</th>" for h in b[1])
            rows = "".join("<tr>" + "".join(f"<td>{esc(c)}</td>" for c in r) + "</tr>" for r in b[2])
            out.append(f'<div class="tbl"><table><thead><tr>{head}</tr></thead><tbody>{rows}</tbody></table></div>')
        elif kind == "tool":
            out.append(tool_card(lang, b[1]))
        elif kind == "next":
            out.append(next_card(lang, b[1]))
        elif kind == "img":
            out.append(media.photo(lang, b[1]))
        elif kind == "fig":
            out.append(media.fig(lang, b[1]))
        elif kind == "mission":
            out.append(f'<h2 class="ready">{UI[lang]["ready_h"]}</h2>' + mission_card(lang, b[1]))
        else:
            raise ValueError(kind)
    return "\n".join(out)


def guide_index(lang):
    return [{"slug": s, "title": g[lang]["title"], "min": g["minutes"], "url": url(lang, f"guides/{s}/")}
            for s, g in GUIDES.items()]


# ------------------------------------------------------------------------------------------------ page shell
TABS = (("home", ""), ("missions", "missions/"), ("library", "library/"), ("tools", "tools/"), ("saved", "saved/"))


def page(lang, rel, title, desc, body, tab, extra_head="", og=None):
    u = UI[lang]
    other = "zh" if lang == "en" else "en"
    full_title = title if title.startswith("PixPlay") else f"{title} · PixPlay Learning"
    tabs = "".join(
        f'<a href="{url(lang, r)}" class="tab{" on" if tab == k else ""}"{CUR if tab == k else ""}>'
        f'{ICONS[k]}<span>{u["tab_" + k]}</span></a>' for k, r in TABS)
    alts = "".join(f'<link rel="alternate" hreflang="{UI[l]["html_lang"]}" href="{SITE}{url(l, rel)}">' for l in LANGS)
    tjson = json.dumps({k: u[k] for k in ("save", "saved", "copied", "done_of")}, ensure_ascii=False)
    return f'''<!doctype html>
<html lang="{u["html_lang"]}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{esc(full_title)}</title>
<meta name="description" content="{esc(desc)}">
<link rel="canonical" href="{SITE}{url(lang, rel)}">
{alts}<link rel="alternate" hreflang="x-default" href="{SITE}/en/{rel}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="PixPlay Learning">
<meta property="og:title" content="{esc(full_title)}">
<meta property="og:description" content="{esc(desc)}">
<meta property="og:url" content="{SITE}{url(lang, rel)}">
<meta property="og:image" content="{og or SITE + "/lp/og.png"}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#ffffff">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="PixPlay">
<link rel="manifest" href="/lp/manifest.webmanifest">
<link rel="icon" type="image/png" sizes="32x32" href="/lp/icon-32.png">
<link rel="apple-touch-icon" href="/lp/icon-180.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Noto+Sans+TC:wght@400;500;700;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/lp/app.css?v={VERSION}">
{extra_head}</head>
<body data-lang="{lang}">
<header class="top">
  <a class="logo" href="{url(lang)}" aria-label="PixPlay Learning"><img src="/lp/logo.png" alt="PixPlay" width="120" height="25"><span>Learning</span></a>
  <a class="lang" href="{url(other, rel)}" hreflang="{UI[other]["html_lang"]}" aria-label="{u["other_lang_label"]}" data-lang-switch="{other}">{u["other_lang"]}</a>
</header>
<main class="wrap">
{body}
<footer class="foot">
  <p>{u["footer_note"]}</p>
  <p><a href="{url(lang, "about/")}">{u["about"]}</a> · <a href="{url(lang, "disclosure/")}">{u["disclosure_link"]}</a> · <a href="/services">{u["services"]}</a> · <a href="/privacy-policy">{u["privacy"]}</a></p>
</footer>
</main>
<nav class="tabs" aria-label="PixPlay Learning">{tabs}</nav>
<div class="toast" role="status" aria-live="polite"></div>
<script>window.PL={{lang:"{lang}",track:"{TRACK_URL}",t:{tjson}}};</script>
<script src="/lp/app.js?v={VERSION}" defer></script>
</body>
</html>
'''


# ------------------------------------------------------------------------------------------------ pieces
def progress(slugs, total=None, ring=False):
    total = total if total is not None else len(slugs)
    if ring:
        return f'<span class="ring" data-progress="{",".join(slugs)}" data-total="{total}"><span class="prog-t"></span></span>'
    return (f'<div class="prog" data-progress="{",".join(slugs)}" data-total="{total}">'
            f'<div class="bar"><i></i></div><span class="prog-t"></span></div>')


def type_tag(lang, kind):
    t = TYPES[kind]
    return f'<span class="tag" style="--c:{t["color"]}">{esc(t[lang])}</span>'


def article_card(lang, g):
    u = UI[lang]
    img = media.thumb(g["cover"]) if g.get("cover") else ""
    return (f'<a class="acard" href="{url(lang, "guides/" + g["slug"] + "/")}" data-row="{g["slug"]}" data-type="{g["kind"]}">{img}'
            f'<span class="acard-top">{type_tag(lang, g["kind"])}<span class="row-done">✓</span></span>'
            f'<b>{esc(g[lang]["title"])}</b><small>{esc(g[lang]["desc"])}</small>'
            f'<span class="acard-m">{g["minutes"]} {u["min"]}</span></a>')


def by_date():
    return sorted(GUIDES.values(), key=lambda g: (g["date"], g["kind"] != "guide"), reverse=True)


# ------------------------------------------------------------------------------------------------ pages
def home(lang):
    u = UI[lang]
    start = PATH_BY_KEY["start"]
    hero_steps = [t for _, _, t, _ in lesson_list(start)][:3] if lang == "en" else [t for _, _, _, t in lesson_list(start)][:3]
    how = "".join(f'<div class="how-i"><span class="how-e">{e}</span><b>{esc(h)}</b><p>{esc(d)}</p></div>' for e, h, d in u["how"])
    picker = "".join(
        f'<a class="pick" href="{url(lang, "missions/" + key + "/")}"><span class="pick-i">{icon}</span>'
        f'<span><b>{esc(h)}</b><small>{esc(d)}</small></span>{ICONS["arrow"]}</a>'
        for key, icon, h, d in u["picker"])
    latest = "".join(article_card(lang, g) for g in by_date()[:4])
    work = "".join(
        f'<a class="work" href="{href}"{BLANK if href.startswith("http") else ""}>'
        f'<b>{esc(t)}</b><small>{esc(d)}</small></a>' for t, d, href in u["work_items"])
    card_steps = "".join(f'<li class="{"ok" if i == 0 else ""}"><i></i>{esc(t)}</li>' for i, t in enumerate(hero_steps))
    body = f'''
<section class="hero">
  <div class="hero-txt">
    <span class="kicker">{u["hero_kicker"]}</span>
    <h1>{esc(u["hero_h1a"])} <em>{esc(u["hero_h1b"])}</em></h1>
    <p class="lede">{esc(u["hero_lede"])}</p>
    <div class="cta">
      <a class="btn" href="{url(lang, "missions/")}">🎯 {u["cta_mission"]}</a>
      <a class="btn btn-line" href="{url(lang, "library/")}">📚 {u["cta_library"]}</a>
    </div>
  </div>
  <div class="hero-art" aria-hidden="true">
    <div class="blob b1"></div><div class="blob b2"></div>
    <div class="hcard">
      <div class="hcard-k">🎯 {u["hero_card_k"]}</div>
      <div class="hcard-t"><span class="path-i" style="--c:{start["color"]}">{start["icon"]}</span><b>{esc(start[lang][0])}</b>
        <span class="hring"><span>1</span></span></div>
      <ul>{card_steps}</ul>
    </div>
  </div>
</section>
<section class="cont" data-continue hidden>
  <h2 class="sec">{u["continue_h"]}</h2>
  <a class="cont-card" href="#"><span class="cont-t"></span>{ICONS["arrow"]}</a>
</section>
<section>
  <h2 class="sec">{u["how_h"]}</h2>
  <div class="how">{how}</div>
</section>
<section>
  <h2 class="sec">{u["picker_h"]}</h2>
  <div class="picks">{picker}</div>
</section>
<section>
  <div class="sec-row"><h2 class="sec">{u["latest_h"]}</h2><a href="{url(lang, "library/")}">{u["see_all"]} →</a></div>
  <div class="acards">{latest}</div>
</section>
<section class="about-s">
  <h2>{esc(u["about_h"])}</h2>
  <p>{esc(u["about_short"])}</p>
  <a href="{url(lang, "about/")}">{u["about_more"]} →</a>
</section>
<section class="free">
  <span class="kicker">{u["free_h"]}</span>
  <h2>{esc(u["free_title"])}</h2>
  <p>{esc(u["free_body"])}</p>
  <a class="btn" href="{FREE_PDF}" target="_blank" rel="noopener" data-out="free-pdf">{u["free_cta"]} ↗</a>
</section>
<section>
  <h2 class="sec">{u["work_h"]}</h2>
  <div class="works">{work}</div>
</section>
<script type="application/json" id="pl-index">{json.dumps(guide_index(lang), ensure_ascii=False)}</script>
'''
    return page(lang, "", u["home_title"], u["home_desc"], body, "home")


def missions(lang):
    u = UI[lang]
    cards = []
    for p in PATHS:
        lessons, live = lesson_list(p), live_slugs(p)
        title, desc, outcome = p[lang]
        cards.append(
            f'<a class="path" href="{url(lang, "missions/" + p["key"] + "/")}" style="--c:{p["color"]}">'
            f'<span class="path-i">{p["icon"]}</span><span class="path-b"><b>{esc(title)}</b>'
            f'<small>{esc(desc)}</small><span class="path-g">🎯 {esc(outcome)}</span>'
            f'<span class="path-m">{len(lessons)} {u["steps"]}</span></span>{progress(live, len(lessons), ring=True)}</a>')
    body = f'''
<section class="page-h"><h1>{u["missions_h"]}</h1><p class="lede">{esc(u["missions_lede"])}</p></section>
<div class="paths">{"".join(cards)}</div>'''
    return page(lang, "missions/", u["missions_h"], u["missions_lede"], body, "missions")


def mission_page(lang, p):
    u = UI[lang]
    title, desc, outcome = p[lang]
    items = []
    for i, (slug, live, en, zh) in enumerate(lesson_list(p), 1):
        t = {"en": en, "zh": zh}[lang]
        if live:
            g = GUIDES[slug]
            items.append(f'<li><a class="lesson" href="{url(lang, "guides/" + slug + "/")}" data-row="{slug}">'
                         f'<span class="num">{i}</span><span class="lesson-b"><b>{esc(t)}</b>'
                         f'<small>{g["minutes"]} {u["min"]}</small></span>{ICONS["arrow"]}</a></li>')
        else:
            items.append(f'<li><div class="lesson soon"><span class="num">{i}</span><span class="lesson-b">'
                         f'<b>{esc(t)}</b><small>{u["coming"]}</small></span></div></li>')
    body = f'''
<a class="crumb" href="{url(lang, "missions/")}">← {u["missions_h"]}</a>
<section class="path-h" style="--c:{p["color"]}"><span class="path-i big">{p["icon"]}</span>
<span class="mcard-k">🎯 {u["mission_label"]}</span>
<h1>{esc(title)}</h1><p class="lede">{esc(desc)}</p>
<div class="goal"><b>{u["you_get"]}</b><p>{esc(outcome)}</p></div>
{progress(live_slugs(p), len(lesson_list(p)))}</section>
<ol class="lessons">{"".join(items)}</ol>'''
    return page(lang, f"missions/{p['key']}/", title, desc, body, "missions")


def library(lang):
    u = UI[lang]
    kinds = [k for k in TYPES if any(g["kind"] == k for g in GUIDES.values())]
    chips = f'<button class="fchip on" type="button" data-filter="all">{u["all"]}</button>' + "".join(
        f'<button class="fchip" type="button" data-filter="{k}" style="--c:{TYPES[k]["color"]}">{esc(TYPES[k][lang])}</button>' for k in kinds)
    cards = "".join(article_card(lang, g) for g in by_date())
    body = f'''
<section class="page-h"><h1>{u["library_h"]}</h1><p class="lede">{esc(u["library_lede"])}</p></section>
<div class="fchips" role="toolbar">{chips}</div>
<div class="acards" data-filtered>{cards}</div>'''
    return page(lang, "library/", u["library_h"], u["library_lede"], body, "library")


def guide_page(lang, g):
    u, G = UI[lang], g[lang]
    has_tools = any(b[0] == "tool" for b in G["blocks"])
    disc = (f'<p class="disc">{esc(u["disclosure_short"])} <a href="{url(lang, "disclosure/")}">{u["disclosure_link"]}</a></p>'
            if has_tools else "")
    in_mission = g["path"] is not None
    if in_mission:
        p = PATH_BY_KEY[g["path"]]
        crumb = (f'<a class="crumb" href="{url(lang, "missions/" + p["key"] + "/")}">← 🎯 {esc(p[lang][0])}</a>')
        slugs = live_slugs(p)
        idx = slugs.index(g["slug"])
        nxt = slugs[idx + 1] if idx + 1 < len(slugs) else None
        end_next = (next_card(lang, nxt) if nxt else
                    f'<a class="next" href="{url(lang, "missions/" + p["key"] + "/")}"><span class="next-k">{u["back_mission"]}</span>'
                    f'<b>{esc(p[lang][0])}</b>{ICONS["arrow"]}</a>')
        done_l, done_d, tab = u["mark_done"], u["is_done"], "missions"
    else:
        crumb = f'<a class="crumb" href="{url(lang, "library/")}">← 📚 {u["back_library"]}</a>'
        end_next = ""
        done_l, done_d, tab = u["mark_read"], u["is_read"], "library"
    body = f'''
{crumb}
<article class="guide" data-guide="{g["slug"]}">
  {type_tag(lang, g["kind"])}
  <h1>{esc(G["title"])}</h1>
  <p class="meta">{g["minutes"]} {u["min"]}</p>
  <div class="actions">
    <button class="act" type="button" data-save="{g["slug"]}">{ICONS["saved"]}<span>{u["save"]}</span></button>
    <button class="act" type="button" data-share>{ICONS["share"]}<span>{u["share"]}</span></button>
  </div>
  {media.photo(lang, g["cover"], cover=True) if g.get("cover") else ""}
  <p class="intro">{esc(G["desc"])}</p>
  {disc}
  {render_blocks(lang, g["slug"], G["blocks"])}
  <div class="end">
    <button class="btn done-btn" type="button" data-done="{g["slug"]}" data-label="{done_l}" data-donelabel="{done_d}">{done_l}</button>
    {end_next}
    <button class="btn btn-line share-end" type="button" data-share>{ICONS["share"]} {u["share"]}</button>
  </div>
</article>'''
    og = (f"https://images.unsplash.com/photo-{media.PHOTOS[g['cover']]['id']}?w=1200&h=630&fit=crop&auto=format&q=75"
          if g.get("cover") else None)
    return page(lang, f"guides/{g['slug']}/", G["title"], G["desc"], body, tab, og=og)


def tools_page(lang):
    u = UI[lang]
    groups = []
    for cat, names in TOOL_CATS.items():
        cards = "".join(tool_card(lang, t["key"]) for t in TOOLS if t["cat"] == cat)
        if cards:
            groups.append(f'<h2 class="sec">{esc(names[0] if lang == "en" else names[1])}</h2><div class="tools">{cards}</div>')
    chips = "".join(f'<span class="chip">{esc(n)}</span>' for n in TESTING)
    body = f'''
<section class="page-h"><h1>{u["tools_h"]}</h1><p class="lede">{esc(u["tools_lede"])}</p>
<p class="disc">{esc(u["disclosure_short"])} <a href="{url(lang, "disclosure/")}">{u["disclosure_link"]}</a></p></section>
{"".join(groups)}
<section class="testing"><h2 class="sec">{u["testing_h"]}</h2><p class="muted">{esc(u["testing_lede"])}</p><div class="chips">{chips}</div></section>'''
    return page(lang, "tools/", u["tools_h"], u["tools_lede"], body, "tools")


def saved_page(lang):
    u = UI[lang]
    body = f'''
<section class="page-h"><h1>{u["saved_h"]}</h1></section>
<section class="mine"><h2 class="sec">{u["progress_h"]}</h2>{progress(list(GUIDES))}</section>
<div class="acards" data-saved-list></div>
<div class="empty" data-saved-empty hidden><p>{esc(u["saved_empty"])}</p><a class="btn" href="{url(lang, "library/")}">{u["browse"]}</a></div>
<template id="row-tpl">{"".join(article_card(lang, g) for g in GUIDES.values())}</template>'''
    return page(lang, "saved/", u["saved_h"], u["saved_h"], body, "saved")


def prose(blocks):
    out = []
    for kind, val in blocks:
        if kind == "p":
            out.append(f"<p>{val}</p>")
        elif kind == "h2":
            out.append(f"<h2>{esc(val)}</h2>")
        else:
            out.append("<ul>" + "".join(f"<li>{x}</li>" for x in val) + "</ul>")
    return "".join(out)


def disclosure_page(lang):
    u = UI[lang]
    body = f'<section class="page-h"><h1>{u["disc_h"]}</h1></section><article class="guide plain">{prose(DISCLOSURE[lang])}</article>'
    return page(lang, "disclosure/", u["disc_h"], u["disclosure_short"], body, "")


def about_page(lang):
    u = UI[lang]
    body = f'''<section class="page-h"><span class="kicker">PixPlay Learning</span><h1 style="margin-top:12px">{u["about"]}</h1>
<p class="lede">{esc(u["about_short"])}</p></section>
<article class="guide plain">{prose(ABOUT[lang])}</article>
<div class="cta" style="margin-top:22px"><a class="btn" href="{url(lang, "missions/")}">🎯 {u["cta_mission"]}</a>
<a class="btn btn-line" href="{url(lang, "library/")}">📚 {u["cta_library"]}</a></div>'''
    return page(lang, "about/", u["about"], u["about_short"], body, "")


# ------------------------------------------------------------------------------------------------ write
def write(rel_file, text):
    path = os.path.join(PUBLIC, rel_file)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)


def main():
    for s, g in GUIDES.items():
        assert g["kind"] in TYPES, s
        if g["path"]:
            assert s in live_slugs(PATH_BY_KEY[g["path"]]), f"{s} not listed in mission {g['path']}"
        assert g["mission"] in PATH_BY_KEY, s
        for lang in LANGS:
            for b in g[lang]["blocks"]:
                if b[0] == "tool":
                    assert b[1] in TOOL_BY_KEY, b
                if b[0] == "next":
                    find_lesson(b[1])
                if b[0] == "mission":
                    assert b[1] in PATH_BY_KEY, b
                if b[0] == "table":
                    assert all(len(r) == len(b[1]) for r in b[2]), (s, b[1])
        assert [b[0] for b in g["en"]["blocks"]] == [b[0] for b in g["zh"]["blocks"]], f"{s}: en/zh structure differs"
    for p in PATHS:
        for lang in LANGS:
            assert len(p[lang]) == 3, p["key"]

    for d in ("en", "zh", "lp"):
        shutil.rmtree(os.path.join(PUBLIC, d), ignore_errors=True)
    pages = []
    for lang in LANGS:
        out = [("", home(lang)), ("missions/", missions(lang)), ("library/", library(lang)), ("tools/", tools_page(lang)),
               ("saved/", saved_page(lang)), ("disclosure/", disclosure_page(lang)), ("about/", about_page(lang))]
        out += [(f"missions/{p['key']}/", mission_page(lang, p)) for p in PATHS]
        out += [(f"guides/{s}/", guide_page(lang, g)) for s, g in GUIDES.items()]
        for rel, text in out:
            write(f"{lang}/{rel}index.html", text)
            pages.append(url(lang, rel))

    os.makedirs(os.path.join(PUBLIC, "lp"), exist_ok=True)
    for f in os.listdir(os.path.join(HERE, "static")):
        shutil.copy(os.path.join(HERE, "static", f), os.path.join(PUBLIC, "lp", f))
    write("lp/manifest.webmanifest", json.dumps({
        "name": "PixPlay Learning", "short_name": "PixPlay", "start_url": "/", "scope": "/",
        "display": "standalone", "background_color": "#ffffff", "theme_color": "#ffffff",
        "icons": [{"src": "/lp/icon-192.png", "sizes": "192x192", "type": "image/png"},
                  {"src": "/lp/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any maskable"}],
    }, indent=1))

    urls = pages + ["/services", "/privacy-policy"]
    write("sitemap.xml", '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
          + "".join(f"  <url><loc>{SITE}{u}</loc></url>\n" for u in urls) + "</urlset>\n")
    print(f"{len(pages)} pages ({len(GUIDES)} articles x {len(LANGS)} languages) -> {PUBLIC}")


if __name__ == "__main__":
    main()
