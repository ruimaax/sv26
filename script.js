const bg     = document.getElementById('heartsBg');
const emojis = ['❤️','💕','💖','💗','💓','🌸','✨','💝'];

for (let i = 0; i < 24; i++) {
  const h = document.createElement('span');
  h.className = 'heart-float';
  h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  h.style.left            = Math.random() * 100 + 'vw';
  h.style.animationDuration = (6 + Math.random() * 10) + 's';
  h.style.animationDelay    = (-Math.random() * 12) + 's';
  h.style.fontSize          = (1 + Math.random() * 1.5) + 'rem';
  bg.appendChild(h);
}

const btnNo   = document.getElementById('btnNo');
const fleeMsg = document.getElementById('flee-msg');
let noSize     = 16;
let escapeCount = 0;
let fleeMsgTimer = null;

function placeNoBtn() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  btnNo.style.left = (w / 2 + 100) + 'px';
  btnNo.style.top  = (h / 2 + 60)  + 'px';
}
placeNoBtn();
window.addEventListener('resize', placeNoBtn);

function teleportNo() {
  const margin = 80;
  const btnW   = btnNo.offsetWidth  || 120;
  const btnH   = btnNo.offsetHeight || 50;
  const maxX   = window.innerWidth  - btnW - margin;
  const maxY   = window.innerHeight - btnH - margin;
  const newX   = margin + Math.random() * maxX;
  const newY   = margin + Math.random() * maxY;

  btnNo.style.left = newX + 'px';
  btnNo.style.top  = newY + 'px';

  escapeCount++;
  noSize = Math.max(8, 16 - escapeCount * 0.8);
  btnNo.style.fontSize = noSize + 'px';
  btnNo.style.opacity  = Math.max(0.3, 1 - escapeCount * 0.06);

  fleeMsg.style.opacity = '1';
  clearTimeout(fleeMsgTimer);
  fleeMsgTimer = setTimeout(() => fleeMsg.style.opacity = '0', 1500);
}

document.addEventListener('mousemove', (e) => {
  const rect = btnNo.getBoundingClientRect();
  const cx   = rect.left + rect.width  / 2;
  const cy   = rect.top  + rect.height / 2;
  const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
  if (dist < 90) teleportNo();
});

document.addEventListener('touchmove', (e) => {
  const t    = e.touches[0];
  const rect = btnNo.getBoundingClientRect();
  const cx   = rect.left + rect.width  / 2;
  const cy   = rect.top  + rect.height / 2;
  const dist = Math.hypot(t.clientX - cx, t.clientY - cy);
  if (dist < 100) teleportNo();
}, { passive: true });

btnNo.addEventListener('click', teleportNo);
btnNo.addEventListener('touchstart', (e) => {
  e.preventDefault();
  teleportNo();
}, { passive: false });

function showLove() {
  document.getElementById('screen1').style.display = 'none';
  btnNo.style.display   = 'none';
  fleeMsg.style.display = 'none';

  const s2 = document.getElementById('screen2');
  s2.style.display = 'flex';

  launchConfetti();
}

function launchConfetti() {
  const container = document.getElementById('confettiContainer');
  const colors    = ['#ff6b9d','#ff2d55','#ffe066','#ff9de2','#c084fc','#67e8f9'];
  const shapes    = ['❤️','💕','⭐','✨','🌸'];

  for (let i = 0; i < 80; i++) {
    setTimeout(() => {
      const p = document.createElement('span');
      p.className = 'confetti-piece';
      p.textContent = Math.random() > 0.5
        ? shapes[Math.floor(Math.random() * shapes.length)]
        : '■';
      p.style.left              = Math.random() * 100 + 'vw';
      p.style.fontSize          = (10 + Math.random() * 16) + 'px';
      p.style.color             = colors[Math.floor(Math.random() * colors.length)];
      p.style.animationDuration = (2 + Math.random() * 3) + 's';
      p.style.animationDelay    = '0s';
      container.appendChild(p);
      setTimeout(() => p.remove(), 5000);
    }, i * 40);
  }
}
