import { tr } from "./layout.mjs";

export function faq(lang, which = "general") {
  const t = tr(lang);
  const general = [
    [t("التجربة المجانية بتشتغل إزاي؟", "How does the free trial work?"),
      t("بتعمل حساب بإيميلك، وبتستخدم Rosterzo بكل مميزاته لمدة 7 أيام من غير فيزا. لو عجبك، كلّمنا ونفعّلك الاشتراك، وبياناتك كلها بتفضل زي ما هي.", "Sign up with your email and use every feature for 7 days, no credit card. If you like it, contact us and we'll activate your subscription — all your data stays exactly as it is.")],
    [t("إيه اللي بيحصل بعد الأسبوع؟", "What happens after the week?"),
      t("الحساب بيتقفل للتعديل لحد ما تشترك، لكن بياناتك مش بتتمسح. ابعتلنا من صفحة التواصل ونرجّعك في نفس اليوم.", "Your account is paused for editing until you subscribe, but nothing is deleted. Message us from the contact page and we'll get you back the same day.")],
    [t("الفروع أو العملاء محتاجين يعملوا حساب؟", "Do my branches or clients need an account?"),
      t("لأ. كل فرع أو عميل بياخد لينك خاص بيه يفتحه من أي موبايل، ويحدد عدد الناس اللي محتاجهم في كل شفت. وما بيشوفش أسماء موظفينك.", "No. Each branch or client gets a private link that opens on any phone to set headcounts per shift. They never see your employees' names.")],
    [t("شغال على الموبايل؟", "Does it work on mobile?"),
      t("أيوه، Rosterzo معمول للموبايل كمان: شاشة بكروت الأيام وتملى الشفت بلمسة. ومفيش حاجة تتسطب.", "Yes. Rosterzo has a dedicated phone layout with day cards and tap-to-fill shifts. Nothing to install.")],
    [t("البرنامج بأنهي لغة؟", "Which languages does the app support?"),
      t("بالعربي والإنجليزي والهولندي. كل مستخدم بيختار لغته، وصفحة اللينك الخاص بكل مكان كمان فيها اختيار للغة.", "Arabic, English and Dutch. Each user picks their language, and each location's link page has its own language picker too.")],
    [t("بياناتي في أمان؟", "Is my data safe?"),
      t("بياناتك متخزنة على سيرفرات في أوروبا، وكل شركة شايفة بياناتها بس — ده متأمّن في قاعدة البيانات نفسها مش بس في الشاشة.", "Your data lives on servers in Europe, and each company can only ever see its own data — enforced in the database itself, not just the screen.")],
    [t("ينفع أنقل جداولي القديمة؟", "Can I bring my existing schedules?"),
      t("أيوه، كلّمنا وهنساعدك. ولو شركتك أكتر من 150 موظف بننقلها إحنا بالكامل.", "Yes — just ask and we'll help. For agencies with 150+ employees we import it all for you.")],
  ];
  const billing = [
    [t("بدفع إزاي؟", "How do I pay?"),
      t("حالياً بالتحويل البنكي بفاتورة شهرية أو سنوية. الدفع أونلاين بالكارت جاي قريب.", "For now by bank transfer against a monthly or yearly invoice. Online card payment is coming soon.")],
    [t("لو عدد موظفيني اتغير؟", "What if my headcount changes?"),
      t("الفاتورة بتتحسب على عدد الموظفين الفعلي. زوّد أو قلّل في أي وقت، والفرق بيظهر في الفاتورة اللي بعدها.", "You're billed for your actual number of employees. Add or remove people anytime; the difference shows on your next invoice.")],
    [t("فيه عقد أو التزام؟", "Is there a contract?"),
      t("لأ. الشهري تقدر توقفه في أي وقت. ولو دفعت سنوي بتاخد خصم 30% على أول سنة.", "No. Monthly billing can be cancelled anytime. Pay yearly and get 30% off your first year.")],
    [t("مين اللي بيتحسب «موظف»؟", "Who counts as an employee?"),
      t("أي موظف متسجل في Rosterzo وبيتحط في شفتات. الفروع والعملاء ومشرفينك مش بيتحسبوا.", "Anyone in Rosterzo who gets scheduled into shifts. Locations, clients and your office staff don't count.")],
  ];
  const list = which === "billing" ? billing : general;
  return `<div class="faq">${list.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("")}</div>`;
}
