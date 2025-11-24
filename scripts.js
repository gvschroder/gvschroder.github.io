// AOS init
AOS.init({ duration: 650, once: true, offset: 80 });

// Year
document.getElementById("year").textContent = new Date().getFullYear();

/**
 * Calcula o número total de anos (incluindo frações) entre uma data inicial e a data atual.
 * @param {Date} dataInicial O objeto Date de início.
 * @returns {number} O número total de anos.
 */
function calcularAnosAteHoje(dataInicial) {
    const dataAtual = new Date();
    const diferencaEmMilissegundos = dataAtual.getTime() - dataInicial.getTime();
    // Milissegundos em um ano (365.25 dias)
    const milissegundosPorAno = 1000 * 60 * 60 * 24 * 365.25;
    const totalDeAnos = diferencaEmMilissegundos / milissegundosPorAno;

    // Retorna o valor arredondado (ex: 5.5, 10.2)
    return Math.floor(totalDeAnos);
}

const dataDeInicio = new Date('2012-07-01');
const spanParaAnos = document.getElementById("anosExperiencia");

if (spanParaAnos) {
    const anosCalculados = calcularAnosAteHoje(dataDeInicio);
    spanParaAnos.textContent = anosCalculados;
}

// Mobile nav
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => navLinks.classList.remove("open"))
);

// Theme toggle (dark/light)
const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;

function setTheme(mode) {
  if (mode === "light") root.classList.add("light");
  else root.classList.remove("light");
  localStorage.setItem("theme", mode);
  themeToggle.innerHTML = mode === "light"
    ? `<i class="fa-solid fa-sun"></i>`
    : `<i class="fa-solid fa-moon"></i>`;
}

const savedTheme = localStorage.getItem("theme") || "dark";
setTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const current = root.classList.contains("light") ? "light" : "dark";
  setTheme(current === "light" ? "dark" : "light");
});

// Active nav link on scroll
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav__link");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navAnchors.forEach(a => a.classList.remove("active"));
      const active = document.querySelector(`.nav__link[href="#${entry.target.id}"]`);
      if (active) active.classList.add("active");
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);

sections.forEach(sec => observer.observe(sec));

// Scroll progress bar
const progress = document.getElementById("scroll-progress");
window.addEventListener("scroll", () => {
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight);
  progress.style.width = `${scrolled * 100}%`;
});

// Projects filter
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      const tags = card.dataset.tags.split(",").map(t => t.trim());
      const show = filter === "all" || tags.includes(filter);
      card.style.display = show ? "grid" : "none";
    });
  });
});

// Contact form -> mailto
const form = document.querySelector(".contact__form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nome = form.nome.value.trim();
  const email = form.email.value.trim();
  const mensagem = form.mensagem.value.trim();

  if (!nome || !email || !mensagem) return;

  const subject = encodeURIComponent(`Contato via portfolio — ${nome}`);
  const body = encodeURIComponent(`Nome: ${nome}\nEmail: ${email}\n\nMensagem:\n${mensagem}`);

  window.location.href = `mailto:[[SEU_EMAIL]]?subject=${subject}&body=${body}`;
  form.reset();
});
