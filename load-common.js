document.addEventListener("DOMContentLoaded", () => {
  // Carrega o cabeçalho
  fetch('header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header').innerHTML = data;
      marcarLinkAtivo();
    });
});

// Marca o link ativo com base na página atual
function marcarLinkAtivo() {
  const links = document.querySelectorAll('.top-menu li a');
  const current = window.location.pathname.split('/').pop();
  links.forEach(link => {
    if (link.getAttribute('href') === current) {
      link.classList.add('active');
    }
  });
}
