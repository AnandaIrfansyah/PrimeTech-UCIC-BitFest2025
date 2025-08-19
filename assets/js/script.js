/* LOADER / PRELOADER */
document.addEventListener("DOMContentLoaded", function () {
  const loader = document.querySelector(".loader-container");
  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }, 800);
});

// ===== Testimonial Slider =====
// Testimonial Slider
let testimonialIndex = 0;
const testimonialSlides = document.querySelectorAll(".testimonial-slide");
const testimonialDots = document.querySelectorAll(".testimonial-nav .dot");

function showTestimonial(n) {
  testimonialSlides.forEach((slide, i) => {
    slide.classList.remove("active");
    testimonialDots[i].classList.remove("active");
    if (i === n) {
      slide.classList.add("active");
      testimonialDots[i].classList.add("active");
    }
  });
  testimonialIndex = n;
}

function autoTestimonial() {
  testimonialIndex = (testimonialIndex + 1) % testimonialSlides.length;
  showTestimonial(testimonialIndex);
}

let testimonialInterval = setInterval(autoTestimonial, 5000);

testimonialDots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    showTestimonial(i);
    clearInterval(testimonialInterval);
    testimonialInterval = setInterval(autoTestimonial, 5000);
  });
});

showTestimonial(testimonialIndex);


/* MOBILE NAVIGATION MENU */
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navUl = document.querySelector("nav ul");

// Toggle menu saat tombol diklik
mobileMenuBtn.addEventListener("click", () => {
  navUl.classList.toggle("active");
  mobileMenuBtn.querySelector("i").classList.toggle("fa-bars");
  mobileMenuBtn.querySelector("i").classList.toggle("fa-times");
});

// Tutup menu hanya jika klik link biasa, bukan dropdown
navUl.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", (e) => {
    const parentLi = link.parentElement;
    if (window.innerWidth <= 768 && !parentLi.classList.contains("dropdown")) {
      navUl.classList.remove("active");
      mobileMenuBtn.querySelector("i").classList.remove("fa-times");
      mobileMenuBtn.querySelector("i").classList.add("fa-bars");
    }
  });
});

// Reset menu saat resize ke layar lebih besar
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    navUl.classList.remove("active");
    mobileMenuBtn.querySelector("i").classList.remove("fa-times");
    mobileMenuBtn.querySelector("i").classList.add("fa-bars");
  }
});

/* DROPDOWN MENU (MOBILE ONLY) */
// Dropdown buka/tutup pakai klik
document.querySelectorAll(".dropdown > a").forEach((dropdownLink) => {
  dropdownLink.addEventListener("click", (e) => {
    e.preventDefault(); // cegah link "#" reload

    const dropdownContent = dropdownLink.nextElementSibling;

    // Kalau dropdown sedang terbuka, tutup
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      // Tutup semua dropdown lain dulu
      document.querySelectorAll(".dropdown-content").forEach((content) => {
        content.style.display = "none";
      });
      // Buka dropdown yang diklik
      dropdownContent.style.display = "block";
    }
  });
});

// Tutup semua dropdown kalau klik di luar
document.addEventListener("click", (e) => {
  if (!e.target.closest(".dropdown")) {
    document.querySelectorAll(".dropdown-content").forEach((content) => {
      content.style.display = "none";
    });
  }
});


/* SLIDER / CAROUSEL */
const slides = document.querySelectorAll(".slider-section .slide");
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) {
      slide.classList.add("active");
    }
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

showSlide(currentSlide);
setInterval(nextSlide, 7000); // Ganti slide tiap 7 detik

/* SMOOTH SCROLL (ANCHOR LINK) */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

/* SCROLL TO TOP BUTTON */
const scrollTopBtn = document.getElementById("scrollTopBtn");

// Tampilkan tombol saat scroll > 300px
window.addEventListener("scroll", () => {
  scrollTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

// Scroll ke atas saat tombol diklik
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

/* ANNOUNCEMENT CARD ANIMATION */
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".announcement-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );

  cards.forEach((card) => {
    observer.observe(card);
  });

  // Filter tab (placeholder, logika filter bisa ditambah)
  document.querySelectorAll(".filter-tab").forEach((tab) => {
    tab.addEventListener("click", function () {
      document.querySelector(".filter-tab.active").classList.remove("active");
      this.classList.add("active");
    });
  });

  // Hover effect untuk card
  document.querySelectorAll(".announcement-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) rotateX(5deg)";
    });
    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) rotateX(0)";
    });
  });
});

/* EVENT CARD ANIMATION */
document.querySelectorAll(".event-filter").forEach((filter) => {
  filter.addEventListener("click", function () {
    document.querySelector(".event-filter.active").classList.remove("active");
    this.classList.add("active");
  });
});

const eventCards = document.querySelectorAll(".event-card, .upcoming-event-card");

const eventObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
      }
    });
  },
  { threshold: 0.1 }
);

eventCards.forEach((card) => {
  eventObserver.observe(card);
});

/* NEWS CARD & TICKER ANIMATION */
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".news-card, .compact-news-card, .featured-news");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );

  cards.forEach((card) => {
    observer.observe(card);
  });

  // Hover effect untuk news card
  document.querySelectorAll(".news-card, .compact-news-card, .featured-news").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) rotate(1deg)";
    });
    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) rotate(0)";
    });
  });

  // News ticker (duplikat item biar looping)
  const tickerContent = document.querySelector(".ticker-content");
  if (tickerContent) {
    const items = tickerContent.querySelectorAll(".ticker-item");
    items.forEach((item) => {
      const clone = item.cloneNode(true);
      tickerContent.appendChild(clone);
    });
  }
});

// Filter beasiswa
const filterBtns = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".scholarship-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    let category = btn.getAttribute("data-filter");
    cards.forEach((card) => {
      if (category === "all" || card.classList.contains(category)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});
