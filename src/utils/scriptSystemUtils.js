import { BUSINESS_TYPES, FRAMEWORKS, TOFU_ANGLES, STAGES, STAGE_INFO } from '../data/scriptSystemData';

function frameworkNameFor(stage, index) {
  if (stage === 'TOFU') return TOFU_ANGLES[index % TOFU_ANGLES.length].name;
  return FRAMEWORKS[stage][index % FRAMEWORKS[stage].length].name;
}

export const DEFAULT_IDENTITY = { business: '', audience: '', promise: '', tone: '' };

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
Core promise/transformation: ${form.promise || '[what result you help them get]'}
Tone of voice: ${form.tone || '[your tone, e.g. warm and direct]'}`;
}

// The example lines shown in the hook/angle picker are illustrations of the strategy
// for the user's own understanding — they're not written for this buyer's business, so
// the final prompt describes the *strategy* instead of injecting that unrelated text.
export function buildHookStrategyLine({ stage, hookName, hookDesc, hookPsychology, hookApplication }) {
  if (stage === 'TOFU') return `Angle: ${hookName} — ${hookDesc}`;
  return `Hook strategy (${hookName}): ${hookPsychology} ${hookApplication}`;
}

export function buildScriptPrompt({ identity, topic, stage, hookStrategyLine, format, framework, ctaText }) {
  if (stage === 'TOFU') {
    return `Using the following brand identity, write short-form content.

${buildIdentityBlock(identity)}

Topic: ${topic || '[your topic from Step 2]'}
Content stage: TOFU — ${STAGE_INFO.TOFU.desc}
Format: ${format.name}
${hookStrategyLine}
Call to action: "${ctaText}"

${format.writingInstruction} Match the tone of voice above.`;
  }

  return `Using the following brand identity, write a short-form video script.

${buildIdentityBlock(identity)}

Topic: ${topic || '[your topic from Step 2]'}
Content stage: ${stage} — ${STAGE_INFO[stage].desc}
${hookStrategyLine}
Script framework: ${framework.name} — ${framework.desc}
Call to action: "${ctaText}"

Write the full script (hook, body, CTA) in a natural spoken style that matches the tone of voice above. Keep it tight enough for a 30-60 second short-form video.`;
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
        `SUMMARY:Day ${d.day} — ${d.stage} ${d.format} (${d.framework})`,
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

export function buildTopicGenerationPrompt({ identity, terminology, audience, businessTypeKey }) {
  const ratio = BUSINESS_TYPES[businessTypeKey].ratio;
  const listOrPlaceholder = (arr, label) =>
    (arr.some((v) => v.trim()) ? arr : Array(8).fill(`[${label}]`))
      .map((v, i) => `${i + 1}. ${v || `[${label} ${i + 1}]`}`)
      .join('\n');

  return `${buildIdentityBlock(identity)}

I use a 9-square grid method to plan content. Here are my two grids:

Grid 1 — Industry terminology relevant to my business:
${listOrPlaceholder(terminology, 'terminology')}

Grid 2 — My 8 main target customer/client types:
${listOrPlaceholder(audience, 'audience type')}

For each of the 8 target customer types, generate 8 short-form video topic ideas (64 total) that connect to the terminology above and speak directly to that audience's situation.

Then classify every topic as TOFU, MOFU, or BOFU using these definitions:
- TOFU: Attract attention and reach new people who may not know my business.
- MOFU: Build interest, trust, and understanding.
- BOFU: Help the right people make a buying decision.

Aim for roughly this content ratio overall: TOFU ${ratio.TOFU}% / MOFU ${ratio.MOFU}% / BOFU ${ratio.BOFU}%.

Output as a table: Target customer type | Topic | Stage (TOFU/MOFU/BOFU).`;
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
    title: 'Grid 1 — Industry Terminology',
    centerLabel: businessName || 'Your business',
    values: terminology,
  });

  cursorY += 40;
  drawGrid(ctx, {
    x: padding,
    y: cursorY,
    width: width - padding * 2,
    title: 'Grid 2 — Target Customer Types',
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
