document.addEventListener('DOMContentLoaded', () => {

  // ===== CANVAS WAVEFORM =====
  const canvas = document.getElementById('waveform');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const waves = [
      { color: '#22d3ee', amp: 35, freq: 0.007, speed: 0.018, phase: 0 },
      { color: '#f59e0b', amp: 28, freq: 0.011, speed: 0.013, phase: 2.1 },
      { color: '#22d3ee', amp: 22, freq: 0.005, speed: 0.022, phase: 4.3 },
    ];

    let t = 0;
    function draw() {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);

      const midY = h * 0.62;

      waves.forEach(wave => {
        ctx.beginPath();
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = 0.18;

        for (let x = 0; x <= w; x += 2) {
          const y = midY
            + Math.sin(x * wave.freq + t * wave.speed + wave.phase) * wave.amp
            + Math.sin(x * wave.freq * 0.6 + t * wave.speed * 0.8 + 1.0) * wave.amp * 0.4;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.stroke();
        ctx.globalAlpha = 1;
      });

      t += 1;
      requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    requestAnimationFrame(draw);
  }

  // ===== MAE BAR CHARTS =====
  const maeMaxWidth = 56; // px
  const maeCells = document.querySelectorAll('#overall-table .mae-col[data-value]');
  const maeValues = Array.from(maeCells).map(c => parseFloat(c.dataset.value));
  const maeMax = Math.max(...maeValues);

  maeCells.forEach(cell => {
    const val = parseFloat(cell.dataset.value);
    const pct = val / maeMax;
    const text = cell.textContent.trim();
    const inner = document.createElement('span');
    inner.className = 'mae-cell-inner';
    inner.innerHTML = `<span>${text}</span><span class="mae-bar" data-width="${pct * maeMaxWidth}"></span>`;
    cell.textContent = '';
    cell.appendChild(inner);
  });

  // Animate bars when table scrolls into view
  const leaderboardTable = document.querySelector('#leaderboard .table-wrap');
  if (leaderboardTable) {
    const barObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.querySelectorAll('.mae-bar').forEach(bar => {
            bar.style.width = bar.dataset.width + 'px';
          });
          barObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    barObserver.observe(leaderboardTable);
  }

  // ===== TABLE SORTING =====
  document.querySelectorAll('table.sortable').forEach(table => {
    const headers = table.querySelectorAll('thead th');
    headers.forEach((th, colIdx) => {
      const icon = document.createElement('span');
      icon.className = 'sort-icon';
      icon.textContent = '↕';
      th.appendChild(icon);

      th.addEventListener('click', () => {
        const isAsc = th.classList.contains('sort-asc');
        headers.forEach(h => {
          h.classList.remove('sort-asc', 'sort-desc');
          const s = h.querySelector('.sort-icon');
          if (s) s.textContent = '↕';
        });

        if (isAsc) {
          th.classList.add('sort-desc');
          th.querySelector('.sort-icon').textContent = '↓';
        } else {
          th.classList.add('sort-asc');
          th.querySelector('.sort-icon').textContent = '↑';
        }

        const tbody = table.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));
        const dir = isAsc ? -1 : 1;

        rows.sort((a, b) => {
          const aText = a.children[colIdx]?.textContent.trim() ?? '';
          const bText = b.children[colIdx]?.textContent.trim() ?? '';
          const aNum = parseFloat(aText);
          const bNum = parseFloat(bText);
          if (!isNaN(aNum) && !isNaN(bNum)) return (aNum - bNum) * dir;
          return aText.localeCompare(bText) * dir;
        });

        rows.forEach(row => tbody.appendChild(row));
      });
    });
  });

  // ===== FILTER BUTTONS =====
  const filterBtns = document.querySelectorAll('.filter-btn[data-filter]');
  const lbRows = document.querySelectorAll('#overall-table tbody tr');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      lbRows.forEach((row, i) => {
        const show = filter === 'all' || row.dataset.type === filter;
        row.style.transition = 'opacity 0.2s var(--ease), transform 0.2s var(--ease)';
        if (show) {
          row.style.display = '';
          row.style.opacity = '0';
          row.style.transform = 'translateY(4px)';
          requestAnimationFrame(() => {
            setTimeout(() => {
              row.style.opacity = '1';
              row.style.transform = 'translateY(0)';
            }, i * 25);
          });
        } else {
          row.style.opacity = '0';
          setTimeout(() => { row.style.display = 'none'; }, 200);
        }
      });
    });
  });

  // ===== COPY BIBTEX =====
  const copyBtn = document.getElementById('copy-bibtex');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const code = document.getElementById('bibtex-code');
      if (!code) return;
      navigator.clipboard.writeText(code.textContent).then(() => {
        copyBtn.textContent = 'Copied!';
        copyBtn.classList.add('copied');
        setTimeout(() => {
          copyBtn.textContent = 'Copy BibTeX';
          copyBtn.classList.remove('copied');
        }, 2000);
      });
    });
  }

  // ===== MOBILE MENU =====
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // ===== STICKY NAV HIGHLIGHT =====
  const sectionEls = document.querySelectorAll('.section[id], .hero[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  if (sectionEls.length && navAnchors.length) {
    const navObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navAnchors.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });

    sectionEls.forEach(s => navObs.observe(s));
  }

  // ===== STATS BAND REVEAL =====
  const stats = document.querySelectorAll('.stat');
  if (stats.length) {
    const statsObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll('.stat');
          cards.forEach((card, i) => {
            setTimeout(() => card.classList.add('revealed'), i * 120);
          });
          statsObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    const band = document.querySelector('.stats-band');
    if (band) statsObs.observe(band);
  }

  // ===== SCROLL REVEAL =====
  const revealTargets = document.querySelectorAll('.table-wrap, .info-box, .bibtex-wrap, .stats-band, .news-list');
  revealTargets.forEach(el => el.classList.add('reveal'));

  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  revealTargets.forEach(el => revealObs.observe(el));

});
