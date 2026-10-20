import { tr } from "./layout.mjs";

export function faq(lang, which = "general") {
  const t = tr(lang);
  const general = [
    [t("التجربة المجانية بتشتغل إزاي؟", "How does the free trial work?"),
      t("بتعمل حساب بإيميلك، وبتستخدم شِفتي بكل مميزاته لمدة 7 أيام من غير فيزا. لو عجبك، كلّمنا ونفعّلك الباقة اللي تختارها، وبياناتك كلها بتفضل زي ما هي.", "Sign up with your email and use every feature for 7 days, no credit card. If you like it, contact us and we'll activate your plan — all your data stays exactly as it is.")],
    [t("إيه اللي بيحصل بعد الأسبوع؟", "What happens after the week?"),
      t("الحساب بيتقفل للتعديل لحد ما تشترك، لكن بياناتك مش بتتمسح. ابعتلنا من صفحة التواصل ونرجّعك في نفس اليوم.", "Your account is paused for editing until you subscribe, but nothing is deleted. Message us from the contact page and we'll get you back the same day.")],
    [t("الفنادق محتاجة تعمل حساب؟", "Do hotels need an account?"),
      t("لأ. كل فندق بياخد لينك خاص بيه يفتحه من أي موبايل، ويحدد عدد الناس اللي محتاجهم في كل شفت. وما بيشوفش أسماء موظفينك.", "No. Each hotel gets a private link that opens on any phone to set headcounts per shift. They never see your employees' names.")],
    [t("شغال على الموبايل؟", "Does it work on mobile?"),
      t("أيوه، شِفتي معمول للموبايل كمان: شاشة بكروت الأيام وتملى الشفت بلمسة. ومفيش حاجة تتسطب.", "Yes. Shifty has a dedicated phone layout with day cards and tap-to-fill shifts. Nothing to install.")],
    [t("البرنامج بأنهي لغة؟", "Which languages does the app support?"),
      t("الواجهة حالياً بالعربي، والإنجليزي والهولندي جايين قريب.", "The interface is currently in Arabic. English and Dutch are coming soon.")],
    [t("بياناتي في أمان؟", "Is my data safe?"),
      t("بياناتك متخزنة على سيرفرات في أوروبا، وكل شركة شايفة بياناتها بس — ده متأمّن في قاعدة البيانات نفسها مش بس في الشاشة.", "Your data lives on servers in Europe, and each company can only ever see its own data — enforced in the database itself, not just the screen.")],
    [t("ينفع أنقل جداولي القديمة؟", "Can I bring my existing schedules?"),
      t("أيوه. في باقة الشركات بننقلها إحنا، وفي باقي الباقات بنساعدك — كلّمنا.", "Yes. On Business we import it for you; on other plans we'll help — just ask.")],
  ];
  const billing = [
    [t("بدفع إزاي؟", "How do I pay?"),
      t("حالياً بالتحويل البنكي بفاتورة شهرية أو سنوية. الدفع أونلاين بالكارت جاي قريب.", "For now by bank transfer against a monthly or yearly invoice. Online card payment is coming soon.")],
    [t("ينفع أغيّر الباقة؟", "Can I change plans?"),
      t("في أي وقت. لو عدد موظفينك زاد بنرقّيك، ولو قلّ بننزّلك من الشهر اللي بعده.", "Anytime. Grow and we upgrade you; shrink and we move you down from the next month.")],
    [t("فيه عقد أو التزام؟", "Is there a contract?"),
      t("لأ. الاشتراك الشهري تقدر توقفه في أي وقت. السنوي بيوفّرلك شهرين.", "No. Monthly plans can be cancelled anytime. Yearly saves you two months.")],
    [t("مين اللي بيتحسب «موظف»؟", "Who counts as an employee?"),
      t("أي موظف متسجل في شِفتي وبيتحط في شفتات. الفنادق ومشرفينك مش بيتحسبوا.", "Anyone in Shifty who gets scheduled into shifts. Hotels and your office staff don't count.")],
  ];
  const list = which === "billing" ? billing : general;
  return `<div class="faq">${list.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("")}</div>`;
}
