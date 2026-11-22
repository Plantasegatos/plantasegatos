
/* Plantas & Gatos — Home V6 | Consolidação editorial sem alterações visuais */
(() => {
  'use strict';
  const LABELS = {historias:'Histórias',curiosidades:'Curiosidades',saude:'Saúde',comportamento:'Comportamento',botanica:'Botânica',genetica:'Genética',todos:'Todos os artigos'};
  const byId = id => document.getElementById(id);
  const normalizeUrl = value => {
    if (typeof value !== 'string' || !value.trim()) return '';
    const v = value.trim();
    if (/^https?:\/\//i.test(v)) return v;
    if (/^[a-z][a-z\d+.-]*:/i.test(v) || v.startsWith('//')) return '';
    return '/' + v.replace(/^(?:(?:\.\.?)\/|\/)+/, '');
  };
  const make = (tag, className, content) => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (content != null) el.textContent = String(content);
    return el;
  };
  const image = (post, loading='lazy') => {
    const src = normalizeUrl(post.imagem);
    if (!src) return null;
    const img = make('img');
    img.src = src; img.alt = ''; img.loading = loading;
    img.addEventListener('error', () => img.remove(), {once:true});
    return img;
  };
  const sorted = data => data.filter(p => p && typeof p === 'object' && typeof p.titulo === 'string').slice()
    .sort((a,b) => String(b.data || '').localeCompare(String(a.data || '')));
  function renderRecent(posts) {
    const container = byId('recentPosts');
    if (!container) return;
    const fragment = document.createDocumentFragment();
    posts.slice(0,6).forEach(p => {
      const href = normalizeUrl(p.link) || '/blog/';
      const article = make('article','recent-card');
      const pictureLink = make('a','recent-card__image');
      pictureLink.href = href;
      pictureLink.setAttribute('aria-label','Ler ' + p.titulo);
      const img = image(p);
      if (img) pictureLink.append(img);
      const content = make('div','recent-card__content');
      content.append(make('p','recent-card__meta','Artigo recente'));
      const h = make('h3');
      const headingLink = make('a',null,p.titulo);
      headingLink.href = href; h.append(headingLink); content.append(h);
      if (p.trecho) content.append(make('p','recent-card__excerpt',p.trecho));
      const readLink = make('a','recent-card__link','Ler artigo');
      readLink.href = href; content.append(readLink);
      article.append(pictureLink,content); fragment.append(article);
    });
    container.replaceChildren(fragment);
    if (!posts.length) container.append(make('p','loading-message','Nenhum artigo encontrado.'));
  }
  function renderBotany(posts) {
    const container = byId('botanyPosts');
    if (!container) return;
    const selected = posts.filter(p => p.categoria === 'botanica').slice(0,3);
    if (!selected.length) return; // Preserva os cartões de fallback da V5
    const fragment = document.createDocumentFragment();
    selected.forEach((p,i) => {
      const a = make('a','v5-panel v5-botany-panel');
      a.href = normalizeUrl(p.link) || '#artigos-botanica';
      const img = image(p); if (img) a.append(img);
      const copy = make('div','v5-panel-copy');
      copy.append(make('p',null,String(i+1).padStart(2,'0')+' · Botânica'));
      copy.append(make('h3',null,p.titulo));
      copy.append(make('p','v5-botany-summary',p.trecho || ''));
      copy.append(make('span',null,'Ler artigo →'));
      a.append(copy); fragment.append(a);
    });
    container.replaceChildren(fragment);
  }
  function updateCategories(posts) {
    document.querySelectorAll('.v5-category').forEach(panel => {
      const p = posts.find(item => item.categoria === panel.dataset.category && normalizeUrl(item.imagem));
      const target = panel.querySelector('img');
      if (!p || !target) return;
      const candidate = new Image();
      candidate.onload = () => { target.src = candidate.src; };
      candidate.src = normalizeUrl(p.imagem);
    });
  }
  function init() {
    const catalog = byId('catalogo'), grid = byId('catalogPosts'), status = byId('catalogStatus'), title = byId('catalogTitle');
    let posts = null, failed = false;
    function renderCatalog() {
      if (!catalog || !grid || !status || !title) return;
      const hash = location.hash;
      const key = hash.startsWith('#artigos-') ? hash.slice('#artigos-'.length) : '';
      if (!Object.prototype.hasOwnProperty.call(LABELS,key)) {catalog.hidden=true;return;}
      const wasHidden = catalog.hidden;
      catalog.hidden = false;
      title.textContent = LABELS[key];
      document.querySelectorAll('[data-filter]').forEach(a => {
        if (a.dataset.filter === key) a.setAttribute('aria-current','true');
        else a.removeAttribute('aria-current');
      });
      grid.replaceChildren();
      if (!posts) status.textContent = failed ? 'Não foi possível carregar os artigos. Atualize a página para tentar novamente.' : 'Carregando artigos…';
      else {
        const selected = posts.filter(p => key === 'todos' || p.categoria === key);
        status.textContent = selected.length + ' artigos';
        const fragment = document.createDocumentFragment();
        selected.forEach(p => {
          const a = make('a','v5-catalog-card');
          a.href = normalizeUrl(p.link) || '#explore';
          const img = image(p); if (img) a.append(img);
          a.append(make('h3',null,p.titulo),make('p',null,p.trecho || ''));
          const t = make('time',null,p.data || '');
          if (p.data) t.dateTime = p.data;
          a.append(t); fragment.append(a);
        });
        grid.append(fragment);
      }
      if (wasHidden) requestAnimationFrame(() => catalog.scrollIntoView({block:'start'}));
    }
    window.addEventListener('hashchange',renderCatalog);
    renderCatalog();
    fetch('/blog/posts.json',{cache:'no-cache'})
      .then(response => {if (!response.ok) throw Error('HTTP '+response.status); return response.json();})
      .then(data => {
        if (!Array.isArray(data)) throw Error('Formato inválido em posts.json');
        posts = sorted(data);
        renderRecent(posts); renderBotany(posts); updateCategories(posts); renderCatalog();
      })
      .catch(error => {
        failed = true; renderCatalog();
        console.error('Home V6: falha ao carregar artigos',error);
        const recent = byId('recentPosts');
        if (recent) recent.replaceChildren(make('p','loading-message','Não foi possível carregar os artigos recentes.'));
      });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();
