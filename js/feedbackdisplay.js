// Configuration
const CONFIG = {
    WEBAPP_URL: 'https://script.google.com/macros/s/AKfycbzsHqt6TDmpr4KdTqSyb5CtQPuKkaYdiKTlObuC2kwSNpAy0t_nMEWuDiMieLKF4Mjk/exec',
    FEEDBACK_ROTATION_INTERVAL: 5000
};

// Modal Functions
function disableBackgroundScroll() {
    document.body.style.position = 'fixed';
}

function enableBackgroundScroll() {
    document.body.style.position = 'static';
}

function openModal(modal) {
    modal.style.display = 'block';
    disableBackgroundScroll();
}

function closeModal(modal) {
    modal.style.display = 'none';
    enableBackgroundScroll();
}

// Utility Functions
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString();
}

function createFeedbackCard(feedback) {
    const replyHtml = feedback.reply 
        ? `<div class="reply"><strong>Reply:</strong> ${feedback.reply}</div>` 
        : '';

    return `
        <div class="feedback-card">
            <div class="feedback-header">
                <h3>${feedback.name}</h3>
                <span class="type">${feedback.type}</span>
            </div>
            <div class="message-container">
                <p class="message">${feedback.message}</p>
                <span class="read-more">Read more</span>
            </div>
            ${replyHtml}
            <div class="date">${formatDate(feedback.date)}</div>
        </div>
    `;
}

// API Service
async function fetchFeedback() {
    try {
        const response = await fetch(CONFIG.WEBAPP_URL);
        const { status, data } = await response.json();
        
        if (status === 'success') {
            return sortFeedback(data);
        }
        throw new Error('Failed to fetch feedback');
    } catch (error) {
        console.error('Error fetching feedback:', error);
        throw error;
    }
}

function sortFeedback(feedback) {
    return feedback.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
    });
}

// State management
let allFeedback = [];
let currentFeedbackIndex = 0;
let rotationInterval;
let isPaused = false;

// DOM Elements
const feedbackContainer = document.getElementById('feedbackContainer');
const allFeedbackContainer = document.getElementById('allFeedbackContainer');
const modal = document.getElementById('feedbackModal');
const viewAllBtn = document.getElementById('viewAllBtn');
const closeBtn = document.querySelector('.close');

// Display Functions
function displaySidebarFeedback() {
    if (isPaused) return;
    
    const feedback = allFeedback[currentFeedbackIndex];
    feedbackContainer.innerHTML = createFeedbackCard(feedback);
    currentFeedbackIndex = (currentFeedbackIndex + 1) % allFeedback.length;
    
    // Add event listeners for the new card
    setupReadMoreListeners();
}

function displayAllFeedback() {
    allFeedbackContainer.innerHTML = allFeedback
        .map(feedback => createFeedbackCard(feedback))
        .join('');
    
    // Add event listeners for all cards in the modal
    setupReadMoreListeners();
}

function setupReadMoreListeners() {
    document.querySelectorAll('.read-more').forEach(button => {
        button.addEventListener('click', function(e) {
            const messageContainer = this.closest('.message-container');
            const message = messageContainer.querySelector('.message');
            message.classList.toggle('expanded');
            this.textContent = message.classList.contains('expanded') ? 'Read less' : 'Read more';
            e.stopPropagation();
        });
    });
}

// Initialize feedback display
async function initializeFeedbackDisplay() {
    try {
        allFeedback = await fetchFeedback();
        displaySidebarFeedback();
        startRotation();
        
        // Add pause/resume handlers
        feedbackContainer.addEventListener('mouseenter', pauseRotation);
        feedbackContainer.addEventListener('mouseleave', resumeRotation);
        feedbackContainer.addEventListener('touchstart', pauseRotation);
        feedbackContainer.addEventListener('touchend', resumeRotation);
        feedbackContainer.addEventListener('click', pauseRotation);
    } catch (error) {
        feedbackContainer.innerHTML = '<p>Error loading feedback. Please try again later.</p>';
    }
}

function startRotation() {
    rotationInterval = setInterval(displaySidebarFeedback, CONFIG.FEEDBACK_ROTATION_INTERVAL);
}

function pauseRotation() {
    isPaused = true;
    clearInterval(rotationInterval);
}

function resumeRotation() {
    isPaused = false;
    startRotation();
}

// Event Listeners
viewAllBtn.addEventListener('click', () => {
    openModal(modal);
    displayAllFeedback();
});

closeBtn.addEventListener('click', () => {
    closeModal(modal);
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal(modal);
    }
});

// Initialize the application
initializeFeedbackDisplay();
