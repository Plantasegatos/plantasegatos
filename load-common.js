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
  const links = document.querySelectorAll('.top-menu li a');
  const current = window.location.pathname.split('/').pop();
  links.forEach(link => {
    if (link.getAttribute('href') === current) {
      link.classList.add('active');
    }
  });
}

