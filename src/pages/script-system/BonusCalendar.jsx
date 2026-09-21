import { useState } from 'react';
import { useLocalState } from './useLocalState';
import { BUSINESS_TYPES } from '../../data/scriptSystemData';
import { generateCalendar, calendarToCSV, calendarToICS, downloadTextFile } from '../../utils/scriptSystemUtils';

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
                  <tr key={d.day} className={d.type === 'rest' ? 'ss-row-rest' : ''}>
                    <td>{d.day}</td>
                    <td>{d.type === 'rest' ? 'Rest / engage' : 'Post'}</td>
                    <td>{d.stage || '—'}</td>
                    <td>{d.framework || '—'}</td>
                    <td className="ss-fillin">fill in</td>
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
