// ===== モバイル用サイドバー開閉 =====
const sidebar = document.getElementById('sidebar');
const navToggle = document.getElementById('navToggle');

navToggle.addEventListener('click', () => sidebar.classList.toggle('open'));

// サイドバーのリンクを押したら（モバイルでは）閉じる
document.querySelectorAll('#sidebar a').forEach(a => {
  a.addEventListener('click', () => {
    if (window.innerWidth <= 900) sidebar.classList.remove('open');
  });
});

// ===== コードブロックにコピーボタンを追加 =====
document.querySelectorAll('pre').forEach(pre => {
  const btn = document.createElement('button');
  btn.className = 'copy-btn';
  btn.textContent = 'コピー';
  btn.addEventListener('click', () => {
    const code = pre.querySelector('code');
    navigator.clipboard.writeText(code.innerText).then(() => {
      btn.textContent = 'コピーしました';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = 'コピー';
        btn.classList.remove('copied');
      }, 1500);
    });
  });
  pre.appendChild(btn);
});

// ===== スクロールに応じてサイドバーの現在地をハイライト =====
const sections = document.querySelectorAll('main section');
const navLinks = document.querySelectorAll('#sidebar li a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
    }
  });
}, { rootMargin: '-20% 0px -70% 0px' });

sections.forEach(sec => observer.observe(sec));

// ===== トップへ戻る =====
document.getElementById('toTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
