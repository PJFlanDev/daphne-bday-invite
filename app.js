const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyDU9Ile-c95Dtc0sOvaM9jDXDCl8FGWTus2f_tMXSTYwZjp_0VrY6ZtF-KuOsfWtCx/exec';

// ── Modal ──
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("closeBtn");
const cancelBtn = document.getElementById("cancelBtn");
const submitBtn = document.getElementById("submitBtn");
const doneBtn = document.getElementById("doneBtn");
const formView = document.getElementById("formView");
const doneView = document.getElementById("doneView");
const doneTitle = document.getElementById("doneTitle");
const doneMsg = document.getElementById("doneMsg");
const guestField = document.getElementById("guestField");

const openModal = () => {
  modal.classList.add("open");
  formView.style.display = "";
  doneView.style.display = "none";
};
const closeModal = () => modal.classList.remove("open");

document.getElementById("rsvpBtn").addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
cancelBtn.addEventListener("click", closeModal);
doneBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// ── Attendance toggle ──
let attending = "yes";
document.querySelectorAll("#attSeg button").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll("#attSeg button")
      .forEach((x) => x.classList.remove("active"));
    btn.classList.add("active");
    attending = btn.dataset.v;
    guestField.style.display = attending === "yes" ? "" : "none";
  });
});

// ── Submit ──
submitBtn.addEventListener("click", () => {
  const name   = document.getElementById("nm").value.trim() || "Friend";
  const guests = document.getElementById("gc").value;
  const note   = document.getElementById("msg").value.trim();

  formView.style.display = "none";
  doneView.style.display = "";
  if (attending === "yes") {
    doneTitle.textContent = `See you poolside, ${name}!`;
    doneMsg.textContent = "Daphne is going to be so happy to see you!";
    blastConfetti();
  } else {
    doneTitle.textContent = `We'll miss you, ${name}.`;
    doneMsg.textContent =
      "Thanks for letting us know — we'll save you some cake in spirit. ☀";
  }

  fetch(SCRIPT_URL, {
    method:  "POST",
    mode:    "no-cors",
    headers: { "Content-Type": "text/plain" },
    body:    JSON.stringify({ name, attending, guests, note }),
  }).catch(() => {});
});

// ── Confetti ──
const palette = [
  "#ee8158",
  "#fcd45b",
  "#7cc4dd",
  "#3a7bd5",
  "#f5a3a3",
  "#ffffff",
];
function blastConfetti() {
  const c = document.getElementById("confetti");
  c.innerHTML = "";
  for (let i = 0; i < 80; i++) {
    const s = document.createElement("span");
    s.style.left = Math.random() * 100 + "%";
    s.style.background = palette[i % palette.length];
    s.style.animationDuration = 2.4 + Math.random() * 2.2 + "s";
    s.style.animationDelay = Math.random() * 0.6 + "s";
    s.style.transform = `rotate(${Math.random() * 360}deg)`;
    const w = 6 + Math.random() * 8;
    s.style.width = w + "px";
    s.style.height = w * 1.6 + "px";
    c.appendChild(s);
  }
  setTimeout(() => {
    c.innerHTML = "";
  }, 5000);
}
