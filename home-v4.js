document.addEventListener("DOMContentLoaded", () => {
  const fanMenu = document.getElementById("fanMenu");
  const fanTrigger = document.getElementById("fanTrigger");
  const fanNavigation = document.getElementById("fanNavigation");
  const fanClose = document.getElementById("fanClose");

  if (!fanMenu || !fanTrigger || !fanNavigation) {
    console.error("Menu em leque: elementos do HTML não encontrados.");
    return;
  }

  function openFan() {
    fanMenu.classList.add("is-open");
    fanTrigger.setAttribute("aria-expanded", "true");
    fanNavigation.setAttribute("aria-hidden", "false");
  }

  function closeFan() {
    fanMenu.classList.remove("is-open");
    fanTrigger.setAttribute("aria-expanded", "false");
    fanNavigation.setAttribute("aria-hidden", "true");
  }

  fanTrigger.addEventListener("click", event => {
    event.stopPropagation();

    const isOpen = fanMenu.classList.contains("is-open");

    if (isOpen) {
      closeFan();
    } else {
      openFan();
    }
  });

  if (fanClose) {
    fanClose.addEventListener("click", event => {
      event.stopPropagation();
      closeFan();
      fanTrigger.focus();
    });
  }

  fanNavigation.addEventListener("click", event => {
    event.stopPropagation();
  });

  document.addEventListener("click", event => {
    if (!fanMenu.contains(event.target)) {
      closeFan();
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeFan();
      fanTrigger.focus();
    }
  });
});
