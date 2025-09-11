(function () {
  // 1) Detecta se é EN pela tag <html lang="en"> OU pela URL
  const isEN = (document.documentElement.lang || '').toLowerCase().startsWith('en')
            || window.location.pathname.startsWith('/en/');

  // 2) Caminho APÓS a raiz do idioma ("/" para PT, "/en/" para EN)
  const afterLangRoot = isEN
    ? window.location.pathname.replace(/^\/en\//, '')   // remove prefixo /en/
    : window.location.pathname.replace(/^\//, '');      // remove a barra inicial

  // 3) Profundidade relativa à raiz do idioma
  //    d = 0 → /en/        | /        (index)
  //    d = 1 → /en/x.html  | /x.html
  //    d = 2 → /en/dir/x   | /dir/x
  const segments = afterLangRoot.split('/').filter(Boolean);
  const d = segments.length;

  // 4) Para chegar no header/footer que ficam na RAIZ DO IDIOMA:
  //    prefix = '../' repetido (d - 1), nunca negativo
  const prefix = d > 1 ? '../'.repeat(d - 1) : '';

  const headerPath = `${prefix}header.html`;
  const footerPath = `${prefix}footer.html`;

  // DEBUG opcional
  // console.log({ isEN, afterLangRoot, d, prefix, headerPath, footerPath });

  // 5) Carrega Header
  fetch(headerPath)
    .then(r => { if (!r.ok) throw new Error(`Header ${r.status}`); return r.text(); })
    .then(html => { const el = document.getElementById('header'); if (el) el.innerHTML = html; marcarLinkAtivo(); })
    .catch(e => console.error('[HEADER]', e));

  // 6) Carrega Footer
  fetch(footerPath)
    .then(r => { if (!r.ok) throw new Error(`Footer ${r.status}`); return r.text(); })
    .then(html => { const el = document.getElementById('footer'); if (el) el.innerHTML = html; })
    .catch(e => console.error('[FOOTER]', e));

  // 7) Destaca link ativo (mantive sua função)
  function marcarLinkAtivo() {
    const links = document.querySelectorAll('.neo-menu a');
    const current = segments.slice(-1)[0] || 'index.html'; // se vazio, considere index
    links.forEach(link => {
      if (link.getAttribute('href') === current) {
        link.style.color = '#D9A744';
        link.style.boxShadow = 'inset 6px 6px 12px #0f292d, inset -6px -6px 12px #163d42';
        link.style.transform = 'translateY(1px)';
      }
    });
  }
})();







