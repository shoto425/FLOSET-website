(function () {
  const WAITLIST = {
    formUrl: "https://assets.mailerlite.com/jsonp/2471978/forms/jMbQtS",
  };

  let modal;
  let iframe;
  let loading;
  let templateHtml;

  function getModal() {
    if (modal) return modal;
    modal = document.getElementById("waitlist-modal");
    if (!modal) return null;
    iframe = modal.querySelector(".waitlist-modal__frame");
    loading = modal.querySelector(".waitlist-modal__loading");
    modal.querySelectorAll("[data-close]").forEach((el) => {
      el.addEventListener("click", closeWaitlistModal);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal && !modal.hidden) closeWaitlistModal();
    });
    return modal;
  }

  function loadTemplate() {
    if (templateHtml) return Promise.resolve(templateHtml);
    return fetch(WAITLIST.formUrl)
      .then((res) => {
        if (!res.ok) throw new Error("form fetch failed");
        return res.json();
      })
      .then((json) => {
        templateHtml = json.data.template;
        return templateHtml;
      });
  }

  window.openWaitlistModal = function openWaitlistModal(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const el = getModal();
    if (!el || !iframe || !loading) return;

    document.body.classList.remove("menu-open");
    const burger = document.getElementById("burger");
    if (burger) burger.setAttribute("aria-expanded", "false");

    el.hidden = false;
    el.setAttribute("aria-hidden", "false");
    document.body.classList.add("waitlist-open");
    loading.hidden = false;
    loading.textContent = "読み込み中…";
    iframe.hidden = true;

    loadTemplate()
      .then((html) => {
        iframe.srcdoc = html;
        iframe.hidden = false;
        loading.hidden = true;
      })
      .catch(() => {
        loading.textContent = "フォームを読み込めませんでした。しばらくしてから再度お試しください。";
        iframe.hidden = true;
      });
  };

  window.closeWaitlistModal = function closeWaitlistModal() {
    const el = getModal();
    if (!el) return;
    el.hidden = true;
    el.setAttribute("aria-hidden", "true");
    document.body.classList.remove("waitlist-open");
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", getModal);
  } else {
    getModal();
  }
})();
