// Verifica se estamos em uma subpasta (plantas ou blog)
const isInSubfolder =
  window.location.pathname.includes('/plantas/') ||
  window.location.pathname.includes('/blog/');

// Define o caminho correto para o header
const headerPath = isInSubfolder ? '../header.html' : 'header.html';
console.log("DEBUG: Carregando header de ->", headerPath);

fetch(headerPath)
  .then(response => {
    console.log("DEBUG: Resposta header ->", response.status, response.statusText);
    return response.text();
  })
  .then(data => {
    document.getElementById('header').innerHTML = data;
    marcarLinkAtivo();
  })
  .catch(err => console.error("DEBUG: Erro ao carregar header ->", err));

// Define o caminho correto para o footer
const footerPath = isInSubfolder ? '../footer.html' : 'footer.html';
console.log("DEBUG: Carregando footer de ->", footerPath);

fetch(footerPath)
  .then(response => {
    console.log("DEBUG: Resposta footer ->", response.status, response.statusText);
    return response.text();
  })
  .then(data => {
    document.getElementById('footer').innerHTML = data;
  })
  .catch(err => console.error("DEBUG: Erro ao carregar footer ->", err));

// Função para destacar o link ativo no menu
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





