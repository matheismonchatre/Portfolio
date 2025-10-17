// --- Menu Burger ---
const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

menuToggle.addEventListener("click", () => {
  menu.classList.toggle("active");
});

// Gestion sous-menus sur mobile
document.querySelectorAll(".dropdown > a").forEach(link => {
  link.addEventListener("click", e => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      link.parentElement.classList.toggle("active");
    }
  });
});

// --- Barres de compétences ---
document.addEventListener("DOMContentLoaded", () => {
    const niveaux = document.querySelectorAll(".niveau");
    niveaux.forEach(niveau => {
        const valeur = niveau.getAttribute("data-niveau");
        setTimeout(() => {
            niveau.style.width = valeur;
        }, 500);
    });
});

// --- Apparition au scroll ---
const sections = document.querySelectorAll("section");
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.2 });
sections.forEach(sec => observer.observe(sec));

// --- Scroll Top ---
const scrollTopBtn = document.getElementById("scrollTop");
window.addEventListener("scroll", () => {
    scrollTopBtn.style.display = window.scrollY > 200 ? "block" : "none";
});
scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// --- Changement de langue ---
const langBtn = document.getElementById("langBtn");
let currentLang = "fr";
langBtn.addEventListener("click", () => {
    currentLang = currentLang === "fr" ? "en" : "fr";
    langBtn.textContent = currentLang === "fr" ? "EN" : "FR";
    document.querySelectorAll("[data-fr]").forEach(el => {
        el.textContent = el.getAttribute("data-" + currentLang);
    });
});

// Slider auto-défilant
document.querySelectorAll('.slider').forEach(slider => {
  let index = 0;
  const slides = slider.querySelector('.slides');
  // On prend TOUT élément direct dans .slides (img OU video)
  const items = slides.querySelectorAll('img, video');
  const total = items.length;

  function showSlide(i) {
    slides.style.transform = `translateX(${-i * 100}%)`;
  }

  slider.querySelector('.next').addEventListener('click', () => {
    index = (index + 1) % total;
    showSlide(index);
  });

  slider.querySelector('.prev').addEventListener('click', () => {
    index = (index - 1 + total) % total;
    showSlide(index);
  });

  // auto défilement
  setInterval(() => {
    index = (index + 1) % total;
    showSlide(index);
  }, 4000);
});

// animation presentation page------------------------------------------------------------------

const container = document.querySelector(".raindrop-impacts");

function createDrop() {
  const drop = document.createElement("div");
  drop.classList.add("drop");

  // Position aléatoire sur toute la section
  drop.style.left = Math.random() * 100 + "%";
  drop.style.top = Math.random() * 100 + "%";

  // Taille aléatoire
  const size = Math.random() * 40 + 20; // entre 20px et 60px
  drop.style.width = size + "px";
  drop.style.height = size + "px";

  // Durée aléatoire
  const duration = (Math.random() * 2 + 1.5).toFixed(2); // entre 1.5s et 3.5s
  drop.style.animationDuration = duration + "s";

  container.appendChild(drop);

  // Supprimer après animation
  setTimeout(() => {
    drop.remove();
  }, duration * 1000);
}

// Plus d’ondes irrégulières → toutes les 300ms une nouvelle
setInterval(createDrop, 300);

const p = document.querySelector('p');
p.innerHTML = p.getAttribute('data-fr').replace(/\n/g, '<br>');

document.querySelectorAll('.attente').forEach(element => {
  element.addEventListener('click', function(e) {
    e.preventDefault();
    alert('Site en cours de développement !');
  });
});

// --- Thème clair / sombre ---
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light-theme');
  themeIcon.className = 'bi bi-sun-fill';
} else {
  themeIcon.className = 'bi bi-moon-fill';
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
  const isLight = document.body.classList.contains('light-theme');
  themeIcon.className = isLight ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});