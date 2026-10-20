// The animated feature demos. Each is static markup that assets/app.js plays as a
// looping scene while it is on screen (and shows in its finished state for reduced motion).
import { tr } from "./layout.mjs";

const days = (t) => [t("الإتنين", "Mon"), t("التلات", "Tue"), t("الأربع", "Wed"), t("الخميس", "Thu"), t("الجمعة", "Fri"), t("السبت", "Sat"), t("الحد", "Sun")];
const shifts = (t) => [t("الصبح", "Morning"), t("المسا", "Evening"), t("السهر", "Night")];
export const people = (t) => [
  { n: t("حسن", "Hassan"), h: 215 },
  { n: t("لمياء", "Lamia"), h: 335 },
  { n: t("كريم", "Karim"), h: 150 },
  { n: t("سارة", "Sara"), h: 20 },
  { n: t("أحمد", "Ahmed"), h: 270 },
];
const chip = (p, extra = "", cls = "") => `<span class="chip ${cls}" style="--h:${p.h}" ${extra}>${p.n}</span>`;

const frame = (inner, label) => `<div class="screen" role="img" aria-label="${label}"><div class="screen-bar"><i></i><i></i><i></i></div>${inner}</div>`;

// 1. Drag and drop onto the weekly board.
export function boardDemo(lang) {
  const t = tr(lang);
  const P = people(t);
  const d = days(t).slice(0, 5);
  const s = shifts(t);
  // cell -> who lands there, in play order
  const plan = [[0, 0, 0], [1, 0, 1], [0, 1, 2], [2, 1, 0], [3, 2, 1], [1, 2, 3], [4, 0, 4], [2, 2, 4]];
  const grid = s.map((sn, si) => `
      <div class="g-row"><div class="g-shift sh-${si}">${sn}</div>${d.map((_, di) => `<div class="g-cell" data-cell="${si}-${di}"><b class="cnt">0/1</b></div>`).join("")}</div>`).join("");
  return frame(`
    <div class="demo demo-board" data-demo="board" data-plan='${JSON.stringify(plan)}'>
      <div class="db-side">
        <div class="db-title">${t("الموظفين", "Staff")}</div>
        ${P.map((p, i) => chip(p, `data-p="${i}"`)).join("")}
      </div>
      <div class="db-grid">
        <div class="g-row g-head"><div></div>${d.map((x) => `<div>${x}</div>`).join("")}</div>
        ${grid}
      </div>
      <div class="ghost" aria-hidden="true"></div>
      <div class="cursor" aria-hidden="true"></div>
    </div>`, t("عرض متحرك لسحب الموظفين للشفتات", "Animation of dragging staff into shifts"));
}

// 2. The hotel fills in its own headcounts from a private link.
export function hotelDemo(lang) {
  const t = tr(lang);
  const s = shifts(t);
  return `<div class="demo demo-hotel" data-demo="hotel" role="img" aria-label="${t("مدير الفرع بيحدد عدد الناس من الموبايل", "A branch manager sets headcounts from a phone")}">
    <div class="phone">
      <div class="phone-notch"></div>
      <div class="ph-head">🍽️ ${t("مطعم ليالي", "Layali Restaurant")}<small>${t("طلبات الأسبوع الجاي", "Next week's requests")}</small></div>
      ${s.map((sn, i) => `<div class="ph-row"><span>${t("الجمعة", "Friday")} · ${sn}</span><span class="stepper"><i>−</i><b data-step="${i}">0</b><i class="plus" data-plus="${i}">+</i></span></div>`).join("")}
      <div class="ph-save">${t("حفظ", "Save")}</div>
    </div>
    <div class="flow-arrow" aria-hidden="true"><span></span></div>
    <div class="mini-board">
      <div class="mb-title">${t("لوحة الشركة", "Your board")} · ${t("الجمعة", "Friday")}</div>
      ${s.map((sn, i) => `<div class="mb-row" data-mb="${i}"><span class="mb-name sh-${i}">${sn}</span><span class="mb-cell"><em>${t("مقفول", "Closed")}</em><b>0/0</b></span></div>`).join("")}
      <div class="toast ok" data-toast>✓ ${t("المطعم بعت طلباته", "The restaurant sent its requests")}</div>
    </div>
  </div>`;
}

// 3. Rules the database won't let anyone break.
export function rulesDemo(lang) {
  const t = tr(lang);
  const P = people(t);
  const tries = [
    { who: 0, msg: t("حسن مش متاح الجمعة بالليل", "Hassan isn't available Friday nights"), cell: t("الجمعة · السهر", "Fri · Night") },
    { who: 1, msg: t("لمياء شغالة في نفس الشفت في مكان تاني", "Lamia already works this shift somewhere else"), cell: t("السبت · الصبح", "Sat · Morning") },
    { who: 2, msg: t("الشفت ده مليان — الفرع طالب 2 بس", "This shift is full — the branch asked for 2"), cell: t("الحد · المسا", "Sun · Evening") },
    { who: 3, msg: t("سارة مش مسموح لها تشتغل في المكان ده", "Sara isn't assigned to this location"), cell: t("الخميس · الصبح", "Thu · Morning") },
  ];
  return frame(`
    <div class="demo demo-rules" data-demo="rules" data-tries='${tries.length}'>
      ${tries.map((x, i) => `
      <div class="rule-try" data-try="${i}">
        <div class="rt-cell"><small>${x.cell}</small><span class="rt-slot"></span></div>
        ${chip(P[x.who], "", "rt-chip")}
        <div class="rt-msg">⛔ ${x.msg}</div>
      </div>`).join("")}
    </div>`, t("عرض متحرك لمنع الأخطاء", "Animation of blocked mistakes"));
}

// 4. Hours per month, with early/late adjustments.
export function hoursDemo(lang) {
  const t = tr(lang);
  const P = people(t);
  const rows = [
    [P[0], 168, "+1:30"],
    [P[1], 152, ""],
    [P[2], 176, "−0:30"],
    [P[4], 144, "+2:00"],
  ];
  return frame(`
    <div class="demo demo-hours" data-demo="hours">
      <div class="dh-cards">
        <div><small>${t("ساعات الشهر", "Hours this month")}</small><b data-count="640">0</b></div>
        <div><small>${t("شفتات", "Shifts")}</small><b data-count="80">0</b></div>
        <div><small>${t("تغطية الأماكن", "Location coverage")}</small><b data-count="100" data-suffix="%">0</b></div>
      </div>
      <table class="dh-table">
        <thead><tr><th>${t("الموظف", "Employee")}</th><th>${t("الساعات", "Hours")}</th><th>${t("تعديل", "Adjust")}</th></tr></thead>
        <tbody>${rows.map(([p, h, adj]) => `<tr><td>${chip(p)}</td><td><b data-count="${h}">0</b></td><td>${adj ? `<span class="adj ${adj.startsWith("+") ? "up" : "down"}">${adj}</span>` : "—"}</td></tr>`).join("")}</tbody>
      </table>
      <div class="dh-actions"><span class="fake-btn pulse">⬇ ${t("تنزيل Excel", "Download Excel")}</span><span class="fake-btn">🖨 ${t("طباعة", "Print")}</span></div>
    </div>`, t("عرض لساعات الشهر لكل موظف", "Monthly hours per employee"));
}

// 5. The week as an image, straight to WhatsApp.
export function imageDemo(lang) {
  const t = tr(lang);
  const P = people(t);
  const d = days(t);
  const cells = [[0, 1, 0, 4, 1, 2, 0], [2, 3, 1, 2, 4, 3, 1], [4, 0, 3, 1, 2, 4, 3]];
  const img = `<div class="sched-img">
      <div class="si-head">🏨 ${t("فندق النيل", "Nile Hotel")} · ${t("الأسبوع الجاي", "Next week")}</div>
      <div class="si-grid">${d.map((x) => `<span class="si-day">${x}</span>`).join("")}
      ${cells.map((row) => row.map((p) => `<span class="si-c" style="--h:${P[p].h}">${P[p].n}</span>`).join("")).join("")}</div>
    </div>`;
  return `<div class="demo demo-image" data-demo="image" role="img" aria-label="${t("الجدول بيتحول لصورة وبيتبعت على واتساب", "The schedule becomes an image and goes to WhatsApp")}">
    <div class="di-source">${img}<span class="fake-btn shot">📷 ${t("صورة الجدول", "Schedule image")}</span></div>
    <div class="phone wa">
      <div class="phone-notch"></div>
      <div class="wa-head"><span class="wa-av">👥</span>${t("فريق فندق النيل", "Nile Hotel team")}</div>
      <div class="wa-body">
        <div class="wa-msg in">${t("الجدول نزل؟", "Is the schedule out?")}</div>
        <div class="wa-msg out wa-pic">${img}<small>${t("جدول الأسبوع الجاي 👆", "Next week's schedule 👆")} ✓✓</small></div>
        <div class="wa-msg in wa-late">${t("تمام، شكراً! 🙏", "Perfect, thanks! 🙏")}</div>
      </div>
    </div>
  </div>`;
}

// 6. Live sync between the laptop and the phone.
export function syncDemo(lang) {
  const t = tr(lang);
  const P = people(t);
  const s = shifts(t);
  const col = () => s.map((sn, i) => `<div class="sy-row"><span class="sh-${i}">${sn}</span><span class="sy-cell" data-sync="${i}">${i === 0 ? chip(P[0]) : ""}</span></div>`).join("");
  return `<div class="demo demo-sync" data-demo="sync" role="img" aria-label="${t("التعديل بيظهر على كل الأجهزة في نفس اللحظة", "Changes appear on every device instantly")}">
    <div class="laptop"><div class="lp-screen"><div class="sy-title">💻 ${t("المكتب", "Office")}</div>${col()}</div><div class="lp-base"></div></div>
    <div class="sync-wave" aria-hidden="true"><i></i><i></i><i></i></div>
    <div class="phone sm"><div class="phone-notch"></div><div class="sy-title">📱 ${t("وانت برّه", "On the go")}</div>${col()}</div>
    <div class="sync-chips" hidden>${chip(P[1])}${chip(P[3])}</div>
  </div>`;
}
