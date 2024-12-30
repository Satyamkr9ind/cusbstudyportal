// Configuration
const CONFIG = {
    WEBAPP_URL: 'https://script.google.com/macros/s/AKfycbzsHqt6TDmpr4KdTqSyb5CtQPuKkaYdiKTlObuC2kwSNpAy0t_nMEWuDiMieLKF4Mjk/exec',
    FEEDBACK_ROTATION_INTERVAL: 5000
};

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
            <p class="message">${feedback.message}</p>
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

// DOM Elements
const feedbackContainer = document.getElementById('feedbackContainer');
const allFeedbackContainer = document.getElementById('allFeedbackContainer');
const modal = document.getElementById('feedbackModal');
const viewAllBtn = document.getElementById('viewAllBtn');
const closeBtn = document.querySelector('.close');

// Display Functions
function displaySidebarFeedback() {
    const feedback = allFeedback[currentFeedbackIndex];
    feedbackContainer.innerHTML = createFeedbackCard(feedback);
    currentFeedbackIndex = (currentFeedbackIndex + 1) % allFeedback.length;
}

function displayAllFeedback() {
    allFeedbackContainer.innerHTML = allFeedback
        .map(feedback => createFeedbackCard(feedback))
        .join('');
}

// Initialize feedback display
async function initializeFeedbackDisplay() {
    try {
        allFeedback = await fetchFeedback();
        displaySidebarFeedback();
        setInterval(displaySidebarFeedback, CONFIG.FEEDBACK_ROTATION_INTERVAL);
    } catch (error) {
        feedbackContainer.innerHTML = '<p>Error loading feedback. Please try again later.</p>';
    }
}

// Event Listeners
viewAllBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    displayAllFeedback();
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Initialize the application
initializeFeedbackDisplay();