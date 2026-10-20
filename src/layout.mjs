import { SITE_URL, APP_URL, SIGNUP_URL, DEMO_URL } from "./config.mjs";

// Picks the Arabic or English text for the page being built.
export const tr = (lang) => (ar, en) => (lang === "ar" ? ar : en);

// "/pricing/" -> "/en/pricing/" and back.
export const href = (lang, path) => (lang === "ar" ? path : "/en" + path);

export const logo = (size = 34) => `
<svg class="logo-mark" width="${size}" height="${size}" viewBox="0 0 40 40" aria-hidden="true">
  <rect width="40" height="40" rx="11" fill="url(#lg)"/>
  <rect x="9" y="10" width="22" height="5" rx="2.5" fill="#ffd27a"/>
  <rect x="9" y="17.5" width="16" height="5" rx="2.5" fill="#9ec5ff"/>
  <rect x="9" y="25" width="19" height="5" rx="2.5" fill="#c9b8ff"/>
  <defs><linearGradient id="lg" x1="0" y1="0" x2="40" y2="40"><stop stop-color="#2b5cff"/><stop offset="1" stop-color="#1235a8"/></linearGradient></defs>
</svg>`;

export function page({ lang, path, title, description, body, active = "" }) {
  const t = tr(lang);
  const other = lang === "ar" ? "en" : "ar";
  const nav = [
    ["features", "/#features", t("المميزات", "Features")],
    ["pricing", "/pricing/", t("الأسعار", "Pricing")],
    ["demo", DEMO_URL, t("جرّب العرض الحي", "Live demo")],
    ["contact", "/contact/", t("تواصل معنا", "Contact")],
  ];
  const link = (p) => (p.startsWith("http") ? p : href(lang, p));
  const ext = (p) => (p.startsWith("http") ? ' target="_blank" rel="noopener"' : "");
  const fullTitle = title ? `${title} · ${t("شِفتي", "Shifty")}` : t("شِفتي — جداول شفتات شركات التوظيف", "Shifty — shift scheduling for staffing agencies");
  return `<!doctype html>
<html lang="${lang}" dir="${lang === "ar" ? "rtl" : "ltr"}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${fullTitle}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${SITE_URL}${href(lang, path)}">
<link rel="alternate" hreflang="ar" href="${SITE_URL}${href("ar", path)}">
<link rel="alternate" hreflang="en" href="${SITE_URL}${href("en", path)}">
<link rel="alternate" hreflang="x-default" href="${SITE_URL}${href("ar", path)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${fullTitle}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${SITE_URL}${href(lang, path)}">
<meta property="og:image" content="${SITE_URL}/assets/og.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0b1430">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/styles.css">
<script defer src="/assets/app.js"></script>
</head>
<body class="${active ? "page-" + active : ""}">
<a class="skip" href="#main">${t("انتقل للمحتوى", "Skip to content")}</a>
<header class="nav" id="top">
  <div class="wrap nav-in">
    <a class="brand" href="${href(lang, "/")}" aria-label="${t("شِفتي — الرئيسية", "Shifty — home")}">${logo()}<span>${t("شِفتي", "Shifty")}</span></a>
    <nav class="nav-links" aria-label="${t("القائمة", "Menu")}">
      ${nav.map(([k, p, label]) => `<a href="${link(p)}"${ext(p)}${k === active ? ' aria-current="page"' : ""}>${label}</a>`).join("")}
    </nav>
    <div class="nav-actions">
      <a class="lang" href="${href(other, path)}" hreflang="${other}" lang="${other}">${lang === "ar" ? "English" : "عربي"}</a>
      <a class="nav-login" href="${APP_URL}">${t("دخول", "Log in")}</a>
      <a class="btn btn-primary btn-sm" href="${SIGNUP_URL}">${t("ابدأ مجاناً", "Start free")}</a>
      <button class="menu-btn" aria-label="${t("القائمة", "Menu")}" aria-expanded="false" aria-controls="mnav"><span></span><span></span><span></span></button>
    </div>
  </div>
  <nav class="mnav" id="mnav" hidden>
    ${nav.map(([, p, label]) => `<a href="${link(p)}"${ext(p)}>${label}</a>`).join("")}
    <a href="${APP_URL}">${t("دخول للبرنامج", "Log in to the app")}</a>
    <a href="${href(other, path)}" lang="${other}">${lang === "ar" ? "English" : "عربي"}</a>
    <a class="btn btn-primary" href="${SIGNUP_URL}">${t("ابدأ تجربتك المجانية — 7 أيام", "Start your 7-day free trial")}</a>
  </nav>
</header>
<main id="main">
${body}
</main>
<footer class="foot">
  <div class="wrap foot-in">
    <div class="foot-brand">
      <a class="brand" href="${href(lang, "/")}">${logo(30)}<span>${t("شِفتي", "Shifty")}</span></a>
      <p>${t("جداول شفتات لشركات التوظيف اللي بتشغّل موظفين في أكتر من فندق أو موقع. اتعمل جوه شركة توظيف حقيقية، لمشاكل حقيقية.", "Shift scheduling for staffing agencies that place people across many hotels and sites. Built inside a real staffing company, for real problems.")}</p>
      <p class="foot-eu">🇪🇺 ${t("بياناتك متخزنة على سيرفرات في أوروبا", "Your data is stored on servers in Europe")}</p>
    </div>
    <div>
      <h4>${t("المنتج", "Product")}</h4>
      <a href="${href(lang, "/")}#features">${t("المميزات", "Features")}</a>
      <a href="${href(lang, "/pricing/")}">${t("الأسعار", "Pricing")}</a>
      <a href="${DEMO_URL}" target="_blank" rel="noopener">${t("العرض الحي", "Live demo")}</a>
      <a href="${APP_URL}">${t("دخول للبرنامج", "Log in")}</a>
    </div>
    <div>
      <h4>${t("الشركة", "Company")}</h4>
      <a href="${href(lang, "/contact/")}">${t("تواصل معنا", "Contact")}</a>
      <a href="${href(lang, "/contact/")}?topic=demo">${t("احجز عرض", "Book a demo")}</a>
      <a href="${href(lang, "/privacy/")}">${t("الخصوصية", "Privacy")}</a>
      <a href="${href(lang, "/terms/")}">${t("الشروط", "Terms")}</a>
    </div>
  </div>
  <div class="wrap foot-bottom">© <span data-year>2026</span> ${t("شِفتي", "Shifty")}. ${t("كل الحقوق محفوظة.", "All rights reserved.")}</div>
</footer>
</body>
</html>
`;
}
