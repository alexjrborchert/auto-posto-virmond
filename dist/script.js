// Números de WhatsApp de cada setor. Para trocar um número, altere só aqui:
// todos os botões da página usam esta configuração.
const WHATSAPP = {
  posto: { numero: '5542999386409', mensagem: 'Olá! Vim pelo site do Auto Posto Virmond.' },
  restaurante: { numero: '5542991557249', mensagem: 'Olá! Vim pelo site do Restaurante Cantagalo e quero saber o cardápio de hoje.' },
};

const header = document.querySelector('.site-header');
const progress = document.querySelector('.scroll-progress');
const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function onScroll() {
  const scrollTop = window.scrollY || 0;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  header.classList.toggle('is-scrolled', scrollTop > 40);
  progress.style.width = `${maxScroll > 0 ? Math.min(100, (scrollTop / maxScroll) * 100) : 0}%`;
}

let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => { onScroll(); ticking = false; });
    ticking = true;
  }
}, { passive: true });
onScroll();

if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .1, rootMargin: '0px 0px -25px 0px' });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('visible'));
}

function setMenu(open) {
  mobileMenu.hidden = !open;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  document.body.classList.toggle('menu-open', open);
}
menuButton.addEventListener('click', () => setMenu(mobileMenu.hidden));
mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !mobileMenu.hidden) {
    setMenu(false);
    menuButton.focus();
  }
});

// WhatsApp: links, rastreamento e escolha de setor.
const params = new URLSearchParams(window.location.search);

function whatsappUrl(setor) {
  const { numero, mensagem } = WHATSAPP[setor];
  const campanha = params.get('utm_campaign');
  const texto = campanha ? `${mensagem} [ref: ${campanha}]` : mensagem;
  return `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
}

function trackWhatsApp(setor, origem) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'whatsapp_click', setor, origem });
  if (typeof window.fbq === 'function') window.fbq('track', 'Contact', { content_name: setor, content_category: origem });
  if (typeof window.gtag === 'function') window.gtag('event', 'generate_lead', { setor, origem });
}

document.querySelectorAll('a[data-wa]').forEach((link) => {
  if (!(link.dataset.wa in WHATSAPP)) return;
  link.href = whatsappUrl(link.dataset.wa);
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
});

const sheet = document.getElementById('wa-sheet');

document.addEventListener('click', (event) => {
  const link = event.target.closest('a[data-wa]');
  if (!link || !(link.dataset.wa in WHATSAPP)) return;
  const origem = link.dataset.origem || (link.closest('footer') ? 'rodape' : link.closest('[id]')?.id) || 'pagina';
  trackWhatsApp(link.dataset.wa, origem);
  if (sheet?.open) sheet.close();
});

// Com ?setor=posto ou ?setor=restaurante no link do anúncio, o botão vai direto
// para o setor da campanha; sem o parâmetro, abre a escolha entre os dois.
const setorCampanha = params.get('setor');
document.querySelectorAll('[data-wa-open]').forEach((button) => {
  button.addEventListener('click', () => {
    const origem = button.dataset.origem || 'pagina';
    if (setorCampanha in WHATSAPP) {
      trackWhatsApp(setorCampanha, origem);
      window.open(whatsappUrl(setorCampanha), '_blank', 'noopener');
      return;
    }
    sheet.querySelectorAll('a[data-wa]').forEach((link) => { link.dataset.origem = origem; });
    sheet.showModal();
  });
});

// Botão flutuante: aparece só depois que o botão de WhatsApp da capa sai da tela.
const floatButton = document.querySelector('.wa-float');
const heroButton = document.querySelector('.hero-actions [data-wa-open]');
if (floatButton && heroButton && 'IntersectionObserver' in window) {
  new IntersectionObserver(([entry]) => {
    floatButton.classList.toggle('is-visible', !entry.isIntersecting);
  }).observe(heroButton);
} else {
  floatButton?.classList.add('is-visible');
}

sheet?.querySelector('.wa-sheet-close').addEventListener('click', () => sheet.close());
sheet?.addEventListener('click', (event) => { if (event.target === sheet) sheet.close(); });

// Selo "Aberto agora / Fechado" calculado no horário de Brasília.
function brasiliaNow() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Sao_Paulo', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
  }).formatToParts(new Date());
  const get = (type) => parts.find((part) => part.type === type).value;
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  return { day, minutes: Number(get('hour')) * 60 + Number(get('minute')) };
}

function toMinutes(time) {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

function updateOpenStatus() {
  let now;
  try { now = brasiliaNow(); } catch { return; }
  document.querySelectorAll('[data-hours]').forEach((card) => {
    const status = card.querySelector('.open-status');
    const today = JSON.parse(card.dataset.hours)[now.day];
    const open = Boolean(today) && now.minutes >= toMinutes(today[0]) && now.minutes < toMinutes(today[1]);
    status.textContent = open ? 'Aberto agora' : 'Fechado agora';
    status.classList.toggle('is-open', open);
    status.classList.toggle('is-closed', !open);
  });
}
updateOpenStatus();
setInterval(updateOpenStatus, 60000);
