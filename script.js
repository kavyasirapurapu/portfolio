// Initialize Lucide Icons
lucide.createIcons();

// Navbar scroll effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Active link highlighting
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80, // Adjust for navbar height
                behavior: 'smooth'
            });
        }
    });
});

// Contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Simple visual feedback
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = 'Sending... <i data-lucide="loader"></i>';
        lucide.createIcons();
        btn.style.opacity = '0.7';
        btn.disabled = true;
        
        try {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, message })
            });

            const result = await response.json();

            if (response.ok) {
                btn.innerHTML = 'Message Sent! <i data-lucide="check"></i>';
                btn.style.background = '#10b981';
                contactForm.reset();
            } else {
                btn.innerHTML = 'Failed <i data-lucide="x"></i>';
                btn.style.background = '#ef4444';
                console.error(result.error);
            }
        } catch (error) {
            btn.innerHTML = 'Error <i data-lucide="alert-circle"></i>';
            btn.style.background = '#ef4444';
            console.error('Error:', error);
        } finally {
            lucide.createIcons();
            btn.style.opacity = '1';
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.disabled = false;
                lucide.createIcons();
            }, 3000);
        }
    });
}

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinksContainer = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinksContainer.classList.contains('active')) {
            icon.setAttribute('data-lucide', 'x');
        } else {
            icon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons();
    });
}

// Close mobile menu when a link is clicked
const navLinksArray = document.querySelectorAll('.nav-links a');
navLinksArray.forEach(link => {
    link.addEventListener('click', () => {
        if (navLinksContainer.classList.contains('active')) {
            navLinksContainer.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        }
    });
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
};

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => revealObserver.observe(el));

// Load Projects from Database
const projectsGrid = document.getElementById('projectsGrid');
if (projectsGrid) {
    const loadProjects = async () => {
        try {
            const response = await fetch('/api/projects');
            const projects = await response.json();
            
            if (response.ok) {
                projectsGrid.innerHTML = ''; // Clear loading text
                
                projects.forEach(project => {
                    const tagsHTML = project.tags.map(tag => `<span>${tag}</span>`).join('');
                    
                    const mediaHTML = project.video ? 
                        `<video src="${project.video}" autoplay loop muted playsinline class="project-media"></video>` : 
                        `<div class="project-image" style="background: linear-gradient(135deg, ${project.color1 || '#8b5cf6'}, ${project.color2 || '#3b82f6'});">
                            <i data-lucide="${project.icon || 'folder'}" class="project-placeholder-icon"></i>
                        </div>`;
                        
                    const projectHTML = `
                        <div class="project-card glass-card">
                            ${mediaHTML}
                            <div class="project-info">
                                <h3>${project.title}</h3>
                                <p>${project.description}</p>
                                <div class="project-tags">
                                    ${tagsHTML}
                                </div>
                                <div class="project-links">
                                    <a href="${project.liveLink || '#'}" target="_blank" rel="noopener noreferrer" class="project-link">Live Demo</a>
                                    <a href="${project.codeLink || '#'}" target="_blank" rel="noopener noreferrer" class="project-link">Code</a>
                                </div>
                            </div>
                        </div>
                    `;
                    projectsGrid.innerHTML += projectHTML;
                });
                
                // Re-initialize icons for newly added elements
                lucide.createIcons();
            }
        } catch (error) {
            console.error('Failed to load projects:', error);
            projectsGrid.innerHTML = '<p class="text-center w-full" style="grid-column: 1 / -1; color: #ef4444;">Failed to load projects from database.</p>';
        }
    };
    
    document.addEventListener('DOMContentLoaded', loadProjects);
}
