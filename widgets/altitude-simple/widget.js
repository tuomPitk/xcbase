import { safeGetLocation, humanAlt, fitTextWidth } from '/js/xc-core.js';

const el    = document.getElementById('alt');
const fit   = fitTextWidth(el, /*padding*/ 16); // leave 8px either side
const units = new URLSearchParams(location.search).get('units') === 'ft'
              ? 'ft' : 'm';

function render() {
    const loc = safeGetLocation();
    el.textContent = loc?.altGps != null
                  ? humanAlt(loc.altGps, units)
                  : '---';
    console.log('container width:', el.parentElement.getBoundingClientRect().width);
    fit();   // recalc to fit the new string width
}

// initial paint + update every second
render();
setInterval(render, 200);
