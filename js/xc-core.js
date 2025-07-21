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

/**
 * Scale an element’s font-size so its text exactly fills the parent’s width.
 * @param {HTMLElement} el       – the text element to scale
 * @param {number}      padding  – px padding on left+right inside parent
 * @param {number}      baseSize – an arbitrary large font-size to start from
 * @returns {() => void}         – call this after el.textContent changes
 */
export function fitTextWidth(el, padding = 0, baseSize = 100) {
  const parent = el.parentElement;

  function resize() {
    const availW = parent.getBoundingClientRect().width - 2 * padding;
    // 1) set a known large size to measure the “natural” width
    el.style.fontSize = `${baseSize}px`;
    // 2) measure that width
    const textW = el.getBoundingClientRect().width;
    if (textW === 0) return;
    // 3) compute the scale factor and apply
    const newSize = baseSize * (availW / textW);
    el.style.fontSize = `${newSize}px`;
  }

  // automatically re-run on parent resize
  new ResizeObserver(resize).observe(parent);
  // return so you can manually re-run after changing text
  return resize;
}