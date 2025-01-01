// Data
const teamMembers = [
  {
    name: "Satyam Kumar",
    role: "Designer & Developer",
    image: "my photo.png",
    social: {
      instagram: "https://www.instagram.com/satyamtheshiva",
      facebook: "https://www.facebook.com/profile.php?id=100016399607155",
      linkedin: "https://www.linkedin.com/in/satyam-kumar-83a77b340?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
    }
  },
  {
    name: "Sunny Mandal",
    role: "Resource Contributor",
    image: "sunny.jpg",
    social: {
      instagram: "https://www.instagram.com/i_am_skr_26",
      facebook: "https://www.facebook.com/sunnykumarranjan.sunny.71",
      linkedin: "https://www.linkedin.com/in/sunny-kumar-652b08319?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
    }
  }
];
const coreValues = [
  {
    icon: '<svg class="value-icon" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" fill="none" stroke-width="2"/><circle cx="9" cy="7" r="4" stroke="currentColor" fill="none" stroke-width="2"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" fill="none" stroke-width="2"/></svg>',
    title: "Collaboration",
    description: "We believe in the power of community and collaboration. This site is a student-driven initiative, and we encourage everyone to contribute and benefit from the shared knowledge. If you have materials to share or ideas for improvement, we invite you to get involved."
  },
  {
    icon: '<svg class="value-icon" viewBox="0 0 24 24"><circle cx="12" cy="8" r="7" stroke="currentColor" fill="none" stroke-width="2"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" stroke="currentColor" fill="none" stroke-width="2"/></svg>',
    title: "Academic Excellence",
    description: "Our platform fosters collaborative learning by enabling students to share notes, study guides, and other valuable resources. This encourages active engagement with course material and empowers students to take ownership of their learning. By providing diverse resources and a supportive community."
  },
  {
    icon: '<svg class="value-icon" viewBox="0 0 24 24"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" stroke="currentColor" fill="none" stroke-width="2"/></svg>',
    title: "Open Access",
    description: "We believe in the power of collective knowledge. Our platform champions open access to educational resources, encouraging students to freely share their insights and learn from each other. This collaborative approach enhances the learning experience for everyone."
  }
];

// Animations
function initializeAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

// Team Section
function renderTeamSection() {
  const teamContainer = document.getElementById('team-container');
  
  teamMembers.forEach(member => {
    const memberCard = document.createElement('div');
    memberCard.className = 'team-card animate-on-scroll';
    
    memberCard.innerHTML = `
      <div class="team-image-container">
        <img src="${member.image}" alt="${member.name}">
      </div>
      <div class="team-info">
        <h3 class="team-name">${member.name}</h3>
        <p class="team-role">${member.role}</p>
        <div class="social-links">
          <a href="${member.social.instagram}" target="_blank" rel="noopener noreferrer" class="social-link">
            <svg class="social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
          </a>
          <a href="${member.social.facebook}" target="_blank" rel="noopener noreferrer" class="social-link">
            <svg class="social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </a>
          <a href="${member.social.linkedin}" target="_blank" rel="noopener noreferrer" class="social-link">
          <svg fill="#000000" width="24px" height="24px" viewBox="0 0 0.72 0.72" xmlns="http://www.w3.org/2000/svg"><g id="LinkedIn"><g><path d="M0.553 0.092H0.167a0.075 0.075 0 0 0 -0.075 0.075v0.386a0.075 0.075 0 0 0 0.075 0.075h0.386a0.075 0.075 0 0 0 0.075 -0.075V0.167a0.075 0.075 0 0 0 -0.075 -0.075m0.045 0.461a0.045 0.045 0 0 1 -0.045 0.045H0.167a0.045 0.045 0 0 1 -0.045 -0.045V0.167a0.045 0.045 0 0 1 0.045 -0.045h0.386a0.045 0.045 0 0 1 0.045 0.045Z"/><g><path d="M0.191 0.322a0.03 0.03 0 1 1 0.06 0v0.195a0.03 0.03 0 0 1 -0.06 0Z"/><path cx="7.376" cy="6.744" r="1" d="M0.251 0.202A0.03 0.03 0 0 1 0.221 0.232A0.03 0.03 0 0 1 0.191 0.202A0.03 0.03 0 0 1 0.251 0.202z"/><path d="M0.529 0.401v0.116a0.03 0.03 0 1 1 -0.06 0v-0.116a0.048 0.048 0 1 0 -0.097 0v0.116a0.03 0.03 0 0 1 -0.06 0v-0.195a0.03 0.03 0 0 1 0.03 -0.03 0.028 0.028 0 0 1 0.025 0.014 0.108 0.108 0 0 1 0.162 0.095"/></g></g></g></svg>
          </a>
        </div>
      </div>
    `;
    
    teamContainer.appendChild(memberCard);
  });
}
// Values Section
function renderValueSection() {
  const valuesContainer = document.getElementById('values-container');
  
  coreValues.forEach(value => {
    const valueCard = document.createElement('div');
    valueCard.className = 'value-card animate-on-scroll';
    
    valueCard.innerHTML = `
      ${value.icon}
      <h3 class="value-title">${value.title}</h3>
      <p class="value-description">${value.description}</p>
    `;
    
    valuesContainer.appendChild(valueCard);
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  renderTeamSection();
  renderValueSection();
  initializeAnimations();
});

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
        
// Initialize all modules when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
});
