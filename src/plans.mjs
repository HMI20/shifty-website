import { tr, href } from "./layout.mjs";
import { SIGNUP_URL } from "./config.mjs";

// One price for everything: EUR per scheduled employee per month, excluding VAT.
// Paying yearly takes 30% off the first year.
export const PRICE = 4;
export const YEARLY_FIRST_YEAR_DISCOUNT = 0.3;
const YEARLY = +(PRICE * (1 - YEARLY_FIRST_YEAR_DISCOUNT)).toFixed(2);

export const money = (lang, n) => {
  const s = Number.isInteger(n) ? String(n) : n.toFixed(2);
  return lang === "ar" ? `${s}€` : `€${s}`;
};

export function included(lang) {
  const t = tr(lang);
  return [
    t("فروع ومواقع عمل بلا حدود", "Unlimited locations"),
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
  <div class="plans one" data-price data-price-monthly="${PRICE}" data-price-yearly="${YEARLY}">
    <article class="plan popular">
      <span class="plan-badge">${t("سعر واحد. جميع المميزات.", "One price. Every feature.")}</span>
      <div class="plan-main">
        <div class="price">
          <b data-monthly="${m(PRICE)}" data-yearly="${m(YEARLY)}">${m(PRICE)}</b>
          <span>${t("لكل موظف شهريًا", "per employee / month")}</span>
        </div>
        <p class="price-note" data-monthly="${t("يُدفع شهريًا، ويمكنك الإلغاء في أي وقت", "Billed monthly, cancel anytime")}" data-yearly="${t(`بدلًا من ${m(PRICE)} — خصم 30% على السنة الأولى عند الدفع السنوي`, `Instead of ${m(PRICE)} — 30% off your first year when you pay yearly`)}">${t("يُدفع شهريًا، ويمكنك الإلغاء في أي وقت", "Billed monthly, cancel anytime")}</p>
        <label class="calc">
          <span>${t("عدد موظفيك", "Your employees")}: <output data-emp>20</output></span>
          <input type="range" min="1" max="200" value="20" data-emp-range aria-label="${t("عدد موظفيك", "Your employees")}">
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
  <p class="plans-note">${t("تدفع فقط عن الموظفين الذين يُسجَّلون في الشفتات. الفروع والعملاء والمشرفون في مكتبك مجانًا. الأسعار باليورو ولا تشمل ضريبة القيمة المضافة (BTW/VAT).", "You only pay for employees who get scheduled. Locations, clients and your office staff are free. Prices in EUR, excluding VAT.")}</p>`;
}
