  window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // function openAbout() {
  //   document.getElementById("aboutModal").style.display = "block";
  // }

  // function closeAbout() {
  //   document.getElementById("aboutModal").style.display = "none";
  // }

  // // Optional: Close modal when clicking outside of it
  // window.onclick = function(event) {
  //   const modal = document.getElementById("aboutModal");
  //   if (event.target === modal) {
  //     modal.style.display = "none";
  //   }
  // }

  // function openAbout() {
  //   document.getElementById("aboutModal").style.display = "block";
  // }

  // function closeAbout() {
  //   document.getElementById("aboutModal").style.display = "none";
  // }

  // window.onclick = function(event) {
  //   const modal = document.getElementById("aboutModal");
  //   if (event.target === modal) {
  //     modal.style.display = "none";
  //   }
  // };

 const carousel = document.getElementById('carousel');
const cardWidth = 300 + 180; 
const totalCards = carousel.children.length;

let scrollPosition = 0;
let speed = 0.5; //scroll speed

function animateCarousel() {
  scrollPosition += speed;

  const maxScroll = (totalCards * cardWidth);

  // Reset loop
  if (scrollPosition >= maxScroll) {
    scrollPosition = 0;
  }

  carousel.style.transform = `translateX(${-scrollPosition}px)`;

  requestAnimationFrame(animateCarousel);
}

animateCarousel();

// Pause on hover
carousel.addEventListener('mouseenter', () => speed = 0);
carousel.addEventListener('mouseleave', () => speed = 0.5);

// Optional Buttons
const buttons = document.querySelectorAll('.carousel-btn');
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    
    speed = 0; 
    scrollPosition += (btn.classList.contains('prev') ? -cardWidth : cardWidth);
    
    // Bound check
    if(scrollPosition < 0) scrollPosition = (totalCards - 1) * cardWidth;
    if(scrollPosition >= totalCards * cardWidth) scrollPosition = 0;

    carousel.style.transform = `translateX(${-scrollPosition}px)`;

    // Resume scroll after short delay
    setTimeout(() => speed = 0.5, 2000);
  });
});
