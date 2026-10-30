/* ============================================================
 * 端侧大模型知识地图 · 渲染与交互（kmap_app.js）
 * ------------------------------------------------------------
 * 职责：把 kmap_data.js 渲染成思维导图（主干 → 领域分支 → 概念叶子）+ SVG 连线，
 *       提供搜索 / 难度筛选 / 知识一览（建议顺序）/ 右侧详情抽屉。
 * 约定：所有数据文本经 textContent 注入（无 innerHTML 拼接），
 *       ref 链接仅允许 http(s)，页面双击 file:// 直开可用。
 * ============================================================ */
(function () {
  "use strict";

  var K = window.KMAP;
  var $ = function (id) { return document.getElementById(id); };

  var state = { q: "", level: "all", route: false, selected: null };
  var byId = {};          // id -> node 数据
  var domById = {};       // id -> 卡片 DOM
  var edges = [];         // 去重后的关联边
  var pathNodes = [];     // 按建议顺序排列的知识一览节点
  var LEVELS = ["入门", "进阶"];

  K.nodes.forEach(function (n) { byId[n.id] = n; });

  /* ---------- 边收集：无向去重（同一对节点只保留先登记的一条） ---------- */
  (function () {
    var seen = {};
    K.nodes.forEach(function (n) {
      (n.related || []).forEach(function (r) {
        if (!byId[r.to]) return;
        var key = n.id < r.to ? n.id + "|" + r.to : r.to + "|" + n.id;
        if (seen[key]) return;
        seen[key] = 1;
        edges.push({ from: n.id, to: r.to, kind: r.kind === "lead" ? "lead" : "rel", note: r.note || "" });
      });
    });
  })();

  /* ---------- 建议阅读顺序（按 path 序号） ---------- */
  pathNodes = K.nodes.filter(function (n) { return n.path; })
    .sort(function (a, b) { return a.path - b.path; });

  /* ---------- 工具 ---------- */
  function safeUrl(u) { return /^https?:\/\//i.test(u || "") ? u : null; }
  function debounce(fn, ms) {
    var t = 0;
    return function () { clearTimeout(t); t = setTimeout(fn, ms); };
  }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  /* ---------- 筛选匹配 ---------- */
  function nodeMatches(n) {
    if (state.level !== "all" && n.level !== state.level) return false;
    if (state.q) {
      var hay = (n.title + " " + n.en + " " + n.oneLiner + " " + (n.keys || []).join(" ")).toLowerCase();
      if (hay.indexOf(state.q) < 0) return false;
    }
    return true;
  }

  /* ---------- 地图渲染（思维导图：左主干 → 领域分支 → 概念叶子） ---------- */
  function renderMap() {
    var wrap = $("kmap-inner");
    wrap.textContent = "";
    domById = {};

    var mmap = el("div", "mmap");
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.id = "kmap-edges";
    svg.setAttribute("aria-hidden", "true");
    mmap.appendChild(svg);

    /* 主干 */
    var root = el("div", "mroot");
    root.appendChild(el("b", null, "端侧大模型"));
    root.appendChild(el("span", null, "基础知识 · BASICS"));
    mmap.appendChild(root);

    /* 分支列 */
    var branches = el("div", "mbranches");
    var maxCount = 0;
    K.domains.forEach(function (d) {
      var c = K.nodes.filter(function (n) { return n.domain === d.id; }).length;
      if (c > maxCount) maxCount = c;
    });

    K.domains.forEach(function (d) {
      /* 分支行：[分支节点] + [概念卡纵向展开]，连线由 drawEdges 扇形绘制 */
      var br = el("div", "mbranch");
      br.dataset.domain = d.id;
      br.style.setProperty("--daccent", d.accent);

      var dn = el("div", "mnode");
      dn.setAttribute("role", "button");
      dn.setAttribute("tabindex", "0");
      dn.setAttribute("aria-expanded", "true");
      dn.setAttribute("aria-label", d.name + "，点击收起或展开该分支的概念");
      var dnHead = el("div", "mn-head");
      dnHead.appendChild(el("span", "kd-ico", d.name.charAt(0)));
      var dnT = el("div", "mn-title");
      dnT.appendChild(el("b", null, d.name));
      dnT.appendChild(el("span", "kd-count"));
      dnHead.appendChild(dnT);
      dnHead.appendChild(el("span", "mn-caret", "▾"));
      dn.appendChild(dnHead);
      dn.appendChild(el("p", "kd-desc", d.desc));
      dn.addEventListener("click", function () { toggleBranch(d.id); });
      dn.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleBranch(d.id); }
      });
      br.appendChild(dn);

      var lv = el("div", "mleaves");
      var nodes = K.nodes.filter(function (n) { return n.domain === d.id; });
      nodes.forEach(function (n) { lv.appendChild(renderCard(n, d)); });
      if (nodes.length < maxCount) {
        var ghost = el("div", "knode knode-ghost");
        ghost.setAttribute("aria-hidden", "true");
        ghost.appendChild(el("div", "kn-en", "MORE COMING"));
        ghost.appendChild(el("p", "kn-liner", "加一个概念 = 在 kmap_data.js 里加一个对象，地图自动长出来"));
        lv.appendChild(ghost);
      }
      br.appendChild(lv);
      branches.appendChild(br);
    });

    mmap.appendChild(branches);
    wrap.appendChild(mmap);
    wrap.appendChild(el("div", "empty-note", "没有匹配的概念，换个词试试"));
    applyFilter();
  }

  function renderCard(n, d) {
    var c = el("article", "knode");
    c.dataset.id = n.id;
    if (n.path) c.style.setProperty("--step", n.path); /* 知识一览：按步数瀑布弹跳 */
    c.tabIndex = 0;
    c.setAttribute("role", "button");
    c.setAttribute("aria-label", n.title + "，" + n.oneLiner);
    c.style.setProperty("--daccent", d.accent);

    c.appendChild(el("span", "kn-badge", n.path ? String(n.path) : ""));
    var top = el("div", "kn-top");
    top.appendChild(el("h3", null, n.title));
    var lv = el("span", "kn-level lv-" + (LEVELS.indexOf(n.level) >= 0 ? n.level : "入门"), n.level);
    top.appendChild(lv);
    c.appendChild(top);
    c.appendChild(el("div", "kn-en", n.en));
    c.appendChild(el("p", "kn-liner", n.oneLiner));

    c.addEventListener("click", function () { openNode(n.id); });
    c.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openNode(n.id); }
    });
    c.addEventListener("mouseenter", function () { focusNode(n.id, true); });
    c.addEventListener("mouseleave", function () { focusNode(n.id, false); });

    domById[n.id] = c;
    return c;
  }

  /* ---------- 筛选应用（节点显隐 + 计数 + 重画连线） ---------- */
  function applyFilter() {
    var visible = 0;
    K.nodes.forEach(function (n) {
      var ok = nodeMatches(n);
      domById[n.id].classList.toggle("filtered-out", !ok);
      domById[n.id].classList.toggle("on-path", !!n.path); /* CSS 由 .route-on 祖先控制显隐 */
      if (ok) visible++;
    });
    K.domains.forEach(function (d) {
      var nodes = K.nodes.filter(function (n) { return n.domain === d.id; });
      var vis = nodes.filter(nodeMatches).length;
      var sec = document.querySelector('.mbranch[data-domain="' + d.id + '"]');
      if (sec) {
        sec.classList.toggle("dom-hidden", vis === 0);
        sec.querySelector(".kd-count").textContent = vis + " / " + nodes.length;
      }
    });
    var mapEl = $("kmap");
    mapEl.classList.toggle("has-empty", visible === 0);
    $("kmap-count").textContent = visible + " / " + K.nodes.length + " 个概念";
    /* 同步绘制（不依赖 rAF：页面不可见时 rAF 会被节流，曾导致空地图） */
    drawEdges();
  }

  /* ---------- SVG 连线 ---------- */
  function svgEl(tag, attrs) {
    var e = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }

  /* 布局坐标（mmap 本地坐标系）：必须沿 offsetParent 链累加——
     offsetLeft 只相对最近的定位祖先（如 .mbranches），直接用会整体偏移、线画进空白 */
  function anchorOf(elm) {
    var mmap = document.querySelector(".mmap");
    var x = 0, y = 0, e = elm;
    while (e && e !== mmap) {
      x += e.offsetLeft; y += e.offsetTop;
      e = e.offsetParent;
    }
    return {
      left: x, right: x + elm.offsetWidth,
      top: y, bottom: y + elm.offsetHeight,
      cx: x + elm.offsetWidth / 2, cy: y + elm.offsetHeight / 2
    };
  }
  function cardAnchor(id) {
    var c = domById[id];
    /* offsetParent 为空 = 被筛选隐藏或所在分支已收起 */
    if (!c || c.classList.contains("filtered-out") || c.offsetParent === null) return null;
    return anchorOf(c);
  }

  /* ---------- 分支收起 / 展开 ---------- */
  function toggleBranch(domainId) {
    var br = document.querySelector('.mbranch[data-domain="' + domainId + '"]');
    if (!br) return;
    var collapsed = br.classList.toggle("collapsed");
    var node = br.querySelector(".mnode");
    if (node) node.setAttribute("aria-expanded", collapsed ? "false" : "true");
    drawEdges();
  }

  /* 圆角正交折线（思维导图分支连线的规整形态） */
  function roundedPath(pts, r) {
    r = r || 10;
    var d = "M " + pts[0][0] + " " + pts[0][1];
    for (var i = 1; i < pts.length - 1; i++) {
      var p0 = pts[i - 1], p1 = pts[i], p2 = pts[i + 1];
      var v1x = p1[0] - p0[0], v1y = p1[1] - p0[1];
      var v2x = p2[0] - p1[0], v2y = p2[1] - p1[1];
      var l1 = Math.sqrt(v1x * v1x + v1y * v1y) || 1;
      var l2 = Math.sqrt(v2x * v2x + v2y * v2y) || 1;
      var rr = Math.min(r, l1 / 2, l2 / 2);
      d += " L " + (p1[0] - v1x / l1 * rr) + " " + (p1[1] - v1y / l1 * rr) +
           " Q " + p1[0] + " " + p1[1] + " " + (p1[0] + v2x / l2 * rr) + " " + (p1[1] + v2y / l2 * rr);
    }
    var last = pts[pts.length - 1];
    d += " L " + last[0] + " " + last[1];
    return d;
  }
  /* 领域主题色(#rrggbb) → rgba()，纯颜色字符串换算 */
  function accentRgba(hex, alpha) {
    var m = (hex || "").toLowerCase().match(/^#?([0-9a-f]{6})$/);
    if (!m) return "rgba(129,140,248," + alpha + ")";
    var v = parseInt(m[1], 16);
    return "rgba(" + ((v >> 16) & 255) + "," + ((v >> 8) & 255) + "," + (v & 255) + "," + alpha + ")";
  }

  /* 同列中是否还夹着别的可见卡片（决定竖直连线直连还是绕行；offset 坐标系） */
  function hasCardBetween(a, b) {
    var ids = Object.keys(domById);
    for (var i = 0; i < ids.length; i++) {
      var c = domById[ids[i]];
      if (!c || c.classList.contains("filtered-out")) continue;
      var ccx = c.offsetLeft + c.offsetWidth / 2, ccy = c.offsetTop + c.offsetHeight / 2;
      if (Math.abs(ccx - a.cx) > 8) continue;
      var lo = Math.min(a.cy, b.cy), hi = Math.max(a.cy, b.cy);
      if (ccy > lo + 6 && ccy < hi - 6) return true;
    }
    return false;
  }

  function edgePath(a, b, sameCol) {
    if (sameCol && !hasCardBetween(a, b)) {
      /* 同列相邻卡：底边 → 顶边的短竖线 */
      if (b.cy >= a.cy) {
        return "M " + a.cx + " " + a.bottom + " C " + a.cx + " " + (a.bottom + 30) + ", " +
          b.cx + " " + (b.top - 30) + ", " + b.cx + " " + b.top;
      }
      return "M " + a.cx + " " + a.top + " C " + a.cx + " " + (a.top - 30) + ", " +
        b.cx + " " + (b.bottom + 30) + ", " + b.cx + " " + b.bottom;
    }
    if (sameCol) {
      /* 同列隔卡：绕行列间 gutter（左列最左则走右侧 gutter），避免穿过中间卡片背后 */
      var leftGutter = a.left > 30;
      var gx = leftGutter ? a.left - 22 : a.right + 22;
      var y0 = a.cy, y1 = b.cy;
      var mid0 = y0 + (y1 > y0 ? 26 : -26), mid1 = y1 - (y1 > y0 ? 26 : -26);
      return "M " + a.left + " " + y0 +
        " C " + (a.left + (leftGutter ? -16 : 16)) + " " + y0 + ", " + gx + " " + mid0 + ", " + gx + " " + mid0 +
        " L " + gx + " " + mid1 +
        " C " + gx + " " + mid1 + ", " + (b.left + (leftGutter ? -16 : 16)) + " " + y1 + ", " + b.left + " " + y1;
    }
    var fwd = b.cx >= a.cx;
    var sx = fwd ? a.right : a.left, sy = a.cy;
    var tx = fwd ? b.left - 10 : b.right + 10, ty = b.cy; /* 箭头离目标卡留 10px 间隙，不顶边 */
    var dx = Math.min(Math.max(Math.abs(tx - sx) * 0.45, 36), 150);
    return "M " + sx + " " + sy + " C " + (sx + (fwd ? dx : -dx)) + " " + sy + ", " +
      (tx + (fwd ? -dx : dx)) + " " + ty + ", " + tx + " " + ty;
  }

  function drawEdges() {
    var svg = $("kmap-edges");
    var mmap = document.querySelector(".mmap");
    if (!svg || !mmap || window.getComputedStyle(svg).display === "none") return;
    svg.textContent = "";
    svg.setAttribute("width", mmap.offsetWidth);
    svg.setAttribute("height", mmap.offsetHeight);
    svg.setAttribute("viewBox", "0 0 " + mmap.offsetWidth + " " + mmap.offsetHeight);

    var defs = svgEl("defs", {});
    var mk = svgEl("marker", { id: "arr", viewBox: "0 0 10 10", refX: "8", refY: "5",
      markerWidth: "5.5", markerHeight: "5.5", orient: "auto-start-reverse" });
    mk.appendChild(svgEl("path", { d: "M 0 1 L 9 5 L 0 9 z", fill: "rgba(34,211,238,0.42)" }));
    defs.appendChild(mk);
    svg.appendChild(defs);

    /* —— 思维导图扇形连线（anchorOf 已修 offsetParent 链，端点精确落边） —— */
    var rootEl = document.querySelector(".mroot");
    if (rootEl) {
      var ra = anchorOf(rootEl);
      document.querySelectorAll(".mbranch").forEach(function (br) {
        if (br.classList.contains("dom-hidden")) return;
        var d = K.domains.filter(function (x) { return x.id === br.dataset.domain; })[0];
        if (!d) return;
        var dn = anchorOf(br.querySelector(".mnode"));

        /* 主干 → 分支节点：S 曲线（dx 严格 < 间距一半，杜绝控制点反穿回钩） */
        var dx = Math.min(Math.abs(dn.left - ra.right) * 0.45, 70);
        svg.appendChild(svgEl("path", {
          d: "M " + ra.right + " " + ra.cy + " C " + (ra.right + dx) + " " + ra.cy +
             ", " + (dn.left - dx) + " " + dn.cy + ", " + dn.left + " " + dn.cy,
          "class": "kedge-branch", fill: "none",
          stroke: accentRgba(d.accent, 0.8), "stroke-width": "2.4", "stroke-linecap": "round"
        }));

        /* 分支 → 概念卡：扇形曲线，每条精确接卡片左缘 */
        if (!br.classList.contains("collapsed")) {
          var cards = Array.prototype.slice.call(
            br.querySelectorAll(".knode:not(.knode-ghost):not(.filtered-out)"));
          cards.forEach(function (cardEl) {
            var la = anchorOf(cardEl);
            var dx2 = Math.min(Math.abs(la.left - dn.right) * 0.5, 56);
            svg.appendChild(svgEl("path", {
              d: "M " + dn.right + " " + dn.cy + " C " + (dn.right + dx2) + " " + dn.cy +
                 ", " + (la.left - dx2) + " " + la.cy + ", " + la.left + " " + la.cy,
              "class": "kedge-branch kedge-leaf", fill: "none",
              stroke: accentRgba(d.accent, 0.62), "stroke-width": "1.9", "stroke-linecap": "round"
            }));
          });
        }
      });
    }

    /* —— 跨领域关联（默认隐入背景，悬停/选中点亮） —— */
    edges.forEach(function (e) {
      var a = cardAnchor(e.from), b = cardAnchor(e.to);
      if (!a || !b) return;
      var sameCol = Math.abs(a.cx - b.cx) < 8;
      var p = svgEl("path", {
        d: edgePath(a, b, sameCol),
        "class": "kedge kedge-extra " + (e.kind === "lead" ? "kedge-lead" : "kedge-rel"),
        "data-from": e.from, "data-to": e.to
      });
      if (e.kind === "lead") p.setAttribute("marker-end", "url(#arr)");
      svg.appendChild(p);
    });

    /* 知识一览不再画跨图顺序连线（横穿三分支是视觉混乱之源）：
       顺序由常显的带圈数字徽章表达，开关只做「聚焦」——路线上节点点亮、其余压暗。 */
  }

  /* ---------- 悬停聚焦：点亮邻边与邻居 ---------- */
  function focusNode(id, on) {
    if (state.selected) return; /* 抽屉打开时保持选中态高亮 */
    setFocus(id, on);
  }
  function setFocus(id, on) {
    document.querySelectorAll('.kedge[data-from="' + id + '"], .kedge[data-to="' + id + '"]')
      .forEach(function (p) { p.classList.toggle("hl", on); });
    edges.forEach(function (e) {
      if (e.from === id && domById[e.to]) domById[e.to].classList.toggle("hl-n", on);
      if (e.to === id && domById[e.from]) domById[e.from].classList.toggle("hl-n", on);
    });
    if (domById[id]) domById[id].classList.toggle("hl-self", on);
    $("kmap-inner").classList.toggle("has-focus", on);
  }
  function clearFocus() {
    document.querySelectorAll(".kedge.hl").forEach(function (p) { p.classList.remove("hl"); });
    document.querySelectorAll(".knode.hl-n").forEach(function (c) { c.classList.remove("hl-n"); });
    document.querySelectorAll(".knode.hl-self").forEach(function (c) { c.classList.remove("hl-self"); });
    $("kmap-inner").classList.remove("has-focus");
  }

  /* ---------- 详情抽屉 ---------- */
  function openNode(id) {
    var n = byId[id];
    if (!n) return;
    if (state.selected) setFocus(state.selected, false);
    state.selected = id;
    clearFocus();
    setFocus(id, true);
    Object.keys(domById).forEach(function (k) {
      domById[k].classList.toggle("sel", k === id);
    });

    var d = K.domains.filter(function (x) { return x.id === n.domain; })[0] || K.domains[0];
    var body = $("panel-body");
    body.textContent = "";
    body.scrollTop = 0;

    var kick = el("div", "panel-kicker");
    var dchip = el("span", "kd-chip", d.icon + " " + d.name);
    dchip.style.cssText = "--daccent:" + d.accent;
    kick.appendChild(dchip);
    kick.appendChild(el("span", "kn-level lv-" + n.level, n.level));
    if (n.path) kick.appendChild(el("span", "path-chip", "建议顺序 · 第 " + n.path + " 步"));
    body.appendChild(kick);

    body.appendChild(el("h3", null, n.title));
    body.appendChild(el("div", "kde-en", n.en));
    body.appendChild(el("div", "kde-liner", n.oneLiner));

    var det = el("div", "panel-detail");
    (n.detail || []).forEach(function (p) { det.appendChild(el("p", null, p)); });
    body.appendChild(det);

    if (n.keys && n.keys.length) {
      body.appendChild(el("h4", "kde-h", "关键数字"));
      var ul = el("ul", "kde-keys");
      n.keys.forEach(function (k) { ul.appendChild(el("li", null, k)); });
      body.appendChild(ul);
    }

    var relEdges = edges.filter(function (e) { return e.from === n.id || e.to === n.id; });
    if (relEdges.length) {
      body.appendChild(el("h4", "kde-h", "关联概念"));
      var rw = el("div", "kde-related");
      relEdges.forEach(function (e) {
        var other = e.from === n.id ? e.to : e.from;
        var arrow = e.kind === "lead" ? "→ " : "↔ ";
        var b = el("button", "kde-rel");
        b.appendChild(el("b", null, arrow + byId[other].title));
        if (e.note) b.appendChild(el("span", null, e.note));
        b.addEventListener("click", function () { openNode(other); flashCard(other); });
        rw.appendChild(b);
      });
      body.appendChild(rw);
    }

    if (n.refs && n.refs.length) {
      body.appendChild(el("h4", "kde-h", "延伸阅读"));
      var rf = el("div", "kde-refs");
      n.refs.forEach(function (r) {
        var u = safeUrl(r.url);
        var a = el("a", "kde-ref", r.name);
        a.href = u || "";
        a.target = "_blank";
        a.rel = "noopener";
        if (!u) a.classList.add("kde-ref-nol");
        rf.appendChild(a);
      });
      body.appendChild(rf);
    }

    /* 路线上一站 / 下一站 */
    if (n.path) {
      var prev = pathNodes[n.path - 2], next = pathNodes[n.path];
      var nav = el("div", "kde-route-nav");
      [["← 上一个", prev], ["下一个 →", next]].forEach(function (it) {
        var label = it[0], target = it[1];
        var b = el("button", "kde-nav" + (target ? "" : " kde-nav-off"), label);
        if (target) b.addEventListener("click", function () { openNode(target.id); flashCard(target.id); });
        nav.appendChild(b);
      });
      body.appendChild(nav);
    }

    $("detail-panel").classList.add("open");
    $("overlay").classList.add("show");
    document.body.classList.add("panel-open");
    try { history.replaceState(null, "", "#node/" + id); } catch (err) { /* file:// 下可能受限，忽略 */ }
  }

  function closePanel() {
    if (state.selected) { setFocus(state.selected, false); }
    state.selected = null;
    clearFocus();
    Object.keys(domById).forEach(function (k) { domById[k].classList.remove("sel"); });
    $("detail-panel").classList.remove("open");
    $("overlay").classList.remove("show");
    document.body.classList.remove("panel-open");
    /* 清掉深链，避免刷新又自动弹出抽屉 */
    try { history.replaceState(null, "", location.pathname + location.search); } catch (err) { /* file:// 下可能受限，忽略 */ }
  }

  function flashCard(id) {
    var c = domById[id];
    if (!c) return;
    c.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
  }

  /* ---------- 工具栏：搜索 / 难度 / 路线开关 ---------- */
  function renderToolbar() {
    var q = $("kmap-q");
    q.addEventListener("input", debounce(function () {
      state.q = q.value.trim().toLowerCase();
      applyFilter();
    }, 140));

    var chips = $("level-chips");
    var lvCounts = { all: K.nodes.length };
    LEVELS.forEach(function (lv) {
      lvCounts[lv] = K.nodes.filter(function (n) { return n.level === lv; }).length;
    });
    [["all", "全部"], ["入门", "入门"], ["进阶", "进阶"]].forEach(function (it, idx) {
      var c = el("button", "chip" + (idx === 0 ? " on" : ""));
      c.appendChild(el("span", null, it[1]));
      c.appendChild(el("span", "cnt", String(lvCounts[it[0]] || 0)));
      c.addEventListener("click", function () {
        state.level = it[0];
        chips.querySelectorAll(".chip").forEach(function (x) { x.classList.remove("on"); });
        c.classList.add("on");
        applyFilter();
      });
      chips.appendChild(c);
    });

    var rt = $("route-toggle");
    rt.addEventListener("click", function () {
      state.route = !state.route;
      rt.classList.toggle("on", state.route);
      rt.setAttribute("aria-pressed", state.route ? "true" : "false");
      $("kmap").classList.toggle("route-on", state.route);
      drawEdges();
    });
  }

  /* ---------- 首屏统计 ---------- */
  function renderStats() {
    var meta = $("intro-meta");
    meta.textContent = "";
    var parts = [
      [K.domains.length, " 大分支"],
      [K.nodes.length, " 个概念"],
      [edges.length, " 条关联"],
      ["", pathNodes.length + " 步建议顺序"]
    ];
    parts.forEach(function (p, i) {
      if (i > 0) meta.appendChild(el("span", null, "  ·  "));
      if (p[0] !== "") meta.appendChild(el("b", null, String(p[0])));
      meta.appendChild(document.createTextNode(p[1]));
    });
    $("footer-meta").textContent =
      "数据 v" + K.version + " · 更新于 " + K.updated +
      "  ·  加新概念只改 js/kmap_data.js，扩展指南见 README.md";
  }

  /* ---------- 启动 ---------- */
  function init() {
    renderMap();
    renderToolbar();
    renderStats();

    $("panel-close").addEventListener("click", closePanel);
    $("overlay").addEventListener("click", closePanel);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closePanel();
    });

    if (window.ResizeObserver) {
      new ResizeObserver(debounce(drawEdges, 120)).observe($("kmap-inner"));
    }
    window.addEventListener("resize", debounce(drawEdges, 120));

    /* 深链：#node/<id> 直开详情（分享 / 未来嵌入用） */
    var m = (location.hash || "").match(/^#node\/([a-z0-9_-]+)$/i);
    if (m && byId[m[1]]) setTimeout(function () { openNode(m[1]); }, 250);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
