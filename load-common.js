// Detecta se a página atual está dentro da pasta /blog ou /plantas
const isInSubfolder =
  window.location.pathname.includes('/blog/') ||
  window.location.pathname.includes('/plantas/');

// Define o caminho correto para o header
// - Se a página está em /blog, carrega /blog/header.html
// - Se a página está na raiz, carrega /header.html
const headerPath = isInSubfolder ? 'header.html' : 'header.html';
fetch(headerPath)
  .then(response => response.text())
  .then(data => {
    document.getElementById('header').innerHTML = data;
    marcarLinkAtivo();
  })
  .catch(error => console.error('Erro ao carregar o header:', error));

// Define o caminho correto para o footer
// - Se a página está em /blog, carrega /blog/footer.html
// - Se a página está na raiz, carrega /footer.html
const footerPath = isInSubfolder ? 'footer.html' : 'footer.html';
fetch(footerPath)
  .then(response => response.text())
  .then(data => {
    document.getElementById('footer').innerHTML = data;
  })
  .catch(error => console.error('Erro ao carregar o footer:', error));

// Função para destacar o link ativo no menu do header
function marcarLinkAtivo() {
  const links = document.querySelectorAll('.neo-menu a');
  const current = window.location.pathname.split('/').pop();

  links.forEach(link => {
    if (link.getAttribute('href') === current) {
      link.style.color = '#D9A744';
      link.style.boxShadow =
        'inset 6px 6px 12px #0f292d, inset -6px -6px 12px #163d42';
      link.style.transform = 'translateY(1px)';
    }
  });
}


