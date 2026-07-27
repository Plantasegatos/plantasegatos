document.addEventListener("DOMContentLoaded", function () {
  const menu = document.getElementById("fanMenu");
  const botao = document.getElementById("fanTrigger");
  const navegacao = document.getElementById("fanNavigation");

  if (!menu || !botao || !navegacao) {
    console.error("Menu em leque: elementos não encontrados no HTML.", {
      fanMenu: menu,
      fanTrigger: botao,
      fanNavigation: navegacao
    });

    return;
  }

  function abrirMenu() {
    menu.classList.add("is-open");
    botao.setAttribute("aria-expanded", "true");
    navegacao.setAttribute("aria-hidden", "false");
  }

  function fecharMenu() {
    menu.classList.remove("is-open");
    botao.setAttribute("aria-expanded", "false");
    navegacao.setAttribute("aria-hidden", "true");
  }

  botao.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();

    if (menu.classList.contains("is-open")) {
      fecharMenu();
    } else {
      abrirMenu();
    }
  });

  navegacao.addEventListener("click", function (event) {
    event.stopPropagation();
  });

  document.addEventListener("click", function (event) {
    if (!menu.contains(event.target)) {
      fecharMenu();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      fecharMenu();
      botao.focus();
    }
  });
});
