document.addEventListener("DOMContentLoaded", function () {
  const loader = document.querySelector(".loader-container");
  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }, 800);
});

const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navUl = document.querySelector("nav ul");

mobileMenuBtn.addEventListener("click", () => {
  navUl.classList.toggle("active");
  mobileMenuBtn.querySelector("i").classList.toggle("fa-bars");
  mobileMenuBtn.querySelector("i").classList.toggle("fa-times");
});

navUl.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      navUl.classList.remove("active");
      mobileMenuBtn.querySelector("i").classList.remove("fa-times");
      mobileMenuBtn.querySelector("i").classList.add("fa-bars");
    }
  });
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    navUl.classList.remove("active");
    mobileMenuBtn.querySelector("i").classList.remove("fa-times");
    mobileMenuBtn.querySelector("i").classList.add("fa-bars");
  }
});

document.querySelectorAll(".dropdown > a").forEach((dropdownLink) => {
  dropdownLink.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      const dropdownContent = dropdownLink.nextElementSibling;
      if (dropdownContent) {
        document.querySelectorAll(".dropdown-content").forEach((content) => {
          if (content !== dropdownContent && content.style.display === "block") {
            content.style.display = "none";
          }
        });
        dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
      }
    }
  });
});

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

setInterval(nextSlide, 7000);

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
