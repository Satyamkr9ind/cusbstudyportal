// Javascript.js (trimmed for video.html)

// Detect Android WebView
const isWebView = (() => {
  const ua = navigator.userAgent || "";
  const isAndroid = /Android/i.test(ua);
  const isWV = /wv/.test(ua) || /\bVersion\/[\d.]+ Mobile\b/.test(ua);
  return true;
})();

// Toggle WebView UI visibility
const webviewUI = document.getElementById("webviewUI");
if (webviewUI) webviewUI.style.display = isWebView ? "block" : "none";

// Notification popup inside WebView
if (isWebView) {
  const bellNotice = document.getElementById("bellNotice");
  const bellMessage = document.getElementById("bellMessage");
  const bellClose = document.getElementById("bellClose");

  if (bellNotice && bellMessage && bellClose) {
    bellNotice.style.display = "inline-block";
    const autoHideTimer = setTimeout(() => {
      bellNotice.style.opacity = "0";
      setTimeout(() => (bellNotice.style.display = "none"), 300);
    }, 4000);

    bellMessage.addEventListener("click", () => {
      clearTimeout(autoHideTimer);
      bellNotice.style.display = "none";
      window.location.href = "Miscellaneous.html#office-notice";
    });

    bellClose.addEventListener("click", () => {
      clearTimeout(autoHideTimer);
      bellNotice.style.display = "none";
    });
  }
}

// Mobile WebView category ring and sidebar toggles
const categoryBtn = document.getElementById("categoriesBtn");
const categoryRing = document.getElementById("categoryRing");
const accountBtn = document.getElementById("accountBtn");
const sidebar = document.getElementById("accountSidebar");
const closeBtn1 = document.getElementById("closeSidebar");

function fadeOut(element, type) {
  const fadeClass = type === 'sidebar' ? "fade-sidebar-out" : "fade-category-out";
  const removeClass = type === 'sidebar' ? "active" : "show";
  element.classList.add(fadeClass);
  setTimeout(() => {
    element.classList.remove(removeClass, fadeClass);
    updateScrollLock();
  }, 300);
}

function updateScrollLock() {
  const isCategoryOpen = categoryRing?.classList.contains("show");
  const isSidebarOpen = sidebar?.classList.contains("active");
  document.body.classList.toggle("lock-scroll", isCategoryOpen || isSidebarOpen);
}

function closeOthers(current) {
  if (current !== "category" && categoryRing?.classList.contains("show")) {
    fadeOut(categoryRing, "category");
  }
  if (current !== "sidebar" && sidebar?.classList.contains("active")) {
    fadeOut(sidebar, "sidebar");
  }
}

// Category Toggle
if (categoryBtn && categoryRing) {
  categoryBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = categoryRing.classList.contains("show");
    if (!isOpen) {
      closeOthers("category");
      categoryRing.classList.add("show");
    } else {
      fadeOut(categoryRing, "category");
    }
    updateScrollLock();
  });
  document.addEventListener("click", (e) => {
    if (categoryRing.classList.contains("show") && !categoryRing.contains(e.target) && e.target !== categoryBtn) {
      fadeOut(categoryRing, "category");
    }
  });
}

// Sidebar Toggle
if (accountBtn && sidebar) {
  accountBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = sidebar.classList.contains("active");
    if (!isOpen) {
      closeOthers("sidebar");
      sidebar.classList.add("active");
    } else {
      fadeOut(sidebar, "sidebar");
    }
    updateScrollLock();
  });

  document.addEventListener("click", (e) => {
    if (sidebar.classList.contains("active") && !sidebar.contains(e.target) && e.target !== accountBtn) {
      fadeOut(sidebar, "sidebar");
    }
  });
}

if (closeBtn1 && sidebar) {
  closeBtn1.addEventListener("click", () => {
    fadeOut(sidebar, "sidebar");
  });
}

// Half-circle category ring positioning
document.addEventListener("DOMContentLoaded", function () {
  const ring = document.getElementById("categoryRing");
  const bubbles = ring?.querySelectorAll(".ring-bubble") || [];
  const count = bubbles.length;

  bubbles.forEach((bubble, i) => {
    const angle = i * (180 / (count - 1)) - 90;
    const rotate = `rotate(${angle}deg) translateY(-75px) rotate(${-angle}deg)`;
    bubble.style.transform = rotate;
    bubble.style.opacity = 1;
  });
});
