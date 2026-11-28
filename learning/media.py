"""Images for PixPlay Learning articles.

PHOTOS: free Unsplash photos (Unsplash License: free for commercial use, no permission needed; we credit anyway),
        served from Unsplash's image CDN with size/format parameters.
FIGS:   original illustrations drawn in HTML/SVG with labels in each language (no third-party UI copied).
MEDIA:  which cover each article uses, and where images are inserted (block index in the article, same for en/zh).
"""
import html

esc = html.escape

PHOTOS = {
    "cafe": {"id": "1765648580572-661613d42fb9", "by": "FOTOGRAFÍA EDITORIAL", "user": "fotografiaeditorial",
             "en": "Working on a laptop at an outdoor café", "zh": "在戶外咖啡廳用筆電工作"},
    "beach": {"id": "1715210471871-590883e6a720", "by": "Johnny Africa", "user": "johnnyafrica",
              "en": "Working from a laptop on a beach in Lombok", "zh": "在龍目島海邊用筆電工作"},
    "suitcase": {"id": "1654355252504-42c1c9dd1fe0", "by": "Anastasiia Nelen", "user": "mnelen",
                 "en": "A remote worker on the beach with a suitcase", "zh": "帶著行李箱在海邊遠端工作"},
    "nomad": {"id": "1649061267116-bf9d813b3757", "by": "Samantha Eaton", "user": "nexstand",
              "en": "A digital nomad working from a café", "zh": "在咖啡廳工作的數位遊牧者"},
    "maker": {"id": "1773146916231-e6aeae932080", "by": "Filipp Romanovski", "user": "filipp_roman_photography",
              "en": "A small business owner packing orders", "zh": "正在包裝訂單的小店老闆"},
    "salon": {"id": "1556740758-90de374c12ad", "by": "Blake Wisz", "user": "blakewisz",
              "en": "A customer at a small salon's front desk", "zh": "小美髮店櫃台的客人"},
    "creator": {"id": "1520333789090-1afc82db536a", "by": "bruce mars", "user": "brucemars",
                "en": "Writing posts with a phone and laptop", "zh": "用手機和筆電寫貼文"},
    "swing": {"id": "1650047708006-227ca59f5992", "by": "Kemal Esensoy", "user": "kemalesensoy",
              "en": "Working on a laptop from a hanging chair on a tropical beach", "zh": "在熱帶海灘的吊椅上用筆電工作"},
    "office_it": {"id": "1766066014773-0074bf4911de", "by": "BaljkanN4", "user": "baljkann4",
                  "en": "A tech professional holding a laptop in a modern office", "zh": "在現代辦公室拿著筆電的科技工作者"},
    "team": {"id": "1519389950473-47ba0277781c", "by": "Marvin Meyer", "user": "marvelous",
             "en": "A team planning content around a table", "zh": "團隊圍著桌子規劃內容"},
    "shoot": {"id": "1695408247109-3bf125ad0538", "by": "Wesley Tingey", "user": "wesleyphotography",
              "en": "Filming content in a kitchen", "zh": "在廚房拍攝內容"},
    "studio": {"id": "1673767298248-b128f17f89af", "by": "Videodeck .co", "user": "videodeck",
               "en": "Recording and editing in a content studio", "zh": "在內容工作室錄製和剪輯"},
    "stats": {"id": "1781246435700-afec19012b45", "by": "Ngital", "user": "ngital",
              "en": "Performance charts on a laptop", "zh": "筆電上的成效圖表"},
    "lock": {"id": "1584433144859-1fc3ab64a957", "by": "Dan Nelson", "user": "danny144",
             "en": "A smartphone showing a security lock", "zh": "顯示安全鎖的手機"},
    "office": {"id": "1758876201729-e60eaf5f9194", "by": "Vitaly Gariev", "user": "silverkblack",
               "en": "Checking a notice on a phone at work", "zh": "在辦公室查看手機通知"},
    "desk": {"id": "1499750310107-5fef28a66643", "by": "Andrew Neel", "user": "andrewtneel",
             "en": "A laptop, coffee and phone on a work desk", "zh": "工作桌上的筆電、咖啡和手機"},
    "planner": {"id": "1654154196885-3810c262e626", "by": "Covene", "user": "covene",
                "en": "Planning the week in a notebook", "zh": "在筆記本上規劃一整週"},
}

CREDIT = {"en": "Photo", "zh": "照片"}
LOAD_COVER = 'fetchpriority="high"'
LOAD_LAZY = 'loading="lazy"'


def photo_src(key, w):
    return f"https://images.unsplash.com/photo-{PHOTOS[key]['id']}?w={w}&h={round(w * 9 / 16)}&fit=crop&auto=format&q=70"


def photo(lang, key, cover=False):
    p = PHOTOS[key]
    credit = (f'{CREDIT[lang]}: <a href="https://unsplash.com/@{p["user"]}?utm_source=pixplay_learning&utm_medium=referral" '
              f'target="_blank" rel="noopener">{esc(p["by"])}</a> / <a href="https://unsplash.com/?utm_source=pixplay_learning'
              f'&utm_medium=referral" target="_blank" rel="noopener">Unsplash</a>')
    return (f'<figure class="pic{" cover" if cover else ""}"><img src="{photo_src(key, 900)}" '
            f'srcset="{photo_src(key, 600)} 600w, {photo_src(key, 900)} 900w, {photo_src(key, 1400)} 1400w" '
            f'sizes="(min-width: 800px) 760px, 100vw" width="900" height="506" alt="{esc(p[lang])}" '
            f'{LOAD_COVER if cover else LOAD_LAZY} decoding="async">'
            f'<figcaption>{credit}</figcaption></figure>')


def hero(lang, key="office_it"):
    p = PHOTOS[key]
    return (f'<img src="{photo_src(key, 900)}" srcset="{photo_src(key, 600)} 600w, {photo_src(key, 900)} 900w, '
            f'{photo_src(key, 1400)} 1400w" sizes="(min-width: 800px) 380px, 100vw" width="900" height="506" '
            f'alt="{esc(p[lang])}" fetchpriority="high" decoding="async">'
            f'<span class="hero-credit">{CREDIT[lang]}: {esc(p["by"])} / Unsplash</span>')


SLIDES = [
    ("team", {"en": "Strategy & content planning", "zh": "策略與內容規劃"}),
    ("shoot", {"en": "Photo & short-video shoots", "zh": "拍攝：照片與短影音"}),
    ("studio", {"en": "Production & editing, sped up with AI", "zh": "用 AI 加速製作與剪輯"}),
    ("stats", {"en": "Posting & performance tracking", "zh": "發布與成效追蹤"}),
]


def slideshow(lang):
    slides, dots = [], []
    for i, (key, cap) in enumerate(SLIDES):
        p = PHOTOS[key]
        load = LOAD_LAZY if i else ""
        slides.append(f'<figure class="slide"><img src="{photo_src(key, 900)}" srcset="{photo_src(key, 600)} 600w, '
                      f'{photo_src(key, 900)} 900w, {photo_src(key, 1400)} 1400w" sizes="(min-width: 800px) 500px, 100vw" '
                      f'width="900" height="506" alt="{esc(p[lang])}" {load} decoding="async">'
                      f'<figcaption><b>{esc(cap[lang])}</b><span>{CREDIT[lang]}: {esc(p["by"])} / Unsplash</span></figcaption></figure>')
        dots.append(f'<button type="button" class="sdot{" on" if i == 0 else ""}" aria-label="{i + 1}" data-slide="{i}"></button>')
    return f'<div class="show" data-show><div class="slides">{"".join(slides)}</div><div class="sdots">{"".join(dots)}</div></div>'


def thumb(key):
    return f'<img class="acard-img" src="{photo_src(key, 600)}" width="600" height="338" alt="" loading="lazy" decoding="async">'


# ------------------------------------------------------------------------------------------------ illustrations
L = {
    "flow": {
        "en": ["You", "share a helpful post with your link", "Reader", "clicks and signs up or buys", "Company",
               "pays you a share", "Same price for the reader. The company pays you from its marketing budget."],
        "zh": ["你", "分享有幫助的內容＋專屬連結", "讀者", "點進去註冊或購買", "廠商", "分你一份佣金",
               "讀者價格一樣，廠商從行銷預算付你錢。"],
    },
    "recurring": {
        "en": ["One customer, over 12 months (example)", "One-time", "Recurring", "Month", "paid once", "paid every month",
               "Example: $20/month tool, 30% commission. Not a promise, just maths."],
        "zh": ["一個客人，12 個月內（舉例）", "一次性", "月月分潤", "月", "只付一次", "每個月都付",
               "舉例：月費 20 美元的工具、佣金 30%。只是算數，不是保證。"],
    },
    "chat": {
        "en": ["AI chat", "Here is my brief: home bakers who sell on Instagram… Give me 7 Threads post ideas: WHO + HASSLE + FIX.",
               "Here are 7 ideas:", "Home bakers: answering \"how much?\" 20 times a day? Put your price list in your bio link.",
               "Selling out on weekends? Post your order cut-off time every Thursday.",
               "Photos look dull? Shoot by the window at 10am. No ring light needed.",
               "Example of step 2: your brief + the ideas prompt."],
        "zh": ["AI 對話", "這是我的介紹：在 IG 接單的手作甜點店…請給我 7 個 Threads 貼文點子：誰＋麻煩＋解法。",
               "這是 7 個點子：", "做甜點接單的人：一天要回 20 次「多少錢？」直接把價目表放在個人簡介連結。",
               "週末總是賣完？每週四先公告這週的截單時間。", "照片看起來很暗？早上十點靠窗拍，不用買補光燈。",
               "步驟 2 的範例：你的介紹＋點子提示詞。"],
    },
    "calendar": {
        "en": [["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], "This week · Threads", "7 posts scheduled",
               ["Price list tip", "Behind the scenes", "Customer question", "Order cut-off", "Before / after",
                "Weekend menu", "Ask: what next?"], "Example of a batched week: write once, schedule all 7."],
        "zh": [["一", "二", "三", "四", "五", "六", "日"], "本週 · Threads", "已排程 7 篇",
               ["價目表小技巧", "幕後花絮", "客人問題", "截單時間", "前後對比", "週末菜單", "問大家想看什麼"],
               "一次排好一週的範例：寫一次，7 篇全部排程。"],
    },
    "tools3": {
        "en": [("Metricool", "Schedule", "posts + stats", "cal"), ("ManyChat", "Auto-reply", "comments + DMs", "chat"),
               ("Make", "Connect", "apps run by themselves", "link"), "Three different jobs. Pick by where your time goes."],
        "zh": [("Metricool", "排程", "發文＋數據", "cal"), ("ManyChat", "自動回覆", "留言＋私訊", "chat"),
               ("Make", "串接", "App 自己跑", "link"), "三件不同的工作。看你的時間花在哪裡來選。"],
    },
    "adsvscontent": {
        "en": ["Visitors over time (illustration)", "Ads", "Content", "you stop paying", "old posts keep getting found",
               "Ads are fast but stop when the budget stops. Content builds up."],
        "zh": ["流量隨時間的變化（示意）", "廣告", "內容", "停止付費", "舊文章還是一直被找到",
               "廣告快，但預算停了就沒了。內容會一直累積。"],
    },
}

ICON = {
    "cal": '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
    "chat": '<svg viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4z"/></svg>',
    "link": '<svg viewBox="0 0 24 24"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>',
}


def fig(lang, key):
    t = L[key][lang]
    if key == "flow":
        steps = [(t[0], t[1], "#D6193D", "🙋"), (t[2], t[3], "#3B5BDB", "👀"), (t[4], t[5], "#0B8A86", "🏢")]
        nodes = '<span class="fl-arrow">→</span>'.join(
            f'<span class="fl-node" style="--c:{c}"><span class="fl-e">{e}</span><b>{esc(a)}</b><small>{esc(b)}</small></span>'
            for a, b, c, e in steps)
        return f'<figure class="fig"><div class="flow">{nodes}</div><figcaption>{esc(t[6])}</figcaption></figure>'
    if key == "recurring":
        bars = []
        for m in range(12):
            x = 72 + m * 20
            bars.append(f'<rect x="{x}" y="{150 - 36}" width="14" height="36" rx="3" fill="#0B8A86"/>')
        one = '<rect x="72" y="114" width="14" height="36" rx="3" fill="#D6193D"/>'
        months = "".join(f'<text x="{79 + m * 20}" y="168" font-size="10" text-anchor="middle" fill="#6b6f78">{m + 1}</text>' for m in range(12))
        svg = f'''<svg viewBox="0 0 330 200" role="img" aria-label="{esc(t[0])}">
<text x="10" y="18" font-size="13" font-weight="800" fill="#17181c">{esc(t[0])}</text>
<g transform="translate(0,-60)"><text x="10" y="132" font-size="11" font-weight="800" fill="#D6193D">{esc(t[1])}</text>{one}
<text x="94" y="132" font-size="10" fill="#6b6f78">{esc(t[4])}</text></g>
<g transform="translate(0,10)"><text x="10" y="132" font-size="11" font-weight="800" fill="#0B8A86">{esc(t[2])}</text>{"".join(bars)}{months}
<text x="10" y="168" font-size="10" fill="#6b6f78">{esc(t[3])}</text></g>
</svg>'''
        return f'<figure class="fig chart">{svg}<figcaption>{esc(t[6])}</figcaption></figure>'
    if key == "chat":
        ideas = "".join(f"<li>{esc(x)}</li>" for x in t[3:6])
        return f'''<figure class="fig"><div class="chatui"><div class="chat-top"><i></i><i></i><i></i><span>{esc(t[0])}</span></div>
<div class="bub me">{esc(t[1])}</div><div class="bub ai"><b>{esc(t[2])}</b><ol>{ideas}</ol><span class="more">+4…</span></div></div>
<figcaption>{esc(t[6])}</figcaption></figure>'''
    if key == "calendar":
        days, title, badge, posts, cap = t
        times = ["09:10", "13:05", "20:15", "09:30", "13:20", "20:05", "13:40"]
        cells = "".join(f'<div class="cal-d"><span>{esc(d)}</span><div class="cal-p"><small>{times[i]}</small>{esc(posts[i])}</div></div>'
                        for i, d in enumerate(days))
        return f'''<figure class="fig"><div class="calui"><div class="cal-top"><b>{esc(title)}</b><span>✓ {esc(badge)}</span></div>
<div class="cal-g">{cells}</div></div><figcaption>{esc(cap)}</figcaption></figure>'''
    if key == "tools3":
        cards = "".join(f'<div class="t3"><span class="t3-i">{ICON[ic]}</span><b>{esc(job)}</b><small>{esc(what)}</small><em>{esc(name)}</em></div>'
                        for name, job, what, ic in t[:3])
        return f'<figure class="fig"><div class="tools3">{cards}</div><figcaption>{esc(t[3])}</figcaption></figure>'
    if key == "adsvscontent":
        svg = f'''<svg viewBox="0 0 330 190" role="img" aria-label="{esc(t[0])}">
<text x="10" y="18" font-size="13" font-weight="800" fill="#17181c">{esc(t[0])}</text>
<line x1="20" y1="160" x2="320" y2="160" stroke="#ececf0" stroke-width="2"/>
<path d="M20 160 L40 80 L170 80 L178 158 L320 158" fill="none" stroke="#D6193D" stroke-width="3.5" stroke-linejoin="round"/>
<path d="M20 158 C90 152 140 135 190 110 S280 52 320 40" fill="none" stroke="#0B8A86" stroke-width="3.5"/>
<line x1="174" y1="70" x2="174" y2="160" stroke="#D6193D" stroke-dasharray="4 4"/>
<text x="180" y="76" font-size="10.5" fill="#D6193D" font-weight="700">{esc(t[3])}</text>
<text x="44" y="72" font-size="12" font-weight="800" fill="#D6193D">{esc(t[1])}</text>
<text x="262" y="34" font-size="12" font-weight="800" fill="#0B8A86">{esc(t[2])}</text>
<text x="200" y="128" font-size="10.5" fill="#0B8A86" font-weight="700">{esc(t[4])}</text>
</svg>'''
        return f'<figure class="fig chart">{svg}<figcaption>{esc(t[5])}</figcaption></figure>'
    raise KeyError(key)


# which cover each article uses + inserts: (insert before block index, ("img"|"fig", key)) - applied to en and zh
MEDIA = {
    "what-is-affiliate-marketing": {"cover": "cafe", "insert": [(2, ("fig", "flow")), (6, ("fig", "recurring"))]},
    "week-of-threads-posts-with-claude": {"cover": "creator", "insert": [(10, ("fig", "chat"))]},
    "schedule-threads-posts-metricool": {"cover": "planner", "insert": [(10, ("fig", "calendar"))]},
    "why-take-affiliate-marketing-seriously": {"cover": "beach", "insert": [(3, ("img", "suitcase"))]},
    "make-vs-manychat-vs-metricool": {"cover": "desk", "insert": [(2, ("fig", "tools3"))]},
    "avoid-account-suspension": {"cover": "lock", "insert": [(9, ("img", "office"))]},
    "content-marketing-small-business": {"cover": "maker", "insert": [(3, ("fig", "adsvscontent")), (6, ("img", "salon"))]},
}


def apply(guides):
    """Set each guide's cover and insert image blocks (highest index first so positions stay valid)."""
    for slug, m in MEDIA.items():
        g = guides[slug]
        g["cover"] = m["cover"]
        for lang in ("en", "zh"):
            blocks = list(g[lang]["blocks"])
            for pos, block in sorted(m["insert"], key=lambda x: -x[0]):
                blocks.insert(pos, block)
            g[lang]["blocks"] = blocks
