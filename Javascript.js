// Detect Android WebView
const isWebView = (() => {
  const ua = navigator.userAgent || "";
  const isAndroid = /Android/i.test(ua);
  const isWV = /wv/.test(ua) || /\bVersion\/[\d.]+ Mobile\b/.test(ua);
  return isAndroid && isWV; // change to: return isAndroid && isWV;
})();

// Toggle UI visibility based on WebView detection
const webviewUI = document.getElementById("webviewUI");
const browserOnlyMsg = document.getElementById("browserOnlyMsg");
if (webviewUI) webviewUI.style.display = isWebView ? "block" : "none";
if (browserOnlyMsg) browserOnlyMsg.style.display = isWebView ? "none" : "block";

// Notification Popup
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

// === Elements ===
const categoryBtn = document.getElementById("categoriesBtn");
const categoryRing = document.getElementById("categoryRing");
const accountBtn = document.getElementById("accountBtn");
const closeBtn1 = document.getElementById("closeSidebar");
const sidebar = document.getElementById("accountSidebar");

// === Animations ===

function fadeOut(element, type) {
  const fadeClass = type === 'sidebar' ? "fade-sidebar-out" : "fade-category-out";
  const removeClass = type === 'sidebar' ? "active" : "show";

  element.classList.add(fadeClass);

  setTimeout(() => {
    element.classList.remove(removeClass, fadeClass);
    updateScrollLock();
  }, 300); // Same as CSS transition duration
}
// === Scroll Lock ===
function updateScrollLock() {
  const isCategoryOpen = categoryRing?.classList.contains("show");
  const isSidebarOpen = sidebar?.classList.contains("active");
  document.body.classList.toggle("lock-scroll", isCategoryOpen || isSidebarOpen);
}

// === Prevent Both Opening Together ===
function closeOthers(current) {
  if (current !== "category" && categoryRing.classList.contains("show")) {
    fadeOut(categoryRing, "category");
  }
  if (current !== "sidebar" && sidebar.classList.contains("active")) {
    fadeOut(sidebar, "sidebar");
  }
}

// === Category Toggle ===
if (categoryBtn1 && categoryRing) {
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
    if (
      categoryRing.classList.contains("show") &&
      !categoryRing.contains(e.target) &&
      e.target !== categoryBtn
    ) {
      fadeOut(categoryRing, "category");
    }
  });
}

// === Sidebar Toggle ===
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
    if (
      sidebar.classList.contains("active") &&
      !sidebar.contains(e.target) &&
      e.target !== accountBtn
    ) {
      fadeOut(sidebar, "sidebar");
    }
  });
}

if (closeBtn && sidebar) {
  closeBtn.addEventListener("click", () => {
    fadeOut(sidebar, "sidebar");
  });
}

// === Dark Mode ===
function initDarkMode() {
  const darkModeToggle = document.querySelector('#DarkMode');
  if (!darkModeToggle) return;

  let isDarkMode = false;
  darkModeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode', isDarkMode);
    darkModeToggle.src = isDarkMode ? 'sun-regular-24.png' : 'sun-solid-24.png';
  });
}

// === Top Nav Account / Menu ===
function initNavigation() {
  const menuBtn = document.querySelector('#menu');
  const menuList = document.querySelector('#menu-List');
  const accountBtn = document.querySelector('#account');
  const accountList = document.querySelector('#account-list');
  let menuOpen = false;

  menuBtn?.addEventListener('click', () => {
    menuOpen = !menuOpen;
    menuList.style.display = menuOpen ? 'block' : 'none';
    const menuIcon = document.querySelector('#menu-icon');
    menuIcon.src = menuOpen ? 'check-box.png' : 'menuicon.png';
  });

  accountBtn?.addEventListener('click', () => {
    const isVisible = accountList.style.display === 'block';
    accountList.style.display = isVisible ? 'none' : 'block';
  });
}

/*menu and account list hode-------------------------------*/
function initNavigation() {
  const menuBtn = document.getElementById('menu');
  const menuList = document.getElementById('menu-List');
  const accountBtn = document.getElementById('account');
  const accountList = document.getElementById('account-list');

  let isMenuOpen = false;
  let isAccountOpen = false;

  menuBtn?.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent bubbling
    isMenuOpen = !isMenuOpen;
    isAccountOpen = false;

    menuList.style.display = isMenuOpen ? 'block' : 'none';
    accountList.style.display = 'none';

    const menuIcon = document.getElementById('menu-icon');
    if (menuIcon) {
      menuIcon.src = isMenuOpen ? 'check-box.png' : 'menuicon.png';
    }
  });

  accountBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    isAccountOpen = !isAccountOpen;
    isMenuOpen = false;

    accountList.style.display = isAccountOpen ? 'block' : 'none';
    menuList.style.display = 'none';

    const menuIcon = document.getElementById('menu-icon');
    if (menuIcon) {
      menuIcon.src = 'menuicon.png';
    }
  });

  // Hide both dropdowns on outside click
  document.addEventListener('click', () => {
    isMenuOpen = false;
    isAccountOpen = false;
    menuList.style.display = 'none';
    accountList.style.display = 'none';

    const menuIcon = document.getElementById('menu-icon');
    if (menuIcon) {
      menuIcon.src = 'menuicon.png';
    }
  });
}

// === Scroll to Top ===
function initScrollToTop() {
  const scrollBtn = document.querySelector('.scroll-top');
  if (!scrollBtn) return;

  window.addEventListener('scroll', () => {
    scrollBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';
  });

  scrollBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// === Bottom Nav Active Tab ===
function setActiveBottomTab() {
  const page = window.location.pathname.split("/").pop().toLowerCase();

  const tabMap = {
    "index.html": "nav-home",
    "notes.html": "nav-notes",
    "pyq.html": "nav-pyq"
  };

  document.querySelectorAll(".mobile-bottom-nav .nav-item").forEach(el => {
    el.classList.remove("active");
  });

  const activeId = tabMap[page];
  if (activeId) {
    const activeTab = document.getElementById(activeId);
    if (activeTab) activeTab.classList.add("active");
  }
}

// === Init All ===
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initDarkMode();
  initScrollToTop();
  if (isWebView) {
    setActiveBottomTab();
  }
});
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
});

//half circle js 
document.addEventListener("DOMContentLoaded", function () {
      const ring = document.getElementById("categoryRing");
      const bubbles = ring.querySelectorAll(".ring-bubble");
      const count = bubbles.length;

      bubbles.forEach((bubble, i) => {
        const angle = i * (180 / (count - 1)) - 90;
        const rotate = `rotate(${angle}deg) translateY(-75px) rotate(${-angle}deg)`;
        bubble.style.transform = rotate;
        bubble.style.opacity = 1;
      });
    });
