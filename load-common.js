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
  const links = document.querySelectorAll('.neo-menu a'); // Seleciona os links do novo menu
  const current = window.location.pathname.split('/').pop(); // Pega o nome do arquivo atual (ex: plantas.html)

  links.forEach(link => {
    if (link.getAttribute('href') === current) {
      // Adiciona estilo ativo diretamente
      link.style.color = '#D9A744';
      link.style.boxShadow = 'inset 6px 6px 12px #0f292d, inset -6px -6px 12px #163d42';
      link.style.transform = 'translateY(1px)';
    }
  });
}

