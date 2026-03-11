const apps = Array.isArray(window.PHYLOCOV_APPS) ? window.PHYLOCOV_APPS : [];

const appList = document.querySelector("#app-list");
const appCount = document.querySelector("#app-count");
const appTitle = document.querySelector("#app-title");
const appDescription = document.querySelector("#app-description");
const appTags = document.querySelector("#app-tags");
const appFrame = document.querySelector("#app-frame");
const openAppLink = document.querySelector("#open-app-link");
const framePlaceholder = document.querySelector("#frame-placeholder");

const hasValidUrl = (value) => {
  try {
    return Boolean(new URL(value));
  } catch {
    return false;
  }
};

const renderTags = (tags) => {
  appTags.innerHTML = "";

  (tags || []).forEach((tag) => {
    const chip = document.createElement("span");
    chip.className = "app-tag";
    chip.textContent = tag;
    appTags.appendChild(chip);
  });
};

const selectApp = (appId) => {
  const selected = apps.find((app) => app.id === appId) || apps[0];

  if (!selected) {
    appTitle.textContent = "No applications configured";
    appDescription.textContent = "Add entries to app-config.js to populate the launcher.";
    appFrame.removeAttribute("src");
    openAppLink.href = "#";
    openAppLink.setAttribute("aria-disabled", "true");
    framePlaceholder.hidden = false;
    return;
  }

  document.querySelectorAll(".app-card").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.appId === selected.id);
    button.setAttribute("aria-selected", String(button.dataset.appId === selected.id));
  });

  appTitle.textContent = selected.title;
  appDescription.textContent = selected.description || selected.summary || "";
  renderTags(selected.tags);

  if (hasValidUrl(selected.url) && selected.embed !== false) {
    appFrame.src = selected.url;
    openAppLink.href = selected.url;
    openAppLink.removeAttribute("aria-disabled");
    framePlaceholder.hidden = true;
  } else {
    appFrame.removeAttribute("src");
    if (hasValidUrl(selected.url)) {
      openAppLink.href = selected.url;
      openAppLink.removeAttribute("aria-disabled");
      framePlaceholder.hidden = false;
      framePlaceholder.innerHTML = `
        <div>
          <h4>This app is set to open externally</h4>
          <p>
            Set <code>embed: true</code> in <code>app-config.js</code> if the published Earth Engine app can be displayed in an iframe.
          </p>
        </div>
      `;
      return;
    }

    openAppLink.href = "#";
    openAppLink.setAttribute("aria-disabled", "true");
    framePlaceholder.hidden = false;
    framePlaceholder.innerHTML = `
      <div>
        <h4>Connect your live Earth Engine app</h4>
        <p>
          Add a valid published URL in <code>app-config.js</code> to load the application here.
        </p>
      </div>
    `;
  }
};

const renderAppButtons = () => {
  appList.innerHTML = "";
  appCount.textContent = `${apps.length} app${apps.length === 1 ? "" : "s"}`;

  apps.forEach((app, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "app-card";
    button.dataset.appId = app.id;
    button.setAttribute("role", "tab");
    button.setAttribute("aria-selected", "false");
    button.innerHTML = `
      <span class="app-card-title">${app.title}</span>
      <span class="app-card-summary">${app.summary || ""}</span>
    `;
    button.addEventListener("click", () => selectApp(app.id));
    appList.appendChild(button);

    if (index === 0) {
      selectApp(app.id);
    }
  });

  if (apps.length === 0) {
    selectApp();
  }
};

renderAppButtons();
