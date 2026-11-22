import { tr, href } from "./layout.mjs";
import { SIGNUP_URL, DEMO_URL } from "./config.mjs";
import { boardDemo, hotelDemo, rulesDemo, hoursDemo, imageDemo, syncDemo } from "./demos.mjs";
import { pricingCards, money, PRICE, SMALL_PRICE, SMALL_MAX } from "./plans.mjs";
import { faq } from "./faq.mjs";

export function home(lang) {
  const t = tr(lang);
  const features = [
    {
      id: "board", tag: t("اللوحة", "The board"), demo: boardDemo(lang),
      title: t("اسحب الاسم، ضعه في الشفت، وانتهى الأمر.", "Drag a name into a shift. Done."),
      text: t("جميع مواقع عملك وجميع موظفيك في شاشة واحدة. الأسبوع كله أمامك: الصباح والمساء والليل. اسحب أي موظف إلى أي شفت، أو اضغط على الخانة واختر من الهاتف.", "All your locations and all your people on one screen. The whole week at a glance — morning, evening and night. Drag anyone into any shift, or tap a cell and pick from your phone."),
      points: [t("لكل موظف لون، فتميّزه بنظرة", "Every employee gets a colour you spot instantly"), t("عدّاد لكل شفت: المغطى من المطلوب", "Every shift shows filled vs requested"), t("الشفتات المتتالية تُدمج في اسم واحد ممتد", "Back-to-back shifts merge into one long bar"), t("انسخ الأسبوع الماضي بضغطة واحدة", "Copy last week in one click")],
    },
    {
      id: "hotel", tag: t("رابط لكل موقع", "Location link"), demo: hotelDemo(lang),
      title: t("كل فرع أو عميل يرسل طلباته بنفسه. دون أي مكالمة.", "Each branch or client sends its own requests. No phone calls."),
      text: t("يحصل كل فرع أو عميل على رابط خاص به. يفتحه المدير هناك من الهاتف دون حساب، ويحدد عدد الأشخاص الذين يحتاجهم في كل شفت للأسبوع القادم. يظهر الطلب على لوحتك في اللحظة نفسها.", "Each branch or client gets its own private link. Their manager opens it on a phone — no account — and say how many people they need per shift next week. It lands on your board instantly."),
      points: [t("العميل لا يرى أسماء موظفيك", "Clients never see your employees' names"), t("أرسل الرابط عبر واتساب بضغطة واحدة", "Send the link on WhatsApp in one tap"), t("موقع جدوله ثابت؟ أنشئ له قالبًا مرة واحدة", "Fixed-schedule location? Set a template once"), t("الشفتات غير المسندة إليك تُغلق تلقائيًا", "Shifts that aren't yours close automatically")],
    },
    {
      id: "rules", tag: t("بلا أخطاء", "Zero mistakes"), demo: rulesDemo(lang),
      title: t("الأخطاء التي تكلفك مالًا… لم تعد ممكنة.", "The mistakes that cost you money can't happen anymore."),
      text: t("الموظف نفسه في موقعين في الوقت نفسه؟ موظف في شفت أبلغ أنه غير متاح فيه؟ عدد أكبر مما طلبه الفرع أو العميل؟ Rosterzo يرفض ذلك تلقائيًا — لا على الشاشة فقط، بل في قاعدة البيانات نفسها.", "The same person in two places at once? Someone in a shift they said they can't do? More people than the location asked for? Rosterzo refuses all of it — not just on screen, but in the database itself."),
      points: [t("لا حجز مزدوج في أي موقع", "No double booking across any location"), t("الأيام والشفتات غير المتاح فيها كل موظف", "Each employee's unavailable shifts"), t("كل موظف يعمل فقط في المواقع المسموح له بها", "Employees only work at their allowed locations"), t("أثناء السحب، تظهر الخانات غير المسموحة مخططة", "While dragging, blocked cells are striped")],
    },
    {
      id: "hours", tag: t("الساعات", "Hours"), demo: hoursDemo(lang),
      title: t("نهاية الشهر؟ الساعات جاهزة.", "End of the month? Hours are ready."),
      text: t("لكل موقع مواعيد شفتات خاصة به، ويحسب Rosterzo ساعات كل موظف وكل موقع تلقائيًا. حضر أحدهم مبكرًا أو انصرف متأخرًا؟ زِد أو قلِّل نصف ساعة، وانقلها إلى زميله في الخطوة نفسها.", "Every location has its own shift times, and Rosterzo counts the hours per employee and per location for you. Someone came early or left late? Add or remove half-hours and move them to the colleague next to them in the same step."),
      points: [t("ملخص الشهر لكل موظف ولكل موقع", "Monthly summary per employee and per location"), t("نسبة تغطية كل موقع", "Coverage percentage per location"), t("تنزيل Excel للمحاسب في ثوانٍ", "Excel download for your accountant"), t("تغيير المواعيد لا يؤثر في الأشهر الماضية", "Changing times never rewrites the past")],
    },
    {
      id: "image", tag: t("واتساب", "WhatsApp"), demo: imageDemo(lang),
      title: t("الجدول صورة أنيقة… مباشرة إلى مجموعة واتساب.", "The schedule as a clean image. Straight to WhatsApp."),
      text: t("بدلًا من تصوير الشاشة وقصّها، اضغط «صورة الجدول» وأرسلها إلى مجموعة الفرع أو العميل أو الموظفين من الهاتف مباشرة. واضحة، بالألوان، وبمواعيد كل شفت.", "Instead of screenshots and cropping, tap “Schedule image” and share it to the branch, client or staff group right from your phone. Clear, colour-coded, with every shift's times."),
      points: [t("مشاركة مباشرة من الهاتف", "Share directly from your phone"), t("تنزيل أو نسخ الصورة", "Download or copy the image"), t("طباعة الأسبوع إن احتجت نسخة ورقية", "Print the week if you need paper")],
    },
    {
      id: "sync", tag: t("أينما كنت", "Everywhere"), demo: syncDemo(lang),
      title: t("من المكتب أو من الهاتف. كل شيء متزامن.", "From the office or your phone. Always in sync."),
      text: t("أي تعديل يظهر على جميع الشاشات المفتوحة في اللحظة نفسها — عندك، وعند زميلك، وعلى هاتفك. لا مزيد من «مَن لديه آخر نسخة من الملف؟».", "Every change shows up on every open screen instantly — yours, your colleague's and your phone. No more “who has the latest version of the sheet?”."),
      points: [t("واجهة مخصصة للهاتف ببطاقات الأيام", "A phone layout with day cards"), t("لا يحتاج إلى تثبيت", "Nothing to install"), t("بياناتك مخزَّنة في أوروبا ومؤمَّنة", "Data stored securely in Europe")],
    },
  ];

  const more = [
    ["📋", t("نسخ الأسبوع الماضي", "Copy last week")],
    ["🗓️", t("قالب ثابت لكل موقع", "Fixed weekly templates")],
    ["⏰", t("مواعيد شفتات لكل موقع", "Shift times per location")],
    ["🚫", t("أوقات عدم التوفر", "Unavailable shifts")],
    ["🎨", t("لون لكل موظف", "A colour per employee")],
    ["🔢", t("عدد شفتات كل موظف في الأسبوع", "Weekly shift count per person")],
    ["🖨️", t("طباعة الجدول", "Print the schedule")],
    ["🌙", t("ربط شفت الليل بالصباح", "Night-to-morning continuity")],
  ];

  return `
<section class="hero">
  <div class="hero-glow" aria-hidden="true"></div>
  <div class="wrap hero-in">
    <div class="hero-copy">
      <span class="pill">🎁 ${t("تجربة مجانية 7 أيام — دون بطاقة ائتمان", "7-day free trial — no credit card")}</span>
      <h1>${t("جداول الشفتات لكل مواقع عملك<br><span class=\"grad\">في دقائق، لا ساعات.</span>", "Shift schedules for every location.<br><span class=\"grad\">Done in minutes, not hours.</span>")}</h1>
      <p class="lead">${t("Rosterzo لكل عمل يعتمد على الشفتات: فنادق، مطاعم، مستشفيات، أمن، مخازن، وشركات التوظيف التي توزّع موظفيها على أكثر من موقع. كل موقع يطلب العدد الذي يحتاجه، وأنت توزّع بالسحب، والبرنامج يمنع أي خطأ ويحسب الساعات تلقائيًا.", "Rosterzo is for any business that runs on shifts: hotels, restaurants, healthcare, security, warehouses, and staffing agencies placing people across many sites. Each location asks for the people it needs, you assign with drag and drop, and Rosterzo blocks mistakes and counts the hours for you.")}</p>
      <div class="hero-ctas">
        <a class="btn btn-primary btn-lg" href="${SIGNUP_URL}">${t("ابدأ تجربتك المجانية", "Start your free trial")} <span class="arr">${t("←", "→")}</span></a>
        <a class="btn btn-glass btn-lg" href="${DEMO_URL}" target="_blank" rel="noopener">▶ ${t("جرّبه الآن دون تسجيل", "Try it now — no signup")}</a>
      </div>
      <ul class="hero-trust">
        <li>✓ ${t("دون بطاقة ائتمان", "No credit card")}</li>
        <li>✓ ${t("يعمل على الهاتف", "Works on your phone")}</li>
        <li>✓ ${t("بياناتك في أوروبا", "Data hosted in the EU")}</li>
        <li>✓ ${t("العربية • English • Nederlands", "English • Nederlands • عربي")}</li>
      </ul>
    </div>
    <div class="hero-visual">${boardDemo(lang).replace('data-demo="board"', 'data-demo="board" data-hero')}</div>
  </div>
</section>

<section class="strip">
  <div class="wrap strip-in">
    <div><b>7</b><span>${t("أيام تجربة مجانية", "free trial days")}</span></div>
    <div><b>0</b><span>${t("حجز مزدوج", "double bookings")}</span></div>
    <div><b>4</b><span>${t("شفتات في اليوم كحد أقصى، بمواعيد كل موقع", "shifts a day at most, timed per location")}</span></div>
    <div><b>3</b><span>${t("لغات: العربية والإنجليزية والهولندية", "languages: Arabic, English, Dutch")}</span></div>
  </div>
</section>

<section class="industries">
  <div class="wrap">
    <h2 class="sec-title">${t("مصمَّم لكل عمل يعتمد على الشفتات", "Built for every business that runs on shifts")}</h2>
    <div class="ind-grid">
      ${[
        ["🏨", t("فنادق", "Hotels")],
        ["🍽️", t("مطاعم ومقاهٍ", "Restaurants & cafés")],
        ["🏥", t("مستشفيات وعيادات", "Healthcare & clinics")],
        ["🛡️", t("أمن وحراسة", "Security")],
        ["📦", t("مخازن ومصانع", "Warehouses & factories")],
        ["🧹", t("نظافة وخدمات", "Cleaning & facilities")],
        ["🛒", t("متاجر وأسواق", "Retail")],
        ["👥", t("شركات توظيف", "Staffing agencies")],
      ].map(([i, l]) => `<div><span>${i}</span>${l}</div>`).join("")}
    </div>
    <p class="sec-sub ind-sub">${t("لديك فرع واحد أو عشرون، أو توزّع موظفيك على عملاء كثيرين؟ لكل موقع مواعيد شفتاته وأعداده، والجميع في لوحة واحدة.", "One location or twenty, or placing people with many clients? Each place has its own shift times and headcounts — all on one board.")}</p>
  </div>
</section>

<section class="pain">
  <div class="wrap">
    <h2 class="sec-title">${t("ما زلت تُعدّ الجدول على Excel وواتساب؟", "Still scheduling with spreadsheets and WhatsApp?")}</h2>
    <div class="pain-grid">
      <div class="pain-card"><span>😩</span><h3>${t("ساعات كل أسبوع", "Hours every week")}</h3><p>${t("ملف لكل فرع أو عميل، ونسخ ولصق، وتعديل بعد تعديل إلى أن يكتمل الجدول.", "A sheet per location, copy-paste, edit after edit until the week finally works.")}</p></div>
      <div class="pain-card"><span>📞</span><h3>${t("مكالمات ورسائل لا تنتهي", "Endless calls and messages")}</h3><p>${t("كل موقع يرسل طلباته بطريقة مختلفة، والتغييرات تضيع في المحادثات.", "Every location sends requests differently, and changes get lost in chats.")}</p></div>
      <div class="pain-card"><span>💸</span><h3>${t("خطأ واحد يكلّف", "One mistake costs money")}</h3><p>${t("موظف في موقعين، أو شفت فارغ، أو ساعات محسوبة خطأ في نهاية الشهر.", "Someone booked twice, a shift left empty, or hours counted wrong at month-end.")}</p></div>
    </div>
    <p class="pain-answer">${t("Rosterzo يحل الثلاثة. 👇", "Rosterzo fixes all three. 👇")}</p>
  </div>
</section>

<section id="features" class="features">
  <div class="wrap">
    ${features.map((f, i) => `
    <div class="feature${i % 2 ? " flip" : ""}" id="f-${f.id}">
      <div class="feature-copy">
        <span class="tag">${f.tag}</span>
        <h2>${f.title}</h2>
        <p>${f.text}</p>
        <ul class="ticks">${f.points.map((p) => `<li>${p}</li>`).join("")}</ul>
      </div>
      <div class="feature-demo">${f.demo}</div>
    </div>`).join("")}

    <div class="more">
      <h3>${t("وأيضًا…", "And also…")}</h3>
      <div class="more-grid">${more.map(([i, l]) => `<div><span>${i}</span>${l}</div>`).join("")}</div>
    </div>
  </div>
</section>

<section class="steps">
  <div class="wrap">
    <h2 class="sec-title">${t("ابدأ في 3 خطوات", "Up and running in 3 steps")}</h2>
    <ol class="steps-grid">
      <li><b>1</b><h3>${t("أنشئ حسابًا", "Create your account")}</h3><p>${t("بريد إلكتروني وكلمة مرور واسم شركتك. دقيقة واحدة.", "Email, password and your company name. One minute.")}</p></li>
      <li><b>2</b><h3>${t("أضف مواقع عملك وموظفيك", "Add locations and staff")}</h3><p>${t("فروعك أو عملاؤك، ثم أرسل إلى كل موقع رابطه عبر واتساب.", "Your branches or clients — then send each one its link on WhatsApp.")}</p></li>
      <li><b>3</b><h3>${t("وزّع الأسبوع", "Fill the week")}</h3><p>${t("اسحب الأسماء إلى الشفتات وأرسل صورة الجدول.", "Drag names into shifts and share the schedule image.")}</p></li>
    </ol>
  </div>
</section>

<section class="live">
  <div class="wrap live-in">
    <div>
      <h2>${t("شاهده بنفسك قبل التسجيل", "See it for yourself before signing up")}</h2>
      <p>${t("افتح نسخة العرض المباشر ببيانات وهمية: 3 مواقع عمل و6 موظفين. اسحب وعدّل وجرّب كل شيء — لن يُحفظ أي شيء.", "Open the live demo with sample data: 3 locations and 6 employees. Drag, edit and try everything — nothing is saved.")}</p>
    </div>
    <a class="btn btn-light btn-lg" href="${DEMO_URL}" target="_blank" rel="noopener">▶ ${t("افتح العرض المباشر", "Open the live demo")}</a>
  </div>
</section>

<section class="roi" id="calculator">
  <div class="wrap roi-in">
    <div class="roi-copy">
      <h2 class="sec-title">${t("احسب كم ستوفّر", "See how much you'd save")}</h2>
      <p>${t("حرّك الأرقام بما يناسب شركتك. الحساب تقديري، على افتراض أن Rosterzo يوفّر نحو 70% من وقت إعداد الجداول ومتابعة الساعات.", "Adjust to match your agency. This is an estimate, assuming Rosterzo saves about 70% of the time spent on schedules and hours.")}</p>
    </div>
    <form class="roi-card" data-roi onsubmit="return false">
      <label>${t("عدد الموظفين", "Employees")} <output data-out="employees">25</output><input type="range" name="employees" min="1" max="200" value="25"></label>
      <label>${t("ساعات إعداد الجداول في الأسبوع", "Hours spent scheduling per week")} <output data-out="hours">8</output><input type="range" name="hours" min="1" max="40" value="8"></label>
      <label>${t("تكلفة ساعة الموظف الإداري (€)", "Admin hourly cost (€)")} <output data-out="rate">25</output><input type="range" name="rate" min="10" max="60" step="5" value="25"></label>
      <div class="roi-result">
        <div><small>${t("الوقت الذي ستوفّره شهريًا", "Time saved per month")}</small><b data-res="time">24</b></div>
        <div><small>${t("المال الذي ستوفّره شهريًا", "Money saved per month")}</small><b data-res="money">€600</b></div>
      </div>
      <p class="roi-foot" data-res="plan"></p>
    </form>
  </div>
</section>

<section class="compare">
  <div class="wrap">
    <h2 class="sec-title">${t("Rosterzo مقابل الطريقة القديمة", "Rosterzo vs. the old way")}</h2>
    <div class="table-wrap">
    <table>
      <thead><tr><th></th><th>${t("Excel + واتساب", "Spreadsheets + WhatsApp")}</th><th class="us">${t("Rosterzo", "Rosterzo")}</th></tr></thead>
      <tbody>
        <tr><td>${t("طلبات الفروع والعملاء", "Location requests")}</td><td>${t("مكالمات ورسائل", "Calls and messages")}</td><td class="us">${t("رابط لكل موقع", "A link per location")}</td></tr>
        <tr><td>${t("الحجز المزدوج", "Double bookings")}</td><td>${t("يحدث دون أن ينتبه أحد", "Happen unnoticed")}</td><td class="us">${t("مستحيل", "Impossible")}</td></tr>
        <tr><td>${t("ساعات الشهر", "Monthly hours")}</td><td>${t("يوم كامل من الحسابات", "A full day of maths")}</td><td class="us">${t("جاهزة + Excel", "Ready + Excel")}</td></tr>
        <tr><td>${t("آخر نسخة", "Latest version")}</td><td>${t("مَن لديه الملف؟", "Who has the sheet?")}</td><td class="us">${t("متزامن لحظيًا", "Live on every screen")}</td></tr>
        <tr><td>${t("من الهاتف", "From your phone")}</td><td>${t("صعب جدًا", "Painful")}</td><td class="us">${t("مصمَّم له", "Built for it")}</td></tr>
      </tbody>
    </table>
    </div>
  </div>
</section>

<section class="story">
  <div class="wrap story-in">
    <div class="quote-mark" aria-hidden="true">“</div>
    <blockquote>
      <p>${t("نحن شركة توظيف يعمل موظفونا في عدة فنادق. كنا نضيّع ساعات كل أسبوع في الجداول، وكان خطأ واحد يسبب مشكلة مع الفندق. صمّمنا Rosterzo لأنفسنا أولًا — والآن نُعدّ الأسبوع كله في دقائق.", "We're a staffing agency placing people in several hotels. We lost hours every week on schedules, and one mistake meant trouble with a hotel. We built Rosterzo for ourselves first — now we do the whole week in minutes.")}</p>
      <footer>${t("— مؤسس Rosterzo", "— Founder of Rosterzo")}</footer>
    </blockquote>
  </div>
</section>

<section class="pricing-teaser" id="pricing">
  <div class="wrap">
    <h2 class="sec-title">${t("سعر بسيط يناسب حجم شركتك.", "Simple pricing that fits your size.")}</h2>
    <p class="sec-sub">${t(`ابدأ مجانًا 7 أيام. حتى ${SMALL_MAX} موظفين: ${money(lang, SMALL_PRICE)} لكل موقع شهريًا. من ${SMALL_MAX + 1} موظفًا: ${money(lang, PRICE)} لكل موظف شهريًا.`, `Start free for 7 days. Up to ${SMALL_MAX} employees: ${money(lang, SMALL_PRICE)} per location per month. From ${SMALL_MAX + 1} employees: ${money(lang, PRICE)} per employee per month.`)}</p>
    ${pricingCards(lang)}
  </div>
</section>

<section class="roadmap">
  <div class="wrap">
    <h2 class="sec-title">${t("قريبًا", "Coming soon")}</h2>
    <div class="road-grid">
      <div><span>📱</span>${t("تطبيق للموظفين لعرض شفتاتهم", "An app for employees to see their shifts")}</div>
      <div><span>✉️</span>${t("بريد إلكتروني أسبوعي لكل موظف بجدوله", "A weekly email to every employee")}</div>
      <div><span>👥</span>${t("مشرفون بصلاحيات", "Supervisors with roles")}</div>
    </div>
  </div>
</section>

<section class="faq-sec">
  <div class="wrap narrow">
    <h2 class="sec-title">${t("الأسئلة الشائعة", "Frequently asked questions")}</h2>
    ${faq(lang)}
  </div>
</section>

<section class="final-cta">
  <div class="wrap final-in">
    <h2>${t("جدول الأسبوع القادم يمكن إعداده في 10 دقائق.", "Next week's schedule could take 10 minutes.")}</h2>
    <p>${t("جرّب Rosterzo مجانًا لمدة أسبوع. إن أعجبك فتواصل معنا، وإن لم يعجبك فلن تدفع شيئًا.", "Try Rosterzo free for a week. Like it? Talk to us. Don't? You pay nothing.")}</p>
    <div class="hero-ctas center">
      <a class="btn btn-primary btn-lg" href="${SIGNUP_URL}">${t("ابدأ تجربتك المجانية", "Start your free trial")}</a>
      <a class="btn btn-glass btn-lg" href="${href(lang, "/contact/")}?topic=demo">${t("احجز عرضًا مع فريقنا", "Book a demo with us")}</a>
    </div>
  </div>
</section>`;
}
