import { BUSINESS_TYPES, FRAMEWORKS, TOFU_ANGLES, STAGES, STAGE_INFO } from '../data/scriptSystemData';

function frameworkNameFor(stage, index) {
  if (stage === 'TOFU') return TOFU_ANGLES[index % TOFU_ANGLES.length].name;
  return FRAMEWORKS[stage][index % FRAMEWORKS[stage].length].name;
}

export const DEFAULT_IDENTITY = {
  business: '',
  audience: '',
  region: '',
  edge: '',
  promise: '',
  tone: '',
};

export function toYouTubeEmbedUrl(url) {
  if (!url) return '';
  const watchMatch = url.match(/[?&]v=([\w-]+)/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;
  const shortMatch = url.match(/youtu\.be\/([\w-]+)/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;
  return url;
}

export function buildIdentityBlock(form) {
  return `Business/niche: ${form.business || '[your business/niche]'}
Target audience: ${form.audience || '[your target audience]'}
Region/market: ${form.region || '[where your customers are, e.g. Singapore, US, worldwide]'}
Competitive edge: ${form.edge || '[why customers pick you over other options]'}
Core promise/transformation: ${form.promise || '[what result you help them get]'}
Tone of voice: ${form.tone || '[your tone, e.g. warm and direct]'}`;
}

// The example lines shown in the hook/angle picker are illustrations of the strategy
// for the user's own understanding — they're not written for this buyer's business, so
// the final prompt describes the *strategy* instead of injecting that unrelated text.
export function buildHookStrategyLine({ stage, hookName, hookDesc, hookPsychology, hookApplication }) {
  if (stage === 'TOFU') return `Angle: ${hookName}. ${hookDesc}`;
  return `Hook strategy (${hookName}): ${[hookPsychology, hookApplication].filter(Boolean).join(' ')}`;
}

export function buildScriptPrompt({ identity, topic, stage, hookStrategyLine, format, framework, ctaText }) {
  if (stage === 'TOFU') {
    return `Using the following brand identity, write short-form content.

${buildIdentityBlock(identity)}

Topic: ${topic || '[your topic from Step 2]'}
Content stage: TOFU. ${STAGE_INFO.TOFU.desc}
Format: ${format.name}
${hookStrategyLine}
Call to action: "${ctaText}"

${format.writingInstruction} Match the tone of voice above.`;
  }

  const closingInstruction =
    stage === 'MOFU'
      ? "Write the full script (hook, body, CTA) in a natural spoken style that matches the tone of voice above. This isn't a sales pitch. The goal is to build trust and familiarity, so prioritize being genuine, convincing, and likeable over being brief. Give it room to breathe: aim for about 1-2 minutes."
      : 'Write the full script (hook, body, CTA) in a natural spoken style that matches the tone of voice above. Keep it tight, punchy, and to the point, within 30-60 seconds.';

  return `Using the following brand identity, write a short-form video script.

${buildIdentityBlock(identity)}

Topic: ${topic || '[your topic from Step 2]'}
Content stage: ${stage}. ${STAGE_INFO[stage].desc}
${hookStrategyLine}
Script framework: ${framework.name}. ${framework.desc}
Call to action: "${ctaText}"

${closingInstruction}`;
}

function buildWeekPattern(ratio, postsPerWeek) {
  const raw = STAGES.map((s) => (ratio[s] / 100) * postsPerWeek);
  const floors = raw.map(Math.floor);
  const remainder = postsPerWeek - floors.reduce((a, b) => a + b, 0);
  const byFraction = raw
    .map((v, i) => ({ i, frac: v - floors[i] }))
    .sort((a, b) => b.frac - a.frac);
  for (let k = 0; k < remainder; k++) floors[byFraction[k].i] += 1;

  const remaining = {};
  STAGES.forEach((s, i) => (remaining[s] = floors[i]));

  const order = [];
  while (order.length < postsPerWeek) {
    const candidates = STAGES.filter((s) => remaining[s] > 0).sort(
      (a, b) => remaining[b] - remaining[a]
    );
    const pick = candidates.find((s) => s !== order[order.length - 1]) || candidates[0];
    order.push(pick);
    remaining[pick]--;
  }
  return order;
}

// A simple alternating suggestion, not an exhaustive list — buyers swap it for
// whatever actually fits once they download and plan against their real content.
const SUGGESTED_FORMATS = ['Video', 'Carousel'];

export function generateCalendar({ businessTypeKey, postsPerWeek, totalDays = 60 }) {
  const ratio = BUSINESS_TYPES[businessTypeKey].ratio;
  const weekPattern = buildWeekPattern(ratio, postsPerWeek);

  const postDaysOfWeek = new Set();
  const step = 7 / postsPerWeek;
  for (let i = 0; i < postsPerWeek; i++) {
    postDaysOfWeek.add(Math.round(i * step) % 7);
  }

  const frameworkCursor = { TOFU: 0, MOFU: 0, BOFU: 0 };
  let patternIndex = 0;
  let formatCursor = 0;
  const days = [];

  for (let day = 1; day <= totalDays; day++) {
    const weekday = (day - 1) % 7;
    if (!postDaysOfWeek.has(weekday)) {
      days.push({ day, kind: 'rest', stage: null });
      continue;
    }
    const stage = weekPattern[patternIndex % weekPattern.length];
    patternIndex++;
    const framework = frameworkNameFor(stage, frameworkCursor[stage]);
    frameworkCursor[stage]++;
    const format = SUGGESTED_FORMATS[formatCursor % SUGGESTED_FORMATS.length];
    formatCursor++;
    days.push({ day, kind: 'post', stage, framework, format, topicText: '' });
  }
  return days;
}

export function calendarToCSV(days) {
  const header = ['Day', 'Type', 'Stage', 'Suggested framework', 'Your topic'];
  const rows = days.map((d) =>
    d.kind === 'rest'
      ? [d.day, 'Rest / engage with comments', '', '', '']
      : [d.day, d.format, d.stage, d.framework, d.topicText || '']
  );
  return [header, ...rows]
    .map((r) => r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n');
}

function pad2(n) {
  return String(n).padStart(2, '0');
}

function formatICSDate(date) {
  return `${date.getFullYear()}${pad2(date.getMonth() + 1)}${pad2(date.getDate())}`;
}

export function calendarToICS(days, startDate) {
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Strategic Script System//EN', 'CALSCALE:GREGORIAN'];
  const stamp = formatICSDate(new Date()) + 'T000000Z';

  days
    .filter((d) => d.kind === 'post')
    .forEach((d) => {
      const eventDate = new Date(startDate);
      eventDate.setDate(eventDate.getDate() + (d.day - 1));
      const dateStr = formatICSDate(eventDate);
      const nextDay = new Date(eventDate);
      nextDay.setDate(nextDay.getDate() + 1);
      const topicLine = d.topicText ? `Topic: ${d.topicText}` : 'Topic: fill in from your 64-topic grid';

      lines.push(
        'BEGIN:VEVENT',
        `UID:ss-day-${d.day}-${dateStr}@pixplaysg.com`,
        `DTSTAMP:${stamp}`,
        `DTSTART;VALUE=DATE:${dateStr}`,
        `DTEND;VALUE=DATE:${formatICSDate(nextDay)}`,
        `SUMMARY:Day ${d.day}: ${d.stage} ${d.format} (${d.framework})`,
        `DESCRIPTION:Format: ${d.format}\\nStage: ${d.stage}\\nFramework: ${d.framework}\\n${topicLine}`,
        'END:VEVENT'
      );
    });

  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

export function downloadTextFile(content, filename, mime = 'text/csv;charset=utf-8;') {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function readTextFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}

export const DEFAULT_CUSTOM_LIBRARY = {
  angles: [],
  hooks: [],
  frameworks: { MOFU: [], BOFU: [] },
  ctas: { TOFU: [], MOFU: [], BOFU: [] },
};

export function buildCustomLibraryExport({ angles, hooks, frameworks, ctas }) {
  return JSON.stringify({ version: 1, angles, hooks, frameworks, ctas }, null, 2);
}

// Merges an imported library into the buyer's current one, skipping anything that
// shares a name with an existing entry so re-importing (or importing on a second
// device that already has some overlap) never duplicates or overwrites their work.
export function mergeCustomLibrary(current, imported) {
  const mergeList = (currentList, importedList) => {
    const existingNames = new Set(currentList.map((item) => item.name.trim().toLowerCase()));
    const additions = (importedList || []).filter(
      (item) => item && item.name && !existingNames.has(item.name.trim().toLowerCase())
    );
    return [...currentList, ...additions];
  };

  return {
    angles: mergeList(current.angles, imported.angles),
    hooks: mergeList(current.hooks, imported.hooks),
    frameworks: {
      MOFU: mergeList(current.frameworks.MOFU, imported.frameworks?.MOFU),
      BOFU: mergeList(current.frameworks.BOFU, imported.frameworks?.BOFU),
    },
    ctas: {
      TOFU: mergeList(current.ctas.TOFU, imported.ctas?.TOFU),
      MOFU: mergeList(current.ctas.MOFU, imported.ctas?.MOFU),
      BOFU: mergeList(current.ctas.BOFU, imported.ctas?.BOFU),
    },
  };
}

// A categorized question set per grid — for the buyer to think through themselves,
// not an AI prompt. They can either write their own answers straight into the grid
// cells, or copy their answers into an AI tool if they'd rather have it suggest terms.
export function buildQuestionSet(kind) {
  if (kind === 'terminology') {
    return `Core Identity & Signature Approach
- What's your signature framework or step-by-step process for getting clients results?
- What outcome or transformation do you want to be known for?
- What core method or philosophy sets you apart from the standard approach in your field?

Lead Acquisition & Market Attraction
- What do you use to turn strangers into prospects (e.g. consultation, free audit, lead magnet)?
- What problem or desire first makes someone start searching for your service?
- What terms or phrases do prospects search for when looking for help like yours?

Core Value & Product Offerings
- What are your main packages or signature services called?
- What tangible result or system do clients walk away with?
- What's a lighter or mid-tier option you offer besides your main service?

Client Retention & Lifetime Value
- What long-term benefit do clients get from staying with you?
- What recurring service keeps clients engaged after their first problem is solved?
- What costly mistake or risk do you help clients avoid over time?`;
  }
  return `Demographics & Stage of Life/Business
- What distinct groups of people or businesses buy from you?
- What life or business milestone are they going through right now?

Core Needs & Pain Points
- What's the #1 urgent problem driving this group to look for a solution?
- What outcome do they value most: speed, cost savings, safety, prestige?

Customization & Positioning
- How does your offer need to be tailored or explained differently for this group?
- What objection does this group raise that your other customers usually don't?`;
}

// Paired with the downloaded grid PNG, not standalone — the AI reads Grid 1/Grid 2
// off the attached image, so this text never needs to spell the 8x8 values out itself.
export function buildTopicGenerationPrompt({ identity }) {
  return `I need you to act as an expert content strategist. Create a matrix of 64 highly targeted social media content topics tailored specifically to my brand.

---

### **Brand Positioning & Context**
${buildIdentityBlock(identity)}

---

### **Output Requirements**
1. **Systematic Intersections:** Pair every single item from **Grid 1** with every item from **Grid 2** to produce exactly **64 unique combinations** (8 x 8 matrix).
2. **Actionable Content Titles:** Do not just output raw keyphrases. Translate each intersection into a high-converting social media post topic or video title tailored to my brand positioning.
3. **Tailored Angle:** Ensure each topic addresses a specific pain point, goal, or perspective unique to that target audience segment while incorporating the chosen terminology naturally.
4. **Structured Format:** Deliver the 64 topics in a clean table or numbered list with the following details for each:
   - **Topic #** (1 to 64)
   - **Terminology Used** (Grid 1 item)
   - **Target Audience** (Grid 2 item)
   - **Post/Video Content Title**
   - **Core Angle / Key Takeaway** (1 short sentence)`;
}

const GRID_COLORS = {
  cell: '#141414',
  cellBorder: '#2d2d2d',
  center: '#D6193D',
  text: '#ffffff',
  centerText: '#ffffff',
  title: '#D6193D',
  background: '#000000',
};

function wrapCanvasText(ctx, text, maxWidth) {
  const words = String(text).split(/\s+/).filter(Boolean);
  const lines = [];
  let current = '';
  words.forEach((word) => {
    const test = current ? `${current} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  });
  if (current) lines.push(current);
  return lines;
}

function drawGrid(ctx, { x, y, width, title, centerLabel, values }) {
  ctx.fillStyle = GRID_COLORS.title;
  ctx.font = 'bold 30px "Space Grotesk", sans-serif';
  ctx.textBaseline = 'top';
  ctx.fillText(title, x, y);

  const gridTop = y + 50;
  const gap = 14;
  const cellW = (width - gap * 2) / 3;
  const cellH = 130;
  const cellsOrder = [0, 1, 2, 3, 'center', 4, 5, 6, 7];

  cellsOrder.forEach((cell, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const cx = x + col * (cellW + gap);
    const cy = gridTop + row * (cellH + gap);
    const isCenter = cell === 'center';

    ctx.fillStyle = isCenter ? GRID_COLORS.center : GRID_COLORS.cell;
    ctx.strokeStyle = GRID_COLORS.cellBorder;
    ctx.lineWidth = 1;
    const radius = 12;
    ctx.beginPath();
    ctx.moveTo(cx + radius, cy);
    ctx.arcTo(cx + cellW, cy, cx + cellW, cy + cellH, radius);
    ctx.arcTo(cx + cellW, cy + cellH, cx, cy + cellH, radius);
    ctx.arcTo(cx, cy + cellH, cx, cy, radius);
    ctx.arcTo(cx, cy, cx + cellW, cy, radius);
    ctx.closePath();
    ctx.fill();
    if (!isCenter) ctx.stroke();

    ctx.fillStyle = isCenter ? GRID_COLORS.centerText : GRID_COLORS.text;
    ctx.font = isCenter ? 'bold 16px "Space Grotesk", sans-serif' : '15px Nunito, sans-serif';
    ctx.textAlign = 'center';
    const label = isCenter ? centerLabel || 'Your business' : values[cell] || `Category ${cell + 1}`;
    const lines = wrapCanvasText(ctx, label, cellW - 24);
    const lineHeight = 20;
    const startY = cy + cellH / 2 - (lines.length * lineHeight) / 2;
    lines.forEach((line, li) => {
      ctx.fillText(line, cx + cellW / 2, startY + li * lineHeight);
    });
    ctx.textAlign = 'left';
  });

  return gridTop + 3 * cellH + 2 * gap;
}

export function exportGridsAsPNG({ terminology, audience, businessName, filename = 'my-content-grids.png' }) {
  const canvas = document.createElement('canvas');
  const width = 1000;
  const padding = 40;
  canvas.width = width;
  canvas.height = 1120;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = GRID_COLORS.background;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let cursorY = padding;
  cursorY = drawGrid(ctx, {
    x: padding,
    y: cursorY,
    width: width - padding * 2,
    title: 'Grid 1: Industry Terminology',
    centerLabel: businessName || 'Your business',
    values: terminology,
  });

  cursorY += 40;
  drawGrid(ctx, {
    x: padding,
    y: cursorY,
    width: width - padding * 2,
    title: 'Grid 2: Target Customer Types',
    centerLabel: businessName || 'Your business',
    values: audience,
  });

  canvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 'image/png');
}
