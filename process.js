document.addEventListener("DOMContentLoaded", () => {
  const btnLeft = document.getElementById('btnLeft');
  const btnRight = document.getElementById('btnRight');
  const slides = document.querySelectorAll('.slide');

  let currentIndex = 0;

  function updateSlideDisplay() {
    slides.forEach((slide, index) => {
      slide.style.display = index === currentIndex ? 'flex' : 'none';
      slide.style.flexDirection = 'column'; 
      slide.style.alignItems = 'center';
    });
  }

  btnLeft.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlideDisplay();
    }
  });

  btnRight.addEventListener('click', () => {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
      updateSlideDisplay();
    }
  });

  updateSlideDisplay();
});