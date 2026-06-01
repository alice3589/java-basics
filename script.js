/* =========================================================
   Java基礎マスター - インタラクション
   実行(Wandbox) / 編集(CodeMirror) / クイズ / 進捗 / テーマ / 検索
   ========================================================= */
(function () {
  "use strict";

  const WANDBOX_URL = "https://wandbox.org/api/compile.json";
  const COMPILER = "openjdk-jdk-22+36";
  const LS = {
    theme: "jbm_theme",
    progress: "jbm_progress",
    quiz: "jbm_quiz"
  };

  /* ---------- 起動 ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initSidebar();
    initReadingBar();
    initScrollSpy();
    initCopyButtons();
    initRunnable();
    initQuizzes();
    initProgress();
    initSearch();
    initPlayground();
    initToTop();
  });

  /* ===================== テーマ ===================== */
  function initTheme() {
    const html = document.documentElement;
    const btn = document.getElementById("themeToggle");
    const saved = localStorage.getItem(LS.theme) ||
      (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    applyTheme(saved);

    btn.addEventListener("click", () => {
      const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      localStorage.setItem(LS.theme, next);
    });

    function applyTheme(t) {
      html.setAttribute("data-theme", t);
      btn.textContent = t === "dark" ? "🌙" : "☀️";
      const dark = document.getElementById("prismDark");
      const light = document.getElementById("prismLight");
      if (dark && light) {
        dark.disabled = (t !== "dark");
        light.disabled = (t === "dark");
      }
    }
  }

  /* ===================== サイドバー ===================== */
  function initSidebar() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    const toggle = document.getElementById("navToggle");
    const open = () => { sidebar.classList.add("open"); overlay.classList.add("show"); };
    const close = () => { sidebar.classList.remove("open"); overlay.classList.remove("show"); };
    toggle.addEventListener("click", () =>
      sidebar.classList.contains("open") ? close() : open());
    overlay.addEventListener("click", close);
    sidebar.querySelectorAll("a").forEach(a =>
      a.addEventListener("click", () => { if (window.innerWidth <= 980) close(); }));
  }

  /* ===================== 読み取り進捗バー ===================== */
  function initReadingBar() {
    const bar = document.getElementById("readingBar");
    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      bar.style.width = max > 0 ? (h.scrollTop / max * 100) + "%" : "0%";
    };
    document.addEventListener("scroll", update, { passive: true });
    update();
  }

  /* ===================== スクロールスパイ ===================== */
  function initScrollSpy() {
    const links = Array.from(document.querySelectorAll("#navList a"));
    const map = new Map();
    links.forEach(a => {
      const id = a.getAttribute("href").slice(1);
      const sec = document.getElementById(id);
      if (sec) map.set(sec, a);
    });
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          links.forEach(l => l.classList.remove("active"));
          const a = map.get(e.target);
          if (a) {
            a.classList.add("active");
            a.scrollIntoView({ block: "nearest" });
          }
        }
      });
    }, { rootMargin: "-15% 0px -75% 0px" });
    map.forEach((_, sec) => obs.observe(sec));
  }

  /* ===================== コピー（非実行ブロック） ===================== */
  function initCopyButtons() {
    document.querySelectorAll("pre:not(.runnable)").forEach(pre => addCopyBtn(pre));
  }
  function addCopyBtn(pre) {
    const btn = document.createElement("button");
    btn.className = "copy-btn";
    btn.type = "button";
    btn.textContent = "コピー";
    btn.addEventListener("click", () => {
      const code = pre.querySelector("code");
      navigator.clipboard.writeText(code.innerText).then(() => {
        btn.textContent = "コピーしました";
        btn.classList.add("copied");
        setTimeout(() => { btn.textContent = "コピー"; btn.classList.remove("copied"); }, 1500);
      });
    });
    pre.appendChild(btn);
  }

  /* ===================== コード変換（Wandbox用） ===================== */
  function buildProgram(code, wrap) {
    let src = code;
    if (wrap === "main") {
      const lines = code.split("\n");
      const imports = [], body = [];
      lines.forEach(l => (/^\s*import\s+/.test(l) ? imports.push(l.trim()) : body.push(l)));
      src = (imports.length ? imports.join("\n") + "\n" : "") +
        "public class Main {\n  public static void main(String[] args) throws Exception {\n" +
        body.join("\n") + "\n  }\n}";
    }
    // Wandboxのメインファイルは prog.java。public class は名前不一致でエラーになるため public を外す
    return src.replace(/\bpublic\s+class\b/g, "class");
  }

  async function runOnWandbox(code, wrap, stdin) {
    const res = await fetch(WANDBOX_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: buildProgram(code, wrap),
        compiler: COMPILER,
        stdin: stdin || ""
      })
    });
    if (!res.ok) throw new Error("サーバーエラー (" + res.status + ")");
    return res.json();
  }

  /* ===================== 実行可能ブロック ===================== */
  function initRunnable() {
    document.querySelectorAll("pre.runnable").forEach(setupRunnable);
  }

  function setupRunnable(pre) {
    const codeEl = pre.querySelector("code");
    const original = codeEl.textContent.replace(/\n$/, "");
    const wrap = pre.getAttribute("data-wrap") || "";
    const presetStdin = pre.getAttribute("data-stdin") || "";

    // ツールバー
    const toolbar = document.createElement("div");
    toolbar.className = "run-toolbar";
    toolbar.innerHTML =
      '<button type="button" class="btn-run">▶ 実行</button>' +
      '<button type="button" class="btn-edit">✎ 編集</button>' +
      '<button type="button" class="btn-copy2">コピー</button>' +
      '<span class="spacer"></span>' +
      '<span class="tag">JDK 22</span>';

    // 編集用ホスト（CodeMirrorを遅延生成）
    const cmHost = document.createElement("div");
    cmHost.className = "cm-host";

    // 標準入力
    const stdinWrap = document.createElement("div");
    stdinWrap.className = "stdin-wrap";
    stdinWrap.innerHTML = '<label>標準入力（プログラムへの入力）</label><textarea spellcheck="false"></textarea>';
    const stdinArea = stdinWrap.querySelector("textarea");
    if (presetStdin) { stdinArea.value = presetStdin; stdinWrap.classList.add("show"); }

    // 出力
    const out = document.createElement("div");
    out.className = "run-output";
    out.innerHTML = '<div class="out-head"><span class="out-title">出力</span><span class="out-status"></span></div>' +
      '<pre class="out-body"><code></code></pre>';
    const outStatus = out.querySelector(".out-status");
    const outCode = out.querySelector(".out-body code");

    // 配置
    pre.insertBefore(toolbar, pre.firstChild);
    pre.appendChild(cmHost);
    pre.appendChild(stdinWrap);
    pre.appendChild(out);

    let cm = null;
    const getCode = () => cm ? cm.getValue() : original;

    // 編集
    toolbar.querySelector(".btn-edit").addEventListener("click", () => {
      if (!cm) {
        if (!window.CodeMirror) { alert("エディタの読み込み中です。少し待って再度お試しください。"); return; }
        cmHost.classList.add("show");
        codeEl.parentElement.querySelector("code").style.display = "none";
        codeEl.style.display = "none";
        cm = window.CodeMirror(cmHost, {
          value: original,
          mode: "text/x-java",
          lineNumbers: true,
          tabSize: 4,
          indentUnit: 4,
          viewportMargin: Infinity
        });
        toolbar.querySelector(".btn-edit").textContent = "↺ 元に戻す";
      } else {
        cm.setValue(original);
      }
    });

    // コピー
    toolbar.querySelector(".btn-copy2").addEventListener("click", (e) => {
      navigator.clipboard.writeText(getCode()).then(() => {
        const b = e.target; const t = b.textContent;
        b.textContent = "コピーしました";
        setTimeout(() => (b.textContent = t), 1400);
      });
    });

    // 実行
    const runBtn = toolbar.querySelector(".btn-run");
    runBtn.addEventListener("click", async () => {
      runBtn.disabled = true;
      const label = runBtn.textContent;
      runBtn.innerHTML = '<span class="spinner"></span> 実行中';
      out.classList.add("show");
      outStatus.textContent = "";
      outCode.className = "";
      outCode.textContent = "コンパイル・実行しています…（数秒かかります）";

      try {
        const r = await runOnWandbox(getCode(), wrap, stdinArea.value);
        renderResult(r, outCode, outStatus);
      } catch (err) {
        outCode.className = "out-err";
        outCode.textContent = "実行に失敗しました：" + err.message +
          "\n（ネットワーク状況により失敗することがあります。少し待って再実行してください）";
        outStatus.textContent = "⚠ エラー";
      } finally {
        runBtn.disabled = false;
        runBtn.textContent = label;
      }
    });
  }

  function renderResult(r, outCode, outStatus) {
    const compileErr = (r.compiler_error || "").trim();
    const progOut = (r.program_output || "");
    const progErr = (r.program_error || "").trim();
    const status = r.status;

    if (compileErr && (status !== "0" || !progOut)) {
      // コンパイルエラー
      outCode.className = "out-err";
      outCode.textContent = "コンパイルエラー:\n" + compileErr;
      outStatus.textContent = "✗ コンパイル失敗";
      return;
    }
    let text = progOut;
    if (progErr) text += (text ? "\n" : "") + "[エラー出力]\n" + progErr;
    if (!text.trim()) text = "(出力はありません)";
    outCode.className = progErr ? "out-err" : "";
    outCode.textContent = text;
    outStatus.innerHTML = (status === "0")
      ? '<span class="out-ok-badge">✓ 正常終了</span>'
      : "終了コード " + status;
  }

  /* ===================== クイズ ===================== */
  function initQuizzes() {
    const saved = loadJSON(LS.quiz, {});
    document.querySelectorAll(".quiz-block").forEach(block => {
      const key = block.getAttribute("data-quiz");
      const data = (window.QUIZZES || {})[key];
      if (!data) return;
      let answered = 0, correct = 0;

      data.forEach((item, qi) => {
        const card = document.createElement("div");
        card.className = "qz";
        const head = '<div class="qz-head">❓ 理解度チェック ' + (qi + 1) + " / " + data.length + "</div>";
        const q = '<div class="qz-q">' + escapeHTML(item.q) + "</div>";
        const choices = document.createElement("div");
        choices.className = "qz-choices";
        item.choices.forEach((c, ci) => {
          const b = document.createElement("button");
          b.type = "button";
          b.className = "qz-choice";
          b.innerHTML = escapeHTML(c) + '<span class="mark"></span>';
          b.addEventListener("click", () => pick(ci));
          choices.appendChild(b);
        });
        const explain = document.createElement("div");
        explain.className = "qz-explain";
        explain.innerHTML = "💡 " + escapeHTML(item.explain);

        card.innerHTML = head + q;
        card.appendChild(choices);
        card.appendChild(explain);
        block.appendChild(card);

        function pick(ci) {
          const btns = choices.querySelectorAll(".qz-choice");
          btns.forEach(b => (b.disabled = true));
          answered++;
          if (ci === item.answer) { correct++; btns[ci].classList.add("correct"); btns[ci].querySelector(".mark").textContent = "✓"; }
          else {
            btns[ci].classList.add("wrong"); btns[ci].querySelector(".mark").textContent = "✗";
            btns[item.answer].classList.add("correct"); btns[item.answer].querySelector(".mark").textContent = "✓";
          }
          explain.classList.add("show");
          saved[key] = { answered, correct };
          saveJSON(LS.quiz, saved);
        }
      });
    });
  }

  /* ===================== 進捗トラッキング ===================== */
  function initProgress() {
    const sections = Array.from(document.querySelectorAll("main section"))
      .filter(s => s.id && !s.hasAttribute("data-noprogress"));
    const done = new Set(loadJSON(LS.progress, []));
    const fill = document.getElementById("progressFill");
    const text = document.getElementById("progressText");
    const pill = document.getElementById("progressPill");

    sections.forEach(sec => {
      const head = sec.querySelector(".sec-head");
      if (!head) return;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "complete-btn";
      head.appendChild(btn);
      const render = () => {
        const isDone = done.has(sec.id);
        btn.classList.toggle("done", isDone);
        btn.textContent = isDone ? "✓ 学習済み" : "学習済みにする";
      };
      btn.addEventListener("click", () => {
        done.has(sec.id) ? done.delete(sec.id) : done.add(sec.id);
        saveJSON(LS.progress, Array.from(done));
        render(); update();
      });
      render();
    });

    function update() {
      const total = sections.length;
      const n = sections.filter(s => done.has(s.id)).length;
      const pct = total ? Math.round(n / total * 100) : 0;
      fill.style.width = pct + "%";
      text.textContent = n + " / " + total;
      pill.textContent = pct + "%";
      // ナビのチェック
      sections.forEach(s => {
        const a = document.querySelector('#navList a[href="#' + s.id + '"]');
        if (a) a.classList.toggle("done", done.has(s.id));
      });
    }
    update();

    document.getElementById("resetProgress").addEventListener("click", () => {
      if (!confirm("学習の進捗をすべてリセットしますか？")) return;
      done.clear();
      saveJSON(LS.progress, []);
      document.querySelectorAll(".complete-btn").forEach(b => {
        b.classList.remove("done"); b.textContent = "学習済みにする";
      });
      update();
    });
  }

  /* ===================== 検索 ===================== */
  function initSearch() {
    const input = document.getElementById("searchInput");
    const results = document.getElementById("searchResults");
    const index = Array.from(document.querySelectorAll("main section[id]")).map(sec => {
      const h2 = sec.querySelector("h2");
      return {
        id: sec.id,
        title: h2 ? h2.textContent.trim() : sec.id,
        text: sec.textContent.replace(/\s+/g, " ").toLowerCase()
      };
    });

    const render = (q) => {
      q = q.trim().toLowerCase();
      if (!q) { results.classList.remove("show"); results.innerHTML = ""; return; }
      const hits = index.filter(s => s.title.toLowerCase().includes(q) || s.text.includes(q)).slice(0, 8);
      if (!hits.length) {
        results.innerHTML = '<div class="empty">該当する章が見つかりません</div>';
      } else {
        results.innerHTML = hits.map(h => '<a href="#' + h.id + '">' + escapeHTML(h.title) + "</a>").join("");
      }
      results.classList.add("show");
    };

    input.addEventListener("input", () => render(input.value));
    input.addEventListener("focus", () => { if (input.value) render(input.value); });
    results.addEventListener("click", e => {
      if (e.target.tagName === "A") { results.classList.remove("show"); input.value = ""; }
    });
    document.addEventListener("click", e => {
      if (!e.target.closest(".search-wrap")) results.classList.remove("show");
    });
    input.addEventListener("keydown", e => { if (e.key === "Escape") { input.value = ""; results.classList.remove("show"); input.blur(); } });
  }

  /* ===================== プレイグラウンド ===================== */
  function initPlayground() {
    const host = document.getElementById("playground");
    if (!host) return;
    const sample =
      'public class Main {\n' +
      '    public static void main(String[] args) {\n' +
      '        // ここに自由にコードを書いて「▶ 実行」を押そう\n' +
      '        for (int i = 1; i <= 5; i++) {\n' +
      '            System.out.println("i = " + i);\n' +
      '        }\n' +
      '    }\n' +
      '}';

    const toolbar = document.createElement("div");
    toolbar.className = "run-toolbar pg-toolbar";
    toolbar.innerHTML =
      '<button type="button" class="btn-run">▶ 実行</button>' +
      '<button type="button" class="btn-reset">↺ サンプルに戻す</button>' +
      '<span class="spacer"></span><span class="tag">JDK 22</span>';

    const box = document.createElement("div");
    box.className = "pg-box";
    const cmHost = document.createElement("div");
    box.appendChild(toolbar);
    box.appendChild(cmHost);

    const stdinWrap = document.createElement("div");
    stdinWrap.className = "stdin-wrap show";
    stdinWrap.innerHTML = '<label>標準入力（必要なら）</label><textarea spellcheck="false"></textarea>';

    const out = document.createElement("div");
    out.className = "run-output show";
    out.innerHTML = '<div class="out-head"><span>出力</span><span class="out-status"></span></div><pre class="out-body"><code>「▶ 実行」を押すと結果がここに表示されます。</code></pre>';

    box.appendChild(stdinWrap);
    box.appendChild(out);
    host.appendChild(box);

    let cm;
    const make = () => {
      if (window.CodeMirror) {
        cm = window.CodeMirror(cmHost, { value: sample, mode: "text/x-java", lineNumbers: true, tabSize: 4, indentUnit: 4, viewportMargin: Infinity });
      } else { setTimeout(make, 200); }
    };
    make();

    const outCode = out.querySelector("code");
    const outStatus = out.querySelector(".out-status");
    const runBtn = toolbar.querySelector(".btn-run");

    runBtn.addEventListener("click", async () => {
      if (!cm) return;
      runBtn.disabled = true; const label = runBtn.textContent;
      runBtn.innerHTML = '<span class="spinner"></span> 実行中';
      outStatus.textContent = ""; outCode.className = "";
      outCode.textContent = "コンパイル・実行しています…";
      try {
        const r = await runOnWandbox(cm.getValue(), "", stdinWrap.querySelector("textarea").value);
        renderResult(r, outCode, outStatus);
      } catch (err) {
        outCode.className = "out-err";
        outCode.textContent = "実行に失敗しました：" + err.message;
        outStatus.textContent = "⚠ エラー";
      } finally { runBtn.disabled = false; runBtn.textContent = label; }
    });

    toolbar.querySelector(".btn-reset").addEventListener("click", () => { if (cm) cm.setValue(sample); });
  }

  /* ===================== トップへ ===================== */
  function initToTop() {
    const btn = document.getElementById("toTop");
    if (btn) btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  /* ===================== ユーティリティ ===================== */
  function escapeHTML(s) {
    return String(s).replace(/[&<>"']/g, c =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function loadJSON(key, def) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : def; }
    catch (e) { return def; }
  }
  function saveJSON(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
  }
})();
