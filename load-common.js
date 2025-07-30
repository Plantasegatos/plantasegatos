// Detecta se estamos em uma subpasta (blog, plantas ou qualquer outra)
const isInSubfolder = window.location.pathname.split('/').length > 2;

// Caminhos para header e footer
const headerPath = isInSubfolder ? '../header.html' : 'header.html';
const footerPath = isInSubfolder ? '../footer.html' : 'footer.html';

console.log('[DEBUG] Caminho atual:', window.location.pathname);
console.log('[DEBUG] Subpasta detectada?', isInSubfolder);
console.log('[DEBUG] Carregando header de:', headerPath);
console.log('[DEBUG] Carregando footer de:', footerPath);

// Carregar header
fetch(headerPath)
  .then(response => {
    if (!response.ok) throw new Error(`Erro ao carregar header: ${response.status}`);
    return response.text();
  })
  .then(data => {
    document.getElementById('header').innerHTML = data;
    console.log('[DEBUG] Header carregado com sucesso');
    marcarLinkAtivo();
  })
  .catch(err => console.error('[ERRO HEADER]', err));

// Carregar footer
fetch(footerPath)
  .then(response => {
    if (!response.ok) throw new Error(`Erro ao carregar footer: ${response.status}`);
    return response.text();
  })
  .then(data => {
    document.getElementById('footer').innerHTML = data;
    console.log('[DEBUG] Footer carregado com sucesso');
  })
  .catch(err => console.error('[ERRO FOOTER]', err));

// Destacar link ativo no menu
function marcarLinkAtivo() {
  const links = document.querySelectorAll('.neo-menu a');
  const current = window.location.pathname.split('/').pop();
  links.forEach(link => {
    if (link.getAttribute('href') === current) {
      link.style.color = '#D9A744';
      link.style.boxShadow = 'inset 6px 6px 12px #0f292d, inset -6px -6px 12px #163d42';
      link.style.transform = 'translateY(1px)';
    }
  });
}






