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
    var t0 = null, dur = 900, done = false;
    function finish() {
      if (!done) { done = true; el.textContent = target + (suffix || ""); }
    }
    var timer = setTimeout(finish, dur + 350);   // rAF 被后台节流时的兜底
    function step(t) {
      if (done) return;
      if (!t0) t0 = t;
      var k = Math.min((t - t0) / dur, 1);
      k = 1 - Math.pow(1 - k, 3);
      el.textContent = Math.round(target * k) + (suffix || "");
      if (k < 1) requestAnimationFrame(step);
      else { done = true; clearTimeout(timer); }
    }
    requestAnimationFrame(step);
  }
  countUp($("stat-news"), D.news.length);
  countUp($("stat-papers"), D.papers.length);
  countUp($("stat-res"), D.knowledge.resources.length);
  $("stat-weeks").textContent = (D.meta.issue.match(/\d+(?= *期)/) || ["—"])[0];

  /* ============================================================
   * Hero 可视化：词云（Canvas 实时渲染）+ 资讯构成 / 论文方向图
   * 全部从 data.js 自动统计，每周换数据后自动更新
   * ============================================================ */
  var VIZ_COLORS = ["#22d3ee", "#818cf8", "#e879f9", "#fbbf24", "#34d399", "#f87171"];
  var NEWS_CAT_COLORS = { "端侧Agent": "#34d399", "AI硬件": "#fb7185", "芯片厂商": "#22d3ee", "手机厂商": "#818cf8", "大模型厂商": "#e879f9", "行业动态": "#fbbf24" };

  /* 词云停用词: 剔除无信息量的泛化标签 */
  var CLOUD_STOP = ["开源", "发布", "上市", "评测", "旗舰", "行业观察", "国产芯片", "新品", "动态"];

  function buildCloudWords() {
    var parts = [];
    D.news.concat(D.papers).forEach(function (it) {
      parts.push(it.title || "", it.summary || "", it.detail || "", (it.tags || []).join(" "));
    });
    var text = parts.join(" ").toLowerCase();
    var map = {};
    function add(w) {
      w = String(w || "").trim();
      if (!w || w.length > 14 || map[w] || CLOUD_STOP.indexOf(w) >= 0) return;
      map[w] = { w: w, tagN: 0, n: 0 };
    }
    D.news.forEach(function (n) { (n.tags || []).forEach(add); });
    D.papers.forEach(function (p) { (p.tags || []).forEach(add); });
    Object.keys(map).forEach(function (k) {
      var o = map[k], c = 0;
      D.news.concat(D.papers).forEach(function (it) {
        (it.tags || []).forEach(function (t) { if (t === o.w) c++; });
      });
      o.tagN = c;
      var idx = 0, s = 0, lw = k.toLowerCase();
      while ((idx = text.indexOf(lw, idx)) !== -1) { s++; idx += lw.length; }
      o.n = c * 2 + s;
    });
    return Object.keys(map).map(function (k) { return map[k]; })
      .filter(function (o) { return o.n >= 3; })
      .sort(function (a, b) { return b.n - a.n; })
      .slice(0, 26);
  }

  function renderCloud() {
    var cv = document.getElementById("word-cloud");
    if (!cv) return;
    var box = cv.parentNode.getBoundingClientRect();
    var W = Math.max(280, Math.floor(box.width) - 10), H = 240;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = W * dpr; cv.height = H * dpr;
    cv.style.height = H + "px";
    var ctx = cv.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    var words = buildCloudWords();
    if (!words.length) return;
    var maxN = words[0].n, minN = words[words.length - 1].n, rects = [];
    words.forEach(function (o, i) {
      var k = maxN === minN ? 0.6 : (o.n - minN) / (maxN - minN);
      var fs = Math.round(13 + k * 19);
      ctx.font = "700 " + fs + 'px "Microsoft YaHei", "PingFang SC", sans-serif';
      var w = ctx.measureText(o.w).width + 10, h = Math.round(fs * 1.3);
      var cx = W / 2 + Math.cos(i * 2.39996) * (W / 5) * ((i % 3) / 2.5);
      var cy = H / 2 + Math.sin(i * 2.39996) * (H / 7) * ((i % 2 === 0) ? 1 : 0.5);
      for (var t = 0; t < 900; t++) {
        var r = 0.55 * t, a = t * 0.26;
        var x = cx + r * Math.cos(a) - w / 2, y = cy + r * Math.sin(a) - h / 2;
        if (x < 2 || y < 2 || x + w > W - 2 || y + h > H - 2) continue;
        var hit = false;
        for (var j = 0; j < rects.length; j++) {
          var q = rects[j];
          if (x < q.x + q.w && x + w > q.x && y < q.y + q.h && y + h > q.y) { hit = true; break; }
        }
        if (hit) continue;
        rects.push({ x: x, y: y, w: w, h: h });
        var color = VIZ_COLORS[i % VIZ_COLORS.length];
        ctx.globalAlpha = i < 6 ? 1 : 0.8;
        if (i < 3) { ctx.shadowColor = color; ctx.shadowBlur = 16; }
        ctx.fillStyle = color;
        ctx.fillText(o.w, x + 5, y + h / 2 + fs * 0.36);
        ctx.shadowBlur = 0; ctx.globalAlpha = 1;
        break;
      }
    });
  }

  function donutSVG(items) {
    var total = items.reduce(function (s, x) { return s + x.value; }, 0) || 1;
    var r = 46, C = 2 * Math.PI * r, deg = 0;
    var segs = items.map(function (it) {
      var len = C * it.value / total;
      var s = '<circle r="' + r + '" cx="60" cy="60" fill="none" stroke="' + it.color +
        '" stroke-width="13" stroke-linecap="butt" stroke-dasharray="' + Math.max(len - 2, 0.5) + " " + (C - len + 2) +
        '" transform="rotate(' + (deg - 90) + ' 60 60)"/>';
      deg += 360 * it.value / total;
      return s;
    }).join("");
    var legend = items.map(function (it) {
      return '<div class="dg-item"><i style="background:' + it.color + '"></i>' + esc(it.label) + "<b>" + it.value + "</b></div>";
    }).join("");
    return '<div class="donut-wrap"><svg viewBox="0 0 120 120" class="donut" role="img" aria-label="资讯分类构成">' + segs +
      '<text x="60" y="58" text-anchor="middle" class="donut-num">' + total + '</text>' +
      '<text x="60" y="73" text-anchor="middle" class="donut-label">资讯</text></svg>' +
      '<div class="donut-legend">' + legend + "</div></div>";
  }

  function barsHTML(items) {
    var max = Math.max.apply(null, items.map(function (x) { return x.value; })) || 1;
    return items.map(function (it) {
      return '<div class="bar-row"><span class="bar-label">' + esc(it.label) + "</span>" +
        '<span class="bar-track"><i style="width:' + Math.round(it.value / max * 100) + "%;color:" + it.color + ';background:' + it.color + '"></i></span>' +
        '<span class="bar-val">' + it.value + "</span></div>";
    }).join("");
  }

  function buildViz() {
    var host = document.getElementById("hero-viz");
    if (!host) return;
    var newsItems = Object.keys(NEWS_CAT_COLORS).map(function (c) {
      return { label: c, color: NEWS_CAT_COLORS[c], value: D.news.filter(function (n) { return n.cat === c; }).length };
    }).filter(function (x) { return x.value > 0; });
    var paperItems = Object.keys(CAT_COLOR).map(function (c) {
      return { label: c, color: CAT_COLOR[c], value: D.papers.filter(function (p) { return p.cat === c; }).length };
    }).filter(function (x) { return x.value > 0; });
    host.innerHTML =
      '<div class="viz-card">' +
        '<div class="viz-title">📊 本期数据速览</div>' +
        '<div class="viz-cloud-box"><canvas id="word-cloud"></canvas></div>' +
        '<div class="viz-row">' +
          '<div class="viz-block"><h5>资讯构成</h5>' + donutSVG(newsItems) + "</div>" +
          '<div class="viz-block"><h5>论文方向</h5><div class="bars">' + barsHTML(paperItems) + "</div></div>" +
        "</div>" +
      "</div>";
    renderCloud();
    var vc = host.querySelector(".viz-card");
    if (vc) { vc.classList.add("reveal"); revealIO.observe(vc); }
  }
  var resizeTimer = null;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(renderCloud, 200);
  });

  /* ============================================================
   * 板块一：资讯
   * ============================================================ */
  var NEWS_CATS = ["全部", "端侧Agent", "AI硬件", "芯片厂商", "手机厂商", "大模型厂商", "行业动态"];
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
      if (c !== "全部" && cnt === 0) return "";   // 无内容的分类不显示
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

  var FEEDS = (typeof BLOG_FEEDS !== "undefined") ? BLOG_FEEDS : {};
  function resLogoHTML(r, cls) {
    var letter = esc(r.letter || r.name.charAt(0));
    var f = FEEDS[r.name];
    if (f && f.logo) {
      return '<span class="' + cls + '" data-letter="' + letter + '"><img src="' + esc(f.logo) + '" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove()"></span>';
    }
    return '<span class="' + cls + ' noimg" data-letter="' + letter + '">' + letter + "</span>";
  }
  function resCard(r) {
    return '<div class="res-card reveal">' +
      '<div class="res-head">' +
        resLogoHTML(r, "res-avatar res-logo") +
        "<div><h4>" + esc(r.name) + '</h4><div class="res-type">' + esc(r.type) + "</div></div>" +
      "</div>" +
      "<p>" + esc(r.text) + "</p>" +
      '<a class="res-link" href="' + esc(r.url) + '" target="_blank" rel="noopener">访问 ↗</a>' +
      "</div>";
  }
  var RES_GROUPS = ["厂商官方博客", "个人博客", "中文媒体 · 公众号"];
  var RES_GROUP_COLORS = { "厂商官方博客": "#22d3ee", "个人博客": "#818cf8", "中文媒体 · 公众号": "#fbbf24" };
  $("res-zone").innerHTML = RES_GROUPS.map(function (g) {
    var items = D.knowledge.resources.filter(function (r) { return r.group === g; });
    if (!items.length) return "";
    return '<h3 class="sub-h">' + esc(g) + "</h3>" +
      '<div class="res-grid">' + items.map(resCard).join("") + "</div>";
  }).join("");

  /* 博客卡片点击 -> 简介面板（logo + 近期文章分页列表，端侧相关背光高亮） */
  function hostOf(u) {
    var m = String(u || "").match(/^https?:\/\/([^\/]+)/);
    return m ? m[1] : "原文";
  }
  var POSTS_PER_PAGE = 6;
  var resCur = null, resPage = 1;

  function resPanelHTML(rc) {
    var color = RES_GROUP_COLORS[rc.group] || "#818cf8";
    var f = FEEDS[rc.name] || {};
    var posts = f.posts || [];
    var edgeN = posts.filter(function (p) { return p.e; }).length;
    var paras = String(rc.intro || rc.text).split("\n").filter(Boolean)
      .map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
    return '<div class="panel-kicker">' +
        '<span class="src-badge" style="color:' + color + ';border-color:' + color + '55;background:' + color + '12">' + esc(rc.group) + "</span>" +
        '<span class="card-date">' + esc(rc.type) + "</span>" +
      "</div>" +
      '<div class="res-detail-head">' +
        resLogoHTML(rc, "panel-logo") +
        "<div><h3>" + esc(rc.name) + "</h3>" +
        '<div class="res-sub">端侧相关 ' + edgeN + " 篇置顶" + (posts.length - edgeN ? " · 其他 " + (posts.length - edgeN) + " 篇" : "") + "</div></div>" +
      "</div>" +
      '<div class="panel-detail">' + paras + "</div>" +
      '<div class="post-head">文章列表<span>端侧相关置顶并流光高亮 · 其余按时间排列</span></div>' +
      '<div id="post-zone"></div>' +
      '<div class="panel-actions"><a class="btn-src" href="' + esc(rc.url) + '" target="_blank" rel="noopener">访问 ' + esc(hostOf(rc.url)) + " ↗</a></div>";
  }

  function renderResPosts(rc, page) {
    var f = FEEDS[rc.name] || {};
    var all = f.posts || [];
    if (!all.length) {
      var zone0 = document.getElementById("post-zone");
      if (zone0) zone0.innerHTML = '<div class="post-empty">该厂商官方博客无公开 RSS，动态已收录在「本周资讯」板块；技术模型与部署实践可点击下方按钮访问 AI Hub</div>';
      return;
    }
    // 端侧相关置顶（按时间倒序），其余普通展示（按时间倒序）
    var posts = all.filter(function (p) { return p.e; }).concat(
                 all.filter(function (p) { return !p.e; }));
    var zone = document.getElementById("post-zone");
    if (!zone) return;
    var pages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
    page = Math.min(Math.max(1, page), pages);
    resPage = page;
    var slice = posts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);
    var list = slice.map(function (p) {
      return '<a class="post-item' + (p.e ? " edge" : "") + '" href="' + esc(p.u) + '" target="_blank" rel="noopener">' +
        '<span class="post-date">' + esc(p.d || "—") + "</span>" +
        '<span class="post-main"><b class="post-title">' + esc(p.t) + "</b>" +
        (p.s ? '<i class="post-desc">' + esc(p.s) + "</i>" : "") + "</span>" +
        (p.e ? '<span class="post-flag">端侧</span>' : "") + "</a>";
    }).join("");
    var pager = "";
    if (pages > 1) {
      pager = '<div class="pager">';
      pager += '<button class="pg-btn" data-pg="' + (page - 1) + '"' + (page === 1 ? " disabled" : "") + ">‹</button>";
      var from = Math.max(1, page - 2), to = Math.min(pages, from + 4);
      from = Math.max(1, Math.min(from, to - 4));
      for (var i = from; i <= to; i++) {
        pager += '<button class="pg-btn' + (i === page ? " on" : "") + '" data-pg="' + i + '">' + i + "</button>";
      }
      pager += '<button class="pg-btn" data-pg="' + (page + 1) + '"' + (page === pages ? " disabled" : "") + ">›</button>";
      pager += '<span class="pg-info">' + page + " / " + pages + "</span></div>";
    }
    zone.innerHTML = list + pager;
  }

  $("res-zone").addEventListener("click", function (e) {
    if (e.target.closest("a")) return;
    var card = e.target.closest(".res-card");
    if (!card) return;
    var name = card.querySelector("h4").textContent;
    var rc = D.knowledge.resources.filter(function (x) { return x.name === name; })[0];
    if (!rc) return;
    resCur = rc;
    panelBody.innerHTML = resPanelHTML(rc);
    panelBody.scrollTop = 0;
    panel.classList.add("open");
    overlay.classList.add("show");
    document.body.classList.add("panel-open");
    renderResPosts(rc, 1);
  });

  /* 面板内分页按钮（document 级委托，panelBody 在后方定义） */
  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".pg-btn");
    if (!btn || btn.disabled || !resCur || !document.getElementById("post-zone")) return;
    e.preventDefault();
    renderResPosts(resCur, parseInt(btn.dataset.pg, 10) || 1);
    var head = panelBody.querySelector(".post-head");
    panelBody.scrollTop = head ? head.offsetTop - 20 : 0;
  });

  /* ============================================================
   * 详情抽屉
   * ============================================================ */
  var panel = $("detail-panel"), overlay = $("overlay"), panelBody = $("panel-body");

  /* ---------- 详情配图：真实图片 + 生成式兜底封面 ---------- */
  function coverLines(title) {
    var s = String(title || ""), out = [], cur = "", w = 0;
    for (var i = 0; i < s.length && out.length < 2; i++) {
      var ch = s.charAt(i);
      var cw = ch.charCodeAt(0) > 255 ? 1 : 0.55;
      if (w + cw > 19.5) { out.push(cur); cur = ""; w = 0; }
      cur += ch; w += cw;
    }
    if (out.length < 2 && cur) out.push(cur);
    if (out.length === 2 && s.length > (out[0] + out[1]).length) {
      out[1] = out[1].replace(/.{1,3}$/, "") + "…";
    }
    if (!out.length) out.push("");
    return out;
  }

  function coverSVG(item, type) {
    var color = type === "news" ? (NEWS_CAT_COLORS[item.cat] || "#818cf8") : (CAT_COLOR[item.cat] || "#818cf8");
    var L = coverLines(item.title);
    var label = type === "news" ? ("EDGE AI WEEKLY · " + item.cat) : ("PAPER · " + (item.venue || ""));
    var sub = (item.date || "") + (item.source ? " · " + item.source : "");
    return '<svg viewBox="0 0 640 360" role="img" aria-label="封面图">' +
      '<defs><linearGradient id="covbg" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#0c1424"/><stop offset="1" stop-color="#101a30"/></linearGradient></defs>' +
      '<rect width="640" height="360" fill="url(#covbg)"/>' +
      '<circle cx="560" cy="46" r="150" fill="' + color + '" opacity="0.16"/>' +
      '<circle cx="76" cy="330" r="110" fill="' + color + '" opacity="0.10"/>' +
      '<rect x="48" y="88" width="56" height="4" rx="2" fill="' + color + '"/>' +
      '<text x="48" y="64" font-size="17" letter-spacing="3" fill="' + color + '" font-family="Consolas, monospace">' + esc(label.slice(0, 40)) + "</text>" +
      '<text x="48" y="152" font-size="30" font-weight="700" fill="#e8ecf6">' + esc(L[0]) + "</text>" +
      '<text x="48" y="198" font-size="30" font-weight="700" fill="#e8ecf6">' + esc(L[1] || "") + "</text>" +
      '<text x="48" y="322" font-size="16" fill="#64708a">' + esc(sub.slice(0, 52)) + "</text>" +
      "</svg>";
  }

  function figureHTML(item, type) {
    var cap = item.imageCap ? '<div class="fig-cap">' + esc(item.imageCap) + "</div>" : "";
    if (item.image) {
      return '<div class="panel-fig"><img src="' + esc(item.image) + '" alt="' + esc(item.title) + '" loading="lazy" decoding="async" referrerpolicy="no-referrer">' + cap + "</div>";
    }
    return '<div class="panel-fig">' + coverSVG(item, type) + "</div>";
  }

  function openPanel(type, item) {
    panelBody.innerHTML = detailHTML(type, item);
    var img = panelBody.querySelector(".panel-fig img");
    if (img) {
      img.addEventListener("error", function () {
        img.parentElement.innerHTML = coverSVG(item, type);
      });
    }
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
      figureHTML(item, type) +
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
      if (item) openPanel(type, item);
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
  buildViz();
  spotlight($("news-grid"));
  spotlight($("papers-grid"));
  bindCards($("news-grid"), "news");
  bindCards($("papers-grid"), "papers");
  Array.prototype.forEach.call(document.querySelectorAll(".tl-item, .res-card, .stat, .editors-note"), function (el) {
    revealIO.observe(el);
    el.classList.add("reveal");
  });
})();
