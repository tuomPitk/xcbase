import { safeGetLocation, throttle } from '../../js/xc-core.js';

const out = document.getElementById('out');

function render() {
  const ts = new Date().toLocaleTimeString();
  const loc = safeGetLocation();
  out.textContent = loc
    ? `Time: ${ts}\n${JSON.stringify(loc, null, 2)}`
    : `Time: ${ts}\nXCTrack.getLocation() unavailable.\nCheck permissions.`;
}

render();                        // first paint
setInterval(throttle(render, 1000), 1000);
