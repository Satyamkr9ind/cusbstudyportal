
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
                scrollBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
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
        
