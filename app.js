// California DMV-style practice test. Official format: Class C = 46 questions (max 8 wrong), M1 = 25 questions (max 3 wrong).
const MODES = {
  C:  { name: "Class C (Car)", count: 46, maxWrong: 8 },
  M1: { name: "M1 (Motorcycle)", count: 25, maxWrong: 3 }
};
const app = document.getElementById("app");
let state = null;

const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const load = () => { try { return JSON.parse(localStorage.getItem("dmv-stats")) || {}; } catch { return {}; } };
const save = s => { try { localStorage.setItem("dmv-stats", JSON.stringify(s)); } catch {} };

function home() {
  const stats = load();
  const line = k => stats[k] ? `Best: ${stats[k].best}/${MODES[k].count} · Attempts: ${stats[k].attempts}` : "No attempts yet";
  app.innerHTML = `
    <div class="card"><h1>California DMV Practice Test</h1>
    <p class="muted">Choose a test. Questions are shuffled each time, and you get instant feedback after each answer.</p></div>
    <div class="modes">
      ${Object.keys(MODES).map(k => `<button class="mode" data-k="${k}"><b>${MODES[k].name}</b>
        <span class="muted">${MODES[k].count} questions · pass with ${MODES[k].maxWrong} or fewer wrong</span><br>
        <span class="muted">${line(k)}</span></button>`).join("")}
    </div>`;
  app.querySelectorAll(".mode").forEach(b => b.onclick = () => start(b.dataset.k));
}

function start(k) {
  const m = MODES[k];
  const bank = shuffle(window.QUESTIONS[k]).slice(0, m.count).map(([q, opts, ans, exp]) => {
    const o = shuffle(opts.map((t, i) => ({ t, ok: i === ans })));
    return { q, o, exp, picked: null };
  });
  state = { k, bank, i: 0 };
  render();
}

function render() {
  const { k, bank, i } = state, q = bank[i], m = MODES[k], answered = q.picked !== null;
  app.innerHTML = `
    <div class="card">
      <div class="muted">${m.name} · Question ${i + 1} of ${bank.length}</div>
      <div class="bar"><div style="width:${(i / bank.length) * 100}%"></div></div>
      <h2>${esc(q.q)}</h2>
      ${q.o.map((o, n) => {
        let cls = "";
        if (answered) cls = o.ok ? "correct" : (n === q.picked ? "wrong" : "");
        return `<button class="opt ${cls}" data-n="${n}" ${answered ? "disabled" : ""}>${esc(o.t)}</button>`;
      }).join("")}
      ${answered ? `<div class="explain"><b>${q.o[q.picked].ok ? "Correct." : "Incorrect."}</b> ${esc(q.exp)}</div>` : ""}
    </div>
    <button class="btn" id="next" ${answered ? "" : "disabled"}>${i === bank.length - 1 ? "Finish" : "Next"}</button>
    <button class="btn secondary" id="quit">Quit</button>`;
  app.querySelectorAll(".opt").forEach(b => b.onclick = () => { q.picked = +b.dataset.n; render(); });
  document.getElementById("next").onclick = () => { if (i === bank.length - 1) finish(); else { state.i++; render(); } };
  document.getElementById("quit").onclick = () => { if (confirm("Quit this test?")) home(); };
}

function finish() {
  const { k, bank } = state, m = MODES[k];
  const score = bank.filter(q => q.o[q.picked].ok).length;
  const wrong = bank.length - score, passed = wrong <= m.maxWrong;
  const stats = load(), s = stats[k] || { best: 0, attempts: 0 };
  s.best = Math.max(s.best, score); s.attempts++; stats[k] = s; save(stats);
  const missed = bank.filter(q => !q.o[q.picked].ok);
  app.innerHTML = `
    <div class="card">
      <div class="result ${passed ? "pass" : "fail"}">${passed ? "PASS" : "FAIL"}</div>
      <p>${score} / ${bank.length} correct (${wrong} wrong, max allowed ${m.maxWrong})</p>
      <button class="btn" id="again">Retake ${m.name}</button>
      <button class="btn secondary" id="home">Home</button>
    </div>
    <div class="card"><h2>Missed questions (${missed.length})</h2>
    ${missed.length ? missed.map(q => `<div class="rev"><b>${esc(q.q)}</b><br>
      <span class="fail">Your answer: ${esc(q.o[q.picked].t)}</span><br>
      <span class="pass">Correct: ${esc(q.o.find(o => o.ok).t)}</span><br>
      <span class="muted">${esc(q.exp)}</span></div>`).join("") : "<p>None. Great job!</p>"}</div>`;
  document.getElementById("again").onclick = () => start(k);
  document.getElementById("home").onclick = home;
}

home();
