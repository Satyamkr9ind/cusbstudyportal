:root {
  --primary-color: #2563eb;
  --primary-dark: #1d4ed8;
  --background: #f8fafc;
  --card-bg: #ffffff;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --border: #e2e8f0;
  --hover-bg: #f1f5f9;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}


.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-text-size-adjust: 100%;
}

html, body {
  width: 100%;
  overflow-x: hidden;
  font-size: 16px;
}

body {
  font-family: system-ui, -apple-system, sans-serif;
  color: var(--text-color);
  line-height: 1.6;
  background-color: var(--bg-color);
}

main1 {
  width: 100%;
  overflow: hidden;
}

.container1 {
  width: 100%;
  max-width: var(--max-width);
  padding: 0 var(--container-padding);
  margin: 0 auto;
}

/* Typography */
h1, h2, h3, h4, h5, h6 {
  line-height: 1.2;
  margin-bottom: 1rem;
}
  /* Hero Section */
  .hero {
    margin-top: 60px;
    width: 100%;
    padding: 4rem 1rem;
    background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
      url('DSC01508.jpg');
    background-size: cover;
    background-position: center;
    color: white;
    text-align: center;
  }
  
  .hero h1 {
    font-size: clamp(1.5rem, 5vw, 3rem);
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
  
  .hero h2 {
    font-size: clamp(1.2rem, 4vw, 2rem);
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
  
  /* Features Section */
  .features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    padding: 2rem var(--container-padding);
    width: 100%;
    max-width: var(--max-width);
    margin: 0 auto;
  }
  
  .feature-card {
    background: #f8fafc;
    padding: 2rem;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    transition: transform 0.3s ease;
  }
  
  .feature-card:hover {
    transform: translateY(-5px);
  }
  
  .feature-card h3 {
    color: var(--primary-color);
    margin-bottom: 1.5rem;
  }
  
  .feature-card p {
    font-size: 1rem;
    line-height: 1.6;
  }
  
  /* Slideshow Container */
  .slideshow-container {
    width: 100%;
    max-width: 800px;
    margin: 2rem auto;
    padding: 2rem var(--container-padding);
    background: #f8fafc;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
  }
  
  .contributor-slide {
    text-align: center;
    padding: 1rem;
  }
  
  /* Feedback Section */
  .feedback-section {
    width: 100%;
    max-width: 800px;
    margin: 2rem auto;
    padding: 20px;
    background: #f8fafc;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
  }
  
  .feedback-form {
    display: grid;
    gap: 1.5rem;
    width: 100%;
  }
  
  .feedback-form input,
  .feedback-form select,
  .feedback-form textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: var(--border-radius);
    font-size: 1rem;
  }
  
  .feedback-form button {
    background: var(--primary-color);
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: var(--border-radius);
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;
  }
  
  .feedback-form button:hover {
    background-color: #4338ca;
  }
  

/*-------------news marquee--------*/
.no-underline{
  text-decoration: none;
  color: blue;
}
.container2 { 
position: relative; 
border:1px solid #777;  
background: linear-gradient(110deg, #fdcd3b 60%, #ffed4b 60%);
font-family:'Oswald',serif;
} 

.container2, .container2 .headertext { 
padding: 7px; 
background-color: #fff; 
color: #626060; 
font-weight: bold; 
} 

.container2 .headertext { 
position: absolute; 
top: 0; 
left: 0; 
z-index: 10; 
padding: 10px 10px;
border-right:1px solid #777;  
background:#C8102E;
color:#fff ;
text-shadow: 1px 1px #111;
} 

.container2 marquee { 
line-height: 1.5; 
} 

.container2 marquee p { 
margin: 0; 

} 

/*--------------------end-----------*/

/* Navigation Styles */
.web-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: var(--card-bg);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  z-index: 100;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-links a {
  color: var(--text-primary);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: background-color 0.2s;
}

.nav-links a:hover {
  background: var(--hover-bg);
}

.account-dropdown {
  position: relative;
}

#account-list {
  position: absolute;
  top: 100%;
  right: 0;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin-top: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  display: none;
}

#account-list li {
  list-style: none;
}

#account-list a {
  display: block;
  padding: 0.5rem 1rem;
  color: var(--text-primary);
  text-decoration: none;
  white-space: nowrap;
}

#account-list a:hover {
  background: var(--hover-bg);
}

/* Main Content Styles */
  /* Footer */
  .footer {
    width: 100%;
    background: #f3f4f6;
    padding: 3rem var(--container-padding);
    margin-top: 4rem;
  }
  
  .footer-content1 {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    max-width: var(--max-width);
    margin: 0 auto;
  }
  
  .footer-section1 h3 {
    color: var(--text-color);
    margin-bottom: 1.5rem;
  }
  
  .footer-links {
    list-style: none;
  }
  
  .footer-links li {
    margin-bottom: 0.75rem;
  }
  
  .footer-links a {
    color: var(--text-color);
    text-decoration: none;
    transition: color 0.3s ease;
  }
  
  .footer-links a:hover {
    color: var(--primary-color);
  }
  .social-links {
  display: flex;
  justify-content: center; /* Center the social icons */
  align-items: center;
  gap: 1.5rem;
  margin: 1rem auto; /* Add margin top and bottom, auto for left/right */
}

.social-links a {
  display: flex;
  align-items: center;
  justify-content: center;
}

.social-links img {
  width: 28px;
  height: 28px;
  transition: transform 0.3s ease;
}

.social-links img:hover {
  transform: scale(1.2);
}

  .copyright {
    text-align: center;
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid #e5e7eb;
  }
  

/* Mobile Menu Styles */
#menu {
  display: none;
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
  
  #menu {
    display: block;
  }
  
  .menu-content {
    position: fixed;
    top: 4rem;
    left: 0;
    right: 0;
    background: var(--card-bg);
    padding: 1rem;
    border-top: 1px solid var(--border);
    display: none;
    z-index: 99;
  }
  
  .menu-content a {
    display: block;
    padding: 0.75rem 1rem;
    color: var(--text-primary);
    text-decoration: none;
    border-radius: 0.375rem;
  }
  
  .menu-content a:hover {
    background: var(--hover-bg);
  }
}

   
