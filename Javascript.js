
// Detect Android WebView
const isWebView = (() => {
  const ua = navigator.userAgent || "";
  const isAndroid = /Android/i.test(ua);
  const isWV = /wv/.test(ua) || /\bVersion\/[\d.]+ Mobile\b/.test(ua);
  return isAndroid && isWV;
})();

// Toggle visibility for WebView-only UI
const webviewUI = document.getElementById("webviewUI");
const defaultNavbar = document.getElementById("defaultNavbar");

if (webviewUI) webviewUI.style.display = isWebView ? "block" : "none";
if (defaultNavbar) defaultNavbar.style.display = isWebView ? "none" : "block";


// Category Ring Toggle
const categoryBtn = document.getElementById("categoriesBtn");
const categoryRing = document.getElementById("categoryRing");

if (categoryBtn && categoryRing) {
  categoryBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    categoryRing.classList.toggle("show");
  });

  document.addEventListener("click", (e) => {
    if (
      categoryRing.classList.contains("show") &&
      !categoryRing.contains(e.target) &&
      e.target !== categoryBtn
    ) {
      categoryRing.classList.remove("show");
    }
  });
}

// Sidebar Toggle
const accountBtn = document.getElementById("accountBtn");
const closeBtn = document.getElementById("closeSidebar");
const sidebar = document.getElementById("accountSidebar");

if (accountBtn && sidebar) {
  accountBtn.addEventListener("click", () => {
    sidebar.classList.add("active");
  });
}
if (closeBtn && sidebar) {
  closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("active");
  });
}
        // Dark Mode functionality
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
        
        // Navigation functionality
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
        
        // Scroll to top functionality
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
        
        // Initialize all modules when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            initNavigation();
            initDarkMode();
            initScrollToTop();
        });
        
