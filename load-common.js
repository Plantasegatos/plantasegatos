// Verifica se estamos em uma subpasta (plantas ou blog)
const isInSubfolder =
  window.location.pathname.includes('/plantas/') ||
  window.location.pathname.includes('/blog/');

// Define o caminho correto para o header
const headerPath = isInSubfolder ? '../header.html' : 'header.html';
fetch(headerPath)
  .then(response => response.text())
  .then(data => {
    document.getElementById('header').innerHTML = data;
    ajustarLinksHeader(); // <-- chamada para corrigir os links
    marcarLinkAtivo();
  });

// Define o caminho correto para o footer
const footerPath = isInSubfolder ? '../footer.html' : 'footer.html';
fetch(footerPath)
  .then(response => response.text())
  .then(data => {
    document.getElementById('footer').innerHTML = data;
  });

// Função para ajustar links do header quando estiver em subpasta
function ajustarLinksHeader() {
  if (isInSubfolder) {
    document.querySelectorAll('.neo-menu a').forEach(link => {
      if (!link.getAttribute('href').startsWith('../')) {
        link.setAttribute('href', '../' + link.getAttribute('href'));
      }
    });
  }
}

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





