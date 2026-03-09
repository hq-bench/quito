document.addEventListener('DOMContentLoaded', () => {

  // ===== TABLE SORTING =====
  document.querySelectorAll('table.sortable').forEach(table => {
    const headers = table.querySelectorAll('thead th');
    headers.forEach((th, colIdx) => {
      const arrow = document.createElement('span');
      arrow.className = 'sort-arrow';
      arrow.textContent = '\u25B8';
      th.appendChild(arrow);

      th.addEventListener('click', () => {
        const isAsc = th.classList.contains('sort-asc');
        headers.forEach(h => {
          h.classList.remove('sort-asc', 'sort-desc');
          const a = h.querySelector('.sort-arrow');
          if (a) a.textContent = '\u25B8';
        });

        if (isAsc) {
          th.classList.add('sort-desc');
          th.querySelector('.sort-arrow').textContent = '\u25BE';
        } else {
          th.classList.add('sort-asc');
          th.querySelector('.sort-arrow').textContent = '\u25B4';
        }

        const tbody = table.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));
        const dir = isAsc ? -1 : 1;

        rows.sort((a, b) => {
          const aVal = a.children[colIdx]?.textContent.trim() ?? '';
          const bVal = b.children[colIdx]?.textContent.trim() ?? '';
          const aNum = parseFloat(aVal);
          const bNum = parseFloat(bVal);
          if (!isNaN(aNum) && !isNaN(bNum)) {
            return (aNum - bNum) * dir;
          }
          return aVal.localeCompare(bVal) * dir;
        });

        rows.forEach(row => tbody.appendChild(row));
      });
    });
  });

  // ===== FILTER BUTTONS (Leaderboard) =====
  const filterBtns = document.querySelectorAll('.filter-btn[data-filter]');
  const leaderboardRows = document.querySelectorAll('#overall-table tbody tr');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      leaderboardRows.forEach(row => {
        if (filter === 'all' || row.dataset.type === filter) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });

  // ===== COPY BIBTEX =====
  const copyBtn = document.getElementById('copy-bibtex');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const bibtex = document.getElementById('bibtex-code');
      if (!bibtex) return;
      navigator.clipboard.writeText(bibtex.textContent).then(() => {
        copyBtn.textContent = 'Copied!';
        copyBtn.classList.add('copied');
        setTimeout(() => {
          copyBtn.textContent = 'Copy BibTeX';
          copyBtn.classList.remove('copied');
        }, 2000);
      });
    });
  }

  // ===== MOBILE MENU TOGGLE =====
  const menuToggle = document.querySelector('.menu-toggle');
  const headerNav = document.querySelector('.header-nav');
  if (menuToggle && headerNav) {
    menuToggle.addEventListener('click', () => {
      headerNav.classList.toggle('open');
    });
    headerNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        headerNav.classList.remove('open');
      });
    });
  }

  // ===== STICKY NAV HIGHLIGHT =====
  const sections = document.querySelectorAll('.content-section[id], .hero[id]');
  const navLinks = document.querySelectorAll('.header-nav a[href^="#"]');

  if (sections.length && navLinks.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });

    sections.forEach(section => observer.observe(section));
  }

  // ===== ROW ENTRANCE ANIMATION =====
  document.querySelectorAll('table.sortable tbody tr').forEach((row, i) => {
    row.style.opacity = '0';
    row.style.transform = 'translateY(6px)';
    row.style.transition = `opacity 0.35s ease ${i * 0.04}s, transform 0.35s ease ${i * 0.04}s`;
    requestAnimationFrame(() => {
      row.style.opacity = '1';
      row.style.transform = 'translateY(0)';
    });
  });

});
