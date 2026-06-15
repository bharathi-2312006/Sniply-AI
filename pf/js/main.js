document.addEventListener("DOMContentLoaded", () => {
  const current = location.pathname.split("/").pop();
  document.querySelectorAll("nav a").forEach(link => {
    if (link.getAttribute("href") === current) {
      link.classList.add("active");
    }
  });
});
/* =========================
   PREMIUM CURSOR LOGIC
========================= */

const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  cursorDot.style.left = mouseX + "px";
  cursorDot.style.top = mouseY + "px";
});

/* Smooth trailing effect */
function animateCursor() {
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;

  cursorRing.style.left = ringX + "px";
  cursorRing.style.top = ringY + "px";

  requestAnimationFrame(animateCursor);
}

animateCursor();
