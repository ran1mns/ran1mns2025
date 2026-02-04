// offres-simple.js - Version ultra-minimaliste

document.addEventListener("DOMContentLoaded", function () {
  // Animation simple des sections
  const sections = document.querySelectorAll("section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 },
  );

  sections.forEach((section) => {
    observer.observe(section);
  });

  // Bouton retour - gestion de fallback si pas d'historique
  const backButton = document.querySelector(".back-button");
  if (backButton) {
    backButton.addEventListener("click", function (e) {
      if (history.length <= 1) {
        e.preventDefault();
        // Redirection vers une page par défaut si pas d'historique
        window.location.href = "../index.html";
      }
    });
  }
});
