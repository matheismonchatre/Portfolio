// ==================== VARIABLES GLOBALES ====================
let currentLang = 'fr';
let currentModalProject = null;
let typingTimeout = null;

// ==================== THREE.JS BACKGROUND ====================
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('threejs-canvas'),
    alpha: true,
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
camera.position.z = 5;

// Particules
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 2000;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.015,
    color: 0x4fc3f7,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Formes géométriques qui changent selon la section
let currentShape = null;
const shapes = {
    presentation: createTorus(),
    competences: createIcosahedron(),
    experience: createOctahedron(),
    realisations: createDodecahedron(),
    contact: createSphere()
};

function createTorus() {
    const geometry = new THREE.TorusGeometry(1.5, 0.4, 16, 100);
    const material = new THREE.MeshStandardMaterial({
        color: 0x4fc3f7,
        wireframe: true,
        transparent: true,
        opacity: 0.5
    });
    return new THREE.Mesh(geometry, material);
}

function createIcosahedron() {
    const geometry = new THREE.IcosahedronGeometry(1.5, 0);
    const material = new THREE.MeshStandardMaterial({
        color: 0x4fc3f7,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    return new THREE.Mesh(geometry, material);
}

function createOctahedron() {
    const geometry = new THREE.OctahedronGeometry(1.5, 0);
    const material = new THREE.MeshStandardMaterial({
        color: 0x4fc3f7,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    return new THREE.Mesh(geometry, material);
}

function createDodecahedron() {
    const geometry = new THREE.DodecahedronGeometry(1.5, 0);
    const material = new THREE.MeshStandardMaterial({
        color: 0x4fc3f7,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    return new THREE.Mesh(geometry, material);
}

function createSphere() {
    const geometry = new THREE.SphereGeometry(1.5, 32, 32);
    const material = new THREE.MeshStandardMaterial({
        color: 0x4fc3f7,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    return new THREE.Mesh(geometry, material);
}

// Ajouter la forme initiale
currentShape = shapes.presentation;
scene.add(currentShape);

// Lumières
const pointLight = new THREE.PointLight(0x4fc3f7, 2);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

// Mouse movement
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
});

// Observer pour changer la forme 3D selon la section
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            if (shapes[sectionId]) {
                morphToShape(shapes[sectionId]);
            }
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('section').forEach(section => {
        sectionObserver.observe(section);
    });
});

function morphToShape(newShape) {
    if (currentShape) {
        let opacity = 0.3;
        const fadeOut = setInterval(() => {
            opacity -= 0.05;
            currentShape.material.opacity = opacity;
            if (opacity <= 0) {
                clearInterval(fadeOut);
                scene.remove(currentShape);

                currentShape = newShape;
                currentShape.material.opacity = 0;
                scene.add(currentShape);

                const fadeIn = setInterval(() => {
                    currentShape.material.opacity += 0.05;
                    if (currentShape.material.opacity >= 0.3) {
                        clearInterval(fadeIn);
                    }
                }, 30);
            }
        }, 30);
    }
}

// Animation
function animate() {
    requestAnimationFrame(animate);

    if (currentShape) {
        currentShape.rotation.x += 0.005;
        currentShape.rotation.y += 0.005;
    }

    particlesMesh.rotation.y += 0.001;
    particlesMesh.rotation.x = mouseY * 0.1;
    particlesMesh.rotation.y = mouseX * 0.1;

    camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
    camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05;

    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ==================== INITIALISATION ====================
document.addEventListener('DOMContentLoaded', () => {
    generateNavigation();
    generatePresentation();
    generateSkills();
    generateExperiences();
    generateProjects();
    generateContact();

    initializeNavigation();
    initializeTypingEffect();
    initializeSkillsAnimation();
    initializeScrollEffects();
    initializeTheme();
    initializeLanguage();
    initializeModals();
    initializeRaindrops();
});

// ==================== GÉNÉRATION NAVIGATION ====================
function generateNavigation() {
    const nav = document.getElementById('mainNav');
    const navItems = portfolioData.navigation[currentLang];

    nav.innerHTML = `
        <div class="logo">Portfolio</div>

        <div class="menu-toggle" id="menuToggle" aria-label="Toggle menu">
            <i class="bi bi-list" id="menuIcon"></i>
        </div>

        <ul id="menu">
            ${navItems.map(item => {
        if (item.dropdown) {
            return `
                        <li class="dropdown">
                            <a href="${item.href}" class="dropdown-toggle">${item.text} <i class="bi bi-chevron-down dropdown-arrow"></i></a>
                            <ul class="dropdown-content">
                                ${item.dropdown.map(sub => `<li><a href="${sub.href}">${sub.text}</a></li>`).join('')}
                            </ul>
                        </li>
                    `;
        } else {
            return `<li><a href="${item.href}">${item.text}</a></li>`;
        }
    }).join('')}
        </ul>

        <div class="nav-controls">
            <button id="themeToggle" class="theme-toggle" aria-label="Toggle theme">
                <i id="themeIcon" class="bi bi-moon-fill"></i>
            </button>
            <button class="lang-switch" id="langBtn">EN</button>
        </div>
    `;
}

// ==================== GÉNÉRATION PRÉSENTATION ====================
function generatePresentation() {
    const section = document.getElementById('presentation');
    const profile = portfolioData.profile;

    section.innerHTML = `
        <div class="hero-content">
            <div class="profile-image-container">
                <img src="${profile.image}" alt="Photo de profil ${profile.name}" onerror="this.src='https://via.placeholder.com/200/1a1a1a/4fc3f7?text=MM'">
                <div class="profile-ring"></div>
            </div>
            
            <h1>
                <span data-fr="Bonjour, je suis" data-en="Hello, I'm">${currentLang === 'fr' ? 'Bonjour, je suis' : "Hello, I'm"}</span>
                <strong class="gradient-text">${profile.name}</strong>
            </h1>
            
            <div class="typing-container">
                <span class="typing-text">${profile.title[currentLang]}</span>
                <span class="cursor-blink">|</span>
            </div>

            <div class="hero-description">
                ${profile.description[currentLang].map(p => `<p>${p}</p>`).join('')}
            </div>

            <div class="cta-buttons">
                <a href="#contact" class="btn btn-primary">
                    <span data-fr="Me contacter" data-en="Contact me">${currentLang === 'fr' ? 'Me contacter' : 'Contact me'}</span>
                    <i class="bi bi-arrow-right"></i>
                </a>
                <a href="#realisations" class="btn btn-secondary">
                    <span data-fr="Mes projets" data-en="My projects">${currentLang === 'fr' ? 'Mes projets' : 'My projects'}</span>
                </a>
            </div>
        </div>

        <div class="scroll-indicator">
            <i class="bi bi-chevron-down"></i>
        </div>
    `;
}

// ==================== GÉNÉRATION COMPÉTENCES ====================
function generateSkills() {
    const section = document.getElementById('competences');
    const skills = portfolioData.skills;

    section.innerHTML = `
        <div class="section-header">
            <h2 data-fr="Compétences" data-en="Skills">${currentLang === 'fr' ? 'Compétences' : 'Skills'}</h2>
            <p data-fr="Technologies et outils que je maîtrise" data-en="Technologies and tools I master">
                ${currentLang === 'fr' ? 'Technologies et outils que je maîtrise' : 'Technologies and tools I master'}
            </p>
        </div>

        <div class="competence-grid">
            ${skills.map((category, index) => `
                <div class="categorie" data-aos="fade-up" data-aos-delay="${index * 100}">
                    <div class="categorie-icon">
                        <i class="bi ${category.icon}"></i>
                    </div>
                    <h3>${category.title[currentLang]}</h3>
                    ${category.items.map(skill => {
        const skillName = typeof skill.name === 'object' ? skill.name[currentLang] : skill.name;
        return `
                            <div class="competence">
                                <div class="competence-header">
                                    <span>${skillName}</span>
                                    <span class="competence-percent">${skill.level}%</span>
                                </div>
                                <div class="barre">
                                    <div class="niveau" data-niveau="${skill.level}%"></div>
                                </div>
                            </div>
                        `;
    }).join('')}
                </div>
            `).join('')}
        </div>
    `;
}

// ==================== GÉNÉRATION EXPÉRIENCES ====================
function generateExperiences() {
    const section = document.getElementById('experience');
    const experiences = portfolioData.experiences;

    section.innerHTML = `
        <div class="section-header">
            <h2 data-fr="Expérience" data-en="Experience">${currentLang === 'fr' ? 'Expérience' : 'Experience'}</h2>
            <p data-fr="Mon parcours professionnel" data-en="My professional journey">
                ${currentLang === 'fr' ? 'Mon parcours professionnel' : 'My professional journey'}
            </p>
        </div>

        <div class="timeline">
            ${experiences.map((exp, index) => `
                <div class="timeline-item experience-slide" data-delay="${index * 150}">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <span class="date">${exp.year}</span>
                        <h3>${exp.company}</h3>
                        <p class="timeline-role">${exp.role[currentLang]}</p>
                        <p>${exp.description[currentLang]}</p>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    // Initialiser l'animation des expériences
    initializeExperienceAnimation();
}

// ==================== ANIMATION EXPÉRIENCES ====================
function initializeExperienceAnimation() {
    const experienceItems = document.querySelectorAll('.experience-slide');

    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const experienceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.delay) || 0;
                setTimeout(() => {
                    entry.target.classList.add('slide-in-visible');
                }, delay);
                experienceObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    experienceItems.forEach(item => {
        experienceObserver.observe(item);
    });
}

// ==================== GÉNÉRATION PROJETS ====================
function generateProjects() {
    const section = document.getElementById('realisations');

    section.innerHTML = `
        <div class="section-header">
            <h2 data-fr="Réalisations" data-en="Projects">${currentLang === 'fr' ? 'Réalisations' : 'Projects'}</h2>
            <p data-fr="Découvrez mes derniers projets" data-en="Discover my latest projects">
                ${currentLang === 'fr' ? 'Découvrez mes derniers projets' : 'Discover my latest projects'}
            </p>
        </div>

        <!-- Dev Web -->
        <h3 id="realisations-dev" class="subsection-title">Dev Web</h3>
        <div class="realisations-grid">
            ${generateProjectCards('dev')}
        </div>

        <!-- Design -->
        <h3 id="realisations-design" class="subsection-title">Design</h3>
        <div class="realisations-grid">
            ${generateProjectCards('design')}
        </div>

        <!-- Animation -->
        <h3 id="realisations-animation" class="subsection-title">Animation</h3>
        <div class="realisations-grid">
            ${generateProjectCards('animation')}
        </div>
    `;

    initializeProjectButtons();
}

function generateProjectCards(category) {
    const projects = portfolioData.projects[category];

    return projects.map(project => {
        const title = typeof project.title === 'object' ? project.title[currentLang] : project.title;
        const description = project.shortDescription[currentLang];

        let mediaHtml = '';
        if (project.video) {
            mediaHtml = `<video autoplay loop muted playsinline><source src="${project.video}" type="video/mp4"></video>`;
        } else if (project.videos && project.videos.length > 0) {
            mediaHtml = `<video autoplay loop muted playsinline><source src="${project.videos[0]}" type="video/mp4"></video>`;
        } else {
            const imgSrc = project.thumbnail || (project.images && project.images[0]) || 'https://via.placeholder.com/400x300/1a1a1a/4fc3f7?text=Project';
            mediaHtml = `<img src="${imgSrc}" alt="${title}" onerror="this.src='https://via.placeholder.com/400x300/1a1a1a/4fc3f7?text=Project'">`;
        }

        return `
            <div class="project-card" data-project-id="${project.id}" data-category="${category}">
                <div class="project-thumbnail">
                    ${mediaHtml}
                    <div class="project-overlay">
                        <p style="color: white;" data-fr="Cliquez pour en savoir plus" data-en="Click to learn more">
                            ${currentLang === 'fr' ? 'Cliquez pour en savoir plus' : 'Click to learn more'}
                        </p>
                    </div>
                </div>
                <div class="project-info">
                    <h3>${title}</h3>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <p>${description}</p>
                </div>
            </div>
        `;
    }).join('');
}

function initializeProjectButtons() {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.dataset.projectId;
            const category = card.dataset.category;
            const project = portfolioData.projects[category].find(p => p.id === projectId);
            if (project) {
                openProjectModal(project);
            }
        });
    });
}

// ==================== GÉNÉRATION CONTACT ====================
function generateContact() {
    const section = document.getElementById('contact');
    const profile = portfolioData.profile;

    section.innerHTML = `
        <div class="section-header">
            <h2 data-fr="Contact" data-en="Contact">${currentLang === 'fr' ? 'Contact' : 'Contact'}</h2>
            <p data-fr="N'hésitez pas à me contacter" data-en="Feel free to contact me">
                ${currentLang === 'fr' ? "N'hésitez pas à me contacter" : 'Feel free to contact me'}
            </p>
        </div>

        <div class="contact-info">
            <p data-fr="Vous avez un projet en tête ? Travaillons ensemble !" data-en="Do you have a project in mind? Let's work together!">
                ${currentLang === 'fr' ? 'Vous avez un projet en tête ? Travaillons ensemble !' : "Do you have a project in mind? Let's work together!"}
            </p>
            <div class="contact-links">
                <a href="${profile.github}" target="_blank" rel="noopener" class="contact-link">
                    <i class="bi bi-github"></i>
                    <span>GitHub</span>
                </a>
                <a href="${profile.linkedin}" target="_blank" rel="noopener" class="contact-link">
                    <i class="bi bi-linkedin"></i>
                    <span>LinkedIn</span>
                </a>
                <a href="mailto:${profile.email}" class="contact-link">
                    <i class="bi bi-envelope-fill"></i>
                    <span>Email</span>
                </a>
            </div>
        </div>
    `;
}

// ==================== MODALS ====================
function initializeModals() {
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.getElementById('projectModal');

    modalClose.addEventListener('click', closeProjectModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeProjectModal();
        }
    });
}

function openProjectModal(project) {
    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalContent');

    const title = typeof project.title === 'object' ? project.title[currentLang] : project.title;
    const fullDesc = project.fullDescription[currentLang];
    const features = project.features ? project.features[currentLang] : [];
    const challenges = project.challenges ? project.challenges[currentLang] : null;

    let mediaHtml = '';
    if (project.video) {
        mediaHtml = `
            <div class="modal-media">
                <video class="modal-video" controls autoplay muted loop>
                    <source src="${project.video}" type="video/mp4">
                </video>
            </div>
        `;
    } else if (project.videos && project.videos.length > 1) {
        mediaHtml = `
            <div class="modal-slider">
                <div class="slides">
                    ${project.videos.map(vid => `
                        <video controls muted loop>
                            <source src="${vid}" type="video/mp4">
                        </video>
                    `).join('')}
                </div>
                <button class="slider-btn prev"><i class="bi bi-chevron-left"></i></button>
                <button class="slider-btn next"><i class="bi bi-chevron-right"></i></button>
            </div>
        `;
    } else if (project.videos && project.videos.length === 1) {
        mediaHtml = `
            <div class="modal-media">
                <video class="modal-video" controls autoplay muted loop>
                    <source src="${project.videos[0]}" type="video/mp4">
                </video>
            </div>
        `;
    } else if (project.images && project.images.length > 1) {
        mediaHtml = `
            <div class="modal-slider">
                <div class="slides">
                    ${project.images.map(img => `<img src="${img}" alt="${title}" onerror="this.src='https://via.placeholder.com/800x600/1a1a1a/4fc3f7?text=Image'">`).join('')}
                </div>
                <button class="slider-btn prev"><i class="bi bi-chevron-left"></i></button>
                <button class="slider-btn next"><i class="bi bi-chevron-right"></i></button>
            </div>
        `;
    } else if (project.images) {
        mediaHtml = `<div class="modal-media"><img src="${project.images[0]}" alt="${title}" onerror="this.src='https://via.placeholder.com/800x600/1a1a1a/4fc3f7?text=Image'"></div>`;
    } else if (project.thumbnail) {
        mediaHtml = `<div class="modal-media"><img src="${project.thumbnail}" alt="${title}" onerror="this.src='https://via.placeholder.com/800x600/1a1a1a/4fc3f7?text=Image'"></div>`;
    }

    modalContent.innerHTML = `
        <div class="modal-header">
            <h2>${title}</h2>
        </div>
        
        ${mediaHtml}
        
        <div class="modal-body">
            <div class="modal-section">
                <h3>${currentLang === 'fr' ? 'Description' : 'Description'}</h3>
                <p>${fullDesc}</p>
            </div>
            
            ${project.technologies ? `
                <div class="modal-section">
                    <h3>${currentLang === 'fr' ? 'Technologies' : 'Technologies'}</h3>
                    <div class="tech-list">
                        ${project.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                    </div>
                </div>
            ` : ''}
            
            ${features.length > 0 ? `
                <div class="modal-section">
                    <h3>${currentLang === 'fr' ? 'Fonctionnalités' : 'Features'}</h3>
                    <ul class="features-list">
                        ${features.map(feature => `<li><i class="bi bi-check-circle-fill"></i> ${feature}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
            
            ${challenges ? `
                <div class="modal-section">
                    <h3>${currentLang === 'fr' ? 'Défis relevés' : 'Challenges'}</h3>
                    <p class="challenges-text">${challenges}</p>
                </div>
            ` : ''}
            
            ${project.link || project.github ? `
                <div class="modal-actions">
                    ${project.link && project.link !== '#' ? `
                        <a href="${project.link}" class="btn btn-primary" target="_blank" rel="noopener">
                            <i class="bi bi-box-arrow-up-right"></i>
                            <span>${currentLang === 'fr' ? 'Voir le projet' : 'View project'}</span>
                        </a>
                    ` : ''}
                    ${project.github && project.github !== '#' ? `
                        <a href="${project.github}" class="btn btn-secondary" target="_blank" rel="noopener">
                            <i class="bi bi-github"></i>
                            <span>${currentLang === 'fr' ? 'Voir sur GitHub' : 'View on GitHub'}</span>
                        </a>
                    ` : ''}
                </div>
            ` : ''}
        </div>
    `;

    const modalSlider = modalContent.querySelector('.modal-slider');
    if (modalSlider) {
        let index = 0;
        const slides = modalSlider.querySelector('.slides');
        const items = slides.querySelectorAll('img, video');
        const total = items.length;

        function showSlide(i) {
            index = (i + total) % total;
            slides.style.transform = `translateX(-${index * 100}%)`;
        }

        const prevBtn = modalSlider.querySelector('.prev');
        const nextBtn = modalSlider.querySelector('.next');

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                showSlide(index - 1);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                showSlide(index + 1);
            });
        }
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// ==================== NAVIGATION ====================
function initializeNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const menuIcon = document.getElementById('menuIcon');
    const menu = document.getElementById('menu');

    if (menuToggle) {
        const toggleMenu = () => {
            menu.classList.toggle('active');
            if (menu.classList.contains('active')) {
                menuIcon.className = 'bi bi-x-lg';
            } else {
                menuIcon.className = 'bi bi-list';
            }
        };

        // Supprimer ancien listener et ajouter le nouveau
        const newMenuToggle = menuToggle.cloneNode(true);
        menuToggle.parentNode.replaceChild(newMenuToggle, menuToggle);

        const newMenuIcon = document.getElementById('menuIcon');
        newMenuToggle.addEventListener('click', toggleMenu);

        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                newMenuIcon.className = 'bi bi-list';
            });
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        const newAnchor = anchor.cloneNode(true);
        anchor.parentNode.replaceChild(newAnchor, anchor);

        newAnchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const targetId = href.replace('#realisations-', '');
                let target = document.querySelector(href);

                // Si c'est un lien vers une sous-section de réalisations
                if (!target && href.includes('realisations-')) {
                    target = document.querySelector('#realisations');
                }

                if (target) {
                    const navHeight = document.querySelector('nav').offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Fermer le menu si ouvert
                    const menu = document.getElementById('menu');
                    const menuIcon = document.getElementById('menuIcon');
                    if (menu && menu.classList.contains('active')) {
                        menu.classList.remove('active');
                        if (menuIcon) menuIcon.className = 'bi bi-list';
                    }
                }
            }
        });
    });
}

// ==================== EFFETS AU SCROLL ====================
function initializeScrollEffects() {
    const scrollTopBtn = document.getElementById('scrollTop');
    const nav = document.querySelector('nav');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        scrollTopBtn.style.display = scrollY > 300 ? 'block' : 'none';

        if (scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(sec => sectionObserver.observe(sec));
}

// ==================== ANIMATION COMPÉTENCES ====================
function initializeSkillsAnimation() {
    const observerOptions = {
        threshold: 0.5
    };

    const skillsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skills = entry.target.querySelectorAll('.competence');

                skills.forEach((skill, index) => {
                    setTimeout(() => {
                        const niveau = skill.querySelector('.niveau');
                        if (!niveau) return;

                        const targetWidth = niveau.dataset.niveau;
                        niveau.style.width = targetWidth;
                    }, index * 100);
                });

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const competencesSection = document.getElementById('competences');
    if (competencesSection) {
        skillsObserver.observe(competencesSection);
    }
}

// ==================== ANIMATION GOUTTES ====================
function initializeRaindrops() {
    const container = document.querySelector('.raindrop-impacts');

    function createDrop() {
        const drop = document.createElement('div');
        drop.classList.add('drop');

        drop.style.left = Math.random() * 100 + '%';
        drop.style.top = Math.random() * 100 + '%';

        const size = Math.random() * 40 + 20;
        drop.style.width = size + 'px';
        drop.style.height = size + 'px';

        const duration = (Math.random() * 1.5 + 1.5).toFixed(2);
        drop.style.animationDuration = duration + 's';

        container.appendChild(drop);

        setTimeout(() => {
            drop.remove();
        }, duration * 1000);
    }

    setInterval(createDrop, 400);
}

// ==================== THÈME ====================
function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeIcon.className = 'bi bi-sun-fill';
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');

        themeIcon.className = isLight ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
        localStorage.setItem('theme', isLight ? 'light' : 'dark');

        const color = isLight ? 0x2196f3 : 0x4fc3f7;
        particlesMaterial.color.setHex(color);
        if (currentShape) {
            currentShape.material.color.setHex(color);
        }
        pointLight.color.setHex(color);
    });
}

// ==================== LANGUE ====================
function initializeLanguage() {
    const langBtn = document.getElementById('langBtn');

    const changeLanguage = () => {
        currentLang = currentLang === 'fr' ? 'en' : 'fr';
        langBtn.textContent = currentLang === 'fr' ? 'EN' : 'FR';

        generateNavigation();
        generatePresentation();
        generateSkills();
        generateExperiences();
        generateProjects();
        generateContact();

        // Réinitialiser les event listeners
        initializeLanguage();
        initializeNavigation();
        initializeSkillsAnimation();
        initializeTheme();

        if (window.restartTyping) {
            window.restartTyping();
        }
    };

    // Supprimer les anciens listeners et en ajouter un nouveau
    const newLangBtn = langBtn.cloneNode(true);
    langBtn.parentNode.replaceChild(newLangBtn, langBtn);
    newLangBtn.addEventListener('click', changeLanguage);
}

// ==================== EFFET TYPING ====================
function initializeTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;

    const texts = {
        fr: ['Développeur Web', 'Designer UI/UX', 'Créateur 3D', 'Passionné de Code'],
        en: ['Web Developer', 'UI/UX Designer', '3D Creator', 'Code Enthusiast']
    };

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingInterval;

    function typeEffect() {
        const currentTexts = texts[currentLang];
        const currentText = currentTexts[textIndex];

        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentText.length) {
            setTimeout(() => isDeleting = true, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % currentTexts.length;
        }

        const typingSpeed = isDeleting ? 50 : 100;
        typingInterval = setTimeout(typeEffect, typingSpeed);
    }

    window.restartTyping = function () {
        clearTimeout(typingInterval);
        textIndex = 0;
        charIndex = 0;
        isDeleting = false;
        typeEffect();
    };

    setTimeout(typeEffect, 1000);
}
