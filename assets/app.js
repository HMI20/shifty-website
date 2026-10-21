// Site behaviour: mobile menu, pricing toggle, savings calculator, the contact form,
// and the looping feature demos (played only while on screen).
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const ar = document.documentElement.lang === "ar";
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

  // ---------- mobile menu ----------
  const menuBtn = $(".menu-btn"), mnav = $("#mnav");
  menuBtn?.addEventListener("click", () => {
    const open = menuBtn.getAttribute("aria-expanded") !== "true";
    menuBtn.setAttribute("aria-expanded", open);
    mnav.hidden = !open;
  });
  const closeMenu = () => { mnav.hidden = true; menuBtn.setAttribute("aria-expanded", "false"); };
  mnav?.addEventListener("click", (e) => { if (e.target.closest("a")) closeMenu(); });
  // Escape or a tap outside the bar closes the menu too.
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && mnav && !mnav.hidden) { closeMenu(); menuBtn.focus(); } });
  document.addEventListener("click", (e) => { if (mnav && !mnav.hidden && !e.target.closest(".nav")) closeMenu(); });

  // ---------- pricing: monthly / yearly and the per-employee total ----------
  const money = (n) => {
    const v = Number.isInteger(n) ? n.toLocaleString("en") : n.toFixed(2);
    return ar ? `${v}€` : `€${v}`;
  };
  $$("[data-price]").forEach((box) => {
    const scope = box.parentElement;
    const group = $(".billing-toggle", scope);
    const range = $("[data-emp-range]", box);
    let mode = "monthly";
    const update = () => {
      const n = Number(range.value);
      $("[data-emp]", box).textContent = n;
      const per = Number(box.dataset[mode === "monthly" ? "priceMonthly" : "priceYearly"]);
      const total = mode === "monthly" ? n * per : Math.round(n * per * 12);
      $("[data-total]", box).textContent = money(total);
      const was = $("[data-was]", box);
      was.hidden = mode === "monthly";
      was.textContent = money(n * Number(box.dataset.priceMonthly) * 12);
    };
    group?.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-billing]");
      if (!btn) return;
      mode = btn.dataset.billing;
      $$("[data-billing]", group).forEach((b) => b.setAttribute("aria-pressed", b === btn));
      $$("[data-monthly]", scope).forEach((el) => (el.textContent = el.dataset[mode]));
      update();
    });
    range.addEventListener("input", update);
    update();
  });

  // ---------- savings calculator ----------
  const roi = $("[data-roi]");
  if (roi) {
    const update = () => {
      const v = Object.fromEntries([...new FormData(roi)].map(([k, x]) => [k, Number(x)]));
      $$("[data-out]", roi).forEach((o) => (o.textContent = v[o.dataset.out]));
      const hours = Math.round(v.hours * 0.7 * 4.33);
      const saved = Math.round(hours * v.rate);
      const cost = v.employees * 4;
      const x = Math.round((saved / cost) * 10) / 10;
      $('[data-res="plan"]', roi).textContent = ar
        ? `Rosterzo لـ ${v.employees} موظف بـ ${money(cost)} في الشهر` + (x >= 1 ? ` — يعني اللي هتوفّره حوالي ${x} أضعاف التكلفة.` : ".")
        : `Rosterzo for ${v.employees} employees is ${money(cost)}/month` + (x >= 1 ? ` — you'd save about ${x}× the cost.` : ".");
    };
    roi.addEventListener("input", update);
    update();
  }

  // ---------- contact form -> Supabase leads ----------
  const form = $("[data-lead]");
  if (form) {
    const topic = new URLSearchParams(location.search).get("topic");
    if (topic && form.topic.querySelector(`option[value="${CSS.escape(topic)}"]`)) form.topic.value = topic;
    const msg = $(".form-msg", form);
    const say = (key, cls = "") => { msg.textContent = msg.dataset[key]; msg.className = "form-msg " + cls; };
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (form.website.value) return say("ok", "ok"); // bots fill the hidden field
      const email = form.email.value.trim();
      if (!form.name.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !form.consent.checked) return say("invalid", "err");
      const body = {
        name: form.name.value.trim(), company: form.company.value.trim(), email,
        phone: form.phone.value.trim(), employees: form.employees.value, message: form.message.value.trim(),
        topic: form.topic.value, lang: form.dataset.lang, page: location.pathname,
      };
      const btn = $("button[type=submit]", form);
      btn.disabled = true;
      say("sending");
      try {
        const res = await fetch(form.dataset.url, {
          method: "POST",
          headers: { apikey: form.dataset.key, "Content-Type": "application/json", Prefer: "return=minimal" },
          body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error(String(res.status));
        form.classList.add("sent");
        say("ok", "ok");
      } catch {
        btn.disabled = false;
        say("err", "err");
      }
    });
  }

  // ---------- demos ----------
  // Position of an element inside its demo, in layout pixels (ignores the hero's 3D tilt).
  const pos = (el, root) => {
    let x = 0, y = 0;
    for (let n = el; n && n !== root; n = n.offsetParent) { x += n.offsetLeft; y += n.offsetTop; }
    return { x, y, w: el.offsetWidth, h: el.offsetHeight };
  };
  const move = (el, from, to, ms) =>
    el.animate([{ transform: `translate(${from.x}px,${from.y}px)` }, { transform: `translate(${to.x}px,${to.y}px)` }],
      { duration: ms, easing: "cubic-bezier(.45,.05,.3,1)", fill: "forwards" }).finished;

  const scenes = {
    async board(root, alive) {
      const plan = JSON.parse(root.dataset.plan);
      const ghost = $(".ghost", root), cursor = $(".cursor", root);
      const cells = $$(".g-cell", root);
      cells.forEach((c) => { $$(".chip", c).forEach((x) => x.remove()); c.classList.remove("full", "hot"); $(".cnt", c).textContent = "0/1"; });
      if (reduce) return plan.forEach(([d, s, p]) => drop(d, s, p));
      function drop(d, s, p) {
        const cell = $(`[data-cell="${s}-${d}"]`, root);
        const src = $(`[data-p="${p}"]`, root);
        cell.insertBefore(src.cloneNode(true), $(".cnt", cell)).removeAttribute("data-p");
        cell.classList.add("full");
        $(".cnt", cell).textContent = "1/1";
      }
      await sleep(600);
      for (const [d, s, p] of plan) {
        if (!alive()) return;
        const src = $(`[data-p="${p}"]`, root);
        const cell = $(`[data-cell="${s}-${d}"]`, root);
        const a = pos(src, root), b = pos(cell, root);
        ghost.innerHTML = src.outerHTML;
        cursor.style.opacity = ghost.style.opacity = 1;
        src.classList.add("lift");
        const from = { x: a.x, y: a.y }, to = { x: b.x + 4, y: b.y + 6 };
        const cf = { x: a.x + a.w / 2, y: a.y + a.h / 2 }, ct = { x: to.x + 14, y: to.y + 10 };
        await Promise.all([move(ghost, from, to, 900), move(cursor, cf, ct, 900).then(() => cell.classList.add("hot"))]);
        src.classList.remove("lift");
        ghost.style.opacity = 0;
        drop(d, s, p);
        await sleep(250);
        cell.classList.remove("hot");
        await sleep(250);
      }
      cursor.style.opacity = 0;
      await sleep(2600);
    },

    async hotel(root, alive) {
      const want = [2, 1, 1];
      const rows = $$("[data-mb]", root), steps = $$("[data-step]", root), toast = $("[data-toast]", root);
      const closed = ar ? "مقفول" : "Closed", open = ar ? "محتاج" : "Needed";
      const reset = () => {
        steps.forEach((s) => (s.textContent = 0));
        rows.forEach((r) => { r.classList.remove("open"); $("em", r).textContent = closed; $("b", r).textContent = "0/0"; });
        toast.classList.remove("show"); root.classList.remove("flowing");
      };
      const openAll = () => rows.forEach((r, i) => { r.classList.add("open"); $("em", r).textContent = open; $("b", r).textContent = `0/${want[i]}`; });
      reset();
      if (reduce) { want.forEach((n, i) => (steps[i].textContent = n)); openAll(); return; }
      await sleep(700);
      for (let i = 0; i < 3; i++)
        for (let k = 0; k < want[i]; k++) {
          if (!alive()) return;
          const plus = $(`[data-plus="${i}"]`, root);
          plus.classList.add("tap"); await sleep(160); plus.classList.remove("tap");
          steps[i].textContent = k + 1; await sleep(380);
        }
      const save = $(".ph-save", root);
      save.classList.add("tap"); await sleep(200); save.classList.remove("tap");
      root.classList.add("flowing"); await sleep(1100); root.classList.remove("flowing");
      for (let i = 0; i < 3; i++) {
        rows[i].classList.add("open"); $("em", rows[i]).textContent = open; $("b", rows[i]).textContent = `0/${want[i]}`;
        await sleep(300);
      }
      toast.classList.add("show");
      await sleep(3200);
    },

    async rules(root, alive) {
      const tries = $$(".rule-try", root);
      tries.forEach((t) => t.classList.remove("active", "done"));
      if (reduce) return tries.forEach((t) => t.classList.add("done"));
      await sleep(500);
      for (const t of tries) {
        if (!alive()) return;
        const chip = $(".rt-chip", t), slot = $(".rt-slot", t);
        const dx = slot.getBoundingClientRect().left - chip.getBoundingClientRect().left;
        chip.style.setProperty("--dx", dx + "px");
        t.classList.add("active");
        await sleep(1900);
        t.classList.replace("active", "done");
      }
      await sleep(2600);
    },

    async hours(root, alive) {
      const nums = $$("[data-count]", root);
      const show = (k) => nums.forEach((n) => (n.textContent = Math.round(n.dataset.count * k) + (n.dataset.suffix || "")));
      if (reduce) return show(1);
      show(0);
      await sleep(400);
      for (let i = 1; i <= 30; i++) { if (!alive()) return; show(i / 30); await sleep(40); }
      await sleep(4500);
    },

    async image(root, alive) {
      const shot = $(".shot", root);
      root.classList.remove("sent", "replied");
      if (reduce) return root.classList.add("sent", "replied");
      await sleep(900);
      if (!alive()) return;
      shot.classList.add("tap"); await sleep(250); shot.classList.remove("tap");
      await sleep(400);
      root.classList.add("sent"); await sleep(1300);
      root.classList.add("replied"); await sleep(3000);
    },

    async sync(root, alive) {
      const [laptop, phone] = [$$(".laptop [data-sync]", root), $$(".phone [data-sync]", root)];
      const extra = $$(".sync-chips .chip", root);
      const reset = () => [...laptop, ...phone].forEach((c, i) => $$(".chip", c).forEach((x, j) => (i % 3 || j) && x.remove()));
      reset();
      const add = (cells, i, chip) => { cells[i].append(chip.cloneNode(true)); cells[i].classList.add("flash"); setTimeout(() => cells[i].classList.remove("flash"), 700); };
      if (reduce) { add(laptop, 1, extra[0]); add(phone, 1, extra[0]); add(laptop, 2, extra[1]); add(phone, 2, extra[1]); return; }
      for (const [i, from, to] of [[1, laptop, phone], [2, phone, laptop]]) {
        await sleep(1100);
        if (!alive()) return;
        add(from, i, extra[i - 1]);
        root.classList.add("pulsing"); await sleep(900); root.classList.remove("pulsing");
        add(to, i, extra[i - 1]);
      }
      await sleep(2600);
    },
  };

  $$("[data-demo]").forEach((root) => {
    const scene = scenes[root.dataset.demo];
    let visible = false, running = false;
    const loop = async () => {
      if (running) return;
      running = true;
      try { while (visible) { await scene(root, () => visible); if (reduce) break; } }
      finally { running = false; }
    };
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) loop(); }, { threshold: 0.35 }).observe(root);
  });
})();
