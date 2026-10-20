import { tr, href } from "./layout.mjs";
import { SIGNUP_URL, SUPABASE_URL, SUPABASE_KEY } from "./config.mjs";
import { pricingCards, money, PRICE, YEARLY_FIRST_YEAR_DISCOUNT } from "./plans.mjs";
import { faq } from "./faq.mjs";

export function pricing(lang) {
  const t = tr(lang);
  const m = (n) => money(lang, n);
  const examples = [10, 30, 75, 150];
  return `
<section class="page-head">
  <div class="wrap">
    <span class="pill">🎁 ${t("أول أسبوع ببلاش — من غير فيزا", "Your first week is free — no credit card")}</span>
    <h1>${t("أسعار على قد شركتك", "Pricing that fits your agency")}</h1>
    <p class="lead">${t(`${m(PRICE)} لكل موظف في الشهر، وكل المميزات متضمنة. شركتك تكبر أو تصغر؟ الفاتورة بتتغير معاها.`, `${m(PRICE)} per employee per month, with every feature included. Your agency grows or shrinks? So does your bill.`)}</p>
  </div>
</section>
<section class="pricing-page">
  <div class="wrap">
    ${pricingCards(lang)}
    <h2 class="sec-title small">${t("أمثلة على السعر", "Price examples")}</h2>
    <div class="table-wrap">
      <table class="cmp">
        <thead><tr><th>${t("عدد الموظفين", "Employees")}</th><th>${t("شهري", "Monthly")}</th><th class="us">${t("سنوي — أول سنة", "Yearly — year one")}</th></tr></thead>
        <tbody>${examples.map((n) => `<tr><td>${n}</td><td>${t(`${m(n * PRICE)} في الشهر`, `${m(n * PRICE)} / month`)}</td><td class="us">${t(`${m(Math.round(n * PRICE * 12 * (1 - YEARLY_FIRST_YEAR_DISCOUNT)))} في السنة`, `${m(Math.round(n * PRICE * 12 * (1 - YEARLY_FIRST_YEAR_DISCOUNT)))} / year`)} <s>${m(n * PRICE * 12)}</s></td></tr>`).join("")}</tbody>
      </table>
    </div>
    <div class="pay-box">
      <div>
        <h3>💳 ${t("الدفع", "Payment")}</h3>
        <p>${t("بعد التجربة المجانية، ابعتلنا وهنبعتلك فاتورة تدفعها بالتحويل البنكي. الدفع أونلاين بالكارت جاي قريب.", "After your free trial, message us and we'll send an invoice payable by bank transfer. Online card payment is coming soon.")}</p>
      </div>
      <a class="btn btn-primary" href="${href(lang, "/contact/")}?topic=subscribe">${t("عايز أشترك", "I want to subscribe")}</a>
    </div>
    <h2 class="sec-title small">${t("أسئلة عن الدفع", "Billing questions")}</h2>
    <div class="narrow">${faq(lang, "billing")}</div>
    <div class="final-cta inline">
      <h2>${t("جرّب الأول، وقرّر بعدين.", "Try first, decide later.")}</h2>
      <a class="btn btn-primary btn-lg" href="${SIGNUP_URL}">${t("ابدأ تجربتك المجانية", "Start your free trial")}</a>
    </div>
  </div>
</section>`;
}

export function contact(lang) {
  const t = tr(lang);
  const topics = [
    ["subscribe", t("عايز أشترك بعد التجربة", "I want to subscribe after my trial")],
    ["demo", t("عايز عرض مع حد من الفريق", "I'd like a demo with the team")],
    ["business", t("شركة أكتر من 150 موظف", "Agency with 150+ employees")],
    ["trial", t("محتاج مساعدة في التجربة", "Help with my trial")],
    ["other", t("حاجة تانية", "Something else")],
  ];
  return `
<section class="page-head">
  <div class="wrap">
    <h1>${t("كلّمنا", "Talk to us")}</h1>
    <p class="lead">${t("سيب بياناتك وهنرد عليك في خلال يوم شغل. سواء عايز تشترك، أو عايز حد يوريك البرنامج، أو عندك سؤال.", "Leave your details and we'll reply within one business day — whether you want to subscribe, see a demo, or just have a question.")}</p>
  </div>
</section>
<section class="contact-sec">
  <div class="wrap contact-in">
    <form class="lead-form" data-lead data-url="${SUPABASE_URL}/rest/v1/leads" data-key="${SUPABASE_KEY}" data-lang="${lang}" novalidate>
      <label>${t("عايز إيه؟", "What can we help with?")}
        <select name="topic">${topics.map(([v, l]) => `<option value="${v}">${l}</option>`).join("")}</select>
      </label>
      <div class="two">
        <label>${t("اسمك", "Your name")} *<input name="name" required maxlength="120" autocomplete="name"></label>
        <label>${t("اسم الشركة", "Company")}<input name="company" maxlength="160" autocomplete="organization"></label>
      </div>
      <div class="two">
        <label>${t("الإيميل", "Email")} *<input name="email" type="email" required maxlength="200" autocomplete="email" dir="ltr"></label>
        <label>${t("الموبايل / واتساب", "Phone / WhatsApp")}<input name="phone" type="tel" maxlength="40" autocomplete="tel" dir="ltr"></label>
      </div>
      <label>${t("عدد الموظفين عندك", "How many employees?")}
        <select name="employees">
          <option value="">—</option><option>1-15</option><option>16-50</option><option>51-150</option><option>150+</option>
        </select>
      </label>
      <label>${t("رسالتك", "Message")}<textarea name="message" rows="5" maxlength="2000"></textarea></label>
      <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
      <label class="consent"><input type="checkbox" name="consent" required> <span>${t(`موافق إنكم تتواصلوا معايا بخصوص طلبي، حسب <a href="${href(lang, "/privacy/")}">سياسة الخصوصية</a>.`, `I agree to be contacted about my request, as described in the <a href="${href(lang, "/privacy/")}">privacy policy</a>.`)}</span></label>
      <button class="btn btn-primary btn-lg btn-block" type="submit">${t("ابعت", "Send")}</button>
      <p class="form-msg" role="status" aria-live="polite"
        data-ok="${t("✓ وصلتنا رسالتك! هنرد عليك في خلال يوم شغل.", "✓ Got it! We'll get back to you within one business day.")}"
        data-err="${t("حصلت مشكلة في الإرسال. جرّب تاني كمان شوية.", "Something went wrong. Please try again in a moment.")}"
        data-invalid="${t("اكتب اسمك وإيميل صحيح، ووافق على التواصل.", "Please enter your name, a valid email, and tick the consent box.")}"
        data-sending="${t("بيتبعت…", "Sending…")}"></p>
    </form>
    <aside class="contact-side">
      <div class="side-card">
        <h3>🎁 ${t("لسه ما جربتش؟", "Haven't tried it yet?")}</h3>
        <p>${t("ابدأ أسبوعك المجاني دلوقتي، من غير فيزا.", "Start your free week now — no credit card.")}</p>
        <a class="btn btn-primary btn-block" href="${SIGNUP_URL}">${t("ابدأ مجاناً", "Start free")}</a>
      </div>
      <div class="side-card">
        <h3>⏱️ ${t("بنرد بسرعة", "Fast replies")}</h3>
        <p>${t("بنرد على كل رسالة في خلال يوم شغل، وغالباً في نفس اليوم.", "We answer every message within one business day — usually the same day.")}</p>
      </div>
      <div class="side-card">
        <h3>🇪🇺 ${t("بياناتك في أمان", "Your data is safe")}</h3>
        <p>${t("بنستخدم بياناتك بس عشان نرد عليك.", "We only use your details to reply to you.")}</p>
      </div>
    </aside>
  </div>
</section>`;
}

const legal = (lang, title, updated, sections) => {
  const t = tr(lang);
  return `
<section class="page-head"><div class="wrap"><h1>${title}</h1><p class="lead">${t("آخر تحديث", "Last updated")}: ${updated}</p></div></section>
<section class="legal"><div class="wrap narrow">${sections.map(([h, p]) => `<h2>${h}</h2><p>${p}</p>`).join("")}</div></section>`;
};

export function privacy(lang) {
  const t = tr(lang);
  return legal(lang, t("سياسة الخصوصية", "Privacy policy"), t("20 أكتوبر 2026", "20 October 2026"), [
    [t("مين إحنا", "Who we are"), t("Rosterzo برنامج لجداول الشفتات لشركات التوظيف. السياسة دي بتشرح إزاي بنتعامل مع البيانات في الموقع ده وفي البرنامج.", "Rosterzo is shift-scheduling software for staffing agencies. This policy explains how we handle data on this website and in the app.")],
    [t("البيانات اللي بنجمعها", "What we collect"), t("من فورم التواصل: الاسم، والشركة، والإيميل، والموبايل، وعدد الموظفين، ورسالتك. في البرنامج: إيميل الحساب، وبيانات شركتك اللي انت بتدخلها (فنادق، موظفين، شفتات، ساعات).", "From the contact form: name, company, email, phone, company size and your message. In the app: your account email and the company data you enter (hotels, employees, shifts, hours).")],
    [t("ليه بنجمعها", "Why"), t("عشان نرد عليك، ونشغّل البرنامج ليك. مش بنبيع بياناتك ولا بنستخدمها في إعلانات.", "To reply to you and to run the service for you. We never sell your data or use it for advertising.")],
    [t("فين بتتخزن", "Where it is stored"), t("على سيرفرات Supabase في أوروبا، والموقع مستضاف على Cloudflare. كل شركة شايفة بياناتها بس.", "On Supabase servers in Europe; the website is hosted on Cloudflare. Each company can only access its own data.")],
    [t("حقوقك", "Your rights"), t("تقدر تطلب نسخة من بياناتك، أو تعديلها، أو مسحها في أي وقت من صفحة التواصل. ولو انت في الاتحاد الأوروبي فليك كل الحقوق اللي في قانون GDPR.", "You can request a copy, correction or deletion of your data at any time via the contact page. If you're in the EU, you have all rights under the GDPR.")],
    [t("الكوكيز", "Cookies"), t("الموقع ده مش بيستخدم كوكيز تتبع ولا إعلانات. البرنامج بيحفظ بس اللي محتاجه عشان تفضل مسجل دخول.", "This website uses no tracking or advertising cookies. The app only stores what it needs to keep you signed in.")],
  ]);
}

export function terms(lang) {
  const t = tr(lang);
  return legal(lang, t("شروط الاستخدام", "Terms of use"), t("20 أكتوبر 2026", "20 October 2026"), [
    [t("التجربة المجانية", "Free trial"), t("كل شركة جديدة بتاخد 7 أيام تجربة مجانية بكل المميزات، من غير فيزا. بعد التجربة الحساب بيتقفل للتعديل لحد الاشتراك، وبياناتك مش بتتمسح.", "Every new company gets a 7-day free trial with all features and no card. Afterwards the account is paused for editing until you subscribe; your data is not deleted.")],
    [t("الاشتراك والدفع", "Subscription and payment"), t("السعر على كل موظف بيتحط في شفتات، شهري أو سنوي. السنوي عليه خصم 30% على أول سنة بس، وبعدها بيتجدد بالسعر العادي إلا لو اتفقنا على غير كده. الأسعار باليورو من غير الضريبة، والدفع حالياً بالتحويل البنكي بفاتورة.", "Pricing is per scheduled employee, billed monthly or yearly. Yearly billing gets 30% off the first year only, then renews at the regular price unless agreed otherwise. Prices are in EUR excluding VAT; payment is currently by bank transfer against an invoice.")],
    [t("الإلغاء", "Cancellation"), t("تقدر توقف الاشتراك الشهري في أي وقت، والإلغاء بيسري من الشهر اللي بعده.", "Monthly billing can be cancelled anytime, effective from the next billing month.")],
    [t("بياناتك", "Your data"), t("بياناتك ملكك. تقدر تطلب نسخة منها أو مسحها في أي وقت.", "Your data belongs to you. You can request an export or deletion at any time.")],
    [t("الاستخدام المسموح", "Acceptable use"), t("ممنوع استخدام البرنامج في أي حاجة مخالفة للقانون أو محاولة الوصول لبيانات شركات تانية.", "Don't use the service for anything unlawful or try to access other companies' data.")],
    [t("المسؤولية", "Liability"), t("بنعمل كل اللي نقدر عليه عشان البرنامج يفضل شغال وبياناتك في أمان، لكن البرنامج بيتقدّم «زي ما هو». الشروط دي ممكن تتحدث، وهنبلغك بأي تغيير مهم.", "We do our best to keep the service running and your data safe, but it is provided “as is”. These terms may be updated; we'll tell you about important changes.")],
  ]);
}

export function notFound(lang) {
  const t = tr(lang);
  return `<section class="page-head nf"><div class="wrap"><h1>404</h1><p class="lead">${t("الصفحة دي مش موجودة.", "This page doesn't exist.")}</p><a class="btn btn-primary" href="${href(lang, "/")}">${t("ارجع للرئيسية", "Back home")}</a></div></section>`;
}
