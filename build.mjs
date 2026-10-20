// Builds the static site into dist/: Arabic at the root, English under /en/.
// No dependencies — run with `node build.mjs`.
import { mkdirSync, writeFileSync, cpSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { page, tr, logo } from "./src/layout.mjs";
import { SITE_URL } from "./src/config.mjs";
import { home } from "./src/home.mjs";
import { pricing, contact, privacy, terms, notFound } from "./src/pages.mjs";

const out = "dist";
rmSync(out, { recursive: true, force: true });
const write = (file, text) => { mkdirSync(dirname(join(out, file)), { recursive: true }); writeFileSync(join(out, file), text); };

const routes = [
  { path: "/", render: home, active: "", title: () => "", desc: (t) => t("جداول شفتات لشركات التوظيف اللي بتشغّل موظفين في أكتر من فندق: طلبات الفنادق بلينك، توزيع بالسحب، منع الحجز المزدوج، وساعات الشهر جاهزة. جرّبه ببلاش 7 أيام.", "Shift scheduling for staffing agencies working across many hotels: hotel requests by link, drag-and-drop scheduling, no double bookings, monthly hours ready. Free for 7 days.") },
  { path: "/pricing/", render: pricing, active: "pricing", title: (t) => t("الأسعار", "Pricing"), desc: (t) => t("Rosterzo بـ 4€ لكل موظف في الشهر، بكل المميزات. خصم 30% على أول سنة في الاشتراك السنوي. تجربة مجانية 7 أيام.", "Rosterzo costs €4 per employee per month with every feature included. 30% off the first year on yearly billing. 7-day free trial.") },
  { path: "/contact/", render: contact, active: "contact", title: (t) => t("تواصل معنا", "Contact"), desc: (t) => t("كلّمنا عشان تشترك، أو تحجز عرض، أو تسأل أي سؤال عن Rosterzo.", "Contact us to subscribe, book a demo or ask anything about Rosterzo.") },
  { path: "/privacy/", render: privacy, active: "", title: (t) => t("سياسة الخصوصية", "Privacy policy"), desc: (t) => t("إزاي Rosterzo بيتعامل مع بياناتك.", "How Rosterzo handles your data.") },
  { path: "/terms/", render: terms, active: "", title: (t) => t("شروط الاستخدام", "Terms of use"), desc: (t) => t("شروط استخدام Rosterzo والتجربة المجانية.", "Rosterzo terms of use and free trial.") },
];

for (const lang of ["ar", "en"]) {
  const t = tr(lang);
  for (const r of routes) {
    const file = (lang === "en" ? "en" : "") + r.path + "index.html";
    write(file, page({ lang, path: r.path, title: r.title(t), description: r.desc(t), active: r.active, body: r.render(lang) }));
  }
}
write("404.html", page({ lang: "ar", path: "/", title: "404", description: "", body: notFound("ar") }));
write("en/404.html", page({ lang: "en", path: "/", title: "404", description: "", body: notFound("en") }));

cpSync("assets", join(out, "assets"), { recursive: true });
write("assets/favicon.svg", logo(40).replace('class="logo-mark" width="40" height="40" ', 'xmlns="http://www.w3.org/2000/svg" ').replace(' aria-hidden="true"', ""));
write("robots.txt", `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`);
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.flatMap((r) => [r.path, "/en" + r.path]).map((p) => `  <url><loc>${SITE_URL}${p}</loc></url>`).join("\n")}\n</urlset>\n`);
write("_headers", `/assets/*\n  Cache-Control: public, max-age=3600\n/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Frame-Options: DENY\n`);
console.log("built", routes.length * 2 + 2, "pages into", out);
