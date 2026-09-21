import { useState } from 'react';
import { useLocalState } from './useLocalState';
import { BUSINESS_TYPES } from '../../data/scriptSystemData';
import {
  generateCalendar,
  calendarToCSV,
  calendarToICS,
  downloadTextFile,
} from '../../utils/scriptSystemUtils';

function tomorrowISODate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

function parseLocalDate(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export default function BonusCalendar() {
  const [businessType] = useLocalState('ss_businessType', 'service');
  const [postsPerWeek, setPostsPerWeek] = useState(5);
  const [startDate, setStartDate] = useState(tomorrowISODate());
  const [days, setDays] = useState(null);

  const handleGenerate = () => {
    setDays(generateCalendar({ businessTypeKey: businessType, postsPerWeek }));
  };

  const updateDay = (day, patch) => {
    setDays((prev) => prev.map((d) => (d.day === day ? { ...d, ...patch } : d)));
  };

  const handleDownloadCSV = () => {
    if (!days) return;
    downloadTextFile(calendarToCSV(days), 'my-60-day-content-calendar.csv');
  };

  const handleDownloadICS = () => {
    if (!days) return;
    downloadTextFile(
      calendarToICS(days, parseLocalDate(startDate)),
      'my-60-day-content-calendar.ics',
      'text/calendar;charset=utf-8;'
    );
  };

  return (
    <div className="ss-step">
      <h2>Bonus — Your First 60-Day Calendar</h2>
      <p className="ss-step-intro">
        Generates a 60-day posting rhythm using your business type&apos;s ratio (
        {BUSINESS_TYPES[businessType].label}: {BUSINESS_TYPES[businessType].ratio.TOFU}/
        {BUSINESS_TYPES[businessType].ratio.MOFU}/{BUSINESS_TYPES[businessType].ratio.BOFU}),
        batched by week instead of random, so you don&apos;t burn out. Drop in your own topics from
        Step 2 as you go.
      </p>

      <div className="ss-cheatsheet-block">
        <h3 className="ss-grid9-title">Quick Reference Cheat Sheet</h3>
        <p className="ss-step-intro">
          A one-page summary of TOFU/MOFU/BOFU, the content ratios, and every psychology hook
          category &mdash; save it to your phone or print it for a glance-able reminder.
        </p>
        <a
          className="ss-btn ss-btn-outline"
          href="/downloads/strategic-script-system-cheatsheet.pdf"
          download
        >
          Download the Cheat Sheet (PDF)
        </a>
      </div>

      <div className="ss-field">
        <label>How many days a week do you want to post?</label>
        <select value={postsPerWeek} onChange={(e) => setPostsPerWeek(Number(e.target.value))}>
          <option value={3}>3 days a week</option>
          <option value={5}>5 days a week</option>
          <option value={7}>7 days a week</option>
        </select>
      </div>

      <div className="ss-field">
        <label>When do you want to start?</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </div>

      <button className="ss-btn" onClick={handleGenerate} type="button">
        Generate my 60-day calendar
      </button>

      {days && (
        <>
          <p className="ss-hint">
            Type, Stage, and Framework here are starting suggestions, not fixed rules &mdash; once
            you download this, change anything to fit your actual content plan and business
            direction.
          </p>
          <div className="ss-table-wrap">
            <table className="ss-table">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Type</th>
                  <th>Stage</th>
                  <th>Suggested framework</th>
                  <th>Your topic</th>
                </tr>
              </thead>
              <tbody>
                {days.map((d) => (
                  <tr key={d.day} className={d.kind === 'rest' ? 'ss-row-rest' : ''}>
                    <td>{d.day}</td>
                    <td>{d.kind === 'post' ? d.format : ''}</td>
                    <td>{d.stage || '—'}</td>
                    <td>{d.framework || '—'}</td>
                    <td>
                      {d.kind === 'post' && (
                        <input
                          type="text"
                          className="ss-table-input"
                          value={d.topicText}
                          onChange={(e) => updateDay(d.day, { topicText: e.target.value })}
                          placeholder="Your topic"
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="ss-export-row">
            <button className="ss-btn ss-btn-outline" onClick={handleDownloadICS} type="button">
              Download as Calendar (.ics)
            </button>
            <button className="ss-btn ss-btn-outline" onClick={handleDownloadCSV} type="button">
              Download as CSV
            </button>
          </div>
        </>
      )}
    </div>
  );
}
