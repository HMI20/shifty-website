import { tr, href } from "./layout.mjs";
import { SIGNUP_URL, DEMO_URL } from "./config.mjs";
import { boardDemo, hotelDemo, rulesDemo, hoursDemo, imageDemo, syncDemo } from "./demos.mjs";
import { pricingCards } from "./plans.mjs";
import { faq } from "./faq.mjs";

export function home(lang) {
  const t = tr(lang);
  const features = [
    {
      id: "board", tag: t("اللوحة", "The board"), demo: boardDemo(lang),
      title: t("اسحب الاسم، حطه في الشفت، خلصت.", "Drag a name into a shift. Done."),
      text: t("كل أماكن شغلك وكل موظفينك في شاشة واحدة. الأسبوع كله قدامك: الصبح والمسا والسهر. اسحب أي موظف على أي شفت، أو دوس على الخانة واختار من الموبايل.", "All your locations and all your people on one screen. The whole week at a glance — morning, evening and night. Drag anyone into any shift, or tap a cell and pick from your phone."),
      points: [t("كل موظف له لون، فتعرفه من بعيد", "Every employee gets a colour you spot instantly"), t("عدّاد لكل شفت: اتملى كام من كام", "Every shift shows filled vs requested"), t("الشفتات ورا بعض بتتجمّع في اسم واحد طويل", "Back-to-back shifts merge into one long bar"), t("انسخ الأسبوع اللي فات بضغطة", "Copy last week in one click")],
    },
    {
      id: "hotel", tag: t("لينك لكل مكان", "Location link"), demo: hotelDemo(lang),
      title: t("كل فرع أو عميل بيطلب بنفسه. من غير ولا مكالمة.", "Each branch or client sends its own requests. No phone calls."),
      text: t("كل فرع أو عميل بياخد لينك خاص بيه. المدير هناك يفتحه من الموبايل من غير حساب، ويقول محتاج كام واحد في كل شفت الأسبوع الجاي. الطلب بيظهر عندك على اللوحة في نفس اللحظة.", "Each branch or client gets its own private link. Their manager opens it on a phone — no account — and say how many people they need per shift next week. It lands on your board instantly."),
      points: [t("العميل مش بيشوف أسماء موظفينك", "Clients never see your employees' names"), t("ابعت اللينك على الواتساب بضغطة", "Send the link on WhatsApp in one tap"), t("مكان جدوله ثابت؟ اعمله قالب مرة واحدة", "Fixed-schedule location? Set a template once"), t("الشفتات اللي مش بتاعتك بتتقفل لوحدها", "Shifts that aren't yours close automatically")],
    },
    {
      id: "rules", tag: t("ولا غلطة", "Zero mistakes"), demo: rulesDemo(lang),
      title: t("الأخطاء اللي بتكلفك فلوس… مبقتش ممكنة.", "The mistakes that cost you money can't happen anymore."),
      text: t("نفس الموظف في مكانين في نفس الوقت؟ حد في شفت هو قال إنه مش فاضي فيه؟ عدد أكتر من اللي الفرع أو العميل طلبه؟ Rosterzo بيرفض ده تلقائياً — مش بس على الشاشة، لكن في قاعدة البيانات نفسها.", "The same person in two places at once? Someone in a shift they said they can't do? More people than the location asked for? Rosterzo refuses all of it — not just on screen, but in the database itself."),
      points: [t("مفيش حجز مزدوج في أي مكان", "No double booking across any location"), t("أيام وشفتات كل موظف مش متاح فيها", "Each employee's unavailable shifts"), t("كل موظف يشتغل بس في الأماكن المسموحة له", "Employees only work at their allowed locations"), t("وانت بتسحب، الخانات الممنوعة بتتخطط", "While dragging, blocked cells are striped")],
    },
    {
      id: "hours", tag: t("الساعات", "Hours"), demo: hoursDemo(lang),
      title: t("آخر الشهر؟ الساعات جاهزة.", "End of the month? Hours are ready."),
      text: t("كل مكان له مواعيد شفتات خاصة بيه، وRosterzo بيحسب ساعات كل موظف وكل مكان لوحده. حد جه بدري أو مشي متأخر؟ زوّد أو قلّل نص ساعة، وانقلها لزميله في نفس الخطوة.", "Every location has its own shift times, and Rosterzo counts the hours per employee and per location for you. Someone came early or left late? Add or remove half-hours and move them to the colleague next to them in the same step."),
      points: [t("ملخص الشهر لكل موظف ولكل مكان", "Monthly summary per employee and per location"), t("نسبة تغطية كل مكان", "Coverage percentage per location"), t("تنزيل Excel للمحاسب في ثانية", "Excel download for your accountant"), t("تغيير المواعيد مش بيبوّظ الشهور اللي فاتت", "Changing times never rewrites the past")],
    },
    {
      id: "image", tag: t("واتساب", "WhatsApp"), demo: imageDemo(lang),
      title: t("الجدول صورة شيك… على جروب الواتساب.", "The schedule as a clean image. Straight to WhatsApp."),
      text: t("بدل ما تصوّر الشاشة وتقص، دوس «صورة الجدول» وابعتها لجروب الفرع أو العميل أو الموظفين من الموبايل على طول. واضحة، بالألوان، وبمواعيد كل شفت.", "Instead of screenshots and cropping, tap “Schedule image” and share it to the branch, client or staff group right from your phone. Clear, colour-coded, with every shift's times."),
      points: [t("مشاركة مباشرة من الموبايل", "Share directly from your phone"), t("تنزيل أو نسخ الصورة", "Download or copy the image"), t("طباعة الأسبوع لو محتاج ورق", "Print the week if you need paper")],
    },
    {
      id: "sync", tag: t("في كل مكان", "Everywhere"), demo: syncDemo(lang),
      title: t("من المكتب أو من الموبايل. كله متزامن.", "From the office or your phone. Always in sync."),
      text: t("أي تعديل بيظهر على كل الشاشات المفتوحة في نفس اللحظة — عندك، عند زميلك، وعلى موبايلك. مفيش «مين معاه آخر نسخة من الشيت؟» تاني.", "Every change shows up on every open screen instantly — yours, your colleague's and your phone. No more “who has the latest version of the sheet?”."),
      points: [t("شاشة مخصوص للموبايل بكروت الأيام", "A phone layout with day cards"), t("مفيش حاجة تتسطب", "Nothing to install"), t("بياناتك متخزنة في أوروبا ومتأمنة", "Data stored securely in Europe")],
    },
  ];

  const more = [
    ["📋", t("نسخ الأسبوع اللي فات", "Copy last week")],
    ["🗓️", t("قالب ثابت لكل مكان", "Fixed weekly templates")],
    ["⏰", t("مواعيد شفتات لكل مكان", "Shift times per location")],
    ["🚫", t("أوقات عدم التفرغ", "Unavailable shifts")],
    ["🎨", t("لون لكل موظف", "A colour per employee")],
    ["🔢", t("عدد شفتات كل موظف في الأسبوع", "Weekly shift count per person")],
    ["🖨️", t("طباعة الجدول", "Print the schedule")],
    ["🌙", t("ربط شفت السهر بالصبح", "Night-to-morning continuity")],
  ];

  return `
<section class="hero">
  <div class="hero-glow" aria-hidden="true"></div>
  <div class="wrap hero-in">
    <div class="hero-copy">
      <span class="pill">🎁 ${t("تجربة مجانية 7 أيام — من غير فيزا", "7-day free trial — no credit card")}</span>
      <h1>${t("جداول الشفتات لكل أماكن شغلك<br><span class=\"grad\">في دقايق، مش ساعات.</span>", "Shift schedules for every location.<br><span class=\"grad\">Done in minutes, not hours.</span>")}</h1>
      <p class="lead">${t("Rosterzo لأي شغل بيمشي بالشفتات: فنادق، مطاعم، مستشفيات، أمن، مخازن، وشركات التوظيف اللي بتشغّل ناس في أكتر من مكان. كل مكان بيطلب العدد اللي محتاجه، وانت بتوزّع بالسحب، والبرنامج بيمنع أي غلطة ويحسب الساعات لوحده.", "Rosterzo is for any business that runs on shifts: hotels, restaurants, healthcare, security, warehouses, and staffing agencies placing people across many sites. Each location asks for the people it needs, you assign with drag and drop, and Rosterzo blocks mistakes and counts the hours for you.")}</p>
      <div class="hero-ctas">
        <a class="btn btn-primary btn-lg" href="${SIGNUP_URL}">${t("ابدأ تجربتك المجانية", "Start your free trial")} <span class="arr">${t("←", "→")}</span></a>
        <a class="btn btn-glass btn-lg" href="${DEMO_URL}" target="_blank" rel="noopener">▶ ${t("جرّبه دلوقتي من غير تسجيل", "Try it now — no signup")}</a>
      </div>
      <ul class="hero-trust">
        <li>✓ ${t("من غير فيزا", "No credit card")}</li>
        <li>✓ ${t("شغال على الموبايل", "Works on your phone")}</li>
        <li>✓ ${t("بياناتك في أوروبا", "Data hosted in the EU")}</li>
        <li>✓ ${t("عربي • English • Nederlands", "English • Nederlands • عربي")}</li>
      </ul>
    </div>
    <div class="hero-visual">${boardDemo(lang).replace('data-demo="board"', 'data-demo="board" data-hero')}</div>
  </div>
</section>

<section class="strip">
  <div class="wrap strip-in">
    <div><b>7</b><span>${t("أيام تجربة ببلاش", "free trial days")}</span></div>
    <div><b>0</b><span>${t("حجز مزدوج", "double bookings")}</span></div>
    <div><b>3</b><span>${t("شفتات في اليوم، بمواعيد كل مكان", "shifts a day, timed per location")}</span></div>
    <div><b>375px</b><span>${t("شغال حتى على أصغر موبايل", "works on the smallest phone")}</span></div>
  </div>
</section>

<section class="industries">
  <div class="wrap">
    <h2 class="sec-title">${t("معمول لأي شغل بيمشي بالشفتات", "Built for every business that runs on shifts")}</h2>
    <div class="ind-grid">
      ${[
        ["🏨", t("فنادق", "Hotels")],
        ["🍽️", t("مطاعم وكافيهات", "Restaurants & cafés")],
        ["🏥", t("مستشفيات وعيادات", "Healthcare & clinics")],
        ["🛡️", t("أمن وحراسة", "Security")],
        ["📦", t("مخازن ومصانع", "Warehouses & factories")],
        ["🧹", t("نظافة وخدمات", "Cleaning & facilities")],
        ["🛒", t("محلات وسوبرماركت", "Retail")],
        ["👥", t("شركات توظيف", "Staffing agencies")],
      ].map(([i, l]) => `<div><span>${i}</span>${l}</div>`).join("")}
    </div>
    <p class="sec-sub ind-sub">${t("عندك فرع واحد أو عشرين، أو بتشغّل ناس عند عملاء كتير؟ كل مكان له مواعيد شفتاته وعدده، وكله في لوحة واحدة.", "One location or twenty, or placing people with many clients? Each place has its own shift times and headcounts — all on one board.")}</p>
  </div>
</section>

<section class="pain">
  <div class="wrap">
    <h2 class="sec-title">${t("لسه بتعمل الجدول على Excel والواتساب؟", "Still scheduling with spreadsheets and WhatsApp?")}</h2>
    <div class="pain-grid">
      <div class="pain-card"><span>😩</span><h3>${t("ساعات كل أسبوع", "Hours every week")}</h3><p>${t("شيت لكل فرع أو عميل، ونسخ ولصق، وتعديل ورا تعديل لحد ما الجدول يطلع.", "A sheet per location, copy-paste, edit after edit until the week finally works.")}</p></div>
      <div class="pain-card"><span>📞</span><h3>${t("مكالمات ورسايل مالهاش آخر", "Endless calls and messages")}</h3><p>${t("كل مكان بيبعت طلباته بطريقة، والتغييرات بتضيع في الشات.", "Every location sends requests differently, and changes get lost in chats.")}</p></div>
      <div class="pain-card"><span>💸</span><h3>${t("غلطة واحدة بتكلف", "One mistake costs money")}</h3><p>${t("موظف في مكانين، أو شفت فاضي، أو ساعات محسوبة غلط آخر الشهر.", "Someone booked twice, a shift left empty, or hours counted wrong at month-end.")}</p></div>
    </div>
    <p class="pain-answer">${t("Rosterzo بيحل التلاتة. 👇", "Rosterzo fixes all three. 👇")}</p>
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
      <h3>${t("وكمان…", "And also…")}</h3>
      <div class="more-grid">${more.map(([i, l]) => `<div><span>${i}</span>${l}</div>`).join("")}</div>
    </div>
  </div>
</section>

<section class="steps">
  <div class="wrap">
    <h2 class="sec-title">${t("تبدأ في 3 خطوات", "Up and running in 3 steps")}</h2>
    <ol class="steps-grid">
      <li><b>1</b><h3>${t("اعمل حساب", "Create your account")}</h3><p>${t("إيميل وكلمة سر واسم شركتك. دقيقة واحدة.", "Email, password and your company name. One minute.")}</p></li>
      <li><b>2</b><h3>${t("ضيف أماكن شغلك وموظفينك", "Add locations and staff")}</h3><p>${t("فروعك أو عملائك، وابعت لكل مكان اللينك بتاعه على الواتساب.", "Your branches or clients — then send each one its link on WhatsApp.")}</p></li>
      <li><b>3</b><h3>${t("وزّع الأسبوع", "Fill the week")}</h3><p>${t("اسحب الأسماء على الشفتات وابعت صورة الجدول.", "Drag names into shifts and share the schedule image.")}</p></li>
    </ol>
  </div>
</section>

<section class="live">
  <div class="wrap live-in">
    <div>
      <h2>${t("شوفه بعينك قبل ما تسجّل", "See it for yourself before signing up")}</h2>
      <p>${t("افتح نسخة العرض الحي ببيانات وهمية: 3 أماكن شغل و6 موظفين. اسحب وغيّر وجرّب كل حاجة — مفيش حاجة هتتسجل.", "Open the live demo with sample data: 3 locations and 6 employees. Drag, edit and try everything — nothing is saved.")}</p>
    </div>
    <a class="btn btn-light btn-lg" href="${DEMO_URL}" target="_blank" rel="noopener">▶ ${t("افتح العرض الحي", "Open the live demo")}</a>
  </div>
</section>

<section class="roi" id="calculator">
  <div class="wrap roi-in">
    <div class="roi-copy">
      <h2 class="sec-title">${t("احسب هتوفّر قد إيه", "See how much you'd save")}</h2>
      <p>${t("حرّك الأرقام على حسب شركتك. الحساب تقديري، على افتراض إن Rosterzo بيوفّر حوالي 70% من وقت عمل الجداول ومتابعة الساعات.", "Adjust to match your agency. This is an estimate, assuming Rosterzo saves about 70% of the time spent on schedules and hours.")}</p>
    </div>
    <form class="roi-card" data-roi onsubmit="return false">
      <label>${t("عدد الموظفين", "Employees")} <output data-out="employees">25</output><input type="range" name="employees" min="1" max="200" value="25"></label>
      <label>${t("ساعات عمل الجداول في الأسبوع", "Hours spent scheduling per week")} <output data-out="hours">8</output><input type="range" name="hours" min="1" max="40" value="8"></label>
      <label>${t("تكلفة ساعة الموظف الإداري (€)", "Admin hourly cost (€)")} <output data-out="rate">25</output><input type="range" name="rate" min="10" max="60" step="5" value="25"></label>
      <div class="roi-result">
        <div><small>${t("وقت هتوفّره في الشهر", "Time saved per month")}</small><b data-res="time">24</b></div>
        <div><small>${t("فلوس هتوفّرها في الشهر", "Money saved per month")}</small><b data-res="money">€600</b></div>
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
        <tr><td>${t("طلبات الفروع والعملاء", "Location requests")}</td><td>${t("مكالمات ورسايل", "Calls and messages")}</td><td class="us">${t("لينك لكل مكان", "A link per location")}</td></tr>
        <tr><td>${t("الحجز المزدوج", "Double bookings")}</td><td>${t("بيحصل ومحدش بياخد باله", "Happen unnoticed")}</td><td class="us">${t("مستحيل", "Impossible")}</td></tr>
        <tr><td>${t("ساعات الشهر", "Monthly hours")}</td><td>${t("يوم كامل حسابات", "A full day of maths")}</td><td class="us">${t("جاهزة + Excel", "Ready + Excel")}</td></tr>
        <tr><td>${t("آخر نسخة", "Latest version")}</td><td>${t("مين معاه الشيت؟", "Who has the sheet?")}</td><td class="us">${t("متزامن لحظياً", "Live on every screen")}</td></tr>
        <tr><td>${t("من الموبايل", "From your phone")}</td><td>${t("صعب جداً", "Painful")}</td><td class="us">${t("مصمم ليه", "Built for it")}</td></tr>
      </tbody>
    </table>
    </div>
  </div>
</section>

<section class="story">
  <div class="wrap story-in">
    <div class="quote-mark" aria-hidden="true">“</div>
    <blockquote>
      <p>${t("إحنا شركة توظيف بنشغّل موظفين في كذا فندق. كنا بنضيّع ساعات كل أسبوع في الجداول، وغلطة واحدة كانت بتعمل مشكلة مع الفندق. عملنا Rosterzo لنفسنا الأول — ودلوقتي بنعمل الأسبوع كله في دقايق.", "We're a staffing agency placing people in several hotels. We lost hours every week on schedules, and one mistake meant trouble with a hotel. We built Rosterzo for ourselves first — now we do the whole week in minutes.")}</p>
      <footer>${t("— مؤسس Rosterzo", "— Founder of Rosterzo")}</footer>
    </blockquote>
  </div>
</section>

<section class="pricing-teaser" id="pricing">
  <div class="wrap">
    <h2 class="sec-title">${t("سعر واحد بسيط: على قد موظفينك.", "One simple price: per employee.")}</h2>
    <p class="sec-sub">${t("ابدأ مجاناً 7 أيام، وبعدين ادفع بس على الموظفين اللي بتشغّلهم.", "Start free for 7 days, then pay only for the people you schedule.")}</p>
    ${pricingCards(lang)}
  </div>
</section>

<section class="roadmap">
  <div class="wrap">
    <h2 class="sec-title">${t("جاي قريب", "Coming soon")}</h2>
    <div class="road-grid">
      <div><span>📱</span>${t("أبلكيشن للموظفين يشوفوا شفتاتهم", "An app for employees to see their shifts")}</div>
      <div><span>✉️</span>${t("إيميل أسبوعي لكل موظف بجدوله", "A weekly email to every employee")}</div>
      <div><span>👥</span>${t("مشرفين بصلاحيات", "Supervisors with roles")}</div>
    </div>
  </div>
</section>

<section class="faq-sec">
  <div class="wrap narrow">
    <h2 class="sec-title">${t("أسئلة بتتسأل كتير", "Frequently asked questions")}</h2>
    ${faq(lang)}
  </div>
</section>

<section class="final-cta">
  <div class="wrap final-in">
    <h2>${t("الأسبوع الجاي ممكن يتعمل في 10 دقايق.", "Next week's schedule could take 10 minutes.")}</h2>
    <p>${t("جرّب Rosterzo ببلاش لمدة أسبوع. لو عجبك كلّمنا، ولو معجبكش مش هتدفع حاجة.", "Try Rosterzo free for a week. Like it? Talk to us. Don't? You pay nothing.")}</p>
    <div class="hero-ctas center">
      <a class="btn btn-primary btn-lg" href="${SIGNUP_URL}">${t("ابدأ تجربتك المجانية", "Start your free trial")}</a>
      <a class="btn btn-glass btn-lg" href="${href(lang, "/contact/")}?topic=demo">${t("احجز عرض مع فريقنا", "Book a demo with us")}</a>
    </div>
  </div>
</section>`;
}
