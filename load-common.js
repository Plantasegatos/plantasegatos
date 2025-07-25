document.addEventListener("DOMContentLoaded", () => {
  // Carrega o cabeçalho
  fetch('header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header').innerHTML = data;
      marcarLinkAtivo();
    });

  // Carrega o rodapé
  fetch('footer.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('footer').innerHTML = data;
    });
});

// Marca o link ativo no menu
function marcarLinkAtivo() {
  const links = document.querySelectorAll('.neo-menu a');
  const current = window.location.pathname.split('/').pop();

  links.forEach(link => {
    if (link.getAttribute('href') === current) {
      link.style.color = '#D9A744'; // cor dourada
      link.style.boxShadow = 'inset 6px 6px 12px #0f292d, inset -6px -6px 12px #163d42'; // afundado
      link.style.transform = 'translateY(1px)';
    }
  });
}


