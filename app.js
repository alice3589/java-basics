/* =========================================================
   Java基礎マスター - 共通スクリプト（全ページ共有）
   ナビ描画 / コード実行(Wandbox) / 練習問題の自動判定 /
   クイズ / 進捗 / テーマ / 検索 / 前後ページ
   ========================================================= */
(function () {
  "use strict";

  const WANDBOX_URL = "https://wandbox.org/api/compile.json";
  const COMPILER = "openjdk-jdk-22+36";
  const LS = { theme: "jbm_theme", progress: "jbm_progress", solved: "jbm_solved", quiz: "jbm_quiz" };

  const SITE = window.SITE || { pages: [] };
  const currentFile = (location.pathname.split("/").pop() || "index.html") || "index.html";

  // 進捗対象の全章
  const allProgressChapters = [];
  SITE.pages.forEach(p => (p.chapters || []).forEach(ch => { if (ch.progress) allProgressChapters.push(ch.id); }));

  let doneSet = new Set(loadJSON(LS.progress, []));
  let solvedSet = new Set(loadJSON(LS.solved, []));

  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    renderSidebar();
    renderPageNav();
    initSidebarToggle();
    initReadingBar();
    initScrollSpy();
    initCopyButtons();
    initRunnable();
    initQuizzes();
    initExercises();
    initProgressButtons();
    updateProgress();
    initSearch();
    initPlayground();
    initToTop();
    initHome();
  });

  /* ===================== ホーム ===================== */
  function initHome() {
    const prog = document.getElementById("homeProgress");
    if (prog) {
      const s = window.JBM.progressSummary();
      prog.innerHTML =
        '<div class="hp-row"><span>学習の進捗</span><span>' + s.done + " / " + s.total + ' 章</span></div>' +
        '<div class="progress-track"><div class="hp-fill" style="height:100%;width:' + s.pct + '%;background:linear-gradient(90deg,var(--accent),var(--accent-2));border-radius:6px;"></div></div>' +
        '<div class="hp-stats">' +
          "<div><b>" + s.pct + "%</b><span>達成率</span></div>" +
          "<div><b>" + s.done + "</b><span>学習済みの章</span></div>" +
          "<div><b>" + s.solved + "</b><span>クリアした問題</span></div>" +
        "</div>";
    }
    const grid = document.getElementById("partGrid");
    if (grid) {
      let html = "";
      SITE.pages.forEach(p => {
        if (!p.group) return;
        const chs = p.chapters || [];
        const lis = chs.map(ch => {
          const ok = doneSet.has(ch.id) || solvedSet.has(ch.id);
          return '<li><span class="ck' + (ok ? "" : " no") + '">' + (ok ? "✓" : "○") + "</span>" + esc(ch.title) + "</li>";
        }).join("");
        html += '<a class="part-card" href="' + p.file + '"><div class="pc-ico">' + (p.icon || "") + "</div>" +
          "<h3>" + esc(p.group) + "</h3><div class=\"pc-count\">" + chs.length + " 章</div><ul>" + lis + "</ul></a>";
      });
      grid.innerHTML = html;
    }
  }

  /* ===================== テーマ ===================== */
  function initTheme() {
    const html = document.documentElement;
    const btn = document.getElementById("themeToggle");
    const saved = localStorage.getItem(LS.theme) ||
      (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    apply(saved);
    if (btn) btn.addEventListener("click", () => {
      const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
      apply(next); localStorage.setItem(LS.theme, next);
    });
    function apply(t) {
      html.setAttribute("data-theme", t);
      if (btn) btn.textContent = t === "dark" ? "🌙" : "☀️";
      const d = document.getElementById("prismDark"), l = document.getElementById("prismLight");
      if (d && l) { d.disabled = (t !== "dark"); l.disabled = (t === "dark"); }
    }
  }

  /* ===================== サイドバー描画 ===================== */
  function renderSidebar() {
    const sb = document.getElementById("sidebar");
    if (!sb) return;
    let html = '<div class="progress-box">' +
      '<div class="progress-label"><span>学習の進捗</span><span id="progressText">0 / 0</span></div>' +
      '<div class="progress-track"><div id="progressFill"></div></div>' +
      '<button id="resetProgress" title="進捗をリセット">リセット</button></div><ul id="navList">';

    SITE.pages.forEach(p => {
      if (!p.group) {
        html += '<li><a class="navtop' + (p.file === currentFile ? " curpage" : "") + '" href="' + p.file + '">' +
          (p.icon || "") + " " + esc(p.title || p.file) + "</a></li>";
      } else {
        html += '<li class="nav-group">' + (p.icon || "") + " " + esc(p.group) + "</li>";
        p.chapters.forEach(ch => {
          const onThis = (p.file === currentFile);
          html += '<li><a href="' + p.file + "#" + ch.id + '" data-chid="' + ch.id + '"' +
            (onThis ? ' data-here="1"' : "") + '>' + esc(ch.title) + "</a></li>";
        });
      }
    });
    html += "</ul>";
    sb.innerHTML = html;

    const reset = document.getElementById("resetProgress");
    if (reset) reset.addEventListener("click", () => {
      if (!confirm("学習の進捗・正解履歴をすべてリセットしますか？")) return;
      doneSet.clear(); solvedSet.clear();
      saveJSON(LS.progress, []); saveJSON(LS.solved, []);
      document.querySelectorAll(".complete-btn").forEach(b => { b.classList.remove("done"); b.textContent = "学習済みにする"; });
      document.querySelectorAll(".ex").forEach(refreshExerciseSolvedUI);
      updateProgress();
    });
  }

  /* ===================== 前後ページ ===================== */
  function renderPageNav() {
    const host = document.getElementById("pagenav");
    if (!host) return;
    const order = SITE.pages;
    const idx = order.findIndex(p => p.file === currentFile);
    if (idx < 0) return;
    const prev = order[idx - 1], next = order[idx + 1];
    let html = "";
    html += prev ? '<a class="pn prev" href="' + prev.file + '">← ' + esc(prev.group || prev.title) + "</a>" : "<span></span>";
    html += next ? '<a class="pn next" href="' + next.file + '">' + esc(next.group || next.title) + " →</a>" : "<span></span>";
    host.innerHTML = html;
  }

  /* ===================== サイドバー開閉 ===================== */
  function initSidebarToggle() {
    const sb = document.getElementById("sidebar");
    const ov = document.getElementById("overlay");
    const tg = document.getElementById("navToggle");
    if (!sb || !tg) return;
    const open = () => { sb.classList.add("open"); if (ov) ov.classList.add("show"); };
    const close = () => { sb.classList.remove("open"); if (ov) ov.classList.remove("show"); };
    tg.addEventListener("click", () => sb.classList.contains("open") ? close() : open());
    if (ov) ov.addEventListener("click", close);
    sb.addEventListener("click", e => { if (e.target.tagName === "A" && window.innerWidth <= 980) close(); });
  }

  /* ===================== 読み取りバー ===================== */
  function initReadingBar() {
    const bar = document.getElementById("readingBar");
    if (!bar) return;
    const up = () => {
      const h = document.documentElement, max = h.scrollHeight - h.clientHeight;
      bar.style.width = max > 0 ? (h.scrollTop / max * 100) + "%" : "0%";
    };
    document.addEventListener("scroll", up, { passive: true }); up();
  }

  /* ===================== スクロールスパイ ===================== */
  function initScrollSpy() {
    const links = Array.from(document.querySelectorAll('#navList a[data-here="1"]'));
    if (!links.length) return;
    const map = new Map();
    links.forEach(a => { const s = document.getElementById(a.getAttribute("data-chid")); if (s) map.set(s, a); });
    const obs = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { links.forEach(l => l.classList.remove("active")); const a = map.get(e.target); if (a) { a.classList.add("active"); a.scrollIntoView({ block: "nearest" }); } }
    }), { rootMargin: "-15% 0px -75% 0px" });
    map.forEach((_, s) => obs.observe(s));
  }

  /* ===================== コピー ===================== */
  function initCopyButtons() {
    document.querySelectorAll("pre:not(.runnable)").forEach(pre => {
      if (pre.closest(".ex")) return; // 練習問題は専用UI
      const b = document.createElement("button");
      b.className = "copy-btn"; b.type = "button"; b.textContent = "コピー";
      b.addEventListener("click", () => {
        navigator.clipboard.writeText(pre.querySelector("code").innerText).then(() => {
          b.textContent = "コピーしました"; b.classList.add("copied");
          setTimeout(() => { b.textContent = "コピー"; b.classList.remove("copied"); }, 1500);
        });
      });
      pre.appendChild(b);
    });
  }

  /* ===================== Wandbox 実行 ===================== */
  function buildProgram(code, wrap) {
    let src = code;
    if (wrap === "main") {
      const imports = [], body = [];
      code.split("\n").forEach(l => (/^\s*import\s+/.test(l) ? imports.push(l.trim()) : body.push(l)));
      src = (imports.length ? imports.join("\n") + "\n" : "") +
        "public class Main {\n  public static void main(String[] args) throws Exception {\n" + body.join("\n") + "\n  }\n}";
    }
    return src.replace(/\bpublic\s+class\b/g, "class");
  }
  async function runOnWandbox(code, wrap, stdin) {
    const res = await fetch(WANDBOX_URL, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: buildProgram(code, wrap), compiler: COMPILER, stdin: stdin || "",
        "compiler-option-raw": "-encoding\nUTF-8",
        "runtime-option-raw": "-Dstdout.encoding=UTF-8\n-Dstderr.encoding=UTF-8"
      })
    });
    if (!res.ok) throw new Error("サーバーエラー (" + res.status + ")");
    return res.json();
  }

  /* ===================== 実行可能ブロック ===================== */
  function initRunnable() { document.querySelectorAll("pre.runnable").forEach(setupRunnable); }
  function setupRunnable(pre) {
    const codeEl = pre.querySelector("code");
    const original = codeEl.textContent.replace(/\n$/, "");
    const wrap = pre.getAttribute("data-wrap") || "";
    const presetStdin = pre.getAttribute("data-stdin") || "";

    const tb = document.createElement("div");
    tb.className = "run-toolbar";
    tb.innerHTML = '<button type="button" class="btn-run">▶ 実行</button>' +
      '<button type="button" class="btn-edit">✎ 編集</button>' +
      '<button type="button" class="btn-copy2">コピー</button>' +
      '<span class="spacer"></span><span class="tag">JDK 22</span>';
    const cmHost = document.createElement("div"); cmHost.className = "cm-host";
    const stdinWrap = document.createElement("div"); stdinWrap.className = "stdin-wrap";
    stdinWrap.innerHTML = '<label>標準入力（プログラムへの入力）</label><textarea spellcheck="false"></textarea>';
    const stdinArea = stdinWrap.querySelector("textarea");
    if (presetStdin) { stdinArea.value = presetStdin; stdinWrap.classList.add("show"); }
    const out = document.createElement("div"); out.className = "run-output";
    out.innerHTML = '<div class="out-head"><span>出力</span><span class="out-status"></span></div><pre class="out-body"><code></code></pre>';
    const outStatus = out.querySelector(".out-status"), outCode = out.querySelector(".out-body code");

    pre.insertBefore(tb, pre.firstChild);
    pre.appendChild(cmHost); pre.appendChild(stdinWrap); pre.appendChild(out);

    let cm = null;
    const getCode = () => cm ? cm.getValue() : original;
    tb.querySelector(".btn-edit").addEventListener("click", () => {
      if (!cm) {
        if (!window.CodeMirror) return alert("エディタ読み込み中。少し待ってください。");
        cmHost.classList.add("show"); codeEl.style.display = "none";
        cm = window.CodeMirror(cmHost, { value: original, mode: "text/x-java", lineNumbers: true, tabSize: 4, indentUnit: 4, viewportMargin: Infinity });
        tb.querySelector(".btn-edit").textContent = "↺ 元に戻す";
      } else cm.setValue(original);
    });
    tb.querySelector(".btn-copy2").addEventListener("click", e => {
      navigator.clipboard.writeText(getCode()).then(() => { const t = e.target.textContent; e.target.textContent = "コピーしました"; setTimeout(() => e.target.textContent = t, 1400); });
    });
    const runBtn = tb.querySelector(".btn-run");
    runBtn.addEventListener("click", async () => {
      runBtn.disabled = true; const label = runBtn.textContent;
      runBtn.innerHTML = '<span class="spinner"></span> 実行中';
      out.classList.add("show"); outStatus.textContent = ""; outCode.className = "";
      outCode.textContent = "コンパイル・実行しています…";
      try { renderResult(await runOnWandbox(getCode(), wrap, stdinArea.value), outCode, outStatus); }
      catch (err) { outCode.className = "out-err"; outCode.textContent = "実行に失敗しました：" + err.message; outStatus.textContent = "⚠ エラー"; }
      finally { runBtn.disabled = false; runBtn.textContent = label; }
    });
  }
  function renderResult(r, outCode, outStatus) {
    const cerr = (r.compiler_error || "").trim(), pout = (r.program_output || ""), perr = (r.program_error || "").trim();
    if (cerr && (r.status !== "0" || !pout)) { outCode.className = "out-err"; outCode.textContent = "コンパイルエラー:\n" + cerr; outStatus.textContent = "✗ コンパイル失敗"; return; }
    let t = pout; if (perr) t += (t ? "\n" : "") + "[エラー出力]\n" + perr;
    if (!t.trim()) t = "(出力はありません)";
    outCode.className = perr ? "out-err" : "";
    outCode.textContent = t;
    outStatus.innerHTML = (r.status === "0") ? '<span class="out-ok-badge">✓ 正常終了</span>' : "終了コード " + r.status;
  }

  /* ===================== 練習問題（自動判定） ===================== */
  function initExercises() {
    const EX = window.EXERCISES || {};
    document.querySelectorAll(".exercise-block").forEach(block => {
      const id = block.getAttribute("data-ex");
      const ex = EX[id];
      if (!ex) return;

      const wrap = document.createElement("div");
      wrap.className = "ex"; wrap.setAttribute("data-ex-id", id);
      wrap.innerHTML =
        '<div class="ex-head"><span class="ex-badge">✏️ 練習問題</span><span class="ex-title">' + esc(ex.title) + '</span><span class="ex-solved">✓ クリア済み</span></div>' +
        '<div class="ex-desc">' + ex.desc + '</div>' +
        '<div class="ex-editor"></div>' +
        '<div class="run-toolbar ex-toolbar">' +
          '<button type="button" class="btn-judge">✓ 判定する</button>' +
          '<button type="button" class="btn-run-ex">▶ 実行のみ</button>' +
          '<button type="button" class="btn-reset-ex">↺ リセット</button>' +
          '<button type="button" class="btn-sol-ex">💡 解答例</button>' +
          '<span class="spacer"></span><span class="tag">テスト ' + ex.tests.length + ' 件</span>' +
        '</div>' +
        '<div class="ex-result"></div>' +
        '<details class="ex-solution"><summary>解答例を見る</summary></details>';
      block.appendChild(wrap);

      // CodeMirror
      const editorHost = wrap.querySelector(".ex-editor");
      let cm = null;
      const makeCM = () => {
        if (window.CodeMirror) { cm = window.CodeMirror(editorHost, { value: ex.template, mode: "text/x-java", lineNumbers: true, tabSize: 4, indentUnit: 4, viewportMargin: Infinity }); }
        else setTimeout(makeCM, 200);
      };
      makeCM();
      const getCode = () => cm ? cm.getValue() : ex.template;

      // 解答例
      const sol = wrap.querySelector(".ex-solution");
      const solPre = document.createElement("pre");
      solPre.innerHTML = '<code class="language-java">' + esc(ex.solution) + "</code>";
      sol.appendChild(solPre);
      const loadSol = document.createElement("button");
      loadSol.type = "button"; loadSol.className = "btn-load-sol"; loadSol.textContent = "この解答をエディタに入れる";
      loadSol.addEventListener("click", () => { if (cm) cm.setValue(ex.solution); });
      sol.appendChild(loadSol);
      if (window.Prism) try { window.Prism.highlightElement(solPre.querySelector("code")); } catch (e) {}

      const result = wrap.querySelector(".ex-result");
      const judgeBtn = wrap.querySelector(".btn-judge");
      const runBtn = wrap.querySelector(".btn-run-ex");

      wrap.querySelector(".btn-sol-ex").addEventListener("click", () => { sol.open = !sol.open; });
      wrap.querySelector(".btn-reset-ex").addEventListener("click", () => { if (cm) cm.setValue(ex.template); result.className = "ex-result"; result.innerHTML = ""; });

      runBtn.addEventListener("click", async () => {
        const stdin = ex.tests[0] ? ex.tests[0].stdin : "";
        lock(true, runBtn, "▶ 実行のみ");
        result.className = "ex-result show"; result.innerHTML = '<div class="ex-out"><span class="spinner"></span> 実行中…</div>';
        try {
          const r = await runOnWandbox(getCode(), "", stdin);
          const cerr = (r.compiler_error || "").trim();
          let body = cerr && r.status !== "0" ? "コンパイルエラー:\n" + cerr : (r.program_output || "(出力なし)");
          if ((r.program_error || "").trim()) body += "\n[エラー出力]\n" + r.program_error.trim();
          result.innerHTML = '<div class="ex-out-label">出力' + (stdin ? '（入力: ' + esc(stdin.replace(/\n/g, " ⏎ ")) + '）' : '') + '</div><pre class="ex-out"><code></code></pre>';
          result.querySelector("code").textContent = body;
        } catch (err) { result.innerHTML = '<div class="ex-out err">実行に失敗：' + esc(err.message) + "</div>"; }
        finally { lock(false, runBtn, "▶ 実行のみ"); }
      });

      judgeBtn.addEventListener("click", async () => {
        lock(true, judgeBtn, "✓ 判定する");
        result.className = "ex-result show";
        const code = getCode();
        try {
          for (let i = 0; i < ex.tests.length; i++) {
            const t = ex.tests[i];
            result.innerHTML = '<div class="ex-out"><span class="spinner"></span> 判定中… (' + (i + 1) + " / " + ex.tests.length + ")</div>";
            const r = await runOnWandbox(code, "", t.stdin);
            const cerr = (r.compiler_error || "").trim();
            if (cerr && r.status !== "0") { showFail(result, "コンパイルエラーがあります", cerr, null, null); lock(false, judgeBtn, "✓ 判定する"); return; }
            const actual = normalizeOut(r.program_output || "");
            const expect = normalizeOut(t.expect);
            if (actual !== expect) {
              showFail(result, "テスト " + (i + 1) + " / " + ex.tests.length + " が一致しませんでした", null, t, { actual: r.program_output || "", expect: t.expect });
              lock(false, judgeBtn, "✓ 判定する"); return;
            }
          }
          // 全テスト通過
          result.className = "ex-result show pass";
          result.innerHTML = '<div class="ex-pass">🎉 正解！ ' + ex.tests.length + ' 件のテストすべてに通りました。</div>';
          markSolved(id, wrap);
        } catch (err) {
          result.className = "ex-result show";
          result.innerHTML = '<div class="ex-out err">判定に失敗：' + esc(err.message) + "（通信状況により失敗することがあります。再試行してください）</div>";
        } finally { lock(false, judgeBtn, "✓ 判定する"); }
      });

      refreshExerciseSolvedUI(wrap);
    });

    function lock(on, btn, label) { btn.disabled = on; btn.innerHTML = on ? '<span class="spinner"></span> 処理中' : label; }
    function showFail(result, title, compileErr, test, io) {
      result.className = "ex-result show fail";
      let h = '<div class="ex-fail">✗ ' + esc(title) + "</div>";
      if (compileErr) h += '<pre class="ex-out err"><code>' + esc(compileErr) + "</code></pre>";
      if (io) {
        if (test && test.stdin) h += '<div class="ex-io"><b>入力</b><pre class="ex-out"><code>' + esc(test.stdin) + "</code></pre></div>";
        h += '<div class="ex-io"><b>期待した出力</b><pre class="ex-out"><code>' + esc(io.expect) + "</code></pre></div>";
        h += '<div class="ex-io"><b>あなたの出力</b><pre class="ex-out err"><code>' + esc(io.actual || "(出力なし)") + "</code></pre></div>";
      }
      result.innerHTML = h;
    }
  }
  function normalizeOut(s) {
    return String(s).replace(/\r\n/g, "\n").split("\n").map(l => l.replace(/\s+$/, "")).join("\n").replace(/^\n+|\n+$/g, "").trim();
  }
  function markSolved(id, wrap) {
    solvedSet.add(id); saveJSON(LS.solved, Array.from(solvedSet));
    refreshExerciseSolvedUI(wrap);
    // 練習問題クリアで、その章を自動的に「学習済み」に
    if (allProgressChapters.includes(id) && !doneSet.has(id)) {
      doneSet.add(id); saveJSON(LS.progress, Array.from(doneSet));
      const btn = document.querySelector('.complete-btn[data-sec="' + id + '"]');
      if (btn) { btn.classList.add("done"); btn.textContent = "✓ 学習済み"; }
      updateProgress();
    }
  }
  function refreshExerciseSolvedUI(wrap) {
    const id = wrap.getAttribute("data-ex-id");
    wrap.classList.toggle("solved", solvedSet.has(id));
  }

  /* ===================== クイズ ===================== */
  function initQuizzes() {
    const Q = window.QUIZZES || {};
    document.querySelectorAll(".quiz-block").forEach(block => {
      const data = Q[block.getAttribute("data-quiz")];
      if (!data) return;
      data.forEach((item, qi) => {
        const card = document.createElement("div"); card.className = "qz";
        card.innerHTML = '<div class="qz-head">❓ 理解度チェック ' + (qi + 1) + " / " + data.length + "</div><div class=\"qz-q\">" + esc(item.q) + "</div>";
        const choices = document.createElement("div"); choices.className = "qz-choices";
        item.choices.forEach((c, ci) => {
          const b = document.createElement("button"); b.type = "button"; b.className = "qz-choice";
          b.innerHTML = esc(c) + '<span class="mark"></span>';
          b.addEventListener("click", () => pick(ci));
          choices.appendChild(b);
        });
        const ex = document.createElement("div"); ex.className = "qz-explain"; ex.innerHTML = "💡 " + esc(item.explain);
        card.appendChild(choices); card.appendChild(ex); block.appendChild(card);
        function pick(ci) {
          const bs = choices.querySelectorAll(".qz-choice"); bs.forEach(b => b.disabled = true);
          if (ci === item.answer) { bs[ci].classList.add("correct"); bs[ci].querySelector(".mark").textContent = "✓"; }
          else { bs[ci].classList.add("wrong"); bs[ci].querySelector(".mark").textContent = "✗"; bs[item.answer].classList.add("correct"); bs[item.answer].querySelector(".mark").textContent = "✓"; }
          ex.classList.add("show");
        }
      });
    });
  }

  /* ===================== 進捗ボタン ===================== */
  function initProgressButtons() {
    document.querySelectorAll("main section[id]").forEach(sec => {
      if (sec.hasAttribute("data-noprogress")) return;
      if (!allProgressChapters.includes(sec.id)) return;
      const head = sec.querySelector(".sec-head"); if (!head) return;
      const btn = document.createElement("button");
      btn.type = "button"; btn.className = "complete-btn"; btn.setAttribute("data-sec", sec.id);
      head.appendChild(btn);
      const render = () => { const d = doneSet.has(sec.id); btn.classList.toggle("done", d); btn.textContent = d ? "✓ 学習済み" : "学習済みにする"; };
      btn.addEventListener("click", () => {
        doneSet.has(sec.id) ? doneSet.delete(sec.id) : doneSet.add(sec.id);
        saveJSON(LS.progress, Array.from(doneSet)); render(); updateProgress();
      });
      render();
    });
  }
  function updateProgress() {
    const total = allProgressChapters.length;
    const n = allProgressChapters.filter(id => doneSet.has(id)).length;
    const pct = total ? Math.round(n / total * 100) : 0;
    const fill = document.getElementById("progressFill"), text = document.getElementById("progressText"), pill = document.getElementById("progressPill");
    if (fill) fill.style.width = pct + "%";
    if (text) text.textContent = n + " / " + total;
    if (pill) pill.textContent = pct + "%";
    document.querySelectorAll("#navList a[data-chid]").forEach(a => a.classList.toggle("done", doneSet.has(a.getAttribute("data-chid"))));
  }

  /* ===================== 検索（全ページ横断） ===================== */
  function initSearch() {
    const input = document.getElementById("searchInput");
    const results = document.getElementById("searchResults");
    if (!input || !results) return;
    const index = [];
    SITE.pages.forEach(p => (p.chapters || []).forEach(ch => index.push({ title: ch.title, group: p.group || "", url: p.file + "#" + ch.id })));
    const render = q => {
      q = q.trim().toLowerCase();
      if (!q) { results.classList.remove("show"); results.innerHTML = ""; return; }
      const hits = index.filter(s => (s.title + " " + s.group).toLowerCase().includes(q)).slice(0, 10);
      results.innerHTML = hits.length ? hits.map(h => '<a href="' + h.url + '"><b>' + esc(h.title) + '</b><small>' + esc(h.group) + "</small></a>").join("") : '<div class="empty">該当する章が見つかりません</div>';
      results.classList.add("show");
    };
    input.addEventListener("input", () => render(input.value));
    input.addEventListener("focus", () => { if (input.value) render(input.value); });
    document.addEventListener("click", e => { if (!e.target.closest(".search-wrap")) results.classList.remove("show"); });
    input.addEventListener("keydown", e => { if (e.key === "Escape") { input.value = ""; results.classList.remove("show"); input.blur(); } });
  }

  /* ===================== プレイグラウンド ===================== */
  function initPlayground() {
    const host = document.getElementById("playground"); if (!host) return;
    const sample = 'public class Main {\n    public static void main(String[] args) {\n        // ここに自由にコードを書いて「▶ 実行」を押そう\n        for (int i = 1; i <= 5; i++) {\n            System.out.println("i = " + i);\n        }\n    }\n}';
    const tb = document.createElement("div"); tb.className = "run-toolbar pg-toolbar";
    tb.innerHTML = '<button type="button" class="btn-run">▶ 実行</button><button type="button" class="btn-reset">↺ サンプルに戻す</button><span class="spacer"></span><span class="tag">JDK 22</span>';
    const box = document.createElement("div"); box.className = "pg-box";
    const cmHost = document.createElement("div"); box.appendChild(tb); box.appendChild(cmHost);
    const stdinWrap = document.createElement("div"); stdinWrap.className = "stdin-wrap show";
    stdinWrap.innerHTML = '<label>標準入力（必要なら）</label><textarea spellcheck="false"></textarea>';
    const out = document.createElement("div"); out.className = "run-output show";
    out.innerHTML = '<div class="out-head"><span>出力</span><span class="out-status"></span></div><pre class="out-body"><code>「▶ 実行」を押すと結果がここに表示されます。</code></pre>';
    box.appendChild(stdinWrap); box.appendChild(out); host.appendChild(box);
    let cm; const make = () => { if (window.CodeMirror) cm = window.CodeMirror(cmHost, { value: sample, mode: "text/x-java", lineNumbers: true, tabSize: 4, indentUnit: 4, viewportMargin: Infinity }); else setTimeout(make, 200); }; make();
    const outCode = out.querySelector("code"), outStatus = out.querySelector(".out-status"), runBtn = tb.querySelector(".btn-run");
    runBtn.addEventListener("click", async () => {
      if (!cm) return; runBtn.disabled = true; const l = runBtn.textContent; runBtn.innerHTML = '<span class="spinner"></span> 実行中';
      outStatus.textContent = ""; outCode.className = ""; outCode.textContent = "コンパイル・実行しています…";
      try { renderResult(await runOnWandbox(cm.getValue(), "", stdinWrap.querySelector("textarea").value), outCode, outStatus); }
      catch (err) { outCode.className = "out-err"; outCode.textContent = "実行に失敗：" + err.message; outStatus.textContent = "⚠ エラー"; }
      finally { runBtn.disabled = false; runBtn.textContent = l; }
    });
    tb.querySelector(".btn-reset").addEventListener("click", () => { if (cm) cm.setValue(sample); });
  }

  /* ===================== トップへ ===================== */
  function initToTop() { const b = document.getElementById("toTop"); if (b) b.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" })); }

  /* ===================== util ===================== */
  function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }
  function loadJSON(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }
  function saveJSON(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  // ホームページ用に公開（進捗サマリ表示）
  window.JBM = {
    progressSummary() {
      const total = allProgressChapters.length;
      const done = allProgressChapters.filter(id => doneSet.has(id)).length;
      const solved = solvedSet.size;
      return { total, done, solved, pct: total ? Math.round(done / total * 100) : 0 };
    },
    isSolved(id) { return solvedSet.has(id); }
  };
})();
