/* =========================================
   CRISLINE'S 18TH BIRTHDAY — JavaScript
   Effects, Animations, Countdown, Photos
   ========================================= */

// ---- Wait for DOM ----
document.addEventListener('DOMContentLoaded', () => {
  initPetals();
  initSparkles();
  initScrollAnimations();
  initCountdown();
});

// ========================================
// FLOATING PETALS
// ========================================
function initPetals() {
  const container = document.getElementById('petalsContainer');
  const symbols = ['🌸', '🌹', '✨', '🌺', '💮', '🌷', '💫', '⭐', '🌸', '✨', '💫'];
  // More petals on mobile so they're clearly visible
  const count = 35;

  for (let i = 0; i < count; i++) {
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    const left     = Math.random() * 100;
    const duration = 7 + Math.random() * 12;
    const delay    = Math.random() * 10;
    const size     = 1.0 + Math.random() * 1.2;  // bigger for mobile visibility

    petal.style.cssText = `
      left: ${left}%;
      font-size: ${size}rem;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      opacity: 0.85;
    `;

    container.appendChild(petal);
  }
}

// ========================================
// SPARKLES
// ========================================
function initSparkles() {
  const container = document.getElementById('sparklesContainer');
  const count = 40;  // more sparkles

  for (let i = 0; i < count; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';

    const left     = Math.random() * 100;
    const top      = Math.random() * 100;
    const duration = 1.5 + Math.random() * 3;
    const delay    = Math.random() * 5;
    const size     = 5 + Math.random() * 9;  // bigger for mobile visibility
    const colors   = ['#f5dfa0', '#fce4ec', '#d4879a', '#d4a853', '#ffe4b5', '#ffcce0'];
    const color    = colors[Math.floor(Math.random() * colors.length)];

    sparkle.style.cssText = `
      left: ${left}%;
      top: ${top}%;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
    `;

    container.appendChild(sparkle);
  }
}

// ========================================
// SCROLL ANIMATIONS (Intersection Observer)
// ========================================
function initScrollAnimations() {
  const cards = document.querySelectorAll('.tribute-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card  = entry.target;
        const index = parseInt(card.getAttribute('data-index') || 0);
        // Stagger delay based on index (capped to avoid long waits)
        const delay = Math.min((index - 1) * 60, 800);

        setTimeout(() => {
          card.classList.add('visible');
        }, delay);

        observer.unobserve(card);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  cards.forEach(card => observer.observe(card));

  // Section headers fade in
  const headers = document.querySelectorAll('.section-header, .countdown-content');
  const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        headerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  headers.forEach(h => {
    h.style.opacity = '0';
    h.style.transform = 'translateY(20px)';
    h.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    headerObserver.observe(h);
  });
}

// ========================================
// COUNTDOWN TIMER
// ========================================
function initCountdown() {
  const eventDate = new Date('December 6, 2026 00:00:00');

  function update() {
    const now  = new Date();
    const diff = eventDate - now;

    if (diff <= 0) {
      // Birthday has arrived!
      document.getElementById('days').textContent    = '00';
      document.getElementById('hours').textContent   = '00';
      document.getElementById('minutes').textContent = '00';
      document.getElementById('seconds').textContent = '00';
      triggerBirthdayCelebration();
      return;
    }

    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    setCountdownValue('days',    days);
    setCountdownValue('hours',   hours);
    setCountdownValue('minutes', minutes);
    setCountdownValue('seconds', seconds);
  }

  function setCountdownValue(id, value) {
    const el     = document.getElementById(id);
    const newVal = String(value).padStart(2, '0');

    if (el.textContent !== newVal) {
      el.classList.remove('flip');
      void el.offsetWidth; // reflow
      el.classList.add('flip');
      el.textContent = newVal;
    }
  }

  update();
  setInterval(update, 1000);
}

// ========================================
// BIRTHDAY CELEBRATION EFFECT (when date arrives)
// ========================================
function triggerBirthdayCelebration() {
  const extra = ['🎉', '🎊', '🥳', '🎁', '🌹', '✨'];
  const container = document.getElementById('petalsContainer');

  for (let i = 0; i < 40; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'petal';
      el.textContent = extra[Math.floor(Math.random() * extra.length)];
      el.style.left = Math.random() * 100 + '%';
      el.style.fontSize = (1 + Math.random()) + 'rem';
      el.style.animationDuration = (4 + Math.random() * 4) + 's';
      el.style.animationDelay = '0s';
      container.appendChild(el);
      setTimeout(() => el.remove(), 8000);
    }, i * 150);
  }
}

// ========================================
// PHOTO UPLOAD HANDLER
// ========================================
function loadPhoto(input, slotId) {
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const slot = document.getElementById(slotId);
    const placeholder = slot.querySelector('.photo-placeholder');

    // Hide placeholder
    if (placeholder) {
      placeholder.style.display = 'none';
    }

    // Create or update image
    let img = slot.querySelector('img.uploaded-photo');
    if (!img) {
      img = document.createElement('img');
      img.className = 'uploaded-photo';
      img.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        border-radius: inherit;
        transition: transform 0.4s ease;
      `;
      slot.insertBefore(img, slot.querySelector('.photo-upload'));
    }
    img.src = e.target.result;
    img.alt = "Crisline's Photo";

    // Add hover zoom effect
    img.addEventListener('mouseenter', () => img.style.transform = 'scale(1.03)');
    img.addEventListener('mouseleave', () => img.style.transform = 'scale(1)');

    // Animate in
    img.style.opacity = '0';
    img.style.transform = 'scale(0.95)';
    setTimeout(() => {
      img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      img.style.opacity = '1';
      img.style.transform = 'scale(1)';
    }, 50);
  };

  reader.readAsDataURL(file);
}

// ========================================
// PARALLAX SUBTLE EFFECT ON HERO
// ========================================
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const hero    = document.querySelector('.hero-content');
  if (hero) {
    hero.style.transform = `translateY(${scrollY * 0.25}px)`;
    hero.style.opacity   = Math.max(0, 1 - scrollY / 500);
  }
}, { passive: true });

// ========================================
// NAV SMOOTH: Clicking nav items (if added later)
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ========================================
// MUSIC PLAYER — HTML5 Audio
// Uses local MP3 file, works offline too!
// ========================================
let musicPlaying = false;

function toggleMusic() {
  const audio = document.getElementById('bgMusic');
  const icon  = document.getElementById('musicIcon');
  const note  = document.getElementById('musicNote');
  const btn   = document.getElementById('musicBtn');
  const hint  = document.getElementById('musicHint');

  // Hide the hint permanently after first tap
  if (hint && !hint.classList.contains('hidden')) {
    hint.classList.add('hidden');
  }

  if (musicPlaying) {
    audio.pause();
    musicPlaying = false;
    icon.textContent = '\u25b6'; // ▶
    btn.classList.remove('playing');
    note.style.animationPlayState = 'paused';
  } else {
    audio.volume = 0.6;
    audio.play().catch(() => {});
    musicPlaying = true;
    icon.textContent = '\u23f8'; // ⏸
    btn.classList.add('playing');
    note.style.animationPlayState = 'running';
  }
}
(function initTrailEffects() {
  const trailEmojis = ['✨', '🌸', '💫', '⭐', '🌹', '🌺', '💮'];

  // Add keyframe dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes trailFade {
      0%   { opacity: 1; transform: translateY(0) scale(1); }
      100% { opacity: 0; transform: translateY(-30px) scale(0.4); }
    }
    @keyframes burstFade {
      0%   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
      100% { opacity: 0; transform: translate(-50%, -50%) scale(2); }
    }
  `;
  document.head.appendChild(style);

  function spawnEmoji(x, y) {
    const spark = document.createElement('div');
    spark.textContent = trailEmojis[Math.floor(Math.random() * trailEmojis.length)];
    spark.style.cssText = `
      position: fixed;
      left: ${x}px;
      top:  ${y}px;
      font-size: ${0.7 + Math.random() * 0.9}rem;
      pointer-events: none;
      z-index: 9999;
      animation: trailFade 1s ease forwards;
      user-select: none;
    `;
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 1000);
  }

  // ---- Mouse trail (desktop) ----
  document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.82) {
      spawnEmoji(e.clientX - 10, e.clientY - 10);
    }
  });

  // ---- Touch trail (mobile) ----
  document.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    if (Math.random() > 0.6) {  // spawn more frequently on touch
      spawnEmoji(touch.clientX - 10, touch.clientY - 10);
    }
  }, { passive: true });

  // ---- Touch tap burst (mobile) — tap anywhere for sparkle burst ----
  document.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    const count = 4 + Math.floor(Math.random() * 4);
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const angle = Math.random() * 2 * Math.PI;
        const dist  = 20 + Math.random() * 50;
        spawnEmoji(
          touch.clientX + Math.cos(angle) * dist - 10,
          touch.clientY + Math.sin(angle) * dist - 10
        );
      }, i * 60);
    }
  }, { passive: true });

  // ---- Auto-burst every 3s on mobile so effects show even without interaction ----
  const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ||
                   ('ontouchstart' in window);
  if (isMobile) {
    setInterval(() => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const burst = 6 + Math.floor(Math.random() * 5);
      for (let i = 0; i < burst; i++) {
        setTimeout(() => spawnEmoji(
          x + (Math.random() - 0.5) * 120,
          y + (Math.random() - 0.5) * 120
        ), i * 80);
      }
    }, 3000);
  }
})();
