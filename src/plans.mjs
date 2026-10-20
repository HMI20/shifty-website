import { tr, href } from "./layout.mjs";
import { SIGNUP_URL } from "./config.mjs";

// Monthly prices in EUR, excluding VAT. Yearly billing = 2 months free.
export const PLANS = [
  { key: "starter", monthly: 29, yearly: 24 },
  { key: "pro", monthly: 69, yearly: 57, popular: true },
  { key: "business", monthly: 149, yearly: 124, from: true },
];

function planText(t, key) {
  return {
    starter: {
      name: t("البداية", "Starter"),
      who: t("لشركة صغيرة بتبدأ تنظّم شغلها", "For a small agency getting organised"),
      limits: [t("لحد 15 موظف", "Up to 15 employees"), t("لحد 3 فنادق أو مواقع", "Up to 3 hotels or sites")],
      items: [t("لوحة الأسبوع بالسحب والإفلات", "Drag-and-drop weekly board"), t("لينك خاص لكل فندق", "Private link for every hotel"), t("منع الحجز المزدوج والتعارضات", "No double bookings or clashes"), t("ساعات الشهر وتنزيل Excel", "Monthly hours + Excel export"), t("صورة الجدول للواتساب", "Schedule image for WhatsApp")],
      cta: t("ابدأ التجربة المجانية", "Start free trial"),
    },
    pro: {
      name: t("المحترفين", "Pro"),
      who: t("لشركة شغالة في فنادق كتير", "For an agency running many hotels"),
      limits: [t("لحد 50 موظف", "Up to 50 employees"), t("فنادق ومواقع بلا حدود", "Unlimited hotels and sites")],
      items: [t("كل حاجة في البداية", "Everything in Starter"), t("جداول ثابتة ومتغيرة لكل فندق", "Fixed and changing schedules per hotel"), t("تعديل ساعات الحضور بدري ومتأخر", "Early/late hours adjustments"), t("تقارير تغطية الفنادق", "Hotel coverage reports"), t("دعم سريع على الواتساب والإيميل", "Priority support")],
      cta: t("ابدأ التجربة المجانية", "Start free trial"),
    },
    business: {
      name: t("الشركات", "Business"),
      who: t("لشركة كبيرة محتاجة إعداد خاص", "For larger agencies with special needs"),
      limits: [t("موظفين بلا حدود", "Unlimited employees"), t("فنادق ومواقع بلا حدود", "Unlimited hotels and sites")],
      items: [t("كل حاجة في المحترفين", "Everything in Pro"), t("نقل بياناتك القديمة لينا", "We import your existing data"), t("تدريب لفريقك", "Onboarding for your team"), t("مشرفين بصلاحيات (قريباً)", "Supervisor roles (soon)"), t("مسؤول حساب خاص بيك", "A dedicated account manager")],
      cta: t("كلّمنا", "Talk to us"),
    },
  }[key];
}

export function pricingCards(lang) {
  const t = tr(lang);
  const money = (n) => (lang === "ar" ? `${n}€` : `€${n}`);
  return `
  <div class="billing-toggle" role="group" aria-label="${t("طريقة الدفع", "Billing period")}">
    <button type="button" data-billing="monthly" aria-pressed="true">${t("شهري", "Monthly")}</button>
    <button type="button" data-billing="yearly" aria-pressed="false">${t("سنوي", "Yearly")} <span class="save">${t("شهرين ببلاش", "2 months free")}</span></button>
  </div>
  <div class="plans">
    ${PLANS.map((p) => {
      const x = planText(t, p.key);
      const ctaHref = p.key === "business" ? href(lang, "/contact/") + "?topic=business" : SIGNUP_URL;
      return `
    <article class="plan${p.popular ? " popular" : ""}">
      ${p.popular ? `<span class="plan-badge">${t("الأكثر اختياراً", "Most popular")}</span>` : ""}
      <h3>${x.name}</h3>
      <p class="plan-who">${x.who}</p>
      <div class="price">
        ${p.from ? `<small>${t("يبدأ من", "From")}</small>` : ""}
        <b data-monthly="${money(p.monthly)}" data-yearly="${money(p.yearly)}">${money(p.monthly)}</b>
        <span>${t("في الشهر", "/ month")}</span>
      </div>
      <p class="price-note" data-monthly="${t("بيتدفع كل شهر", "Billed monthly")}" data-yearly="${t(`${p.yearly * 12}€ بيتدفعوا مرة في السنة`, `€${p.yearly * 12} billed once a year`)}">${t("بيتدفع كل شهر", "Billed monthly")}</p>
      <ul class="limits">${x.limits.map((l) => `<li>${l}</li>`).join("")}</ul>
      <ul class="ticks">${x.items.map((l) => `<li>${l}</li>`).join("")}</ul>
      <a class="btn ${p.popular ? "btn-primary" : "btn-ghost"} btn-block" href="${ctaHref}">${x.cta}</a>
    </article>`;
    }).join("")}
  </div>
  <p class="plans-note">${t("كل الأسعار باليورو ومن غير ضريبة القيمة المضافة (BTW/VAT). كل الباقات فيها تجربة مجانية 7 أيام بكل المميزات — من غير فيزا ومن غير أي التزام.", "All prices in EUR, excluding VAT. Every plan starts with a 7-day free trial with all features — no credit card, no commitment.")}</p>`;
}
