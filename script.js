  window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  function openAbout() {
    document.getElementById("aboutModal").style.display = "block";
  }

  function closeAbout() {
    document.getElementById("aboutModal").style.display = "none";
  }

  // Optional: Close modal when clicking outside of it
  window.onclick = function(event) {
    const modal = document.getElementById("aboutModal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  }

  function openAbout() {
    document.getElementById("aboutModal").style.display = "block";
  }

  function closeAbout() {
    document.getElementById("aboutModal").style.display = "none";
  }

  window.onclick = function(event) {
    const modal = document.getElementById("aboutModal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };




  