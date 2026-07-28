document.addEventListener("DOMContentLoaded", function () {
  const menu = document.getElementById("fanMenu");
  const botao = document.getElementById("fanTrigger");
  const navegacao = document.getElementById("fanNavigation");

  /* =====================================================
     MENU EM LEQUE
  ====================================================== */

  if (!menu || !botao || !navegacao) {
    console.error("Menu em leque: elementos não encontrados no HTML.", {
      fanMenu: menu,
      fanTrigger: botao,
      fanNavigation: navegacao
    });
  } else {
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
  }

  /* =====================================================
     ARTIGOS RECENTES
  ====================================================== */

  const containerArtigos = document.getElementById("recentPosts");

  if (!containerArtigos) {
    console.error("Artigos recentes: container #recentPosts não encontrado.");
    return;
  }

  fetch("/blog/posts.json")
    .then(function (resposta) {
      if (!resposta.ok) {
        throw new Error(
          "Não foi possível carregar posts.json. Status: " +
          resposta.status
        );
      }

      return resposta.json();
    })
    .then(function (posts) {
      if (!Array.isArray(posts)) {
        throw new Error("O conteúdo de posts.json não é uma lista.");
      }

      const artigosRecentes = posts
        .slice()
        .sort(function (a, b) {
          return new Date(b.data) - new Date(a.data);
        })
        .slice(0, 6);

      if (artigosRecentes.length === 0) {
        containerArtigos.innerHTML =
          '<p class="loading-message">Nenhum artigo encontrado.</p>';
        return;
      }

      containerArtigos.innerHTML = artigosRecentes
        .map(function (post) {
          const titulo = post.titulo || "Artigo";
          const trecho = post.trecho || "";
          const link = post.link
            ? "/" + post.link.replace(/^\/+/, "")
            : "/blog/";
          const imagem = post.imagem
            ? "/" + post.imagem.replace(/^\/+/, "")
            : "";

          return `
            <article class="recent-card">
              <a
                class="recent-card__image"
                href="${link}"
                aria-label="Ler ${titulo}"
              >
                ${
                  imagem
                    ? `<img src="${imagem}" alt="" loading="lazy">`
                    : ""
                }
              </a>

              <div class="recent-card__content">
                <p class="recent-card__meta">Artigo recente</p>

                <h3>
                  <a href="${link}">${titulo}</a>
                </h3>

                ${
                  trecho
                    ? `<p class="recent-card__excerpt">${trecho}</p>`
                    : ""
                }

                <a class="recent-card__link" href="${link}">
                  Ler artigo
                </a>
              </div>
            </article>
          `;
        })
        .join("");
    })
    .catch(function (erro) {
      console.error("Erro ao carregar artigos recentes:", erro);

      containerArtigos.innerHTML = `
        <p class="loading-message">
          Não foi possível carregar os artigos recentes.
        </p>
      `;
    });
});
