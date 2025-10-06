// Configuration
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxo1g5m0Q8IhUNERYarv6iYsQvSuoGoBG-OZwruvD2_dT04f8u5-bQMVpZ6SVOGsrcj/exec';
let isScrolling = true;
let notifications = [];
let scrollInterval;
let scrollPosition = 0;

// Login dropdown functionality
function setupLoginDropdown() {
    const accountLink = document.querySelector('.account-link');
    const loginDropdown = document.querySelector('.login-dropdown');

    accountLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginDropdown.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
        if (!accountLink.contains(e.target) && !loginDropdown.contains(e.target)) {
            loginDropdown.classList.remove('show');
        }
    });
}

// Navigation functionality
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// Notification Functions
async function fetchNotifications() {
    try {
        const response = await fetch(SCRIPT_URL + '?action=getNotifications');
        const data = await response.json();
        notifications = data.notifications;
        displayNotifications();
    } catch (error) {
        console.error('Error fetching notifications:', error);
    }
}

function displayNotifications() {
    const container = document.getElementById('notificationContent');
    container.innerHTML = notifications.map(notification => `
        <div class="notification">
            <h3>${notification.title}</h3>
            <p>${notification.content}</p>
            <small>${notification.timestamp}</small>
        </div>
    `).join('');
}

function startScroll() {
    if (scrollInterval) return;
    
    const content = document.getElementById('notificationContent');
    
    scrollInterval = setInterval(() => {
        if (!isScrolling) return;
        
        scrollPosition--;
        if (Math.abs(scrollPosition) >= content.scrollHeight) {
            scrollPosition = 0;
        }
        content.style.transform = `translateY(${scrollPosition}px)`;
    }, 30);
}

function stopScroll() {
    isScrolling = false;
}

function resumeScroll() {
    isScrolling = true;
}

function setupNotificationInteraction() {
    const container = document.getElementById('notificationScroll');

    container.addEventListener('mouseenter', stopScroll);
    container.addEventListener('mouseleave', resumeScroll);
    container.addEventListener('touchstart', stopScroll);
    container.addEventListener('touchend', resumeScroll);
    container.addEventListener('click', (e) => {
        if (e.target.closest('.notification')) {
            stopScroll();
            setTimeout(resumeScroll, 5000);
        }
    });
}

// Upload Functions
function setupFileUpload() {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('file');
    const fileName = document.getElementById('fileName');

    dropZone.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => {
        if (e.target.files[0]) {
            fileName.textContent = e.target.files[0].name;
        }
    });

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '#4CAF50';
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.style.borderColor = '#ddd';
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '#ddd';
        fileInput.files = e.dataTransfer.files;
        if (e.dataTransfer.files[0]) {
            fileName.textContent = e.dataTransfer.files[0].name;
        }
    });
}

async function handleSubmit(e) {
    e.preventDefault();
    const messageDiv = document.getElementById('message');
    const formData = new FormData();

    formData.append('title', document.getElementById('title').value);
    formData.append('content', document.getElementById('content').value);
    
    const fileInput = document.getElementById('file');
    if (fileInput.files[0]) {
        formData.append('file', fileInput.files[0]);
    }

    try {
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        
        if (result.success) {
            messageDiv.className = 'success';
            messageDiv.textContent = 'Content uploaded successfully!';
            e.target.reset();
            document.getElementById('fileName').textContent = '';
            fetchNotifications();
        } else {
            throw new Error(result.message || 'Upload failed');
        }
    } catch (error) {
        messageDiv.className = 'error';
        messageDiv.textContent = error.message;
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    setupLoginDropdown();
    fetchNotifications();
    setupNotificationInteraction();
    startScroll();
    setupFileUpload();
    document.getElementById('uploadForm').addEventListener('submit', handleSubmit);
});
