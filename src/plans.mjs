import { tr, href } from "./layout.mjs";
import { SIGNUP_URL } from "./config.mjs";

// Two prices, both EUR per month excluding VAT and with every feature:
// companies with up to SMALL_MAX employees pay SMALL_PRICE per location,
// larger ones pay PRICE per scheduled employee.
// Paying yearly takes 30% off the first year of either.
// app.js (savings calculator) repeats these numbers.
export const PRICE = 4;
export const SMALL_PRICE = 50;
export const SMALL_MAX = 10;
export const YEARLY_FIRST_YEAR_DISCOUNT = 0.3;
const yearly = (n) => +(n * (1 - YEARLY_FIRST_YEAR_DISCOUNT)).toFixed(2);
const YEARLY = yearly(PRICE);
const SMALL_YEARLY = yearly(SMALL_PRICE);

export const money = (lang, n) => {
  const s = Number.isInteger(n) ? String(n) : n.toFixed(2);
  return lang === "ar" ? `${s}€` : `€${s}`;
};

export function included(lang) {
  const t = tr(lang);
  return [
    t("لوحة الأسبوع بالسحب والإفلات", "Drag-and-drop weekly board"),
    t("رابط خاص لكل فرع أو عميل", "Private link for every location"),
    t("منع الحجز المزدوج والتعارضات", "No double bookings or clashes"),
    t("جداول ثابتة ومتغيرة لكل موقع", "Fixed and changing schedules"),
    t("ساعات الشهر وتنزيل Excel", "Monthly hours + Excel export"),
    t("تعديل ساعات الحضور المبكر والانصراف المتأخر", "Early/late hours adjustments"),
    t("صورة الجدول لواتساب", "Schedule image for WhatsApp"),
    t("واجهة مخصصة للهاتف", "Dedicated phone layout"),
    t("دعم عبر واتساب والبريد الإلكتروني", "Support by WhatsApp and email"),
  ];
}

export function pricingCards(lang) {
  const t = tr(lang);
  const m = (n) => money(lang, n);
  return `
  <div class="billing-toggle" role="group" aria-label="${t("دورة الدفع", "Billing period")}">
    <button type="button" data-billing="monthly" aria-pressed="true">${t("شهري", "Monthly")}</button>
    <button type="button" data-billing="yearly" aria-pressed="false">${t("سنوي", "Yearly")} <span class="save">${t("خصم 30% في السنة الأولى", "30% off year one")}</span></button>
  </div>
  <div class="plans one" data-price data-price-monthly="${PRICE}" data-price-yearly="${YEARLY}" data-small-monthly="${SMALL_PRICE}" data-small-yearly="${SMALL_YEARLY}" data-small-max="${SMALL_MAX}">
    <article class="plan popular">
      <span class="plan-badge">${t("باقتان. جميع المميزات.", "Two plans. Every feature.")}</span>
      <div class="plan-main">
        <div class="tiers">
          <div class="tier" data-tier="small">
            <small>${t(`حتى ${SMALL_MAX} موظفين`, `Up to ${SMALL_MAX} employees`)}</small>
            <b data-monthly="${m(SMALL_PRICE)}" data-yearly="${m(SMALL_YEARLY)}">${m(SMALL_PRICE)}</b>
            <span>${t("لكل موقع شهريًا", "per location / month")}</span>
          </div>
          <div class="tier" data-tier="team">
            <small>${t(`${SMALL_MAX + 1} موظفًا فأكثر`, `${SMALL_MAX + 1} employees or more`)}</small>
            <b data-monthly="${m(PRICE)}" data-yearly="${m(YEARLY)}">${m(PRICE)}</b>
            <span>${t("لكل موظف شهريًا", "per employee / month")}</span>
          </div>
        </div>
        <p class="price-note" data-monthly="${t("يُدفع شهريًا، ويمكنك الإلغاء في أي وقت", "Billed monthly, cancel anytime")}" data-yearly="${t("خصم 30% على السنة الأولى عند الدفع السنوي", "30% off your first year when you pay yearly")}">${t("يُدفع شهريًا، ويمكنك الإلغاء في أي وقت", "Billed monthly, cancel anytime")}</p>
        <label class="calc">
          <span>${t("عدد موظفيك", "Your employees")}: <output data-emp>20</output></span>
          <input type="range" min="1" max="200" value="20" data-emp-range aria-label="${t("عدد موظفيك", "Your employees")}">
        </label>
        <label class="calc" data-loc-wrap>
          <span>${t("عدد مواقعك", "Your locations")}: <output data-loc>1</output></span>
          <input type="range" min="1" max="10" value="1" data-loc-range aria-label="${t("عدد مواقعك", "Your locations")}">
        </label>
        <div class="total">
          <small data-monthly="${t("ما ستدفعه شهريًا", "You pay per month")}" data-yearly="${t("ما ستدفعه في السنة الأولى", "You pay for year one")}">${t("ما ستدفعه شهريًا", "You pay per month")}</small>
          <b data-total>${m(PRICE * 20)}</b>
          <s data-was hidden></s>
        </div>
        <a class="btn btn-primary btn-block btn-lg" href="${SIGNUP_URL}">${t("ابدأ تجربتك المجانية — 7 أيام", "Start your 7-day free trial")}</a>
      </div>
      <div class="plan-side">
        <h3>${t("كل هذا مشمول:", "Everything included:")}</h3>
        <ul class="ticks">${included(lang).map((l) => `<li>${l}</li>`).join("")}</ul>
      </div>
    </article>
  </div>
  <div class="big-co">
    <div><b>🏢 ${t("أكثر من 150 موظفًا؟", "More than 150 employees?")}</b> ${t("تواصل معنا للحصول على سعر خاص، ونقل بياناتك السابقة، وتدريب فريقك.", "Talk to us about volume pricing, importing your data and onboarding your team.")}</div>
    <a class="btn btn-ghost" href="${href(lang, "/contact/")}?topic=business">${t("تواصل معنا", "Talk to us")}</a>
  </div>
  <p class="plans-note">${t(`حتى ${SMALL_MAX} موظفين: تدفع عن كل موقع عمل تضيفه في البرنامج، مهما كان عدد الموظفين فيه. من ${SMALL_MAX + 1} موظفًا: تدفع فقط عن الموظفين الذين يُسجَّلون في الشفتات، والمواقع مجانًا. المشرفون في مكتبك مجانًا في الباقتين. الأسعار باليورو ولا تشمل ضريبة القيمة المضافة (BTW/VAT).`, `Up to ${SMALL_MAX} employees: you pay for each location you add, however many people work there. From ${SMALL_MAX + 1} employees: you only pay for employees who get scheduled, and locations are free. Your office staff are free on both. Prices in EUR, excluding VAT.`)}</p>`;
}
