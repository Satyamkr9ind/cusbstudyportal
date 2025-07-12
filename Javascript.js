<!-- BEGIN: Extra Mobile UI for Android WebView only -->
<div id="webviewUI" style="display: none;">

  <!-- Brand Logo Top Left -->
  <div class="mobile-top-logo">
    <span class="brand-logo">
  <img src="C:\Users\satya\Desktop\Voult.png" alt="Logo" class="logo-img" /></span>

  </div>

  <!-- Bell Icon Top Right -->
  <div class="mobile-top-bell">
    <span class="bell-icon"><a href="Miscellaneous.html#office-notice">🔔</a></span>
  </div>

  <!-- Category Ring -->
  <div class="category-ring" id="categoryRing">
    <div class="ring-bubble" style="--i:0;"><a href="Notes.html">📗<br> Notes</a></div>
    <div class="ring-bubble" style="--i:1;"><a href="book.html">📘<br>Book</a></div>
    <div class="ring-bubble" style="--i:2;"><a href="mailto:msccs2426studymaterial@gmail.com">❓<br> Contact<br>US</a></div>
    <div class="ring-bubble" style="--i:3;"><a href="https://csvidyalaya.com/">🧪<br></a>Solved <br>paper</div>
    <div class="ring-bubble" style="--i:4;"><a href="Miscellaneous.html">📁<br> Misc</a></div>
    <div class="ring-bubble" style="--i:5;"><a href="https://drive.google.com/drive/folders/17LoT-rVQM0wvmfzm_6lVYdh8FSTuaBm_?usp=sharing">📈<br> Syllabus</a></div>
  </div>

  <!-- Bottom Navigation -->
  <div class="mobile-bottom-nav">
    <a href="index.html">🏠<br>Home</a>
    <a href="Notes.html">📚<br>Notes</a>
    <a href="javascript:void(0);" id="categoriesBtn">🌀<br>Categories</a>
    <a href="pyq.html">❓<br>PYQ</a>
    <a href="javascript:void(0);" id="accountBtn">👤<br>Account</a>
  </div>

  <!-- Sidebar -->
  <div class="sidebar" id="accountSidebar">
    <div class="sidebar-content">
      <span class="close-btn" id="closeSidebar">×</span>
      <h3>Account</h3>
      <a href="https://script.google.com/macros/s/AKfycbyrJ4mQinaXn7DmJOl-PoBuWcgzYUOGIh1OkLoIKSMN4dverejZVUktzLRXdhXZsEEw9Q/exec">Sign in as Admin</a>
      <a href="sign-up.html">Sign in as User</a>
      <a href="about.html">About Us</a>
    </div>
  </div>

</div>
<!-- END -->

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
        
