/* ============================================================
   MindWatch — App Logic (Clean Rebuild)
============================================================ */

/* ==========================
   LOCAL STORAGE HANDLING
========================== */
const STORAGE_KEY = "mindwatch_data_v1";

/* ====== DUMMY DATA FOR DEMO (1 WEEK) ====== */
(function seedDummyData() {
  const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  if (existing.length > 0) return; // Do not overwrite user data

  const today = new Date();
  const dummy = [];

  const moods = [4, 3, 2, 3, 1, 4, 3];
  const stressLevels = [20, 35, 50, 40, 70, 25, 30];
  const sleepHours = [7, 6, 8, 7.5, 5, 8, 7];
  const notes = [
    "Feeling great!",
    "Pretty good day",
    "Bit neutral today",
    "Calm and okay",
    "Tough day",
    "Feeling energetic",
    "Nice balanced day"
  ];

  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);

    dummy.push({
      ts: d.getTime(),
      mood: moods[6 - i],
      stress: stressLevels[6 - i],
      sleep: sleepHours[6 - i],
      note: notes[6 - i]
    });
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(dummy.reverse()));
})();

function loadData() {
  const json = localStorage.getItem(STORAGE_KEY);
  return json ? JSON.parse(json) : [];
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/* ==========================
   GLOBAL ELEMENTS
========================== */
const pages = document.querySelectorAll(".page");
const navBtns = document.querySelectorAll(".side-btn");
const toast = document.getElementById("toast");

/* Check-in inputs */
let selectedMood = null;
const stressInput = document.getElementById("stressInput");
const stressVal = document.getElementById("stressVal");
const sleepInput = document.getElementById("sleepInput");
const noteInput = document.getElementById("noteInput");

/* DOM elements */
const streakNum = document.getElementById("streakNum");
const streakBig = document.getElementById("streakBig");
const streakText = document.getElementById("streakText");
const aiInsight = document.getElementById("aiInsight");

const scoreNum = document.getElementById("scoreNum");
const scoreLabel = document.getElementById("scoreLabel");
const latestMood = document.getElementById("latestMood");
const latestStress = document.getElementById("latestStress");
const latestSleep = document.getElementById("latestSleep");

/* Onboarding modal */
const onboardModal = document.getElementById("onboardModal");
const onboardOk = document.getElementById("onboardOk");

/* ==========================
   NAVIGATION
========================== */
navBtns.forEach(btn =>
  btn.addEventListener("click", () => {
    navBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const target = btn.dataset.target;
    pages.forEach(p => p.classList.remove("active"));
    document.getElementById(target).classList.add("active");
  })
);

/* ==========================
   TOAST
========================== */
function showToast(msg) {
  toast.textContent = msg;
  toast.style.display = "block";
  setTimeout(() => (toast.style.display = "none"), 2000);
}

/* ==========================
   MOOD PICKER
========================== */
document.querySelectorAll(".mood").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".mood").forEach(m => m.classList.remove("selected"));
    btn.classList.add("selected");
    selectedMood = Number(btn.dataset.value);
  });
});

/* ==========================
   STRESS SLIDER UPDATE
========================== */
if (stressInput) {
  stressInput.addEventListener("input", () => {
    if (stressVal) stressVal.textContent = stressInput.value;
  });
}

/* ==========================
   SAVE CHECK-IN
========================== */
const saveBtn = document.getElementById("saveBtn");
if (saveBtn) saveBtn.addEventListener("click", () => {
  if (selectedMood === null) return showToast("Choose a mood first.");

  const entry = {
    ts: Date.now(),
    mood: selectedMood,
    stress: Number(stressInput ? stressInput.value : 50),
    sleep: Number(sleepInput ? sleepInput.value : 7),
    note: noteInput ? noteInput.value.trim() : ""
  };

  const data = loadData();
  data.push(entry);
  saveData(data);

  refreshUI();
  showToast("Check-in saved!");

  if (noteInput) noteInput.value = "";
});

/* ==========================
   CLEAR DATA
========================== */
const clearBtn = document.getElementById("clearBtn");
if (clearBtn) clearBtn.addEventListener("click", () => {
  if (confirm("Clear all check-in data?")) {
    saveData([]);
    refreshUI();
    showToast("Data cleared.");
  }
});

const clearAllBtn = document.getElementById("clearAll");
if (clearAllBtn) clearAllBtn.addEventListener("click", () => {
  if (confirm("Clear local storage completely?")) {
    saveData([]);
    refreshUI();
    showToast("All data removed.");
  }
});

/* ==========================
   SCORE CALCULATION
========================== */
function computeScore(entry) {
  if (!entry) return 0;

  const moodScore = (entry.mood / 4) * 50;
  const stressScore = ((100 - entry.stress) / 100) * 35;
  const sleepNorm = Math.min(entry.sleep / 8, 1);
  const sleepScore = sleepNorm * 15;

  return Math.round(moodScore + stressScore + sleepScore);
}

/* ==========================
   STREAK CALCULATION
========================== */
function computeStreak(data) {
  if (data.length === 0) return 0;

  let streak = 1;
  let cur = new Date(data[data.length - 1].ts);

  for (let i = data.length - 2; i >= 0; i--) {
    const d = new Date(data[i].ts);
    const diff = Math.floor((cur - d) / (1000 * 60 * 60 * 24));

    if (diff === 1) {
      streak++;
      cur = d;
    } else break;
  }
  return streak;
}

/* ==========================
   INSIGHTS GENERATOR
========================== */
function generateInsight(data) {
  if (data.length < 3) return "Need more entries to generate insights.";

  const last = data[data.length - 1];
  const last3 = data.slice(-3);

  const avgMood = last3.reduce((a, b) => a + b.mood, 0) / 3;
  const avgStress = last3.reduce((a, b) => a + b.stress, 0) / 3;

  let msg = "";

  if (avgMood < 2) msg += "Your mood has been low lately. Consider rest or talking to someone. ";
  if (avgStress > 70) msg += "Stress has been high recently. Try breathing exercises or short breaks. ";
  if (last.sleep < 6) msg += "Recent sleep is low — consider adjusting bedtime. ";

  return msg || "You're maintaining a balanced trend. Keep it up!";
}

/* ==========================
   TREND CHARTS
========================== */
let trendChart, moodChart, stressChart;

function updateCharts(data) {
  const labels = data.map(e => new Date(e.ts).toLocaleDateString());
  const moods = data.map(e => e.mood);
  const stresses = data.map(e => e.stress);

  if (trendChart) trendChart.destroy();
  if (moodChart) moodChart.destroy();
  if (stressChart) stressChart.destroy();

  trendChart = new Chart(document.getElementById("trendChart"), {
    type: "line",
    data: {
      labels,
      datasets: [
        { label: "Mood", data: moods, tension: 0.4 },
        { label: "Stress", data: stresses, tension: 0.4 }
      ]
    }
  });

  moodChart = new Chart(document.getElementById("moodChart"), {
    type: "line",
    data: { labels, datasets: [{ label: "Mood", data: moods }] }
  });

  stressChart = new Chart(document.getElementById("stressChart"), {
    type: "line",
    data: { labels, datasets: [{ label: "Stress", data: stresses }] }
  });
}

/* ==========================
   SCORE RING
========================== */
let scoreRing;

function updateScoreRing(score) {
  if (scoreRing) scoreRing.destroy();

  scoreRing = new Chart(document.getElementById("scoreRing"), {
    type: "doughnut",
    data: {
      labels: ["Score", "Remaining"],
      datasets: [{ data: [score, 100 - score], borderWidth: 0 }]
    },
    options: { cutout: "70%" }
  });
}

/* ==========================
   MOOD CALENDAR
========================== */
function renderCalendar(data) {
  const cal = document.getElementById("moodCalendar");
  if (!cal) return;
  cal.innerHTML = "";

  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const ds = d.toDateString();

    const entry = data.find(e => new Date(e.ts).toDateString() === ds);

    const div = document.createElement("div");
    div.classList.add("mood-day");

    if (!entry) {
      div.classList.add("mood-none");
      div.textContent = "-";
    } else if (entry.mood >= 3) {
      div.classList.add("mood-good");
      div.textContent = "😊";
    } else if (entry.mood === 2) {
      div.classList.add("mood-neutral");
      div.textContent = "😐";
    } else {
      div.classList.add("mood-low");
      div.textContent = "☹️";
    }

    cal.appendChild(div);
  }
}

/* ==========================
   CSV IMPORT & ANALYSIS
   (Client-side, no libs)
========================== */

const csvFileInput = document.getElementById("csvFileInput");
const importCsvBtn = document.getElementById("importCsvBtn");
const csvResults = document.getElementById("csvResults");
const csvSummary = document.getElementById("csvSummary");
const csvIssues = document.getElementById("csvIssues");
const acceptImport = document.getElementById("acceptImport");
const rejectImport = document.getElementById("rejectImport");
const clearCsvPreview = document.getElementById("clearCsvPreview");

let csvPreviewRecords = []; // parsed records waiting to accept

function parseCSVText(text) {
  const lines = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n").filter(l => l.trim() !== "");
  const rows = lines.map(line => {
    const cols = [];
    let cur = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"' ) {
        if (inQuotes && line[i+1] === '"') { cur += '\"'; i++; }
        else inQuotes = !inQuotes;
        continue;
      }
      if (ch === ',' && !inQuotes) {
        cols.push(cur);
        cur = "";
        continue;
      }
      cur += ch;
    }
    cols.push(cur);
    return cols.map(c => c.trim());
  });
  return rows;
}

function normalizeHeader(h) {
  return h.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function rowToEntry(row, headerMap) {
  const get = (key, idx) => {
    if (typeof headerMap === "object") {
      return row[headerMap[key]] ?? "";
    }
    return row[idx] ?? "";
  };

  let tsVal = null;
  if (headerMap.timestamp !== undefined) tsVal = get('timestamp');
  else if (headerMap.date !== undefined) tsVal = get('date');
  else tsVal = row[0];

  let ts = null;
  if (/^\d+$/.test(tsVal)) ts = Number(tsVal);
  else {
    const d = new Date(tsVal);
    if (!isNaN(d.getTime())) ts = d.getTime();
  }

  let mood = null;
  if (headerMap.mood !== undefined) mood = get('mood');
  else mood = row[1] ?? "";

  let stress = null;
  if (headerMap.stress !== undefined) stress = get('stress');
  else stress = row[2] ?? "";

  let sleep = null;
  if (headerMap.sleep !== undefined) sleep = get('sleep');
  else sleep = row[3] ?? "";

  let note = "";
  if (headerMap.note !== undefined) note = get('note');
  else note = row[4] ?? "";

  const entry = { ts: ts, mood: null, stress: null, sleep: null, note: (note||"").toString() };
  if (mood !== null && mood !== "") {
    const mnum = Number(mood);
    if (!isNaN(mnum)) entry.mood = Math.max(0, Math.min(4, Math.round(mnum)));
    else {
      const mm = mood.toString().trim();
      if (["😄","4","4.0"].includes(mm) || mm.match(/happy|great|good/i)) entry.mood = 4;
      else if (mm.match(/smil/i) || mm === "3") entry.mood = 3;
      else if (mm.match(/neutral|meh/i) || mm === "2") entry.mood = 2;
      else if (mm.match(/sad|low|☹|😢/i) || mm === "1") entry.mood = 1;
      else entry.mood = null;
    }
  }

  if (stress !== null && stress !== "") {
    const snum = Number(stress);
    if (!isNaN(snum)) entry.stress = Math.max(0, Math.min(100, Math.round(snum)));
  }

  if (sleep !== null && sleep !== "") {
    const sl = Number(sleep);
    if (!isNaN(sl)) entry.sleep = Math.max(0, Math.min(24, Math.round(sl*10)/10));
  }

  return entry;
}

function analyzeParsedCSV(rows) {
  if (!rows || rows.length === 0) return { records: [], issues: ["Empty file"], summary: null };

  const firstRow = rows[0];
  let headerMap = null;
  const possibleHeaders = firstRow.map(h => normalizeHeader(h));
  const headerTokens = ["timestamp","date","mood","stress","sleep","note"];

  const firstLooksLikeHeader = possibleHeaders.some(h => headerTokens.includes(h));
  let dataStart = 0;

  if (firstLooksLikeHeader) {
    headerMap = {};
    possibleHeaders.forEach((h, idx) => {
      if (h === "timestamp" || h === "date") headerMap.timestamp = idx;
      else if (h === "mood") headerMap.mood = idx;
      else if (h === "stress") headerMap.stress = idx;
      else if (h === "sleep") headerMap.sleep = idx;
      else if (h === "note") headerMap.note = idx;
    });
    dataStart = 1;
  } else {
    headerMap = { timestamp: 0, mood: 1, stress: 2, sleep: 3, note: 4 };
    dataStart = 0;
  }

  const records = [];
  const issues = [];

  for (let i = dataStart; i < rows.length; i++) {
    const row = rows[i];
    if (row.length === 0 || row.every(c => c === "")) continue;
    const e = rowToEntry(row, headerMap);
    const rowIndex = i + 1;
    if (!e.ts) {
      issues.push(`Row ${rowIndex}: Invalid or missing date/timestamp`);
      continue;
    }
    if (e.mood === null || e.mood === undefined) {
      issues.push(`Row ${rowIndex}: Invalid or missing mood`);
    }
    if (e.stress === null || e.stress === undefined) {
      issues.push(`Row ${rowIndex}: Invalid or missing stress`);
    }
    e.mood = (e.mood === null || e.mood === undefined) ? 2 : e.mood;
    e.stress = (e.stress === null || e.stress === undefined) ? 50 : e.stress;
    e.sleep = (e.sleep === null || e.sleep === undefined) ? 7 : e.sleep;
    records.push(e);
  }

  if (records.length === 0) {
    issues.push("No valid rows found.");
    return { records: [], issues, summary: null };
  }

  records.sort((a,b) => a.ts - b.ts);

  const moods = records.map(r => r.mood);
  const stresses = records.map(r => r.stress);
  const sleeps = records.map(r => r.sleep);

  const summary = {
    count: records.length,
    startDate: new Date(records[0].ts).toLocaleDateString(),
    endDate: new Date(records[records.length-1].ts).toLocaleDateString(),
    avgMood: (moods.reduce((a,b)=>a+b,0)/moods.length).toFixed(2),
    avgStress: Math.round(stresses.reduce((a,b)=>a+b,0)/stresses.length),
    avgSleep: (sleeps.reduce((a,b)=>a+b,0)/sleeps.length).toFixed(1),
    moodDistribution: {
      good: records.filter(r => r.mood >= 3).length,
      neutral: records.filter(r => r.mood === 2).length,
      low: records.filter(r => r.mood <= 1).length
    },
    missingDays: (() => {
      const daySet = new Set(records.map(r => new Date(r.ts).toDateString()));
      const start = new Date(records[0].ts);
      const end = new Date(records[records.length-1].ts);
      let miss = 0;
      for (let d = new Date(start); d <= end; d.setDate(d.getDate()+1)) {
        if (!daySet.has(new Date(d).toDateString())) miss++;
      }
      return miss;
    })()
  };

  return { records, issues, summary };
}

function showCSVPreview(parseResult) {
  csvPreviewRecords = parseResult.records || [];
  if (!csvResults) return;
  csvResults.style.display = "block";

  if (!parseResult.summary) {
    csvSummary.innerHTML = "<strong>No summary available.</strong>";
  } else {
    csvSummary.innerHTML = `
      <strong>Rows:</strong> ${parseResult.summary.count} &nbsp; 
      <strong>Range:</strong> ${parseResult.summary.startDate} → ${parseResult.summary.endDate} <br/>
      <strong>Avg Mood:</strong> ${parseResult.summary.avgMood} &nbsp;
      <strong>Avg Stress:</strong> ${parseResult.summary.avgStress} &nbsp;
      <strong>Avg Sleep:</strong> ${parseResult.summary.avgSleep}h <br/>
      <strong>Mood dist:</strong> Good ${parseResult.summary.moodDistribution.good}, Neutral ${parseResult.summary.moodDistribution.neutral}, Low ${parseResult.summary.moodDistribution.low} <br/>
      <strong>Missing days within range:</strong> ${parseResult.summary.missingDays}
    `;
  }

  if (parseResult.issues && parseResult.issues.length > 0) {
    csvIssues.innerHTML = "<strong>Issues:</strong><ul>" + parseResult.issues.slice(0,10).map(i => `<li>${i}</li>`).join('') + "</ul>";
  } else {
    csvIssues.innerHTML = "";
  }
}

function clearCSVPreviewUI() {
  csvPreviewRecords = [];
  if (!csvResults) return;
  csvResults.style.display = "none";
  csvSummary.innerHTML = "";
  csvIssues.innerHTML = "";
}

async function handleCsvFile(file) {
  if (!file) return showToast("No file selected.");
  const text = await file.text();
  const rows = parseCSVText(text);
  const parsed = analyzeParsedCSV(rows);
  showCSVPreview(parsed);
}

if (importCsvBtn) importCsvBtn.addEventListener("click", async () => {
  const f = csvFileInput.files[0];
  if (!f) return showToast("Choose a CSV file first.");
  await handleCsvFile(f);
});

if (clearCsvPreview) clearCsvPreview.addEventListener("click", () => {
  clearCSVPreviewUI();
  if (csvFileInput) csvFileInput.value = "";
});

if (acceptImport) acceptImport.addEventListener("click", () => {
  if (!csvPreviewRecords || csvPreviewRecords.length === 0) {
    return showToast("No parsed records to import.");
  }
  const modeEl = document.querySelector('input[name="csvMode"]:checked');
  const mode = modeEl ? modeEl.value : "append";
  let data = loadData();

  if (mode === "replace") data = csvPreviewRecords;
  else {
    const existingDates = new Set(data.map(e => new Date(e.ts).toDateString()));
    const toAdd = csvPreviewRecords.filter(r => !existingDates.has(new Date(r.ts).toDateString()));
    data = data.concat(toAdd);
  }

  data.sort((a,b) => a.ts - b.ts);
  saveData(data);

  clearCSVPreviewUI();
  if (csvFileInput) csvFileInput.value = "";
  refreshUI();
  showToast("CSV data imported successfully.");
});

if (rejectImport) rejectImport.addEventListener("click", () => {
  clearCSVPreviewUI();
  if (csvFileInput) csvFileInput.value = "";
  showToast("Import canceled.");
});

/* ==========================
   CSV EXPORT
========================== */
const exportBtn = document.getElementById("exportCsv");
if (exportBtn) exportBtn.addEventListener("click", () => {
  const data = loadData();
  if (data.length === 0) return showToast("No data.");

  const header = "timestamp,mood,stress,sleep,note\n";
  const rows = data
    .map(e => `${e.ts},${e.mood},${e.stress},${e.sleep},"${(e.note||"").replace(/"/g,'""')}"`)
    .join("\n");

  const blob = new Blob([header + rows], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "mindwatch_export.csv";
  a.click();

  URL.revokeObjectURL(url);
});

/* ==========================
   NOTIFICATIONS
========================== */
const notifyBtn = document.getElementById("notifyBtn");
if (notifyBtn) notifyBtn.addEventListener("click", async () => {
  const perm = await Notification.requestPermission();
  if (perm === "granted") {
    new Notification("MindWatch Reminder", {
      body: "Don't forget your daily check-in!"
    });
    showToast("Daily reminder enabled!");
  }
});

/* ==========================
   QUICK ACTIONS
========================== */
const quickBreathe = document.getElementById("quickBreathe");
if (quickBreathe) quickBreathe.addEventListener("click", () => {
  showToast("Take a deep breath…");
});

const quickWalk = document.getElementById("quickWalk");
if (quickWalk) quickWalk.addEventListener("click", () => {
  showToast("Try a 5-minute walk!");
});

/* ==========================
   ONBOARDING MODAL
========================== */
if (!localStorage.getItem("mw_seen_onboarding")) {
  if (onboardModal) onboardModal.classList.remove("hidden");
}

if (onboardOk) onboardOk.addEventListener("click", () => {
  if (onboardModal) onboardModal.classList.add("hidden");
  localStorage.setItem("mw_seen_onboarding", "yes");
});

/* ==========================
   REFRESH UI
========================== */
function refreshUI() {
  const data = loadData();
  const last = data[data.length - 1];

  const streak = computeStreak(data);
  if (streakNum) streakNum.textContent = streak;
  if (streakBig) streakBig.textContent = streak;
  if (streakText) streakText.textContent = streak === 0 ? "Start tracking daily." : "Great consistency!";

  if (last) {
    if (latestMood) latestMood.textContent = last.mood;
    if (latestStress) latestStress.textContent = last.stress;
    if (latestSleep) latestSleep.textContent = last.sleep;

    const score = computeScore(last);
    if (scoreNum) scoreNum.textContent = score;
    if (scoreLabel) scoreLabel.textContent = score > 70 ? "Good" : score > 40 ? "Fair" : "Low";
    updateScoreRing(score);
  } else {
    updateScoreRing(0);
  }

  if (aiInsight) aiInsight.textContent = generateInsight(data);

  updateCharts(data);
  renderCalendar(data);
}

/* ==========================
   INIT
========================== */
refreshUI();
