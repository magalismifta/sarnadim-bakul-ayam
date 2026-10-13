// Sarnadim Bakul Ayam - interaksi & animasi (tanpa library)

// Nomor WhatsApp: format internasional tanpa +, spasi, atau tanda hubung
const PHONE = "6282223103422";
const BUSINESS = "Sarnadim Bakul Ayam";

function orderWA(productName) {
  const message = `Halo ${BUSINESS}, saya berminat memesan *${productName}*. Mohon info ketersediaan stok dan pengiriman. Terima kasih.`;
  window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
}

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const progress = document.getElementById('progress');
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');

  // Scroll: navbar, progress bar
  const onScroll = () => {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 40);
    const h = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  const closeMenu = () => {
    navLinks.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  };
  burger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('in'));
  }

  // Count-up angka statistik
  const counters = document.querySelectorAll('[data-count]');
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = +el.dataset.count;
      const suffix = el.dataset.suffix || '';
      const start = performance.now();
      const dur = 1400;
      const tick = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      countIO.unobserve(el);
    });
  }, { threshold: 0.6 });
  counters.forEach(c => countIO.observe(c));

  // Foto gagal dimuat -> tampilkan emoji sebagai pengganti
  document.querySelectorAll('[data-emoji] img').forEach(img => {
    const fail = () => img.parentElement.classList.add('noimg');
    img.addEventListener('error', fail);
    if (img.complete && img.naturalWidth === 0) fail();
  });

  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (canHover && !reduce) {
    // Foto hero bergeser mengikuti kursor (parallax)
    const hv = document.getElementById('heroVisual');
    if (hv) {
      const layers = hv.querySelectorAll('.photo');
      window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5);
        const y = (e.clientY / window.innerHeight - 0.5);
        layers.forEach(l => {
          const d = +l.dataset.depth || 10;
          l.style.transform = `translate(${x * d}px, ${y * d}px)`;
        });
      });
    }

    // Kartu produk miring 3D saat disorot
    document.querySelectorAll('.tilt').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transition = 'box-shadow .4s';
        card.style.transform = `perspective(800px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg) translateY(-8px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform .6s cubic-bezier(.22,1,.36,1), box-shadow .4s';
        card.style.transform = '';
      });
    });
  }
});
