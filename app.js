// California DMV-style practice test.
// Test formats (46 / 8 and 25 / 3) are approximate and unverified against official DMV sources.
const MODES = {
  C:  { name: "Class C (Car)", count: 46, maxWrong: 8 },
  M1: { name: "M1 (Motorcycle)", count: 25, maxWrong: 3 }
};
const app = document.getElementById("app");
let state = null;

const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const qid = text => { let h = 0; for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) | 0; return String(h); };

const read = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch { return fallback; } };
const write = (key, v) => { try { localStorage.setItem(key, JSON.stringify(v)); } catch {} };
const loadStats = () => read("dmv-stats", {});
// progress[k] = { seen: {id: 1}, missed: {id: 1} }
const loadProgress = () => read("dmv-progress", {});
function prog(all, k) { return all[k] || (all[k] = { seen: {}, missed: {} }); }

function home() {
  const stats = loadStats(), progress = loadProgress();
  app.innerHTML = `
    <div class="card"><h1>California DMV Practice Test</h1>
    <p class="muted">Pick a test. New tests use questions you haven't seen yet first. Questions you miss are saved so you can review them.</p></div>
    ${Object.keys(MODES).map(k => {
      const total = window.QUESTIONS[k].length, p = prog(progress, k);
      const seenCount = window.QUESTIONS[k].filter(r => p.seen[qid(r[0])]).length;
      const missedCount = window.QUESTIONS[k].filter(r => p.missed[qid(r[0])]).length;
      const s = stats[k];
      return `<div class="card">
        <h2>${MODES[k].name}</h2>
        <p class="muted">${MODES[k].count} questions · pass with ${MODES[k].maxWrong} or fewer wrong<br>
        Seen ${seenCount} of ${total} questions · ${s ? `Best: ${s.best}/${MODES[k].count} · Attempts: ${s.attempts}` : "No attempts yet"}</p>
        <button class="btn" data-act="test" data-k="${k}">Start test</button>
        <button class="btn secondary" data-act="missed" data-k="${k}" ${missedCount ? "" : "disabled"}>Review missed (${missedCount})</button>
      </div>`;
    }).join("")}
    <button class="btn secondary" id="reset">Reset all progress</button>`;
  app.querySelectorAll("[data-act]").forEach(b => b.onclick = () => start(b.dataset.k, b.dataset.act));
  document.getElementById("reset").onclick = () => {
    if (confirm("Erase your scores, seen questions, and missed questions?")) {
      try { localStorage.removeItem("dmv-stats"); localStorage.removeItem("dmv-progress"); } catch {}
      home();
    }
  };
}

function start(k, mode) {
  const m = MODES[k], p = prog(loadProgress(), k);
  const items = window.QUESTIONS[k].map(([q, opts, ans, exp]) => ({ id: qid(q), q, opts, ans, exp }));
  let pool;
  if (mode === "missed") {
    pool = shuffle(items.filter(x => p.missed[x.id]));
  } else {
    // Unseen first, then previously missed, then the rest.
    const unseen = shuffle(items.filter(x => !p.seen[x.id]));
    const missed = shuffle(items.filter(x => p.seen[x.id] && p.missed[x.id]));
    const rest = shuffle(items.filter(x => p.seen[x.id] && !p.missed[x.id]));
    pool = shuffle(unseen.concat(missed, rest).slice(0, m.count));
  }
  const bank = pool.map(x => ({
    id: x.id, q: x.q, exp: x.exp, picked: null,
    o: shuffle(x.opts.map((t, i) => ({ t, ok: i === x.ans })))
  }));
  state = { k, mode, bank, i: 0 };
  render();
}

function record(q) {
  const all = loadProgress(), p = prog(all, state.k), ok = q.o[q.picked].ok;
  p.seen[q.id] = 1;
  if (ok) delete p.missed[q.id]; else p.missed[q.id] = 1;
  write("dmv-progress", all);
}

function render() {
  const { k, bank, i, mode } = state, q = bank[i], m = MODES[k], answered = q.picked !== null;
  const label = mode === "missed" ? `${m.name} · Missed review` : m.name;
  app.innerHTML = `
    <div class="card">
      <div class="muted">${label} · Question ${i + 1} of ${bank.length}</div>
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
  app.querySelectorAll(".opt").forEach(b => b.onclick = () => { q.picked = +b.dataset.n; record(q); render(); });
  document.getElementById("next").onclick = () => { if (i === bank.length - 1) finish(); else { state.i++; render(); } };
  document.getElementById("quit").onclick = () => { if (confirm("Quit? Answers you already gave are saved.")) home(); };
}

function finish() {
  const { k, bank, mode } = state, m = MODES[k];
  const score = bank.filter(q => q.o[q.picked].ok).length;
  const wrong = bank.length - score;
  const missed = bank.filter(q => !q.o[q.picked].ok);
  let head;
  if (mode === "missed") {
    head = `<div class="result">${score} / ${bank.length} fixed</div><p>Questions you got right are removed from your missed list.</p>`;
  } else {
    const passed = wrong <= m.maxWrong;
    const stats = loadStats(), s = stats[k] || { best: 0, attempts: 0 };
    s.best = Math.max(s.best, score); s.attempts++; stats[k] = s; write("dmv-stats", stats);
    head = `<div class="result ${passed ? "pass" : "fail"}">${passed ? "PASS" : "FAIL"}</div>
      <p>${score} / ${bank.length} correct (${wrong} wrong, max allowed ${m.maxWrong})</p>`;
  }
  const remaining = Object.keys(loadProgress()[k]?.missed || {}).length;
  app.innerHTML = `
    <div class="card">${head}
      <button class="btn" id="again">${mode === "missed" ? "Review missed again" : "New test"}</button>
      <button class="btn secondary" id="home">Home</button>
    </div>
    <div class="card"><h2>Missed this round (${missed.length})</h2>
    ${missed.length ? missed.map(q => `<div class="rev"><b>${esc(q.q)}</b><br>
      <span class="fail">Your answer: ${esc(q.o[q.picked].t)}</span><br>
      <span class="pass">Correct: ${esc(q.o.find(o => o.ok).t)}</span><br>
      <span class="muted">${esc(q.exp)}</span></div>`).join("") : "<p>None. Great job!</p>"}
    <p class="muted">${remaining} question${remaining === 1 ? "" : "s"} in your missed list.</p></div>`;
  document.getElementById("again").onclick = () => {
    if (mode === "missed" && !remaining) home(); else start(k, mode);
  };
  document.getElementById("home").onclick = home;
}

home();
