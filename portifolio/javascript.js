const navbar = document.querySelector('.navbar');
const gallerySection = document.querySelector('.gallery');
const wrapper = document.querySelector('.wrapper');
const sections = document.querySelectorAll('.section');
const progressFill = document.querySelector('.progress-fill');
const intro = document.getElementById('intro');
const terminal = document.getElementById('terminal-text');
const natureTrigger = document.getElementById("natureTrigger");
const modal = document.getElementById("natureModal");
const closeBtn = document.querySelector(".close");


natureTrigger.addEventListener("click", () => {
  modal.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

const lines = [
  "> Initializing pedroikol.dev...",
  "> Loading interface modules...",
  "> Applying suminagashi aesthetics...",
  "> Ready."
];

let line = 0;
let char = 0;

function typeLine() {
  if (line < lines.length) {
    if (char < lines[line].length) {
      terminal.innerHTML += lines[line].charAt(char);
      char++;
      setTimeout(typeLine, 10);
    } else {
      terminal.innerHTML += '\n';
      line++;
      char = 0;
      setTimeout(typeLine, 400);
    }
  }

  if (line === lines.length) {
    const cursor = document.createElement('span');
    cursor.classList.add('terminal-cursor');
    terminal.appendChild(cursor);
    setTimeout(closeIntro, 1000);
  }
}

typeLine();

function closeIntro() {
  intro.style.display = 'none';
  const cursor = document.querySelector('.terminal-cursor');
  if (cursor) cursor.remove();
  document.querySelectorAll('.fade-in').forEach(el => {
    el.classList.remove('hidden');
    setTimeout(() => el.classList.add('visible'), 100);
  });
  updateProgress();
  document.removeEventListener('keydown', closeIntro);
  document.removeEventListener('click', closeIntro);
}

document.addEventListener('keydown', closeIntro);
document.addEventListener('click', closeIntro);

function updateProgress() {
  const scrollLeft = wrapper.scrollLeft;
  const sectionIndex = Math.round(scrollLeft / window.innerWidth);
  const percentBySection = ((sectionIndex + 1) / sections.length) * 100;
  progressFill.style.width = `${percentBySection}%`;
}

window.addEventListener('load', updateProgress);
wrapper.addEventListener('scroll', updateProgress);

const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      navbar.classList.add('white');
    } else {
      navbar.classList.remove('white');
    }
  },
  { threshold: 0.1 }
);

observer.observe(gallerySection);

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    wrapper.scrollBy({ left: window.innerWidth, behavior: 'smooth' });
  } else if (e.key === 'ArrowLeft') {
    wrapper.scrollBy({ left: -window.innerWidth, behavior: 'smooth' });
  }
});
