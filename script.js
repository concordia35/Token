(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems = document.querySelectorAll('.reveal');

  if (!reducedMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1 });

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('visible'));
  }

  const slides = [...document.querySelectorAll('.slide')];
  const dots = [...document.querySelectorAll('.dot')];
  const previousButton = document.querySelector('.slide-btn.prev');
  const nextButton = document.querySelector('.slide-btn.next');

  if (!slides.length) return;

  let currentSlide = 0;
  let slideTimer = null;

  const showSlide = (index) => {
    currentSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('is-active', slideIndex === currentSlide);
    });

    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === currentSlide;
      dot.classList.toggle('is-active', isActive);
      dot.toggleAttribute('aria-current', isActive);
    });
  };

  const stopTimer = () => {
    if (slideTimer !== null) {
      window.clearInterval(slideTimer);
      slideTimer = null;
    }
  };

  const startTimer = () => {
    stopTimer();
    if (reducedMotion || document.hidden) return;
    slideTimer = window.setInterval(() => showSlide(currentSlide + 1), 5500);
  };

  const changeSlide = (offset) => {
    showSlide(currentSlide + offset);
    startTimer();
  };

  previousButton?.addEventListener('click', () => changeSlide(-1));
  nextButton?.addEventListener('click', () => changeSlide(1));

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      startTimer();
    });
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopTimer();
    else startTimer();
  });

  showSlide(0);
  startTimer();
})();
