// js/xc-core.js  (ES-module, no bundler needed)
export function safeGetLocation() {
  if (typeof XCTrack?.getLocation === 'function') {
    try { return JSON.parse(XCTrack.getLocation()); }
    catch (e) { console.warn('XCTrack JSON parse err', e); }
  }
  return null;
}

export function throttle(fn, ms = 250) {
  let prev = 0;
  return (...args) => {
    const now = performance.now();
    if (now - prev > ms) { prev = now; fn(...args); }
  };
}

export const m2ft = m => m * 3.28084;
export const kmh2kt = k => k * 0.539957;

export function humanAlt(val, units = 'm') {
  return units === 'ft' ? `${Math.round(m2ft(val))} ft`
                        : `${Math.round(val)} m`;
}
