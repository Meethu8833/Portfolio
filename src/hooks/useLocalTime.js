import { useEffect, useState } from 'react';

/**
 * useLocalTime — a ticking clock in a fixed IANA timezone.
 *
 * Used for the "Kozhikode, Kerala · 21:04 IST" line in the hero: a small signal
 * that a real person in a real place maintains the site. The zone is passed in
 * (rather than read from the visitor's browser) because the point is *my* local
 * time, not theirs.
 *
 * Ticks once a minute — a seconds-hand would repaint 60× more for no gain.
 *
 * @param {string} timeZone  IANA zone name, e.g. 'Asia/Kolkata'.
 * @returns {{time: string, zone: string}} e.g. { time: '21:04', zone: 'GMT+5:30' }
 */
export function useLocalTime(timeZone = 'Asia/Kolkata') {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    // Align the first tick to the top of the next minute, then tick every 60s,
    // so the displayed minute never lags behind the real clock by up to a minute.
    let interval;
    const alignment = setTimeout(() => {
      setNow(new Date());
      interval = setInterval(() => setNow(new Date()), 60_000);
    }, (60 - new Date().getSeconds()) * 1000);

    return () => {
      clearTimeout(alignment);
      clearInterval(interval);
    };
  }, []);

  // 24-hour HH:MM in the target zone.
  const time = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(now);

  // Short zone label ("GMT+5:30"). `longOffset` is the widely supported way to
  // get the numeric offset; we strip the redundant "GMT" padding it emits.
  const zone =
    new Intl.DateTimeFormat('en-GB', { timeZone, timeZoneName: 'longOffset' })
      .formatToParts(now)
      .find((p) => p.type === 'timeZoneName')?.value ?? '';

  return { time, zone };
}
