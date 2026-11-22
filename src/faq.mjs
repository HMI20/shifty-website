import { tr } from "./layout.mjs";

export function faq(lang, which = "general") {
  const t = tr(lang);
  const general = [
    [t("كيف تعمل التجربة المجانية؟", "How does the free trial work?"),
      t("تنشئ حسابًا ببريدك الإلكتروني، وتستخدم Rosterzo بجميع مميزاته لمدة 7 أيام دون بطاقة ائتمان. إذا أعجبك، تواصل معنا لتفعيل الاشتراك، وتبقى جميع بياناتك كما هي.", "Sign up with your email and use every feature for 7 days, no credit card. If you like it, contact us and we'll activate your subscription — all your data stays exactly as it is.")],
    [t("ماذا يحدث بعد انتهاء الأسبوع؟", "What happens after the week?"),
      t("يُغلق الحساب أمام التعديل إلى أن تشترك، لكن بياناتك لا تُحذف. راسلنا من صفحة التواصل وسنعيد تفعيل حسابك في اليوم نفسه.", "Your account is paused for editing until you subscribe, but nothing is deleted. Message us from the contact page and we'll get you back the same day.")],
    [t("هل تحتاج الفروع أو العملاء إلى إنشاء حساب؟", "Do my branches or clients need an account?"),
      t("لا. يحصل كل فرع أو عميل على رابط خاص به يفتحه من أي هاتف، ويحدد عدد الأشخاص الذين يحتاجهم في كل شفت. ولا يرى أسماء موظفيك.", "No. Each branch or client gets a private link that opens on any phone to set headcounts per shift. They never see your employees' names.")],
    [t("هل يعمل على الهاتف؟", "Does it work on mobile?"),
      t("نعم، Rosterzo مصمَّم للهاتف أيضًا: واجهة ببطاقات الأيام وتعبئة الشفت بلمسة واحدة. ولا يحتاج إلى تثبيت أي شيء.", "Yes. Rosterzo has a dedicated phone layout with day cards and tap-to-fill shifts. Nothing to install.")],
    [t("بأي لغة يعمل البرنامج؟", "Which languages does the app support?"),
      t("بالعربية والإنجليزية والهولندية. يختار كل مستخدم لغته، وصفحة الرابط الخاص بكل موقع فيها اختيار للغة أيضًا.", "Arabic, English and Dutch. Each user picks their language, and each location's link page has its own language picker too.")],
    [t("هل بياناتي آمنة؟", "Is my data safe?"),
      t("بياناتك مخزَّنة على خوادم في أوروبا، وكل شركة ترى بياناتها فقط — وهذا مؤمَّن في قاعدة البيانات نفسها لا في الواجهة فقط.", "Your data lives on servers in Europe, and each company can only ever see its own data — enforced in the database itself, not just the screen.")],
    [t("هل يمكنني نقل جداولي السابقة؟", "Can I bring my existing schedules?"),
      t("نعم، تواصل معنا وسنساعدك. وإذا كان في شركتك أكثر من 150 موظفًا فسننقلها نحن بالكامل.", "Yes — just ask and we'll help. For agencies with 150+ employees we import it all for you.")],
  ];
  const billing = [
    [t("كيف أدفع؟", "How do I pay?"),
      t("حاليًا بالتحويل البنكي بفاتورة شهرية أو سنوية. الدفع الإلكتروني بالبطاقة سيتوفر قريبًا.", "For now by bank transfer against a monthly or yearly invoice. Online card payment is coming soon.")],
    [t("ماذا لو تغيّر عدد موظفيّ؟", "What if my headcount changes?"),
      t("تُحسب الفاتورة على العدد الفعلي للموظفين. زِد أو قلِّل في أي وقت، ويظهر الفرق في الفاتورة التالية.", "You're billed for your actual number of employees. Add or remove people anytime; the difference shows on your next invoice.")],
    [t("هل يوجد عقد أو التزام؟", "Is there a contract?"),
      t("لا. يمكنك إلغاء الاشتراك الشهري في أي وقت. وإذا دفعت سنويًا تحصل على خصم 30% على السنة الأولى.", "No. Monthly billing can be cancelled anytime. Pay yearly and get 30% off your first year.")],
    [t("مَن يُحتسب «موظفًا»؟", "Who counts as an employee?"),
      t("كل موظف مسجَّل في Rosterzo ويُسجَّل في الشفتات. الفروع والعملاء ومشرفوك لا يُحتسبون.", "Anyone in Rosterzo who gets scheduled into shifts. Locations, clients and your office staff don't count.")],
  ];
  const list = which === "billing" ? billing : general;
  return `<div class="faq">${list.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("")}</div>`;
}
