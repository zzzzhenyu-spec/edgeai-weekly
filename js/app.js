/* ============================================================
 * 端侧AI周报 · 交互逻辑（零依赖）
 * 渲染资讯/论文网格 · 鼠标跟随光晕 · 右侧详情抽屉
 * 知识时间线 · 本地评论区 · 滚动动效
 * ============================================================ */
(function () {
  "use strict";

  var D = (typeof WEEKLY_DATA !== "undefined") ? WEEKLY_DATA : window.WEEKLY_DATA;
  if (!D) {
    document.body.insertAdjacentHTML("afterbegin", '<div style="padding:20px;color:#f87171;font-family:sans-serif">数据加载失败：请检查 js/data.js 是否存在且语法正确</div>');
    return;
  }
  var $ = function (id) { return document.getElementById(id); };

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  /* ---------- 论文分类配色 ---------- */
  var CAT_COLOR = {
    "推理与系统": "#22d3ee",
    "端侧智能体": "#818cf8",
    "安全与隐私": "#f87171",
    "能效与评测": "#34d399",
    "端云协同":   "#e879f9"
  };
  function catBadge(cat) {
    var c = CAT_COLOR[cat] || "#9aa5bd";
    return '<span class="src-badge" style="color:' + c + ';border-color:' + c + '55;background:' + c + '12">' + esc(cat) + "</span>";
  }
  function venueBadge(p) {
    var lv = p.level || "";
    var cls = lv.indexOf("CCF-A") >= 0 ? "venue-ccfa" : (lv.indexOf("顶会") >= 0 ? "venue-top" : "venue-pre");
    return '<span class="venue-badge ' + cls + '">' + esc(lv) + "</span>";
  }

  /* ============================================================
   * Hero / 页头 / 页脚
   * ============================================================ */
  $("issue-chip").textContent = D.meta.issue;
  $("hero-kicker").textContent = "VOL." + ((D.meta.issue.match(/\d+(?=\s*期)/) || [""])[0]) + " · " + D.meta.weekRange + " · WEEKLY BRIEFING";
  $("editors-note").innerHTML = "<b>本期导读</b>" + esc(D.meta.editorsNote);
  $("footer-meta").textContent = D.meta.issue + " · 数据更新于 " + D.meta.updated + " · 资讯 " + D.news.length + " 条 / 论文 " + D.papers.length + " 篇 / 资源 " + D.knowledge.resources.length + " 个";

  function countUp(el, target, suffix) {
    var t0 = null, dur = 900;
    function step(t) {
      if (!t0) t0 = t;
      var k = Math.min((t - t0) / dur, 1);
      k = 1 - Math.pow(1 - k, 3);
      el.textContent = Math.round(target * k) + (suffix || "");
      if (k < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  countUp($("stat-news"), D.news.length);
  countUp($("stat-papers"), D.papers.length);
  countUp($("stat-res"), D.knowledge.resources.length);
  $("stat-weeks").textContent = (D.meta.issue.match(/\d+(?= *期)/) || ["—"])[0];

  /* ============================================================
   * 板块一：资讯
   * ============================================================ */
  var NEWS_CATS = ["全部", "芯片厂商", "手机厂商", "大模型厂商", "行业动态"];
  var newsFilter = "全部";

  function newsCard(n) {
    return '' +
      '<article class="card' + (n.highlight ? " highlight" : "") + '" data-id="' + esc(n.id) + '" tabindex="0" role="button" aria-label="查看详情">' +
        '<div class="card-top">' +
          '<span class="src-badge src-' + esc(n.cat) + '">' + esc(n.cat) + "</span>" +
          '<span class="card-date">' + esc(n.date) + "</span>" +
        "</div>" +
        "<h3>" + esc(n.title) + "</h3>" +
        '<p class="card-sum">' + esc(n.summary) + "</p>" +
        '<div class="card-tags">' + (n.tags || []).map(function (t) { return '<span class="tag"># ' + esc(t) + '</span>'; }).join("") + "</div>" +
        '<span class="read-hint">点击查看详情</span>' +
      "</article>";
  }

  function renderNews() {
    var list = D.news.filter(function (n) { return newsFilter === "全部" || n.cat === newsFilter; });
    $("news-grid").innerHTML = list.map(newsCard).join("");
    bindReveal($("news-grid"));
  }

  function renderNewsChips() {
    $("news-chips").innerHTML = NEWS_CATS.map(function (c) {
      var cnt = c === "全部" ? D.news.length : D.news.filter(function (n) { return n.cat === c; }).length;
      return '<button class="chip' + (c === newsFilter ? " on" : "") + '" data-cat="' + esc(c) + '">' + esc(c) + '<span class="cnt">' + cnt + "</span></button>";
    }).join("");
    $("news-chips").addEventListener("click", function (e) {
      var b = e.target.closest(".chip"); if (!b) return;
      newsFilter = b.dataset.cat;
      renderNewsChips(); renderNews();
    });
  }

  /* ============================================================
   * 板块二：论文
   * ============================================================ */
  var PAPER_CATS = ["全部", "已发表·高质量", "推理与系统", "端侧智能体", "安全与隐私", "能效与评测", "端云协同"];
  var paperFilter = "全部";

  function paperCard(p) {
    return '' +
      '<article class="card' + (p.highlight ? " highlight" : "") + '" data-id="' + esc(p.id) + '" tabindex="0" role="button" aria-label="查看详情">' +
        '<div class="card-top">' +
          catBadge(p.cat) +
          venueBadge(p) +
          '<span class="card-date">' + esc(p.date) + "</span>" +
        "</div>" +
        '<h3 class="card-en-title">' + esc(p.title) + "</h3>" +
        '<div class="paper-authors">' + esc(p.authors) + "</div>" +
        '<p class="card-sum">' + esc(p.summary) + "</p>" +
        '<div class="card-tags">' + (p.tags || []).map(function (t) { return '<span class="tag"># ' + esc(t) + '</span>'; }).join("") + "</div>" +
        '<span class="read-hint">点击查看详情</span>' +
      "</article>";
  }

  function renderPapers() {
    var list = D.papers.filter(function (p) {
      if (paperFilter === "全部") return true;
      if (paperFilter === "已发表·高质量") return p.group === "published";
      return p.cat === paperFilter;
    });
    $("papers-grid").innerHTML = list.map(paperCard).join("");
    bindReveal($("papers-grid"));
  }

  function renderPaperChips() {
    $("papers-chips").innerHTML = PAPER_CATS.map(function (c) {
      var cnt = D.papers.filter(function (p) {
        return c === "全部" || (c === "已发表·高质量" ? p.group === "published" : p.cat === c);
      }).length;
      return '<button class="chip' + (c === paperFilter ? " on" : "") + '" data-cat="' + esc(c) + '">' + esc(c) + '<span class="cnt">' + cnt + "</span></button>";
    }).join("");
    $("papers-chips").addEventListener("click", function (e) {
      var b = e.target.closest(".chip"); if (!b) return;
      paperFilter = b.dataset.cat;
      renderPaperChips(); renderPapers();
    });
  }

  /* ============================================================
   * 鼠标跟随光晕（事件委托）
   * ============================================================ */
  function spotlight(grid) {
    grid.addEventListener("mousemove", function (e) {
      var card = e.target.closest(".card"); if (!card) return;
      var r = card.getBoundingClientRect();
      card.style.setProperty("--mx", (e.clientX - r.left) + "px");
      card.style.setProperty("--my", (e.clientY - r.top) + "px");
    });
  }

  /* ============================================================
   * 板块三：知识分享
   * ============================================================ */
  $("timeline").innerHTML = D.knowledge.timeline.map(function (t) {
    return '<div class="tl-item reveal">' +
      '<div class="tl-year">' + esc(t.year) + "</div>" +
      "<h4>" + esc(t.title) + "</h4>" +
      "<p>" + esc(t.text) + "</p></div>";
  }).join("");

  $("res-grid").innerHTML = D.knowledge.resources.map(function (r) {
    return '<div class="res-card reveal">' +
      '<div class="res-head">' +
        '<span class="res-avatar">' + esc(r.letter || r.name.charAt(0)) + "</span>" +
        "<div><h4>" + esc(r.name) + '</h4><div class="res-type">' + esc(r.type) + "</div></div>" +
      "</div>" +
      "<p>" + esc(r.text) + "</p>" +
      '<a class="res-link" href="' + esc(r.url) + '" target="_blank" rel="noopener">访问 ↗</a>' +
      "</div>";
  }).join("");

  /* ============================================================
   * 详情抽屉
   * ============================================================ */
  var panel = $("detail-panel"), overlay = $("overlay"), panelBody = $("panel-body");

  function openPanel(html) {
    panelBody.innerHTML = html;
    panelBody.scrollTop = 0;
    panel.classList.add("open");
    overlay.classList.add("show");
    document.body.classList.add("panel-open");
  }
  function closePanel() {
    panel.classList.remove("open");
    overlay.classList.remove("show");
    document.body.classList.remove("panel-open");
  }
  $("panel-close").addEventListener("click", closePanel);
  overlay.addEventListener("click", closePanel);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closePanel(); });

  function detailHTML(type, item) {
    var kicker, meta = "", actions = "";
    if (type === "news") {
      kicker = '<span class="src-badge src-' + esc(item.cat) + '">' + esc(item.cat) + "</span>" +
               '<span class="card-date">' + esc(item.date) + "</span>";
      meta = '<div><b>来源</b><span>' + esc(item.source) + "</span></div>";
    } else {
      kicker = catBadge(item.cat) + venueBadge(item) +
               '<span class="card-date">' + esc(item.date) + "</span>";
      meta = '<div><b>作者</b><span>' + esc(item.authors) + "</span></div>" +
             '<div><b>出处</b><span>' + esc(item.venue) + "</span></div>";
    }
    if (item.url) {
      actions = '<div class="panel-actions"><a class="btn-src" href="' + esc(item.url) + '" target="_blank" rel="noopener">阅读原文 ↗</a></div>';
    }
    var paras = String(item.detail || item.summary).split("\n").filter(Boolean)
      .map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
    return '' +
      '<div class="panel-kicker">' + kicker + "</div>" +
      "<h3>" + esc(item.title) + "</h3>" +
      '<div class="panel-meta">' + meta + "</div>" +
      '<div class="panel-tags">' + (item.tags || []).map(function (t) { return '<span class="tag"># ' + esc(t) + '</span>'; }).join("") + "</div>" +
      '<div class="panel-detail">' + paras + "</div>" + actions;
  }

  function bindCards(grid, type) {
    grid.addEventListener("click", function (e) {
      var card = e.target.closest(".card"); if (!card) return;
      var id = card.dataset.id;
      var item = (type === "news" ? D.news : D.papers).filter(function (x) { return x.id === id; })[0];
      if (item) openPanel(detailHTML(type, item));
    });
    grid.addEventListener("keydown", function (e) {
      if (e.key !== "Enter") return;
      var card = e.target.closest(".card"); if (!card) return;
      card.click();
    });
  }

  /* ============================================================
   * 板块四：评论区（localStorage）
   * ============================================================ */
  var CK = "edgeai_weekly_comments_v1";
  var comments = [];
  try { comments = JSON.parse(localStorage.getItem(CK) || "[]"); } catch (e) { comments = []; }
  if (!Array.isArray(comments)) comments = [];

  var AVATARS = [
    ["#22d3ee", "#0ea5e9"], ["#818cf8", "#6366f1"], ["#e879f9", "#c026d3"],
    ["#34d399", "#059669"], ["#fbbf24", "#f59e0b"], ["#f87171", "#ef4444"]
  ];
  function avatarOf(name) {
    var h = 0;
    for (var i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
    var pair = AVATARS[h % AVATARS.length];
    return '<span class="c-avatar" style="background:linear-gradient(135deg,' + pair[0] + "," + pair[1] + ')">' + esc(name.charAt(0).toUpperCase()) + "</span>";
  }
  function timeAgo(ts) {
    var diff = Date.now() - ts;
    if (diff < 6e4) return "刚刚";
    if (diff < 36e5) return Math.floor(diff / 6e4) + " 分钟前";
    if (diff < 864e5) return Math.floor(diff / 36e5) + " 小时前";
    var d = new Date(ts);
    function p(n) { return (n < 10 ? "0" : "") + n; }
    return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate()) + " " + p(d.getHours()) + ":" + p(d.getMinutes());
  }

  function saveComments() {
    try { localStorage.setItem(CK, JSON.stringify(comments)); } catch (e) { alert("评论保存失败：浏览器存储不可用"); }
  }
  function renderComments() {
    if (!comments.length) {
      $("comment-list").innerHTML = '<div class="comment-empty">还没有评论，来抢个沙发，聊聊你关注的端侧 AI 动态吧</div>';
      return;
    }
    $("comment-list").innerHTML = comments.slice().reverse().map(function (c) {
      return '<div class="comment-item" data-cid="' + esc(c.id) + '">' +
        avatarOf(c.name) +
        '<div class="c-body">' +
          '<div class="c-head"><span class="c-name">' + esc(c.name) + '</span><span class="c-time">' + timeAgo(c.ts) + '</span><button class="c-del" title="删除该条评论">删除</button></div>' +
          '<div class="c-text">' + esc(c.text) + "</div>" +
        "</div></div>";
    }).join("");
  }

  $("comment-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var name = $("c-name").value.trim();
    var text = $("c-text").value.trim();
    if (!name || !text) return;
    comments.push({ id: String(Date.now()) + Math.random().toString(36).slice(2, 7), name: name, text: text, ts: Date.now() });
    saveComments(); renderComments();
    $("c-text").value = "";
  });
  $("comment-list").addEventListener("click", function (e) {
    var btn = e.target.closest(".c-del"); if (!btn) return;
    var item = btn.closest(".comment-item");
    if (!confirm("确定删除这条评论？")) return;
    comments = comments.filter(function (c) { return c.id !== item.dataset.cid; });
    saveComments(); renderComments();
  });

  /* ============================================================
   * 滚动显现 + 导航高亮
   * ============================================================ */
  var revealIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add("visible"); revealIO.unobserve(en.target); }
    });
  }, { threshold: 0.08 });

  function bindReveal(grid) {
    Array.prototype.forEach.call(grid.children, function (el, i) {
      el.classList.add("reveal");
      el.style.transitionDelay = (i % 4) * 70 + "ms";
      revealIO.observe(el);
    });
  }

  var navLinks = document.querySelectorAll("#site-nav a");
  var sectionIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var sec = en.target.dataset.sec;
      navLinks.forEach(function (a) { a.classList.toggle("active", a.dataset.sec === sec); });
    });
  }, { rootMargin: "-30% 0px -60% 0px" });
  document.querySelectorAll("section.board").forEach(function (s) { sectionIO.observe(s); });

  /* ============================================================
   * 初始化
   * ============================================================ */
  renderNewsChips(); renderNews();
  renderPaperChips(); renderPapers();
  renderComments();
  spotlight($("news-grid"));
  spotlight($("papers-grid"));
  bindCards($("news-grid"), "news");
  bindCards($("papers-grid"), "papers");
  Array.prototype.forEach.call(document.querySelectorAll(".tl-item, .res-card, .stat, .editors-note"), function (el) {
    revealIO.observe(el);
    el.classList.add("reveal");
  });
})();
