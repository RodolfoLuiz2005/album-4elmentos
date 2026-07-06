const waBase = 'https://wa.me/5511999999999';

const galleryImages = [
  './assets/g1.jpg',
  './assets/g2.jpg',
  './assets/g3.jpg',
  './assets/g4.jpg',
  './assets/g5.jpg',
  './assets/g6.jpg',
];

const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox?.querySelector('img');
const lightboxCounter = lightbox?.querySelector('.lightbox-counter');
const galleryCards = Array.from(document.querySelectorAll('.gallery-card'));
let galleryIndex = 0;

const setLightboxImage = (index) => {
  if (!lightboxImg || !lightboxCounter) return;
  galleryIndex = (index + galleryImages.length) % galleryImages.length;
  lightboxImg.src = galleryImages[galleryIndex];
  lightboxImg.alt = `Foto ${galleryIndex + 1} da galeria`;
  lightboxCounter.textContent = `${galleryIndex + 1}/${galleryImages.length}`;
};

const openLightbox = (index) => {
  setLightboxImage(index);
  lightbox?.classList.add('is-open');
  lightbox?.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
  lightbox?.classList.remove('is-open');
  lightbox?.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

galleryCards.forEach((card) => {
  card.addEventListener('click', () => openLightbox(Number(card.dataset.index || 0)));
});

document.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
document.querySelector('.lightbox-prev')?.addEventListener('click', () => setLightboxImage(galleryIndex - 1));
document.querySelector('.lightbox-next')?.addEventListener('click', () => setLightboxImage(galleryIndex + 1));

lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (event) => {
  if (lightbox?.classList.contains('is-open')) {
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowRight') setLightboxImage(galleryIndex + 1);
    if (event.key === 'ArrowLeft') setLightboxImage(galleryIndex - 1);
  }
});

let touchStartX = 0;
let touchEndX = 0;

lightbox?.addEventListener('touchstart', (event) => {
  touchStartX = event.changedTouches[0].screenX;
}, { passive: true });

lightbox?.addEventListener('touchend', (event) => {
  touchEndX = event.changedTouches[0].screenX;
  const delta = touchEndX - touchStartX;
  if (delta > 60) setLightboxImage(galleryIndex - 1);
  if (delta < -60) setLightboxImage(galleryIndex + 1);
}, { passive: true });

const teacherModal = document.getElementById('teacherModal');
const modalImg = teacherModal?.querySelector('.modal-image');
const modalRole = teacherModal?.querySelector('.modal-role');
const modalName = teacherModal?.querySelector('h3');
const modalBio = teacherModal?.querySelector('.modal-bio');
const modalExperience = teacherModal?.querySelector('.modal-experience');
const modalTags = teacherModal?.querySelector('.modal-tags');
const modalWa = teacherModal?.querySelector('.wa-link');
const modalInstagram = teacherModal?.querySelector('.modal-instagram');

const openTeacherModal = (button) => {
  if (!teacherModal || !modalImg || !modalRole || !modalName || !modalBio || !modalExperience || !modalTags || !modalWa || !modalInstagram) return;

  modalImg.src = button.dataset.image || '';
  modalImg.alt = button.dataset.name || '';
  modalRole.textContent = button.dataset.role || '';
  modalName.textContent = button.dataset.name || '';
  modalBio.textContent = button.dataset.bio || '';
  modalExperience.textContent = button.dataset.experience || '';
  modalTags.innerHTML = (button.dataset.tags || '')
    .split(',')
    .map((tag) => `<span>${tag.trim()}</span>`)
    .join('');
  modalWa.href = button.dataset.wa || `${waBase}?text=Quero%20saber%20mais%20sobre%20a%204%20Elementos%20FTV.`;
  modalInstagram.href = button.dataset.instagram || 'https://instagram.com/4elementosftv';

  teacherModal.classList.add('is-open');
  teacherModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

const closeTeacherModal = () => {
  teacherModal?.classList.remove('is-open');
  teacherModal?.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

document.querySelectorAll('.teacher-card').forEach((card) => {
  card.addEventListener('click', () => openTeacherModal(card));
});

document.querySelector('.modal-close')?.addEventListener('click', closeTeacherModal);
teacherModal?.addEventListener('click', (event) => {
  if (event.target === teacherModal) closeTeacherModal();
});

document.addEventListener('keydown', (event) => {
  if (teacherModal?.classList.contains('is-open') && event.key === 'Escape') closeTeacherModal();
});

const faqItems = Array.from(document.querySelectorAll('.faq-item'));
faqItems.forEach((item) => {
  const button = item.querySelector('.faq-question');
  button?.addEventListener('click', () => {
    const isOpen = item.classList.contains('is-open');
    faqItems.forEach((entry) => {
      entry.classList.remove('is-open');
      const entryButton = entry.querySelector('.faq-question');
      entryButton?.setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      item.classList.add('is-open');
      button.setAttribute('aria-expanded', 'true');
    }
  });
});

document.querySelectorAll('.wa-link').forEach((link) => {
  link.addEventListener('click', (event) => {
    const fallback = 'Quero%20saber%20mais%20sobre%20a%204%20Elementos%20FTV.';
    const message = encodeURIComponent(link.getAttribute('href')?.split('?text=')[1] || fallback);
    const href = `${waBase}?text=${message}`;
    link.setAttribute('href', href);
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReducedMotion) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    },
    { threshold: 0.16 }
  );

  document.querySelectorAll('.reveal').forEach((section) => observer.observe(section));
} else {
  document.querySelectorAll('.reveal').forEach((section) => section.classList.add('is-visible'));
}
