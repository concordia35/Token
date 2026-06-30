const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.10 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

const slides = Array.from(document.querySelectorAll('.slide'));
const dots = Array.from(document.querySelectorAll('.dot'));
const prevButton = document.querySelector('.slide-btn.prev');
const nextButton = document.querySelector('.slide-btn.next');
let currentSlide = 0;
let slideTimer;

function showSlide(index) {
  if (!slides.length) return;
  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle('is-active', slideIndex === currentSlide);
  });
  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle('is-active', dotIndex === currentSlide);
  });
}

function startSlideTimer() {
  clearInterval(slideTimer);
  slideTimer = setInterval(() => showSlide(currentSlide + 1), 5500);
}

prevButton?.addEventListener('click', () => {
  showSlide(currentSlide - 1);
  startSlideTimer();
});

nextButton?.addEventListener('click', () => {
  showSlide(currentSlide + 1);
  startSlideTimer();
});

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    showSlide(index);
    startSlideTimer();
  });
});

showSlide(0);
startSlideTimer();
