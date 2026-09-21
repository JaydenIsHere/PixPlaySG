export const STAGES = ['TOFU', 'MOFU', 'BOFU'];

export const STAGE_INFO = {
  TOFU: {
    label: 'TOFU — Attract',
    desc: 'Reach new people who may not know your business yet.',
    infoTitle: 'Why TOFU goes viral',
    points: [
      { name: 'Broad appeal', desc: 'Focuses on universal themes, human psychology, or big problems rather than deep product details.' },
      { name: 'Low friction', desc: 'Requires zero commitment to consume — no long reading, no sales pitch, just instant value or entertainment.' },
      { name: 'High shareability', desc: 'People share content that makes them feel understood, smart, or amused.' },
    ],
  },
  MOFU: {
    label: 'MOFU — Build Trust',
    desc: 'Build interest, trust, and understanding.',
    infoTitle: 'What MOFU content does',
    points: [
      { name: 'Builds trust', desc: 'Moves people from curious to convinced by teaching, demonstrating, or reframing a problem.' },
      { name: 'Reduces skepticism', desc: 'Shows you understand their specific situation, not just a generic pitch.' },
      { name: 'Sets up the sale', desc: "Warms the audience so BOFU content later doesn't feel like a cold pitch." },
    ],
  },
  BOFU: {
    label: 'BOFU — Convert',
    desc: 'Help the right people make a buying decision.',
    infoTitle: 'What BOFU content does',
    points: [
      { name: 'Removes final doubts', desc: 'Answers the exact objection standing between interest and purchase.' },
      { name: 'Provides proof', desc: 'Case studies, demos, and comparisons that make the decision easy.' },
      { name: 'Drives action', desc: 'Every piece should end in one clear next step.' },
    ],
  },
};

export const BUSINESS_TYPES = {
  product: { label: 'Product-based business', ratio: { TOFU: 70, MOFU: 20, BOFU: 10 } },
  service: { label: 'Service-based business', ratio: { TOFU: 40, MOFU: 40, BOFU: 20 } },
};

export const TOFU_FORMATS = [
  {
    name: 'Short-Form Video',
    desc: 'Reels, TikTok, Shorts — quick, punchy clips with a strong hook.',
    writingInstruction:
      'Write this as a spoken short-form video script: a punchy 1-2 line hook, a body that delivers the angle in plain spoken language, then the CTA. Keep it tight enough to say out loud in 30-60 seconds.',
  },
  {
    name: 'Listicles & Carousels',
    desc: 'Easy-to-swipe slides sharing secrets or mistakes in your niche.',
    writingInstruction:
      'Write this as a swipeable carousel: Slide 1 is the hook (the angle above), each following slide gives one short, punchy point, and the final slide is the CTA. Keep every slide to one short sentence — carousels are read, not spoken, so no long paragraphs.',
  },
  {
    name: 'Relatable Memes or Skits',
    desc: 'Entertaining takes on common industry frustrations.',
    writingInstruction:
      'Write this as a short relatable skit or meme concept: describe the scene or meme format in one line, then write the caption or dialogue that delivers the angle above as the punchline. Keep it visual and funny, not explanatory.',
  },
  {
    name: 'Tier Lists & Rankings',
    desc: 'Visual sorting of popular opinions or tools in your field.',
    writingInstruction:
      'Write this as a ranked tier list or countdown: list the items being ranked, give a one-line reason for each placement, and end with the CTA. Keep each entry short enough to read at a glance.',
  },
];

// TOFU hooks are angle-driven rather than psychology-driven — proven angles for viral reach.
export const TOFU_ANGLES = [
  { name: 'Harsh Truths', desc: 'Name the uncomfortable reality nobody says out loud.', example: 'The brutal reality of working in [your industry] nobody talks about.' },
  { name: 'Counterintuitive Mistakes', desc: 'Frame a common "mistake" as secretly a good thing.', example: 'Why rookie mistakes in [your topic] are actually a good thing.' },
  { name: 'Fast Lessons', desc: 'Compress years of experience into a quick payoff.', example: '10 years of [your niche] lessons condensed into 60 seconds.' },
  { name: 'Stereotypes', desc: 'Call out common misconceptions about your field.', example: '5 things people get completely wrong about [your field].' },
];

// MOFU and BOFU hooks are organized by the consumer-psychology principle they apply,
// so picking a hook also teaches the strategy behind it. One example each for now —
// more examples per principle can be added to the `examples` array over time.
// businessType: 'universal' | 'service' | 'product'. Most persuasion psychology doesn't
// care what you're selling, so most entries are universal — only a handful genuinely
// require a physical/sensory product (product) or personal expert framing (service).
export const PSYCHOLOGY_HOOKS = [
  {
    part: 'Trust, Risk Mitigation & Authority',
    name: 'Loss Aversion',
    subtitle: 'Prospect Theory',
    businessType: 'universal',
    psychology: 'People are twice as motivated to avoid losing $100 as they are to gain $100. Pain of loss beats joy of gain.',
    application: 'Highlight the hidden cost of staying with their current habits or taking no action.',
    examples: ['If you are still letting your child do random math practice papers without correcting targeted error patterns, you are silently throwing away 10 to 15 easy marks on exam day.'],
  },
  {
    part: 'Trust, Risk Mitigation & Authority',
    name: 'Social Proof & Herd Mentality',
    businessType: 'universal',
    psychology: 'When uncertain, people look at what others are doing to validate their decisions.',
    application: 'Show real people, high numbers, or relatable client case studies using your solution.',
    examples: ['Over 400 business owners downloaded this exact lead framework last month — here is why everyone is switching to it.'],
  },
  {
    part: 'Trust, Risk Mitigation & Authority',
    name: 'The Authority Bias',
    businessType: 'service',
    psychology: 'People naturally defer to experts, credentials, and demonstrated mastery.',
    application: 'Share specific frameworks, proprietary methods, or industry secrets on camera instead of giving broad surface-level advice.',
    examples: ['As someone who has analyzed over 1,000 PSLE Math papers across 14 years, here is the exact 3-step checklist SEAB examiners look for in Booklet B.'],
  },
  {
    part: 'Trust, Risk Mitigation & Authority',
    name: 'De-risking & Zero-Risk Bias',
    businessType: 'universal',
    psychology: 'Humans prefer options that eliminate risk entirely over options that offer higher upside with risk attached.',
    application: 'Offer downloadable diagnostic tools, free audits, or clear guarantees to remove friction.',
    examples: ["Don't hire a full agency yet. Download our free 1-page script audit checklist first to see if your video setup even needs changing."],
  },
  {
    part: 'Trust, Risk Mitigation & Authority',
    name: 'The Paradox of Choice',
    businessType: 'universal',
    psychology: 'Offering too many choices causes decision paralysis and drops conversion rates.',
    application: 'Limit your call-to-action to one simple, clear action per video.',
    examples: ["Don't try fixing your scripts, lighting, and ads all at once. Just comment 'PAPER' below, and start with fixing your hook."],
  },
  {
    part: 'Desire, Curiosity & Attention Triggers',
    name: 'The Curiosity Gap',
    businessType: 'universal',
    psychology: 'When there is a gap between what people know and what they want to know, they feel compelled to fill it.',
    application: 'Open with a counter-intuitive statement or reveal a surprising truth halfway through the video.',
    examples: ["The biggest reason most small cafes close isn't bad food or high rent... it's this 3-second mistake on their menu."],
  },
  {
    part: 'Desire, Curiosity & Attention Triggers',
    name: 'Scarcity & FOMO',
    subtitle: 'Fear of Missing Out',
    businessType: 'universal',
    psychology: 'Items or opportunities become significantly more desirable when availability is limited.',
    application: 'Highlight time-bound offers, limited batch sizes, or exclusive access.',
    examples: ['We only take 5 consulting clients per quarter so we can audit every script personally. 3 spots are already booked.'],
  },
  {
    part: 'Desire, Curiosity & Attention Triggers',
    name: 'Visual Temptation',
    subtitle: 'Sensory Cueing',
    businessType: 'product',
    psychology: 'High-definition sensory cues trigger immediate subconscious craving before rational thinking kicks in.',
    application: 'Use close-up shots, crisp audio (ASMR), or extreme visual transformations.',
    examples: ["Filming the crisp crunch of a fried chicken skin or the smooth pour of a matcha latte before introducing the cafe's weekend special."],
  },
  {
    part: 'Desire, Curiosity & Attention Triggers',
    name: 'Peak-End Rule',
    businessType: 'universal',
    psychology: 'People judge an experience based mostly on how they felt at its climax and at its end, rather than the average.',
    application: 'Deliver your strongest, most visually impressive insight right before your final call-to-action.',
    examples: ['In an interior design video, save the dramatic before-and-after transformation reveal for the last 5 seconds, right before dropping the contact CTA.'],
  },
  {
    part: 'Desire, Curiosity & Attention Triggers',
    name: 'The Decoy Effect',
    businessType: 'universal',
    psychology: 'Adding an inferior third option makes one of the other options look exponentially more valuable.',
    application: 'Compare your high-value strategy against ineffective alternatives.',
    examples: ['Option A: Spend $4,000/mo hiring a full agency. Option B: Spend 20 hours writing scripts from scratch. Option C: Use our pre-built script matrix.'],
  },
  {
    part: 'Identity, Ego & Relatability',
    name: 'Self-Affirmation & Identity Alignment',
    businessType: 'universal',
    psychology: 'People buy products and follow creators that reinforce who they believe they are, or who they want to become.',
    application: 'Speak directly to a specific subculture or professional identity.',
    examples: ['If you consider yourself a modern business owner who values long-term strategy over cheap viral tricks, this is for you.'],
  },
  {
    part: 'Identity, Ego & Relatability',
    name: 'The "Us vs. Them" Dynamic',
    subtitle: 'In-Group Bias',
    businessType: 'universal',
    psychology: 'People feel a strong sense of belonging when united against a common "enemy" or bad industry practice.',
    application: 'Call out outdated industry tactics or bad advice that your target audience secretly hates.',
    examples: ['Stop listening to gurus who tell you to dance on camera for views. Real businesses convert viewers through consumer psychology, not vanity metrics.'],
  },
  {
    part: 'Identity, Ego & Relatability',
    name: 'Labor Illusion & Perceived Effort',
    businessType: 'universal',
    psychology: 'People value a product or service much more when they see the hard work, craftsmanship, and effort behind it.',
    application: 'Show behind-the-scenes processes, blueprint creation, or actual filming setups.',
    examples: ['A video showing the 5-hour scripting, auditing, and video editing process condensed into 30 seconds to justify your premium fee.'],
  },
  {
    part: 'Identity, Ego & Relatability',
    name: 'The Endowment Effect',
    businessType: 'universal',
    psychology: 'People value things significantly more once they feel ownership over them.',
    application: 'Give prospects interactive templates, fill-in-the-blank worksheets, or customizable portals they can duplicate and call their own.',
    examples: ['Duplicate this Notion script matrix into your own workspace today and customize your first 5 hooks in 10 minutes.'],
  },
  {
    part: 'Identity, Ego & Relatability',
    name: 'Empathy & "I See You" Validation',
    businessType: 'universal',
    psychology: 'Customers only buy when they feel understood, not just when they understand you.',
    application: 'Describe their exact daily frustration with extreme accuracy before introducing any solution.',
    examples: ["You spent 3 hours writing a video script, filmed it 10 times, and it got 200 views. I know how frustrating that feels because I've been there."],
  },
  {
    part: 'Friction Reduction & Decision Drivers',
    name: 'The Reciprocation Principle',
    businessType: 'universal',
    psychology: 'When you give someone value upfront for free, they feel a psychological obligation to return the favor.',
    application: 'Give away your best framework or lead magnet without asking for money or complex forms.',
    examples: ["I spent 2 weeks building this 2026 Math Mock Exam Paper. Comment 'PAPER' and I'll send you the entire PDF with step-by-step solutions for free."],
  },
  {
    part: 'Friction Reduction & Decision Drivers',
    name: 'The IKEA Effect',
    businessType: 'universal',
    psychology: 'People place disproportionately high value on products they partially created or customized themselves.',
    application: 'Use modular mix-and-match templates where the user inputs their own business details to generate a final script.',
    examples: ['Plug your business topic into Stage A and Stage B of this matrix to construct your own custom video script.'],
  },
  {
    part: 'Friction Reduction & Decision Drivers',
    name: 'Anchoring Effect',
    businessType: 'universal',
    psychology: 'The first price or metric presented serves as an anchor for all future comparisons.',
    application: "Anchor against high alternatives before stating your offer's cost or effort.",
    examples: ['Consultants usually charge $5,000 to audit your content strategy. You can access our complete operational blueprint for a fraction of that.'],
  },
  {
    part: 'Friction Reduction & Decision Drivers',
    name: 'Cognitive Ease',
    subtitle: 'Fluency',
    businessType: 'universal',
    psychology: 'Simple, clear, and easy-to-read information feels more truthful and doable than complex explanations.',
    application: 'Break down complex topics into clear 3-step processes using on-screen text overlays and bullet points.',
    examples: ['3 steps to fix your video: 1. Change the first 3 seconds. 2. Show the visual proof. 3. Ask for the comment.'],
  },
  {
    part: 'Friction Reduction & Decision Drivers',
    name: 'Status & Prestige Seeking',
    businessType: 'universal',
    psychology: 'People are driven by choices that elevate their social or professional status among peers.',
    application: 'Frame your strategy as the professional, high-level way to run a business.',
    examples: ["This isn't just about getting views — it's about positioning your brand as the #1 authority in your niche."],
  },
  {
    part: 'Behavioral Loops & Action Triggers',
    name: 'The Commitment & Consistency Principle',
    businessType: 'universal',
    psychology: 'Once someone makes a small, low-friction commitment, they are much more likely to agree to a larger commitment later.',
    application: 'Ask for a simple 1-word comment first before pitching a strategy call.',
    examples: ["Comment 'HOOK' below to get the free PDF."],
  },
  {
    part: 'Behavioral Loops & Action Triggers',
    name: 'The Pratfall Effect',
    businessType: 'universal',
    psychology: 'Showing minor flaws or admitting mistakes makes high-performing experts appear more likeable and trustworthy.',
    application: 'Share a past business failure or a content mistake you made before finding the right strategy.',
    examples: ['When I started, I spent 6 months posting videos that got zero leads because I ignored consumer psychology...'],
  },
  {
    part: 'Behavioral Loops & Action Triggers',
    name: 'Immediate Gratification',
    subtitle: 'Dopamine Loop',
    businessType: 'universal',
    psychology: 'Modern audiences crave instant results and immediate feedback loops.',
    application: 'Promised resources should be delivered instantly via DM automation rather than manual follow-up days later.',
    examples: ["Comment 'CHECKLIST' below and my automated assistant will drop the link directly into your DMs within 10 seconds."],
  },
  {
    part: 'Behavioral Loops & Action Triggers',
    name: 'The Spotlight Effect',
    businessType: 'universal',
    psychology: 'People overestimate how much others are observing their actions, leading to anxiety around putting themselves out there.',
    application: "Reassure business owners that they don't need to be professional actors to make high-converting videos.",
    examples: ["You don't need a professional studio setup or perfect on-camera skills. You just need a clear script structure that solves a real customer problem."],
  },
  {
    part: 'Behavioral Loops & Action Triggers',
    name: 'Hyperbolic Discounting',
    businessType: 'universal',
    psychology: 'People prefer immediate smaller rewards over larger delayed rewards.',
    application: 'Show the quick wins a client can achieve this week alongside the long-term 90-day strategy.',
    examples: ['You can draft your next 5 video scripts today in under 30 minutes, even while working on your long-term Q4 marketing strategy.'],
  },
  {
    part: 'Product-Specific: Sensory & Value Perception',
    name: 'Aesthetic-Usability Effect',
    businessType: 'product',
    psychology: 'People perceive attractive, well-designed products as more functional and higher quality — often before ever trying them.',
    application: 'Lead with clean, well-shot product/packaging visuals and let the visual polish imply quality, rather than explaining features first.',
    examples: ["Look at this design for a second... you already know this thing works well before I even tell you what it does."],
  },
  {
    part: 'Product-Specific: Sensory & Value Perception',
    name: 'Price-Quality Heuristic',
    businessType: 'product',
    psychology: 'In the absence of other information, people use price as a stand-in for quality — a higher price implies a better product.',
    application: 'Justify a premium price by showing materials, ingredients, or craftsmanship on camera instead of apologizing for the cost.',
    examples: ["This isn't a $5 candle. Here's exactly why it's $32 — and why that's still a steal."],
  },
  {
    part: 'Product-Specific: Sensory & Value Perception',
    name: 'Unboxing & Anticipation-Reward',
    businessType: 'product',
    psychology: 'Watching a reveal builds real anticipation and triggers a dopamine reward in the viewer, even vicariously.',
    application: 'Slow down the reveal moment — packaging, first look, first use — instead of cutting straight to the product.',
    examples: ["Wait for it... (peels back the tissue paper) ...this is what $58 of skincare actually looks like."],
  },
  {
    part: 'Product-Specific: Sensory & Value Perception',
    name: 'Bandwagon Effect',
    businessType: 'product',
    psychology: "Distinct from general social proof — people want something more once they see it's already trending or selling out, not just liked.",
    application: 'Show visible momentum — sold-out badges, restock counters, "back in stock" — rather than just testimonials.',
    examples: ['This scent sold out in 6 hours last restock. We just got 200 more back in stock.'],
  },
];

// Flattened (principle, example) pairs for the MOFU/BOFU hook picker — grouped back
// into per-principle sections at render time. Flat so adding more examples per
// principle later needs no changes outside this list.
// businessTypeKey: 'product' | 'service' | undefined/other → shows universal + that type.
// Falls back to the full list if the business type hasn't been set yet.
export function getHookOptions(businessTypeKey) {
  const principles = PSYCHOLOGY_HOOKS.filter(
    (p) => !businessTypeKey || p.businessType === 'universal' || p.businessType === businessTypeKey
  );
  return principles.flatMap((principle, principleIdx) =>
    principle.examples.map((example, exampleIdx) => ({
      principleIdx,
      exampleIdx,
      principle,
      example,
    }))
  );
}

export const FRAMEWORKS = {
  MOFU: [
    { name: 'Pain point → Cause → Solution', desc: 'Identify the problem, explain why it happens, and give a practical solution.' },
    { name: 'Mistake → Consequence → Correction', desc: 'Show the common mistake, explain what it causes, then provide a better approach.' },
    { name: 'Myth → Truth → Example', desc: 'Challenge a common belief and replace it with a more useful explanation.' },
    { name: 'Three-step tutorial', desc: 'Give the audience a clear process they can apply.' },
    { name: 'Before → After → How', desc: 'Show a transformation, then explain the process behind it.' },
    { name: 'Story → Lesson → Application', desc: "Tell a short story and connect the lesson to the viewer's situation." },
  ],
  BOFU: [
    { name: 'Pain point → Solution → Proof → CTA', desc: 'State the problem, introduce the offer, demonstrate evidence, and give the next step.' },
    { name: 'Objection → Reframe → Evidence → CTA', desc: 'Address a reason not to buy, offer a more useful perspective, provide proof, and invite action.' },
    { name: 'Case study', desc: "Explain the customer's starting situation, what was done, and the result." },
    { name: 'Product demonstration', desc: 'Show how the product or service works and who it is suitable for.' },
    { name: 'Comparison', desc: "Explain the difference between the customer's current approach and your method." },
    { name: 'FAQ', desc: 'Answer one high-intent question that often delays a purchase.' },
  ],
};

// Paste your demo/intro video's YouTube link here once it's ready (any normal
// youtube.com/watch or youtu.be link works — it's converted automatically).
export const TUTORIAL_VIDEO_URL = '';

// MOFU/BOFU CTAs are built around what actually converts on short-form content:
// comment-to-DM automation (ManyChat-style) sees 40-65% click-through vs 3-5% for a
// plain bio link, and ad-style CTAs split by audience temperature — "Learn More"
// style for cold audiences, "Shop Now"/"Book Now" style once they're warmed up.
export const CTAS = {
  TOFU: ['Follow for more', 'Share this with someone who needs it', 'Comment your experience', 'Save this for later', 'Watch the next part'],
  MOFU: [
    'Follow for more like this',
    'Save this for later',
    'Share this with someone who needs it',
    "Comment '[KEYWORD]' and I'll send it to your DMs",
    'Comment your biggest question below',
    'Tag someone who needs to see this',
  ],
  BOFU: [
    "Comment '[KEYWORD]' and I'll DM you the link",
    'Tap the link in bio to get started',
    'Tap the button below to start now',
    'Book a call — link in bio',
    'DM me to get started',
    'Tap the button below to claim your spot',
    'Shop now — link in bio',
    'Send us a message to get started',
    'Limited spots — link in bio to join',
  ],
};
