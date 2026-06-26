(function () {
  const WAITLIST = {
    action:
      "https://assets.mailerlite.com/public/2471978/forms/191311719628277136/subscribe?signature=731f79bac05a3a47be5f8d03e15bab46b1cddd25c6d9397a25d40e6e34d6a378",
    recaptchaSiteKey: "6LdDsAYqAAAAAIIig23HD887qjgeeKyQlNWoI8pX",
  };

  let modal;
  let form;
  let statusEl;
  let submitBtn;
  let recaptchaWidgetId;
  let recaptchaReady = false;

  function getModal() {
    if (modal) return modal;
    modal = document.getElementById("waitlist-modal");
    form = document.getElementById("waitlist-form");
    statusEl = document.getElementById("waitlist-status");
    submitBtn = form?.querySelector(".waitlist-modal__submit");
    if (!modal || !form) return null;

    modal.querySelectorAll("[data-close]").forEach((el) => {
      el.addEventListener("click", closeWaitlistModal);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal && !modal.hidden) closeWaitlistModal();
    });
    form.addEventListener("submit", onSubmit);
    return modal;
  }

  function setStatus(message, type) {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.classList.remove("is-error", "is-success");
    if (type) statusEl.classList.add(`is-${type}`);
  }

  function loadRecaptchaScript() {
    if (document.getElementById("recaptcha-script")) {
      return new Promise((resolve) => {
        if (window.grecaptcha) resolve();
        else document.getElementById("recaptcha-script").addEventListener("load", resolve, { once: true });
      });
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.id = "recaptcha-script";
      script.src = "https://www.google.com/recaptcha/api.js?render=explicit";
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  function ensureRecaptcha() {
    if (recaptchaReady) return Promise.resolve();
    return loadRecaptchaScript().then(
      () =>
        new Promise((resolve) => {
          window.grecaptcha.ready(() => {
            if (recaptchaWidgetId == null) {
              recaptchaWidgetId = window.grecaptcha.render("waitlist-recaptcha", {
                sitekey: WAITLIST.recaptchaSiteKey,
                size: "invisible",
                badge: "inline",
                callback: submitWithToken,
              });
            }
            recaptchaReady = true;
            resolve();
          });
        })
    );
  }

  function submitWithToken(token) {
    const emailInput = form.querySelector('input[name="email"]');
    const email = emailInput?.value.trim();
    if (!email) return;

    submitBtn.disabled = true;
    setStatus("送信中…", null);

    const body = new URLSearchParams({
      "fields[email]": email,
      "g-recaptcha-response": token,
    });

    fetch(WAITLIST.action, {
      method: "POST",
      headers: { Accept: "application/json" },
      body,
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok || data.success === false) {
          throw new Error(data.message || "送信に失敗しました。");
        }
        setStatus("登録ありがとうございます。公開時にお知らせします。", "success");
        form.reset();
        if (window.grecaptcha && recaptchaWidgetId != null) {
          window.grecaptcha.reset(recaptchaWidgetId);
        }
      })
      .catch((err) => {
        setStatus(err.message || "送信に失敗しました。時間をおいて再度お試しください。", "error");
        if (window.grecaptcha && recaptchaWidgetId != null) {
          window.grecaptcha.reset(recaptchaWidgetId);
        }
      })
      .finally(() => {
        submitBtn.disabled = false;
      });
  }

  function onSubmit(e) {
    e.preventDefault();
    const emailInput = form.querySelector('input[name="email"]');
    const email = emailInput?.value.trim();
    if (!email) {
      setStatus("メールアドレスを入力してください。", "error");
      return;
    }

    setStatus("", null);
    submitBtn.disabled = true;

    ensureRecaptcha()
      .then(() => {
        window.grecaptcha.execute(recaptchaWidgetId);
      })
      .catch(() => {
        setStatus("フォームの読み込みに失敗しました。時間をおいて再度お試しください。", "error");
        submitBtn.disabled = false;
      });
  }

  window.openWaitlistModal = function openWaitlistModal(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const el = getModal();
    if (!el) return;

    document.body.classList.remove("menu-open");
    const burger = document.getElementById("burger");
    if (burger) burger.setAttribute("aria-expanded", "false");

    el.hidden = false;
    el.setAttribute("aria-hidden", "false");
    document.body.classList.add("waitlist-open");
    setStatus("", null);

    ensureRecaptcha().catch(() => {
      setStatus("フォームの読み込みに失敗しました。", "error");
    });

    const emailInput = form.querySelector('input[name="email"]');
    if (emailInput) setTimeout(() => emailInput.focus(), 100);
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
