"""PixPlay Learning guides. Each guide has the same structure in English and Traditional Chinese (Taiwan voice).

Blocks: ("p", html) ("h2", text) ("ul", [html]) ("ol", [html]) ("tip", html) ("warn", html)
        ("copy", label, text)  a prompt or template with a Copy button
        ("check", [text])      an interactive checklist (remembered on the reader's phone)
        ("tool", key)          a tool card from content.TOOLS
        ("next", slug)         link to another guide (live or coming soon)
        ("table", [headers], [[cells]])  a comparison table (scrolls sideways on phones)
        ("mission", key)       a "start this mission" card
Facts only. No invented personal stories, no promised income.
"""

GUIDES = {}


def guide(slug, path, minutes, date, en, zh, kind="guide", mission=None):
    """path = the mission this guide is a step of (None for library articles); mission = mission to recommend at the end."""
    if kind == "guide":  # mission lessons: the Start mission is "getting started", the rest are "level up"
        kind = "start" if path == "start" else "levelup"
    GUIDES[slug] = {"slug": slug, "path": path, "minutes": minutes, "date": date, "en": en, "zh": zh,
                    "kind": kind, "mission": mission or path}


# ---------------------------------------------------------------------------------------------------------------
guide("what-is-affiliate-marketing", "start", 5, "2026-11-27",
en={
    "title": "Affiliate marketing, explained in 5 minutes",
    "desc": "What affiliate marketing is, how you actually get paid, what you need to start with $0, and the honest part nobody posts about.",
    "blocks": [
        ("p", "You already recommend things. A tool that saves you time, an app you can't live without. <b>Affiliate marketing</b> just means you recommend it with your own link, and when someone signs up or buys through that link, the company pays you a share."),
        ("p", "The buyer pays the same price. The company pays you out of its marketing budget, because you brought them a customer."),
        ("h2", "How the money works"),
        ("p", "There are two kinds of commission, and the difference matters a lot:"),
        ("ul", [
            "<b>One-time:</b> you get paid once per sale. Common for hosting, travel bookings and courses.",
            "<b>Recurring:</b> you get a share of every monthly payment, usually for 12 months, sometimes for as long as the customer stays. Common for software (SaaS) and AI tools.",
        ]),
        ("tip", "<b>Example (simple maths, not a promise):</b> a tool costs $20 a month and pays 30% recurring for 12 months. One customer = $6 a month, up to $72 in a year. Ten customers who stay = up to $720. That's why software is popular with affiliates: one good guide can keep paying."),
        ("h2", "What you need to start (it can be $0)"),
        ("ol", [
            "<b>A topic.</b> Something you can talk about for a year, e.g. AI tools for small shops, content for tutors, tools for travel creators.",
            "<b>A place people find you.</b> Threads, Instagram, TikTok, a newsletter.",
            "<b>Something that helps.</b> A short guide, a checklist, a before/after. People buy from the person who solved their problem.",
            "<b>The links.</b> Apply to the affiliate programs of tools you actually use. Search \"[tool name] affiliate program\". Most are free to join.",
        ]),
        ("p", "Some programs approve anyone. Others want to see a website or an audience first, which is one reason to keep your helpful posts in one place, like a simple site."),
        ("h2", "The honest part"),
        ("ul", [
            "<b>It's slow at first.</b> Most people earn little in their first months. It grows as your helpful content piles up.",
            "<b>Programs change.</b> Companies cut rates or close programs. Don't depend on just one.",
            "<b>Trust is everything.</b> Recommend only what you'd tell a friend to use. One pushy post can cost you more than a commission.",
        ]),
        ("warn", "If someone promises \"passive income in 30 days\" or shows big income screenshots to sell you a course, be careful. Real affiliate income is built, not switched on."),
        ("h2", "Always say it's an affiliate link"),
        ("p", "In most countries you must tell people when you earn from a link, and it must be clear, near the link, in the same language as your post. Writing just \"affiliate link\" is often not enough. A simple version:"),
        ("copy", "Disclosure line", "I earn a commission if you buy through this link, at no extra cost to you."),
        ("h2", "Your first step today"),
        ("check", [
            "Write down 3 tools or apps you already use and like.",
            "For each one, write one sentence: what problem does it solve for you?",
            "Search \"[tool name] affiliate program\" and note which ones have one.",
            "Pick ONE to write your first helpful post about.",
        ]),
        ("next", "pick-a-niche"),
    ],
},
zh={
    "title": "5 分鐘搞懂聯盟行銷",
    "desc": "聯盟行銷是什麼、錢到底怎麼來、怎麼用 0 元開始，還有沒人會講的真實面。",
    "blocks": [
        ("p", "你其實每天都在推薦東西：一個幫你省時間的工具、一個你離不開的 App。<b>聯盟行銷</b>就是：你用自己的專屬連結推薦它，有人透過這個連結註冊或購買，廠商就分你一部分。"),
        ("p", "買的人價格完全一樣。廠商是從行銷預算裡付你錢，因為你幫他帶來了客人。"),
        ("h2", "錢是怎麼來的"),
        ("p", "佣金分兩種，差很多："),
        ("ul", [
            "<b>一次性：</b>每成交一筆，付你一次。網站主機、旅遊訂房、線上課程很常見。",
            "<b>月月分潤（recurring）：</b>客人每個月付費，你都分一份，通常分 12 個月，有些只要客人一直續訂就一直分。軟體（SaaS）和 AI 工具很常見。",
        ]),
        ("tip", "<b>舉例（單純算數，不是保證）：</b>一個工具月費 20 美元，分潤 30%、分 12 個月。一個客人 = 每月 6 美元，一年最多 72 美元。十個客人一直用 = 最多 720 美元。這就是為什麼大家喜歡推薦軟體：一篇好的教學可以一直幫你賺。"),
        ("h2", "開始需要什麼（可以 0 元）"),
        ("ol", [
            "<b>一個主題。</b>你能聊一整年的東西，例如：小店家的 AI 工具、家教老師的內容經營、旅遊創作者的工具。",
            "<b>一個讓人找到你的地方。</b>Threads、Instagram、TikTok、電子報。",
            "<b>真的有幫助的內容。</b>一篇短教學、一張檢查清單、前後對比。大家會跟幫他解決問題的人買。",
            "<b>連結。</b>去申請你真的在用的工具的聯盟計畫。搜尋「工具名稱 affiliate program」，大部分免費加入。",
        ]),
        ("p", "有些計畫誰都能加入，有些會先看你有沒有網站或粉絲。這也是為什麼建議把你的教學整理在同一個地方，例如一個簡單的網站。"),
        ("h2", "真實面"),
        ("ul", [
            "<b>一開始很慢。</b>大部分人前幾個月賺得很少，要等有幫助的內容慢慢累積。",
            "<b>計畫會變。</b>廠商會降佣金、甚至關掉計畫，不要只靠一家。",
            "<b>信任最重要。</b>只推薦你會叫朋友用的東西。一篇太硬的業配文，損失的可能比佣金還多。",
        ]),
        ("warn", "如果有人跟你保證「30 天被動收入」，或拿很誇張的收入截圖來賣你課程，要小心。真正的聯盟收入是一點一點蓋起來的，不是按一個開關就有。"),
        ("h2", "一定要說這是聯盟連結"),
        ("p", "大部分國家都規定：你會從連結賺錢，就要清楚告訴大家，而且要放在連結旁邊、用跟貼文一樣的語言。只寫「affiliate link」通常不夠。簡單的寫法："),
        ("copy", "揭露句", "透過這個連結購買，我會獲得佣金，你不用多付任何費用。"),
        ("h2", "今天的第一步"),
        ("check", [
            "寫下 3 個你正在用、而且喜歡的工具或 App。",
            "每一個寫一句話：它幫你解決了什麼問題？",
            "搜尋「工具名稱 affiliate program」，記下哪些有聯盟計畫。",
            "選「一個」來寫你的第一篇教學貼文。",
        ]),
        ("next", "pick-a-niche"),
    ],
})

# ---------------------------------------------------------------------------------------------------------------
PROMPT_BRIEF_EN = """About me (fill this in once and keep it):
- Who I help: [e.g. home bakers who sell on Instagram]
- What I help them with: [e.g. getting more orders without paying for ads]
- What I've actually done or used: [real tools, real results, nothing made up]
- My tone: [e.g. friendly, straight to the point, a bit funny]
- Words I never use: [e.g. "game-changer", "unlock", "hustle"]"""

PROMPT_IDEAS_EN = """Here is my brief:
[paste your brief]

Give me 7 Threads post ideas for this week. Each idea must follow this formula:
WHO the reader is + a HASSLE they can picture + the simple FIX.
Example: "Home bakers: if you're answering the same 'how much?' DM 20 times a day, put your price list in your bio link."

Rules: one idea per line, specific, no hashtags, no emojis, nothing I haven't done or used."""

PROMPT_DRAFT_EN = """Turn idea #[number] into a Threads post.

- First line: the hook. Under 12 words. It must make my reader think "that's me".
- Then 3 to 5 short lines that explain the fix, like I'm texting a friend.
- End with one easy question so people reply.
- Under 500 characters in total (Threads' limit).
- Use my tone from the brief. Don't invent numbers, stories or results.

Then give me 2 other versions of just the first line so I can pick."""

PROMPT_BRIEF_ZH = """關於我（寫一次，存起來重複用）：
- 我幫助誰：〔例如：在 IG 接單的手作甜點店〕
- 我幫他們解決什麼：〔例如：不用下廣告也能多接一點單〕
- 我真的做過／用過的：〔真實的工具、真實的結果，不要編〕
- 我的語氣：〔例如：像朋友聊天、直接、有一點好笑〕
- 我絕對不用的字：〔例如：「顛覆」、「爆賺」、「躺著賺」〕"""

PROMPT_IDEAS_ZH = """這是我的介紹：
〔貼上你的介紹〕

請給我這週 7 個 Threads 貼文點子。每個點子都要照這個公式：
「誰」+「他能想像的麻煩」+「簡單的解法」。
例如：「做甜點接單的人：如果你一天要回 20 次『多少錢？』的私訊，直接把價目表放在個人簡介連結。」

規則：一行一個點子、要具體、不要 hashtag、不要 emoji、不要寫我沒做過或沒用過的事。
請用台灣人習慣的繁體中文口語。"""

PROMPT_DRAFT_ZH = """把第〔幾〕個點子寫成一篇 Threads 貼文。

- 第一行是開頭：12 個字以內，要讓讀者覺得「這在說我」。
- 接著 3 到 5 行短句說明解法，像在傳訊息給朋友。
- 最後問一個很好回答的問題，讓大家留言。
- 全部 500 字元以內（Threads 的上限）。
- 用我介紹裡的語氣、台灣口語。不要編數字、故事或成果。

再給我另外 2 個版本的第一行，讓我挑。"""

guide("week-of-threads-posts-with-claude", "content", 6, "2026-11-27",
en={
    "title": "Write a week of Threads posts in 20 minutes with Claude",
    "desc": "Three copy-paste prompts that take you from a blank page to 7 posts in your own voice, plus the 5-minute edit that makes them sound human.",
    "blocks": [
        ("p", "The slow part of posting isn't typing. It's staring at a blank page wondering what to say. AI is very good at that part, <b>if you give it the right brief</b>. Here's the 3-prompt routine."),
        ("tool", "claude"),
        ("p", "Claude's free plan is enough to start. The same prompts work in ChatGPT too."),
        ("h2", "Step 1 · Write your brief (once)"),
        ("p", "Most AI posts sound generic because the AI knows nothing about you. Fill this in once, save it in your notes, and paste it at the start of every chat."),
        ("copy", "Your brief", PROMPT_BRIEF_EN),
        ("tip", "Paste 2 or 3 of your best past posts under the brief. The AI copies your style much better from examples than from adjectives."),
        ("h2", "Step 2 · Get 7 ideas with the click formula"),
        ("p", "Posts that get clicks usually do three things: name <b>who</b> it's for, describe a <b>hassle</b> they can picture, and give <b>one simple fix</b>."),
        ("copy", "Ideas prompt", PROMPT_IDEAS_EN),
        ("p", "Don't like some ideas? Say \"replace #2 and #5, more specific\". Keep going until you'd actually stop scrolling for all 7."),
        ("h2", "Step 3 · Turn each idea into a post"),
        ("copy", "Draft prompt", PROMPT_DRAFT_EN),
        ("p", "Do this 7 times, or ask for all 7 at once if you're in a hurry. One at a time gives better posts."),
        ("h2", "Step 4 · The 5-minute human edit (don't skip)"),
        ("check", [
            "Cut about 20%. AI drafts are always a bit long.",
            "Add one real detail only you know: a customer question, a tool you use, a mistake you made.",
            "Check every number and fact. AI sometimes makes them up.",
            "Read the first line out loud. Would YOU stop scrolling?",
            "Remove words you'd never say in real life.",
        ]),
        ("warn", "Never post a statistic, price or result you haven't checked yourself. One wrong fact can undo a lot of trust."),
        ("h2", "Step 5 · Schedule all 7"),
        ("p", "Now put the week on autopilot so you're not posting by hand every day."),
        ("next", "schedule-threads-posts-metricool"),
    ],
},
zh={
    "title": "用 Claude 20 分鐘寫好一整週的 Threads 貼文",
    "desc": "三個直接複製貼上的提示詞，從一片空白到 7 篇有你語氣的貼文，再加上 5 分鐘讓它讀起來像真人寫的。",
    "blocks": [
        ("p", "發文最花時間的不是打字，是盯著空白畫面想「到底要寫什麼」。這一段 AI 超會幫忙，<b>前提是你給它對的資料</b>。下面是三步驟流程。"),
        ("tool", "claude"),
        ("p", "Claude 免費版就夠用了。同樣的提示詞放到 ChatGPT 也可以。"),
        ("h2", "步驟 1 · 寫一份自我介紹（只要寫一次）"),
        ("p", "AI 寫的貼文常常很空泛，是因為它根本不認識你。把這份填好、存在備忘錄，每次開新對話先貼上去。"),
        ("copy", "你的介紹", PROMPT_BRIEF_ZH),
        ("tip", "在介紹下面再貼 2、3 篇你自己寫過、反應最好的貼文。給 AI 看範例，比形容一堆「要親切、要幽默」有用很多。"),
        ("h2", "步驟 2 · 用「會被點」的公式要 7 個點子"),
        ("p", "會有人點的貼文通常做到三件事：講清楚寫給<b>誰</b>、描述一個他能想像的<b>麻煩</b>、給<b>一個簡單的解法</b>。"),
        ("copy", "點子提示詞", PROMPT_IDEAS_ZH),
        ("p", "有幾個不喜歡？直接說「換掉第 2 和第 5 個，再具體一點」。一直換到 7 個你自己都會停下來看為止。"),
        ("h2", "步驟 3 · 把點子寫成貼文"),
        ("copy", "寫文提示詞", PROMPT_DRAFT_ZH),
        ("p", "做 7 次就好。趕時間可以一次要 7 篇，但一篇一篇寫品質比較好。"),
        ("h2", "步驟 4 · 5 分鐘人工修稿（不要跳過）"),
        ("check", [
            "刪掉大約 20%，AI 的稿子幾乎都太長。",
            "加一個只有你知道的真實細節：客人問過的問題、你在用的工具、你犯過的錯。",
            "檢查每一個數字和事實，AI 有時候會亂編。",
            "把第一行念出來。你自己會停下來看嗎？",
            "把你平常根本不會講的詞拿掉。",
        ]),
        ("warn", "沒有自己確認過的數據、價格、成果，絕對不要貼。一個錯的資訊，就能毀掉很多信任。"),
        ("h2", "步驟 5 · 把 7 篇排程好"),
        ("p", "接下來讓這一週自動發文，不用每天手動貼。"),
        ("next", "schedule-threads-posts-metricool"),
    ],
})

# ---------------------------------------------------------------------------------------------------------------
guide("schedule-threads-posts-metricool", "autopilot", 6, "2026-11-27",
en={
    "title": "Schedule a week of Threads posts with Metricool",
    "desc": "Connect Threads, load 7 posts into the calendar in one sitting, pick good times, and check what worked a week later. Free plan friendly.",
    "blocks": [
        ("p", "Posting by hand every day is how most people quit. Batch the week in one sitting instead: write on Sunday, schedule everything, and spend the week replying to comments."),
        ("tool", "metricool"),
        ("p", "Metricool has a free plan. It limits how many posts you can schedule each month, so check the current limit on Metricool's pricing page before you plan a big batch."),
        ("h2", "Step 1 · Create your account and brand"),
        ("p", "Sign up, then create a <b>brand</b>. A brand is one business or one personal account, with all its social profiles grouped together."),
        ("h2", "Step 2 · Connect Threads"),
        ("p", "In your brand's settings, choose <b>Connect</b> next to Threads and log in with the account you post from. Connect Instagram too if you use it. You can post to both from the same calendar."),
        ("tip", "Use the same phone or browser where you're already logged in to Threads. It makes the connection screen much quicker."),
        ("h2", "Step 3 · Load your 7 posts"),
        ("ol", [
            "Open the <b>planning calendar</b>.",
            "Click a day to create a post, and tick <b>Threads</b> as the network.",
            "Paste your text (under 500 characters) and add an image if you have one.",
            "Pick the date and time, then schedule it.",
            "Repeat for the other 6. It takes about 10 minutes once your posts are written.",
        ]),
        ("p", "Don't have 7 posts yet? Write them first with the 3-prompt routine."),
        ("next", "week-of-threads-posts-with-claude"),
        ("h2", "Step 4 · Pick better times"),
        ("p", "Metricool shows suggested <b>best times to post</b>, based on when your audience is usually online. Start with those, and keep your times roughly the same every day so followers know when to expect you."),
        ("h2", "Step 5 · Spend your saved time on replies"),
        ("p", "The first hour after a post goes out matters. Reply to every comment yourself, because conversations help a post reach more people. This part shouldn't be automated."),
        ("h2", "One week later · Check what worked"),
        ("check", [
            "Open the Threads analytics in Metricool.",
            "Find your 2 posts with the most views or replies.",
            "Ask: what was the WHO and the HASSLE in those two?",
            "Write next week's ideas around the same kind of reader and problem.",
        ]),
        ("next", "make-sheet-to-post"),
    ],
},
zh={
    "title": "用 Metricool 一次排好一整週的 Threads 貼文",
    "desc": "連結 Threads、一次把 7 篇貼文排進行事曆、挑好時段，一週後再看哪篇有效。免費版也能用。",
    "blocks": [
        ("p", "每天手動發文，是大部分人放棄的原因。改成一次做完：週日寫好、全部排程，這一週只要專心回留言。"),
        ("tool", "metricool"),
        ("p", "Metricool 有免費版，但每個月能排程的貼文數量有上限。要排一大批之前，先去 Metricool 的價格頁看看現在的上限是多少。"),
        ("h2", "步驟 1 · 註冊、建立品牌"),
        ("p", "註冊之後建立一個<b>品牌（brand）</b>。一個品牌就是一個生意或一個個人帳號，底下的社群帳號會放在一起。"),
        ("h2", "步驟 2 · 連結 Threads"),
        ("p", "在品牌設定裡，按 Threads 旁邊的<b>連結（Connect）</b>，用你發文的帳號登入。有在用 Instagram 的話也一起連，同一個行事曆就能兩邊發。"),
        ("tip", "用你平常已經登入 Threads 的手機或瀏覽器來連結，登入畫面會快很多。"),
        ("h2", "步驟 3 · 把 7 篇貼文放進去"),
        ("ol", [
            "打開<b>排程行事曆（planning）</b>。",
            "點一天新增貼文，平台勾選 <b>Threads</b>。",
            "貼上文字（500 字元以內），有圖片就一起放。",
            "選日期和時間，按排程。",
            "其他 6 篇照做。文章寫好的話，大約 10 分鐘就排完。",
        ]),
        ("p", "還沒有 7 篇貼文？先用三步驟提示詞寫好。"),
        ("next", "week-of-threads-posts-with-claude"),
        ("h2", "步驟 4 · 挑比較好的時段"),
        ("p", "Metricool 會根據你的粉絲通常什麼時候在線上，建議<b>最佳發文時間</b>。先照建議來，而且每天的時間盡量固定，讓粉絲知道什麼時候會看到你。"),
        ("h2", "步驟 5 · 把省下的時間拿來回留言"),
        ("p", "貼文發出去的第一個小時很重要。每一則留言都自己回，有對話的貼文會被推給更多人。這部分不要自動化。"),
        ("h2", "一週後 · 看哪篇有效"),
        ("check", [
            "打開 Metricool 裡的 Threads 數據。",
            "找出瀏覽或留言最多的 2 篇。",
            "問自己：這兩篇寫的是「誰」？「什麼麻煩」？",
            "下週的點子就圍繞同一種讀者、同一種問題來寫。",
        ]),
        ("next", "make-sheet-to-post"),
    ],
})


# =============================================================================================== LIBRARY ARTICLES
guide("why-take-affiliate-marketing-seriously", None, 6, "2026-11-28", kind="start", mission="start",
en={
    "title": "Why affiliate marketing is worth taking seriously (and what it's not)",
    "desc": "No product to build, almost no cost to start, and skills that help any business. Plus the honest parts: it's slow at first, and it's not passive at the start.",
    "blocks": [
        ("p", "Say \"affiliate marketing\" and many people picture spammy links or someone selling a get-rich-quick course. That reputation is earned by the people doing it badly. Done properly, it's one of the simplest small businesses you can start, and one of the most misunderstood."),
        ("h2", "Why it's worth your time"),
        ("ol", [
            "<b>No product to build.</b> No stock, no shipping, no customer support. The company handles all of that. Your job is to help people choose well.",
            "<b>Almost no cost to start.</b> A social account and free tools are enough. Your main investment is time.",
            "<b>Software pays again and again.</b> Many AI and software tools pay you a share of every monthly payment, often for 12 months or more. Helpful content you wrote months ago can keep earning.",
            "<b>The skills carry over.</b> Writing clearly, understanding what people need, making content with AI: useful for your own business, your job, or anything you start next.",
            "<b>It fits around your life.</b> You can do it next to a job, from anywhere with an internet connection, at your own pace.",
        ]),
        ("h2", "What it's not"),
        ("ul", [
            "<b>Not passive at the start.</b> It becomes more passive later, once you have helpful content that keeps getting found. At first it's work.",
            "<b>Not quick.</b> Most people earn little in their first months. Plan in months, not weeks.",
            "<b>Not posting links everywhere.</b> Links with no help around them get ignored, and can get your account limited.",
            "<b>Not guaranteed.</b> Companies change their commission rates and close programs. Spread across a few tools.",
        ]),
        ("warn", "If someone shows you big income screenshots and promises the same for you, they're usually selling a course, not teaching a skill."),
        ("h2", "Who it suits, and who it doesn't"),
        ("table", ["It suits you if…", "It's not for you right now if…"], [
            ["You like explaining things and helping people choose", "You need extra money next month"],
            ["You already use tools you'd happily recommend", "You don't want to make any content"],
            ["You can be patient for a few months", "You'd recommend anything that pays well"],
        ]),
        ("h2", "Treat it like a small business"),
        ("p", "The people who get results usually keep three simple habits:"),
        ("check", [
            "Pick ONE topic and one type of reader, and stay with it.",
            "Publish something genuinely helpful every week, even if it's short.",
            "Check which posts get clicks, and make more like those.",
        ]),
        ("p", "That's the whole game. No secret, just steady, honest help, repeated."),
        ("mission", "start"),
    ],
},
zh={
    "title": "為什麼聯盟行銷值得認真做（還有它「不是」什麼）",
    "desc": "不用做產品、開始幾乎不用錢、學到的技能任何生意都用得上。也講真實面：一開始很慢，而且一開始一點都不被動。",
    "blocks": [
        ("p", "一講到「聯盟行銷」，很多人想到的是到處亂貼的連結，或有人在賣「快速致富」課程。這個壞名聲，是做不好的人搞出來的。認真做的話，它是你能開始的最簡單的小生意之一，也是最被誤會的。"),
        ("h2", "為什麼值得花時間"),
        ("ol", [
            "<b>不用做產品。</b>不用囤貨、不用出貨、不用客服，這些廠商都會處理。你的工作是幫大家選對東西。",
            "<b>開始幾乎不用錢。</b>一個社群帳號加上免費工具就夠了。你主要投入的是時間。",
            "<b>軟體會一直分潤。</b>很多 AI 和軟體工具，客人每個月付費你都分一份，常常分 12 個月以上。你幾個月前寫的好內容，可能還在幫你賺。",
            "<b>技能帶得走。</b>把事情講清楚、懂別人需要什麼、用 AI 做內容：對你自己的生意、你的工作、你以後想做的任何事都有用。",
            "<b>可以配合你的生活。</b>可以跟正職一起做，有網路就能做，照自己的步調來。",
        ]),
        ("h2", "它不是什麼"),
        ("ul", [
            "<b>一開始不是被動收入。</b>等你累積了一直被找到的好內容，才會越來越被動。剛開始就是要做事。",
            "<b>不是很快。</b>大部分人前幾個月賺得很少。用「月」來規劃，不是用「週」。",
            "<b>不是到處貼連結。</b>沒有幫助、只有連結的貼文沒人理，還可能被平台限流。",
            "<b>沒有保證。</b>廠商會改佣金、會關掉計畫。分散在幾個工具上。",
        ]),
        ("warn", "如果有人拿很誇張的收入截圖，跟你保證你也可以，他通常是在賣課程，不是在教技能。"),
        ("h2", "適合誰、不適合誰"),
        ("table", ["適合你，如果…", "現在先不要，如果…"], [
            ["你喜歡解釋東西、幫別人做選擇", "你下個月就需要多一筆錢"],
            ["你本來就有很樂意推薦的工具", "你完全不想做任何內容"],
            ["你可以耐心經營幾個月", "只要佣金高，什麼你都願意推"],
        ]),
        ("h2", "把它當成一門小生意"),
        ("p", "做出成果的人，通常都保持三個簡單的習慣："),
        ("check", [
            "選「一個」主題、「一種」讀者，然後堅持下去。",
            "每週發一篇真的有幫助的內容，短的也沒關係。",
            "看哪些貼文有人點，就多做那一類。",
        ]),
        ("p", "就這樣。沒有祕訣，就是穩定、誠實地幫助人，一直重複。"),
        ("mission", "start"),
    ],
})

# ---------------------------------------------------------------------------------------------------------------
guide("make-vs-manychat-vs-metricool", None, 7, "2026-11-28", kind="compare", mission="autopilot",
en={
    "title": "Make vs ManyChat vs Metricool: which one do you need first?",
    "desc": "Three popular tools that people often mix up. What each one actually does, the pros and cons, and a simple way to decide which to set up first.",
    "blocks": [
        ("p", "These three come up whenever people talk about \"automating\" their content, and beginners often think they do the same thing. They don't. Each one solves a different problem, so the right first tool depends on <b>where your time goes now</b>."),
        ("p", "We use all three in our own work. Here's a neutral side-by-side."),
        ("h2", "The quick comparison"),
        ("table", ["", "Metricool", "ManyChat", "Make"], [
            ["What it does", "Schedules posts and shows your stats", "Auto-replies to comments and DMs", "Connects apps so tasks run by themselves"],
            ["Best for", "Posting on several platforms", "Instagram accounts that get repeat questions", "Repeat tasks between apps"],
            ["Threads", "Yes, schedule posts", "No", "Depends on the apps you connect"],
            ["Learning curve", "Easy", "Medium", "Medium to hard"],
            ["Free plan", "Yes, with monthly limits", "Limited; most features need Pro", "Yes, with monthly limits"],
        ]),
        ("p", "Free plans and limits change, so check each tool's pricing page before you plan around them."),
        ("h2", "Metricool: schedule and measure"),
        ("ul", [
            "<b>Good:</b> one calendar for Threads, Instagram, TikTok and more; suggested best times; stats in the same place.",
            "<b>Not so good:</b> the free plan caps how much you can schedule each month; it won't reply to people for you.",
            "<b>Pick it if:</b> you post by hand every day and want to batch the week in one sitting.",
        ]),
        ("h2", "ManyChat: replies that answer themselves"),
        ("ul", [
            "<b>Good:</b> someone comments a keyword and gets your link in their DMs automatically; great for free downloads and FAQs.",
            "<b>Not so good:</b> it doesn't work on Threads; the useful features are mostly on the paid plan; you need to write the replies well or they feel robotic.",
            "<b>Pick it if:</b> you're active on Instagram and answer the same DMs again and again.",
        ]),
        ("h2", "Make: connect everything"),
        ("ul", [
            "<b>Good:</b> very flexible. A new form entry can go to a sheet, an email and a message, all by itself. Works with thousands of apps.",
            "<b>Not so good:</b> takes the longest to learn; easy to build something more complicated than you need.",
            "<b>Pick it if:</b> you copy and paste the same information between apps every week.",
        ]),
        ("h2", "So which one first?"),
        ("check", [
            "Posting by hand is eating your time → start with Metricool.",
            "Instagram DMs and comments are eating your time → add ManyChat.",
            "Copy-paste between apps is eating your time → learn Make.",
        ]),
        ("tip", "Most beginners get the biggest win from scheduling first. Get one week of posts batched before you automate anything else."),
        ("tool", "metricool"),
        ("mission", "autopilot"),
    ],
},
zh={
    "title": "Make、ManyChat、Metricool：你應該先用哪一個？",
    "desc": "三個常被搞混的熱門工具。它們各自在做什麼、優缺點，還有一個簡單的方法決定先設定哪一個。",
    "blocks": [
        ("p", "每次聊到「內容自動化」，這三個一定會出現，很多新手以為它們在做一樣的事。其實不是。它們各自解決不同的問題，所以該先用哪個，要看<b>你現在的時間花在哪裡</b>。"),
        ("p", "這三個我們工作上都有在用。下面是中立的比較。"),
        ("h2", "快速比較"),
        ("table", ["", "Metricool", "ManyChat", "Make"], [
            ["在做什麼", "排程貼文、看數據", "自動回覆留言和私訊", "把 App 串起來，讓事情自己跑"],
            ["最適合", "同時經營好幾個平台", "常被問一樣問題的 IG 帳號", "App 之間重複的工作"],
            ["Threads", "可以，排程發文", "不支援", "要看你串的 App"],
            ["上手難度", "簡單", "中等", "中等到難"],
            ["免費版", "有，每月有上限", "很有限，大部分功能要 Pro", "有，每月有上限"],
        ]),
        ("p", "免費方案和上限常常會變，規劃之前先去各家的價格頁確認。"),
        ("h2", "Metricool：排程加數據"),
        ("ul", [
            "<b>優點：</b>一個行事曆管 Threads、Instagram、TikTok 等平台；會建議最佳發文時間；數據也在同一個地方。",
            "<b>缺點：</b>免費版每個月能排程的數量有限；它不會幫你回覆別人。",
            "<b>選它，如果：</b>你每天都在手動發文，想一次排好一整週。",
        ]),
        ("h2", "ManyChat：會自己回覆的私訊"),
        ("ul", [
            "<b>優點：</b>有人留言關鍵字，就自動私訊連結給他；很適合送免費下載、回答常見問題。",
            "<b>缺點：</b>Threads 不支援；好用的功能大多在付費版；回覆要寫得好，不然會很像機器人。",
            "<b>選它，如果：</b>你主要經營 Instagram，一直在回一樣的私訊。",
        ]),
        ("h2", "Make：什麼都能串"),
        ("ul", [
            "<b>優點：</b>非常彈性。有人填表單，就自動存進試算表、寄 email、傳訊息。可以串幾千個 App。",
            "<b>缺點：</b>最需要時間學；很容易做出比你需要的還複雜的東西。",
            "<b>選它，如果：</b>你每週都在不同 App 之間複製貼上同樣的資料。",
        ]),
        ("h2", "所以先用哪一個？"),
        ("check", [
            "手動發文最花時間 → 先用 Metricool。",
            "IG 私訊和留言最花時間 → 加上 ManyChat。",
            "App 之間複製貼上最花時間 → 學 Make。",
        ]),
        ("tip", "大部分新手，先把排程搞定最有感。先成功排好一週的貼文，再去自動化其他事情。"),
        ("tool", "metricool"),
        ("mission", "autopilot"),
    ],
})

# ---------------------------------------------------------------------------------------------------------------
guide("content-marketing-small-business", None, 6, "2026-11-28", kind="start", mission="content",
en={
    "title": "How content marketing grows a small business with zero ad budget",
    "desc": "Why helpful posts keep working long after ads stop, the 3 kinds of content that work for small businesses, and a 1-hour weekly routine with AI.",
    "blocks": [
        ("p", "<b>Content marketing</b> means posting genuinely useful things, like answers, tips and behind-the-scenes, so customers find you and trust you <i>before</i> they buy. It's how many small businesses grow without paying for ads."),
        ("h2", "Ads vs content"),
        ("table", ["", "Ads", "Content"], [
            ["Cost", "You pay for every view or click", "Mostly your time"],
            ["Speed", "Fast", "Slow at first"],
            ["When you stop", "Results stop the same day", "Old posts keep getting found"],
            ["Trust", "People know it's an ad", "People feel helped"],
        ]),
        ("p", "Ads aren't bad. They're great for speed. But content is the part that <b>keeps working</b> when you stop paying, which matters most when the budget is small."),
        ("h2", "Why it works"),
        ("ul", [
            "<b>Trust before the sale.</b> People buy from someone who already helped them.",
            "<b>It builds up over time.</b> Every helpful post is one more way to be found.",
            "<b>Fewer repeat questions.</b> A post that answers \"how much?\" or \"how long?\" saves you DMs.",
            "<b>It shows what you know.</b> Advice shows expertise better than a slogan.",
        ]),
        ("h2", "3 kinds of content that work for small businesses"),
        ("ol", [
            "<b>Answers.</b> The questions customers ask you every week. Each one is a post.",
            "<b>Behind the scenes.</b> How you make, choose or prepare things. It makes you real.",
            "<b>Proof.</b> Before and after, a customer's result, a common mistake fixed. Only real ones, with permission.",
        ]),
        ("h2", "A 1-hour weekly routine (with AI)"),
        ("check", [
            "Write down 7 questions customers asked you this week (10 min).",
            "Paste them into Claude or ChatGPT with your brief, and ask for 7 short posts (15 min).",
            "Edit each one: add a real detail, cut 20%, check facts (20 min).",
            "Schedule all 7 in Metricool (15 min).",
        ]),
        ("p", "The full step-by-step, with copy-paste prompts, is in the mission below."),
        ("h2", "The same skill powers affiliate income"),
        ("p", "Content marketing and affiliate marketing are the same skill: help first, recommend second. Learn it for your business and you can use it to recommend tools too."),
        ("mission", "content"),
    ],
},
zh={
    "title": "零廣告預算，內容行銷怎麼讓小生意成長",
    "desc": "為什麼好內容在廣告停了之後還一直有效、對小生意最有用的 3 種內容，還有一個用 AI、每週 1 小時的做法。",
    "blocks": [
        ("p", "<b>內容行銷</b>就是發真的有用的東西：解答、小技巧、幕後花絮，讓客人在<i>買之前</i>就找到你、信任你。很多小生意就是這樣，不靠廣告也慢慢長大。"),
        ("h2", "廣告 vs 內容"),
        ("table", ["", "廣告", "內容"], [
            ["成本", "每次曝光或點擊都要付錢", "主要是你的時間"],
            ["速度", "快", "一開始慢"],
            ["停下來之後", "當天就沒效果", "舊文章還是一直被找到"],
            ["信任感", "大家知道這是廣告", "大家覺得被幫到"],
        ]),
        ("p", "廣告不是不好，要快的時候很好用。但內容是你停止付錢之後<b>還會繼續有效</b>的那一塊，預算越少越重要。"),
        ("h2", "為什麼有用"),
        ("ul", [
            "<b>先信任，再成交。</b>大家會跟已經幫過他的人買。",
            "<b>會一直累積。</b>每一篇有幫助的貼文，都多一個被找到的機會。",
            "<b>少回很多重複的問題。</b>一篇講清楚「多少錢」「要多久」的貼文，能幫你省下很多私訊。",
            "<b>展現你的專業。</b>給建議，比喊口號更能證明你懂。",
        ]),
        ("h2", "對小生意最有用的 3 種內容"),
        ("ol", [
            "<b>解答。</b>客人每週都在問你的問題，每一個都是一篇貼文。",
            "<b>幕後。</b>你怎麼做、怎麼挑、怎麼準備。讓大家覺得你是真的人。",
            "<b>證明。</b>前後對比、客人的成果、常見錯誤怎麼修正。只放真的，而且要經過同意。",
        ]),
        ("h2", "每週 1 小時的做法（用 AI）"),
        ("check", [
            "寫下這週客人問你的 7 個問題（10 分鐘）。",
            "連同你的自我介紹貼到 Claude 或 ChatGPT，請它寫 7 篇短貼文（15 分鐘）。",
            "每篇修一下：加一個真實細節、刪掉 20%、檢查事實（20 分鐘）。",
            "7 篇全部排進 Metricool（15 分鐘）。",
        ]),
        ("p", "完整步驟和可以直接複製的提示詞，在下面的任務裡。"),
        ("h2", "同一個技能，也能帶來聯盟收入"),
        ("p", "內容行銷和聯盟行銷其實是同一個技能：先幫忙，再推薦。為了你的生意學會它，也就能拿來推薦工具。"),
        ("mission", "content"),
    ],
})

# ---------------------------------------------------------------------------------------------------------------
guide("avoid-account-suspension", None, 7, "2026-11-28", kind="levelup", mission="autopilot",
en={
    "title": "Don't lose your account: how to stay within Threads and Instagram's rules",
    "desc": "Why accounts get suspended when you automate or post links, the posting habits that keep you in good standing, how to secure your account, and what to do if it happens anyway.",
    "blocks": [
        ("p", "Automation and links are how you grow online. They're also the two things platforms watch most closely for spam. Accounts usually get restricted not because of one post, but because of a <b>pattern</b>. Here's how to keep yours healthy."),
        ("warn", "No trick guarantees an account will never be restricted, and platforms change their systems often. What works long term is simple: post like a real person who's genuinely helping, and follow the rules."),
        ("h2", "What usually leads to a suspension"),
        ("ul", [
            "<b>Too much, too fast.</b> A brand-new account posting many times a day from day one looks like a spam account, even if the content is good.",
            "<b>A link in almost every post.</b> Posts that only exist to send people elsewhere get treated as spam, especially links to free shared web addresses that spammers also use.",
            "<b>Nobody home.</b> Accounts that publish automatically but never reply or talk to anyone look like bots.",
            "<b>The same content on several accounts.</b> Copy-pasting posts across accounts you own.",
            "<b>Hidden ads.</b> Affiliate or paid posts with no disclosure.",
            "<b>Weak security.</b> A hacked account that posts spam gets suspended too.",
        ]),
        ("h2", "Safer posting habits"),
        ("table", ["Habit", "Safer approach"], [
            ["Posts per day", "2–3 for an established account. Start new accounts at 1–2 a day for the first few weeks."],
            ["Links", "In at most 1 of every 3 posts. Let the rest stand on their own, or point to the link in your bio."],
            ["Replies per post", "Keep threads short: a post plus 1–3 replies is plenty."],
            ["Where links go", "Your own website address, rather than free shared ones."],
            ["Being present", "10 minutes a day replying to comments and joining other people's conversations yourself."],
            ["Disclosure", "Mark affiliate links and paid partnerships clearly."],
        ]),
        ("tip", "Use scheduling tools that connect through the platform's official system, like Metricool. Avoid apps that ask for your password or auto-follow, auto-like or mass-message people. Those break most platforms' rules."),
        ("h2", "Secure your account today"),
        ("check", [
            "Turn on two-factor authentication with an authenticator app, not only SMS.",
            "Save your backup codes somewhere safe and offline.",
            "Make sure the email and phone number on the account are up to date.",
            "Check which devices are logged in, and remove any you don't recognise.",
            "Never type your password on a page you reached from an email or DM link. Open the app yourself instead.",
        ]),
        ("h2", "If your account does get suspended"),
        ("ol", [
            "Don't panic, and don't keep trying to log in again and again.",
            "Find the platform's email or in-app notice and use its official review or appeal option. Keep your message short and honest.",
            "Be patient. Reviews can take days.",
            "Don't create a new account to replace it while you wait. Most platforms treat that as getting around a suspension, and it can affect your other accounts.",
            "Ignore anyone offering to \"recover your account for a fee\". These are almost always scams.",
        ]),
        ("h2", "Don't build on one platform only"),
        ("p", "Even careful accounts can be caught by mistake. That's why it pays to own part of your audience: a simple website, an email list, and a second platform. If one door closes, the others stay open."),
        ("mission", "autopilot"),
    ],
},
zh={
    "title": "別讓帳號被停權：怎麼在 Threads 和 Instagram 的規則內經營",
    "desc": "為什麼自動化、貼連結的帳號容易被停權，哪些發文習慣比較安全、怎麼保護帳號，還有真的被停權時該怎麼做。",
    "blocks": [
        ("p", "自動化和連結，是在網路上成長的方法；同時也是平台最嚴格在看有沒有洗版的兩件事。帳號被限制，通常不是因為某一篇文，而是因為一種<b>模式</b>。下面教你怎麼讓帳號保持健康。"),
        ("warn", "沒有任何技巧能保證帳號永遠不會被限制，平台的機制也常常在改。長期有效的做法很簡單：像一個真的在幫助別人的真人那樣發文，並且遵守規則。"),
        ("h2", "通常是什麼導致停權"),
        ("ul", [
            "<b>太多、太快。</b>全新帳號第一天就一天發很多篇，就算內容很好，看起來也像洗版帳號。",
            "<b>幾乎每篇都有連結。</b>只是為了把人導走的貼文，容易被當成垃圾內容，尤其是很多洗版的人也在用的免費共用網址。",
            "<b>帳號沒有人在。</b>只會自動發文、從來不回覆也不跟人互動的帳號，看起來就像機器人。",
            "<b>多個帳號發一樣的內容。</b>在你擁有的好幾個帳號之間複製貼上。",
            "<b>沒揭露的廣告。</b>聯盟連結或業配文沒有標示。",
            "<b>帳號安全太弱。</b>被盜用、開始發垃圾訊息的帳號，一樣會被停權。",
        ]),
        ("h2", "比較安全的發文習慣"),
        ("table", ["習慣", "比較安全的做法"], [
            ["每天發幾篇", "穩定的帳號 2–3 篇。新帳號前幾週先一天 1–2 篇。"],
            ["連結", "每 3 篇最多 1 篇有連結。其他的單純分享內容，或請大家看個人簡介的連結。"],
            ["每篇的回覆串", "串文保持短短的：一篇加上 1–3 則回覆就夠了。"],
            ["連結放哪裡", "用你自己的網址，不要用免費共用的網址。"],
            ["人要在", "每天花 10 分鐘自己回留言，也去別人的貼文底下互動。"],
            ["揭露", "聯盟連結和業配合作要清楚標示。"],
        ]),
        ("tip", "用透過平台官方系統連接的排程工具，例如 Metricool。避開會要你密碼、或自動追蹤、自動按讚、大量私訊的 App，這些大部分平台都禁止。"),
        ("h2", "今天就把帳號保護好"),
        ("check", [
            "開啟兩步驟驗證，用驗證器 App，不要只靠簡訊。",
            "把備用代碼存在安全、離線的地方。",
            "確認帳號上的 email 和手機號碼都是最新的。",
            "檢查有哪些裝置登入中，移除不認識的。",
            "從 email 或私訊連結點進去的頁面，絕對不要輸入密碼。自己打開 App 再處理。",
        ]),
        ("h2", "如果帳號真的被停權"),
        ("ol", [
            "先不要慌，也不要一直重複嘗試登入。",
            "找到平台寄來的 email 或 App 裡的通知，用官方的審查或申訴選項。內容簡短、誠實就好。",
            "耐心等，審查可能要好幾天。",
            "等待期間不要開新帳號來取代它。大部分平台會把這視為規避停權，還可能影響你其他的帳號。",
            "有人說「付錢幫你救回帳號」，直接忽略，幾乎都是詐騙。",
        ]),
        ("h2", "不要只靠一個平台"),
        ("p", "再小心的帳號，也可能被誤判。所以值得把一部分的受眾留在自己手上：一個簡單的網站、一份 email 名單、再加一個平台。一扇門關了，其他的還開著。"),
        ("mission", "autopilot"),
    ],
})
