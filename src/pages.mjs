import { tr, href } from "./layout.mjs";
import { SIGNUP_URL, SUPABASE_URL, SUPABASE_KEY } from "./config.mjs";
import { pricingCards, money, charm, PRICE, SMALL_PRICE, SMALL_MAX, YEARLY_FIRST_YEAR_DISCOUNT } from "./plans.mjs";
import { faq } from "./faq.mjs";

export function pricing(lang) {
  const t = tr(lang);
  const m = (n) => money(lang, n);
  // [label, monthly price]
  const examples = [
    [t(`حتى ${SMALL_MAX} موظفين، موقع واحد`, `Up to ${SMALL_MAX} employees, 1 location`), SMALL_PRICE],
    [t(`حتى ${SMALL_MAX} موظفين، 3 مواقع`, `Up to ${SMALL_MAX} employees, 3 locations`), SMALL_PRICE * 3],
    ...[30, 75, 150].map((n) => [t(`${n} موظفًا`, `${n} employees`), n * PRICE]),
  ];
  return `
<section class="page-head">
  <div class="wrap">
    <span class="pill">🎁 ${t("الأسبوع الأول مجانًا — دون بطاقة ائتمان", "Your first week is free — no credit card")}</span>
    <h1>${t("أسعار تناسب حجم شركتك", "Pricing that fits your agency")}</h1>
    <p class="lead">${t(`${m(SMALL_PRICE)} لكل موقع شهريًا للشركات حتى ${SMALL_MAX} موظفين، أو ${m(PRICE)} لكل موظف شهريًا من ${SMALL_MAX + 1} موظفًا. جميع المميزات مشمولة في الحالتين.`, `${m(SMALL_PRICE)} per location per month for companies with up to ${SMALL_MAX} employees, and ${m(PRICE)} per employee per month from ${SMALL_MAX + 1} employees. Every feature included either way.`)}</p>
  </div>
</section>
<section class="pricing-page">
  <div class="wrap">
    ${pricingCards(lang)}
    <h2 class="sec-title small">${t("أمثلة على السعر", "Price examples")}</h2>
    <div class="table-wrap">
      <table class="cmp">
        <thead><tr><th>${t("حجم الشركة", "Company size")}</th><th>${t("شهري", "Monthly")}</th><th class="us">${t("سنوي — السنة الأولى", "Yearly — year one")}</th></tr></thead>
        <tbody>${examples.map(([label, p]) => `<tr><td>${label}</td><td>${t(`${m(p)} شهريًا`, `${m(p)} / month`)}</td><td class="us">${t(`${m(charm(p * 12 * (1 - YEARLY_FIRST_YEAR_DISCOUNT)))} سنويًا`, `${m(charm(p * 12 * (1 - YEARLY_FIRST_YEAR_DISCOUNT)))} / year`)} <s>${m(p * 12)}</s></td></tr>`).join("")}</tbody>
      </table>
    </div>
    <div class="pay-box">
      <div>
        <h3>💳 ${t("الدفع", "Payment")}</h3>
        <p>${t("بعد التجربة المجانية، راسلنا وسنرسل إليك فاتورة تدفعها بالتحويل البنكي. الدفع الإلكتروني بالبطاقة سيتوفر قريبًا.", "After your free trial, message us and we'll send an invoice payable by bank transfer. Online card payment is coming soon.")}</p>
      </div>
      <a class="btn btn-primary" href="${href(lang, "/contact/")}?topic=subscribe">${t("أريد الاشتراك", "I want to subscribe")}</a>
    </div>
    <h2 class="sec-title small">${t("أسئلة عن الدفع", "Billing questions")}</h2>
    <div class="narrow">${faq(lang, "billing")}</div>
    <div class="final-cta inline">
      <h2>${t("جرّب أولًا، ثم قرّر.", "Try first, decide later.")}</h2>
      <a class="btn btn-primary btn-lg" href="${SIGNUP_URL}">${t("ابدأ تجربتك المجانية", "Start your free trial")}</a>
    </div>
  </div>
</section>`;
}

export function contact(lang) {
  const t = tr(lang);
  const topics = [
    ["subscribe", t("أريد الاشتراك بعد التجربة", "I want to subscribe after my trial")],
    ["demo", t("أريد عرضًا مع أحد أفراد الفريق", "I'd like a demo with the team")],
    ["business", t("شركة فيها أكثر من 150 موظفًا", "Agency with 150+ employees")],
    ["trial", t("أحتاج إلى مساعدة في التجربة", "Help with my trial")],
    ["other", t("أمر آخر", "Something else")],
  ];
  return `
<section class="page-head">
  <div class="wrap">
    <h1>${t("تواصل معنا", "Talk to us")}</h1>
    <p class="lead">${t("اترك بياناتك وسنرد عليك خلال يوم عمل واحد، سواء أردت الاشتراك، أو عرضًا للبرنامج، أو كان لديك سؤال.", "Leave your details and we'll reply within one business day — whether you want to subscribe, see a demo, or just have a question.")}</p>
  </div>
</section>
<section class="contact-sec">
  <div class="wrap contact-in">
    <form class="lead-form" data-lead data-url="${SUPABASE_URL}/rest/v1/leads" data-key="${SUPABASE_KEY}" data-lang="${lang}" novalidate>
      <label>${t("كيف يمكننا مساعدتك؟", "What can we help with?")}
        <select name="topic">${topics.map(([v, l]) => `<option value="${v}">${l}</option>`).join("")}</select>
      </label>
      <div class="two">
        <label>${t("اسمك", "Your name")} *<input name="name" required maxlength="120" autocomplete="name"></label>
        <label>${t("اسم الشركة", "Company")}<input name="company" maxlength="160" autocomplete="organization"></label>
      </div>
      <div class="two">
        <label>${t("البريد الإلكتروني", "Email")} *<input name="email" type="email" required maxlength="200" autocomplete="email" dir="ltr"></label>
        <label>${t("الهاتف / واتساب", "Phone / WhatsApp")}<input name="phone" type="tel" maxlength="40" autocomplete="tel" dir="ltr"></label>
      </div>
      <label>${t("عدد موظفيك", "How many employees?")}
        <select name="employees">
          <option value="">—</option><option>1-15</option><option>16-50</option><option>51-150</option><option>150+</option>
        </select>
      </label>
      <label>${t("رسالتك", "Message")}<textarea name="message" rows="5" maxlength="2000"></textarea></label>
      <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
      <label class="consent"><input type="checkbox" name="consent" required> <span>${t(`أوافق على أن تتواصلوا معي بخصوص طلبي، وفق <a href="${href(lang, "/privacy/")}">سياسة الخصوصية</a>.`, `I agree to be contacted about my request, as described in the <a href="${href(lang, "/privacy/")}">privacy policy</a>.`)}</span></label>
      <button class="btn btn-primary btn-lg btn-block" type="submit">${t("إرسال", "Send")}</button>
      <p class="form-msg" role="status" aria-live="polite"
        data-ok="${t("✓ وصلتنا رسالتك! سنرد عليك خلال يوم عمل واحد.", "✓ Got it! We'll get back to you within one business day.")}"
        data-err="${t("حدثت مشكلة في الإرسال. حاول مرة أخرى بعد قليل.", "Something went wrong. Please try again in a moment.")}"
        data-invalid="${t("أدخل اسمك وبريدًا إلكترونيًا صحيحًا، ووافق على التواصل.", "Please enter your name, a valid email, and tick the consent box.")}"
        data-sending="${t("جاري الإرسال…", "Sending…")}"></p>
    </form>
    <aside class="contact-side">
      <div class="side-card">
        <h3>🎁 ${t("لم تجرّبه بعد؟", "Haven't tried it yet?")}</h3>
        <p>${t("ابدأ أسبوعك المجاني الآن، دون بطاقة ائتمان.", "Start your free week now — no credit card.")}</p>
        <a class="btn btn-primary btn-block" href="${SIGNUP_URL}">${t("ابدأ مجانًا", "Start free")}</a>
      </div>
      <div class="side-card">
        <h3>⏱️ ${t("نرد بسرعة", "Fast replies")}</h3>
        <p>${t("نرد على كل رسالة خلال يوم عمل واحد، وغالبًا في اليوم نفسه.", "We answer every message within one business day — usually the same day.")}</p>
      </div>
      <div class="side-card">
        <h3>🇪🇺 ${t("بياناتك آمنة", "Your data is safe")}</h3>
        <p>${t("نستخدم بياناتك فقط للرد عليك.", "We only use your details to reply to you.")}</p>
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
    [t("مَن نحن", "Who we are"), t("Rosterzo برنامج لجداول الشفتات لكل عمل يعتمد على الشفتات. توضح هذه السياسة كيف نتعامل مع البيانات في هذا الموقع وفي البرنامج.", "Rosterzo is shift-scheduling software for shift-based businesses. This policy explains how we handle data on this website and in the app.")],
    [t("البيانات التي نجمعها", "What we collect"), t("من نموذج التواصل: الاسم، والشركة، والبريد الإلكتروني، ورقم الهاتف، وعدد الموظفين، ورسالتك. في البرنامج: البريد الإلكتروني للحساب، وبيانات شركتك التي تدخلها أنت (مواقع العمل، الموظفون، الشفتات، الساعات).", "From the contact form: name, company, email, phone, company size and your message. In the app: your account email and the company data you enter (locations, employees, shifts, hours).")],
    [t("لماذا نجمعها", "Why"), t("للرد عليك، ولتشغيل البرنامج لك. لا نبيع بياناتك ولا نستخدمها في الإعلانات.", "To reply to you and to run the service for you. We never sell your data or use it for advertising.")],
    [t("أين تُخزَّن", "Where it is stored"), t("على خوادم Supabase في أوروبا، والموقع مستضاف على Cloudflare. كل شركة ترى بياناتها فقط.", "On Supabase servers in Europe; the website is hosted on Cloudflare. Each company can only access its own data.")],
    [t("حقوقك", "Your rights"), t("يمكنك طلب نسخة من بياناتك، أو تعديلها، أو حذفها في أي وقت من صفحة التواصل. وإذا كنت في الاتحاد الأوروبي فلك جميع الحقوق الواردة في اللائحة العامة لحماية البيانات (GDPR).", "You can request a copy, correction or deletion of your data at any time via the contact page. If you're in the EU, you have all rights under the GDPR.")],
    [t("ملفات تعريف الارتباط", "Cookies"), t("هذا الموقع لا يستخدم ملفات تعريف ارتباط للتتبع أو الإعلانات. يحفظ البرنامج فقط ما يلزم لإبقائك مسجَّل الدخول.", "This website uses no tracking or advertising cookies. The app only stores what it needs to keep you signed in.")],
  ]);
}

export function terms(lang) {
  const t = tr(lang);
  return legal(lang, t("شروط الاستخدام", "Terms of use"), t("20 أكتوبر 2026", "20 October 2026"), [
    [t("التجربة المجانية", "Free trial"), t("تحصل كل شركة جديدة على تجربة مجانية لمدة 7 أيام بجميع المميزات، دون بطاقة ائتمان. بعد التجربة يُغلق الحساب أمام التعديل إلى حين الاشتراك، ولا تُحذف بياناتك.", "Every new company gets a 7-day free trial with all features and no card. Afterwards the account is paused for editing until you subscribe; your data is not deleted.")],
    [t("الاشتراك والدفع", "Subscription and payment"), t(`للشركات حتى ${SMALL_MAX} موظفين يُحتسب السعر عن كل موقع عمل، وللشركات من ${SMALL_MAX + 1} موظفًا يُحتسب عن كل موظف يُسجَّل في الشفتات، شهريًا أو سنويًا. للاشتراك السنوي خصم 30% على السنة الأولى فقط، ثم يتجدد بالسعر العادي ما لم نتفق على غير ذلك. الأسعار باليورو ولا تشمل الضريبة، والدفع حاليًا بالتحويل البنكي بفاتورة.`, `Companies with up to ${SMALL_MAX} employees are priced per location; companies with ${SMALL_MAX + 1} or more are priced per scheduled employee, billed monthly or yearly. Yearly billing gets 30% off the first year only, then renews at the regular price unless agreed otherwise. Prices are in EUR excluding VAT; payment is currently by bank transfer against an invoice.`)],
    [t("الإلغاء", "Cancellation"), t("يمكنك إلغاء الاشتراك الشهري في أي وقت، ويسري الإلغاء من الشهر التالي.", "Monthly billing can be cancelled anytime, effective from the next billing month.")],
    [t("بياناتك", "Your data"), t("بياناتك ملك لك. يمكنك طلب نسخة منها أو حذفها في أي وقت.", "Your data belongs to you. You can request an export or deletion at any time.")],
    [t("الاستخدام المسموح", "Acceptable use"), t("يُمنع استخدام البرنامج في أي أمر مخالف للقانون أو محاولة الوصول إلى بيانات شركات أخرى.", "Don't use the service for anything unlawful or try to access other companies' data.")],
    [t("المسؤولية", "Liability"), t("نبذل كل ما في وسعنا ليبقى البرنامج متاحًا وبياناتك آمنة، لكن البرنامج يُقدَّم «كما هو». قد تُحدَّث هذه الشروط، وسنبلغك بأي تغيير مهم.", "We do our best to keep the service running and your data safe, but it is provided “as is”. These terms may be updated; we'll tell you about important changes.")],
  ]);
}

export function notFound(lang) {
  const t = tr(lang);
  return `<section class="page-head nf"><div class="wrap"><h1>404</h1><p class="lead">${t("هذه الصفحة غير موجودة.", "This page doesn't exist.")}</p><a class="btn btn-primary" href="${href(lang, "/")}">${t("العودة إلى الرئيسية", "Back home")}</a></div></section>`;
}
