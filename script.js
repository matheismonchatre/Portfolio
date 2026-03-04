// ==================== VARIABLES GLOBALES ====================
let currentLang = 'fr';
let currentModalProject = null;
let typingTimeout = null;
let projectViewMode = 'grid'; // 'grid' ou 'accordion'
const projectFilters = {
    query: '',
    categories: new Set(),
    tags: new Set(),
    techs: new Set()
};
// Référence globale vers la fonction renderFilteredResults (définie dans generateProjects)
let renderFilteredResults = null;

// ==================== ARRIÈRE-PLAN THREE.JS ====================
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

// Mouvement de la souris
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
function generateDiplomas() {
    const section = document.getElementById('diplomes');
    if (!section || !portfolioData.diplomas) return;

    section.innerHTML = `
        <div class="section-header">
            <h2>${currentLang === 'fr' ? 'Diplômes' : 'Diplomas'}</h2>
            <p>${currentLang === 'fr' ? "Parcours académique et formations" : 'Academic background and trainings'}</p>
        </div>

        <div class="timeline">
            ${portfolioData.diplomas.map((d, index) => `
                <div class="timeline-item experience-slide" data-delay="${index * 150}">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <span class="date">${d.year}</span>
                        <h3>${typeof d.title === 'object' ? d.title[currentLang] : d.title}</h3>
                        <p class="timeline-role">${d.institution}</p>
                        <p>${d.description[currentLang]}</p>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    // Initialiser l'animation des diplômes
    initializeExperienceAnimation();
}

// Génération des cartes de projets (déplacée pour disponibilité lors de l'initialisation)
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

// Génération des éléments accordéon pour les projets
function generateAccordionItemHTML(project, category) {
    const title = typeof project.title === 'object' ? project.title[currentLang] : project.title;
    const description = project.shortDescription ? project.shortDescription[currentLang] : '';

    let mediaHtml = '';
    if (project.video) {
        mediaHtml = `<video autoplay loop muted playsinline style="max-width: 100%; height: auto;"><source src="${project.video}" type="video/mp4"></video>`;
    } else if (project.videos && project.videos.length > 0) {
        mediaHtml = `<video autoplay loop muted playsinline style="max-width: 100%; height: auto;"><source src="${project.videos[0]}" type="video/mp4"></video>`;
    } else {
        const imgSrc = project.thumbnail || (project.images && project.images[0]) || 'https://via.placeholder.com/400x300/1a1a1a/4fc3f7?text=Project';
        mediaHtml = `<img src="${imgSrc}" alt="${title}" style="max-width: 100%; height: auto;" onerror="this.src='https://via.placeholder.com/400x300/1a1a1a/4fc3f7?text=Project'">`;
    }

    const categoryLabel = {
        dev: currentLang === 'fr' ? 'Développement' : 'Development',
        design: currentLang === 'fr' ? 'Graphisme' : 'Design',
        animation: currentLang === 'fr' ? 'Animation' : 'Animation'
    };

    return `
        <div class="accordion-item">
            <div class="accordion-header">
                <div class="accordion-icon">
                    <i class="bi bi-chevron-down"></i>
                </div>
                <div class="accordion-title">
                    <h4>${title}</h4>
                    <span class="category-badge">${categoryLabel[category] || category}</span>
                </div>
            </div>
            <div class="accordion-body">
                <div class="accordion-content">
                    <div class="accordion-media">
                        ${mediaHtml}
                    </div>
                    <div class="accordion-info">
                        <p class="accordion-description">${description}</p>
                        ${project.tags && project.tags.length > 0 ? `
                            <div class="accordion-tags">
                                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                            </div>
                        ` : ''}
                        <button class="open-project" data-project-id="${project.id}" data-category="${category}">
                            ${currentLang === 'fr' ? 'Voir les détails' : 'View Details'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}
document.addEventListener('DOMContentLoaded', () => {
    generateNavigation();
    generatePresentation();
    generateSkills();
    generateExperiences();
    generateDiplomas();
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

    const isMobile = window.innerWidth <= 768;

    nav.innerHTML = `
        <div class="logo">Portfolio</div>

        <div class="menu-toggle" id="menuToggle" aria-label="Toggle menu">
            <i class="bi bi-list" id="menuIcon"></i>
        </div>

        <ul id="menu">
            ${navItems.map(item => {
        if (item.dropdown && isMobile) {
            return `
                        <li class="dropdown">
                            <a href="${item.href}" class="dropdown-toggle">${item.text} <i class="bi bi-chevron-down dropdown-arrow"></i></a>
                            <ul class="dropdown-content">
                                ${item.dropdown.map(sub => `<li><a href="${sub.href}">${sub.text}</a></li>`).join('')}
                            </ul>
                        </li>
                    `;
            // Sur le navigateur, aplatir la liste déroulante : lien principal + liens directs vers les sous-sections
            return `
                        <li><a href="${item.href}">${item.text}</a></li>
                        ${item.dropdown.map(sub => `<li><a href="${sub.href}">${sub.text}</a></li>`).join('')}
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
            <button class="lang-switch" id="langBtn" aria-label="Switch language">${currentLang.toUpperCase()}</button>
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
                    <span data-fr="Mes réalisations" data-en="My projects">${currentLang === 'fr' ? 'Mes réalisations' : 'My projects'}</span>
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
    const filtreDiv = document.getElementById('filtre');
    if (!filtreDiv) return;

    // Construire une interface de filtrage riche
    const allTags = new Set();
    const allTechs = new Set();
    const allProjects = collectAllProjects();
    allProjects.forEach(p => {
        (p.tags || []).forEach(t => allTags.add(t));
        (p.technologies || []).forEach(t => allTechs.add(t));
    });

    filtreDiv.innerHTML = `
        <!-- STRUCTURE COMPLÈTE DU SYSTÈME DE FILTRAGE -->
        <div class="realisations-wrapper">
            <!-- OVERLAY MOBILE -->
            <div class="sidebar-overlay" id="sidebarOverlay"></div>

            <!-- FILTRE SIDEBAR sticky sur desktop, drawer sur mobile/tablette -->
            <aside class="filter-sidebar" id="sidebarPanel">
                <div class="filter-panel" id="filterPanel">
                    <!-- Titre Filtres -->
                    <div class="filters-title">
                        <h3><i class="bi bi-sliders filters-title-icon"></i>${currentLang === 'fr' ? 'Filtres' : 'Filters'}</h3>
                        <button class="filter-close-btn" id="filterCloseBtn" aria-label="${currentLang === 'fr' ? 'Fermer les filtres' : 'Close filters'}">
                            <i class="bi bi-x-lg"></i>
                        </button>
                    </div>

                    <!-- Accordéon Catégories -->
                    <div class="filter-accordion-item">
                        <div class="filter-accordion-header">
                            <span>${currentLang === 'fr' ? 'Catégories' : 'Categories'}</span>
                            <i class="bi bi-chevron-down filter-accordion-icon"></i>
                        </div>
                        <div class="filter-accordion-body">
                            <div class="filter-controls">
                                <button class="filter-btn" data-cat="dev">${currentLang === 'fr' ? ' Développement' : ' Development'}</button>
                                <button class="filter-btn" data-cat="design">${currentLang === 'fr' ? ' Graphisme' : ' Design'}</button>
                                <button class="filter-btn" data-cat="animation">${currentLang === 'fr' ? ' Animation' : ' Animation'}</button>
                            </div>
                        </div>
                    </div>

                    <!-- Accordéon Tags -->
                    <div class="filter-accordion-item">
                        <div class="filter-accordion-header">
                            <span>${currentLang === 'fr' ? 'Tags' : 'Tags'}</span>
                            <i class="bi bi-chevron-down filter-accordion-icon"></i>
                        </div>
                        <div class="filter-accordion-body">
                            <div class="filter-controls tags-list">
                                ${Array.from(allTags).map(t => `<button class="chip" data-tag="${t}">${t}</button>`).join('')}
                            </div>
                        </div>
                    </div>

                    <!-- Accordéon Technologies -->
                    <div class="filter-accordion-item">
                        <div class="filter-accordion-header">
                            <span>${currentLang === 'fr' ? 'Technologies' : 'Technologies'}</span>
                            <i class="bi bi-chevron-down filter-accordion-icon"></i>
                        </div>
                        <div class="filter-accordion-body">
                            <div class="filter-controls techs-list">
                                ${Array.from(allTechs).map(t => `<button class="chip" data-tech="${t}">${t}</button>`).join('')}
                            </div>
                        </div>
                    </div>

                    <!-- Actions -->
                    <div class="filter-actions">
                        <button id="applyFilters" class="btn btn-primary" style="width: 100%;">${currentLang === 'fr' ? 'Appliquer' : 'Apply'}</button>
                        <button id="clearFilters" class="btn btn-secondary" style="width: 100%;">${currentLang === 'fr' ? 'Réinitialiser' : 'Clear'}</button>
                    </div>
                </div>
            </aside>

            <!-- CONTENU PRINCIPAL -->
            <main class="realisations-main">
                <!-- Recherche et Commandes -->
                <div class="projects-header">
                    <div class="project-search">
                        <!-- <i class="bi bi-search project-search-icon"></i> -->
                        <input id="projectSearch" type="search" placeholder="${currentLang === 'fr' ? 'Rechercher un projet...' : 'Search projects...'}">
                    </div>
                    <div class="projects-controls">
                        <button id="filterToggle" class="filter-toggle">
                            <i class="bi bi-sliders"></i>
                            ${currentLang === 'fr' ? ' Filtres' : ' Filters'}
                            <span class="filter-count-badge" id="filterCountBadge">0</span>
                        </button>
                        <div class="view-toggle">
                            <button id="viewGrid" class="view-btn active" aria-pressed="true"><i class="bi bi-grid-3x3-gap"></i> ${currentLang === 'fr' ? 'Filtrage' : 'Filter'}</button>
                            <button id="viewAccordion" class="view-btn" aria-pressed="false"><i class="bi bi-list-ul"></i> ${currentLang === 'fr' ? 'Liste' : 'List'}</button>
                        </div>
                    </div>
                </div>

                <!-- Affichage Grille -->
                <div id="projectResults" class="realisations-grid results-grid" aria-live="polite"></div>

                <!-- État vide par défaut (desktop) -->
                <div class="projects-empty-state" id="projectsEmptyState">
                    <i class="bi bi-search"></i>
                    <h3>${currentLang === 'fr' ? 'Explorez mes réalisations' : 'Explore my projects'}</h3>
                    <p>${currentLang === 'fr' ? 'Utilisez les filtres à gauche ou la barre de recherche pour découvrir mes projets.' : 'Use the filters on the left or the search bar to discover my projects.'}</p>
                    <div class="quick-filters">
                        <button class="quick-filter-btn" data-quick-cat="dev">${currentLang === 'fr' ? ' Voir le dev' : ' See dev'}</button>
                        <button class="quick-filter-btn" data-quick-cat="design">${currentLang === 'fr' ? ' Voir le design' : ' See design'}</button>
                        <button class="quick-filter-btn" data-quick-cat="animation">${currentLang === 'fr' ? ' Voir les animations' : ' See animations'}</button>
                        <button class="quick-filter-btn" data-quick-all="true">${currentLang === 'fr' ? ' Tout afficher' : ' Show all'}</button>
                    </div>
                </div>

                <!-- Affichage Accordéons -->
                <section class="categorized-lists" id="categorizedLists">
                    <!-- DEV Section -->
                    <div class="category-accordion-item">
                        <div class="category-accordion-header">
                            <div class="category-accordion-title">
                                <span>${currentLang === 'fr' ? ' Développement Web' : ' Web Development'}</span>
                            </div>
                            <i class="bi bi-chevron-down category-accordion-icon"></i>
                        </div>
                        <div class="category-accordion-body">
                            <div class="realisations-grid" data-cat="dev">
                                ${generateProjectCards('dev')}
                            </div>
                        </div>
                    </div>

                    <!-- DESIGN Section -->
                    <div class="category-accordion-item">
                        <div class="category-accordion-header">
                            <div class="category-accordion-title">
                                <span>${currentLang === 'fr' ? ' Graphisme & Design' : ' Design & Graphics'}</span>
                            </div>
                            <i class="bi bi-chevron-down category-accordion-icon"></i>
                        </div>
                        <div class="category-accordion-body">
                            <div class="realisations-grid" data-cat="design">
                                ${generateProjectCards('design')}
                            </div>
                        </div>
                    </div>

                    <!-- ANIMATION Section -->
                    <div class="category-accordion-item">
                        <div class="category-accordion-header">
                            <div class="category-accordion-title">
                                <span>${currentLang === 'fr' ? ' Animation & Vidéo' : ' Animation & Video'}</span>
                            </div>
                            <i class="bi bi-chevron-down category-accordion-icon"></i>
                        </div>
                        <div class="category-accordion-body">
                            <div class="realisations-grid" data-cat="animation">
                                ${generateProjectCards('animation')}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    `;

    // ========== DÉFINIR LES FONCTIONS IMBRIQUÉES AVANT DE LES APPELER ==========

    // Recherche / Filtrage dynamique des projets
    const initializeProjectSearch = () => {
        const input = document.getElementById('projectSearch');
        if (!input) return;
        input.addEventListener('input', () => applyFilters());
    };

    // Initialiser les accordéons des filtres (un seul ouvert)
    const initializeFilterAccordions = () => {
        // Sur tablette et mobile, les filtres sont masqués
        if (window.innerWidth < 969) {
            return;
        }

        const accordionItems = document.querySelectorAll('.filter-accordion-item');
        const headers = document.querySelectorAll('.filter-accordion-header');

        headers.forEach((header, index) => {
            header.addEventListener('click', () => {
                const currentItem = header.closest('.filter-accordion-item');
                const isOpen = currentItem.classList.contains('open');

                // Fermer tous les accordéons
                accordionItems.forEach(item => item.classList.remove('open'));

                // Ouvrir l'accordéon cliqué s'il n'était pas ouvert
                if (!isOpen) {
                    currentItem.classList.add('open');
                }
            });
        });

        // Ouvrir le premier accordéon par défaut
        if (accordionItems.length > 0) {
            accordionItems[0].classList.add('open');
        }
    };

    // Initialiser les accordéons des catégories de réalisations
    const initializeCategoryAccordions = () => {
        const categoryItems = document.querySelectorAll('.category-accordion-item');

        if (window.innerWidth < 769) {
            // Mobile : CSS gère l'affichage (max-height: none), pas besoin de classe open
            return;
        }

        categoryItems.forEach(item => {
            const header = item.querySelector('.category-accordion-header');
            if (!header || header.dataset.bound) return;
            header.dataset.bound = '1';

            header.addEventListener('click', () => {
                const isOpen = item.classList.contains('open');
                if (isOpen) {
                    item.classList.remove('open');
                } else {
                    if (window.innerWidth >= 969) {
                        // Desktop : un seul ouvert à la fois
                        categoryItems.forEach(other => other.classList.remove('open'));
                    }
                    // Tablette : plusieurs peuvent être ouverts simultanément
                    item.classList.add('open');
                    
                    // Scroll vers le haut de l'accordéon
                    setTimeout(() => {
                        header.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 50);
                }
            });
        });

        // Desktop mode accordéon : ouvrir le premier par défaut
        if (categoryItems.length > 0 && window.innerWidth > 968) {
            categoryItems[0].classList.add('open');
        }
    };

    // Fonction d'initialisation du panneau de filtres
    const initializeFilterPanel = () => {
        // category buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const cat = btn.dataset.cat;
                if (projectFilters.categories.has(cat)) {
                    projectFilters.categories.delete(cat);
                    btn.classList.remove('active');
                } else {
                    projectFilters.categories.add(cat);
                    btn.classList.add('active');
                }
                applyFilters();
            });
        });

        // tags chips
        document.querySelectorAll('.chip[data-tag]').forEach(chip => {
            chip.addEventListener('click', () => {
                const t = chip.dataset.tag;
                if (projectFilters.tags.has(t)) {
                    projectFilters.tags.delete(t);
                    chip.classList.remove('active');
                } else {
                    projectFilters.tags.add(t);
                    chip.classList.add('active');
                }
                applyFilters();
            });
        });

        // tech chips
        document.querySelectorAll('.chip[data-tech]').forEach(chip => {
            chip.addEventListener('click', () => {
                const t = chip.dataset.tech;
                if (projectFilters.techs.has(t)) {
                    projectFilters.techs.delete(t);
                    chip.classList.remove('active');
                } else {
                    projectFilters.techs.add(t);
                    chip.classList.add('active');
                }
                applyFilters();
            });
        });

        const clearBtn = document.getElementById('clearFilters');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                projectFilters.query = '';
                projectFilters.categories.clear();
                projectFilters.tags.clear();
                projectFilters.techs.clear();

                document.getElementById('projectSearch').value = '';
                document.querySelectorAll('.filter-btn, .chip').forEach(n => n.classList.remove('active'));
                applyFilters();
            });
        }

        const applyBtn = document.getElementById('applyFilters');
        if (applyBtn) applyBtn.addEventListener('click', applyFilters);
    };

    const applyFilters = () => {
        const query = (document.getElementById('projectSearch')?.value || '').trim().toLowerCase();
        projectFilters.query = query;

        // Scroll vers le haut de la section réalisations
        const projectsHeader = document.querySelector('.projects-header');
        if (projectsHeader) {
            projectsHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        const matched = collectAllProjects().filter(p => {
            const title = (typeof p.title === 'object' ? p.title[currentLang] : p.title || '').toLowerCase();
            const desc = ((p.shortDescription && p.shortDescription[currentLang]) || '').toLowerCase();
            const tags = (p.tags || []).map(t => t.toLowerCase());
            const techs = (p.technologies || []).map(t => t.toLowerCase());

            const qMatch = !query || title.includes(query) || desc.includes(query) || tags.join(' ').includes(query) || techs.join(' ').includes(query) || p.__category.includes(query);
            const catMatch = projectFilters.categories.size === 0 || projectFilters.categories.has(p.__category);
            const tagsMatch = projectFilters.tags.size === 0 || Array.from(projectFilters.tags).every(t => tags.includes(t.toLowerCase()));
            const techMatch = projectFilters.techs.size === 0 || Array.from(projectFilters.techs).every(t => techs.includes(t.toLowerCase()));

            return qMatch && catMatch && tagsMatch && techMatch;
        });

        renderFilteredResults(matched);
    };

    renderFilteredResults = (projects, forceShow = false) => {
        const results = document.getElementById('projectResults');
        const categorizedLists = document.getElementById('categorizedLists');
        const emptyState = document.getElementById('projectsEmptyState');
        const isMobile = window.innerWidth < 769;
        const isTablet = window.innerWidth >= 769 && window.innerWidth < 969;
        const isDesktop = window.innerWidth >= 969;

        // Determine if any filter is active
        const hasActiveFilter = forceShow || projectFilters.query || projectFilters.categories.size > 0 || projectFilters.tags.size > 0 || projectFilters.techs.size > 0;

        if (isMobile || isTablet) {
            // Mobile/Tablette : toujours afficher les accordéons
            if (results) results.style.display = 'none';
            if (emptyState) emptyState.style.display = 'none';
            if (categorizedLists) {
                categorizedLists.style.display = 'flex';
                categorizedLists.classList.add('accordion-view');
            }
        } else if (isDesktop) {
            if (projectViewMode === 'accordion') {
                if (results) results.style.display = 'none';
                if (emptyState) emptyState.style.display = 'none';
                if (categorizedLists) {
                    categorizedLists.style.display = 'flex';
                    categorizedLists.classList.add('accordion-view');
                }
            } else {
                // Mode grille desktop
                if (categorizedLists) {
                    categorizedLists.style.display = 'none';
                    categorizedLists.classList.remove('accordion-view');
                }

                if (!hasActiveFilter) {
                    // Pas de filtre actif : afficher l'état vide
                    if (results) results.style.display = 'none';
                    if (emptyState) emptyState.style.display = 'flex';
                } else if (projects.length === 0) {
                    // Aucun résultat
                    if (results) {
                        results.style.display = 'grid';
                        results.innerHTML = `
                            <div class="no-results" style="grid-column: 1/-1;">
                                <i class="bi bi-search"></i>
                                <p>${currentLang === 'fr' ? 'Aucun projet trouvé pour ces critères.' : 'No projects found for these criteria.'}</p>
                            </div>`;
                    }
                    if (emptyState) emptyState.style.display = 'none';
                } else {
                    // Afficher les résultats
                    if (results) {
                        results.style.display = 'grid';
                        results.innerHTML = projects.map(p => generateProjectCardHTML(p, p.__category)).join('');
                    }
                    if (emptyState) emptyState.style.display = 'none';
                }
            }
        }

        initializeProjectButtons();
        initializeAccordionToggles();
        initializeCategoryAccordions();
    };

    const initializeAccordionToggles = () => {
        document.querySelectorAll('.accordion-header').forEach(h => {
            if (h.dataset.bound) return;
            h.dataset.bound = '1';
            h.addEventListener('click', () => {
                const item = h.closest('.accordion-item');
                if (!item) return;
                item.classList.toggle('open');
            });
        });

        document.querySelectorAll('.open-project').forEach(btn => {
            if (btn.dataset.bound) return;
            btn.dataset.bound = '1';
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = btn.dataset.projectId;
                const cat = btn.dataset.category;
                const project = portfolioData.projects[cat].find(p => p.id === id);
                if (project) openProjectModal(project);
            });
        });
    };

    const initializeProjectButtons = () => {
        document.querySelectorAll('.project-card').forEach(card => {
            if (card.dataset.bound) return;
            card.dataset.bound = '1';
            card.addEventListener('click', () => {
                const projectId = card.dataset.projectId;
                const category = card.dataset.category;
                const project = portfolioData.projects[category].find(p => p.id === projectId);
                if (project) openProjectModal(project);
            });
        });
    };

    const initializeViewToggle = () => {
        const gridBtn = document.getElementById('viewGrid');
        const accBtn = document.getElementById('viewAccordion');
        if (!gridBtn || !accBtn) return;

        const setMode = (mode) => {
            projectViewMode = mode;
            gridBtn.setAttribute('aria-pressed', mode === 'grid');
            accBtn.setAttribute('aria-pressed', mode === 'accordion');
            applyFilters();
        };

        gridBtn.addEventListener('click', () => setMode('grid'));
        accBtn.addEventListener('click', () => setMode('accordion'));
        setMode(projectViewMode);
    };

    // ========== APPELER LES FONCTIONS D'INITIALISATION ==========

    // Gestion du toggle des filtres
    const filterToggle = document.getElementById('filterToggle');
    const filterCloseBtn = document.getElementById('filterCloseBtn');
    const sidebar = document.getElementById('sidebarPanel');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    
    const openSidebar = () => {
        if (sidebar) sidebar.classList.add('open');
        if (sidebarOverlay) sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    
    const closeSidebar = () => {
        if (sidebar) sidebar.classList.remove('open');
        if (sidebarOverlay) sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    if (filterToggle && sidebar) {
        filterToggle.addEventListener('click', () => {
            if (sidebar.classList.contains('open')) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });
    }

    if (filterCloseBtn && sidebar) {
        filterCloseBtn.addEventListener('click', closeSidebar);
    }
    
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeSidebar);
    }

    // Fermer le filtre en cliquant en dehors (sur mobile/tablette) - garde pour les cas où pas d'overlay
    if (sidebar) {
        document.addEventListener('click', (e) => {
            if (window.innerWidth < 969 && !sidebar.contains(e.target) && !filterToggle?.contains(e.target) && !sidebarOverlay?.contains(e.target)) {
                closeSidebar();
            }
        });
    }

    // Animation d'entrée de la sidebar sur desktop via IntersectionObserver
    if (sidebar && window.innerWidth >= 969) {
        const sidebarObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        sidebar.classList.add('sidebar-visible');
                    }, 200);
                    sidebarObserver.unobserve(sidebar);
                }
            });
        }, { threshold: 0.1 });
        sidebarObserver.observe(sidebar);
    } else if (sidebar) {
        // Sur mobile/tablette, visible immédiatement (contrôlé par le bouton)
        sidebar.classList.add('sidebar-visible');
    }

    // Gestion du badge compteur filtres actifs
    const updateFilterBadge = () => {
        const badge = document.getElementById('filterCountBadge');
        if (!badge) return;
        const count = projectFilters.categories.size + projectFilters.tags.size + projectFilters.techs.size;
        badge.textContent = count;
        if (count > 0) {
            badge.classList.add('visible');
        } else {
            badge.classList.remove('visible');
        }
    };

    // Wrapper applyFilters local avec badge update
    const applyFiltersLocal = () => {
        applyFilters();
        updateFilterBadge();
    };

    // Boutons de démarrage rapide (quick filters)
    document.querySelectorAll('.quick-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const cat = btn.dataset.quickCat;
            const all = btn.dataset.quickAll;
            if (all) {
                // Afficher tous les projets
                renderFilteredResults(collectAllProjects(), true);
            } else if (cat) {
                // Activer le filtre catégorie
                projectFilters.categories.add(cat);
                const filterBtn = document.querySelector(`.filter-btn[data-cat="${cat}"]`);
                if (filterBtn) filterBtn.classList.add('active');
                applyFiltersLocal();
            }
        });
    });

    // Initialize all event handlers
    initializeProjectButtons();
    initializeFilterPanel();
    initializeProjectSearch();
    initializeFilterAccordions();
    initializeCategoryAccordions();
    initializeViewToggle();

    // Affichage initial : sur mobile/tablette, montrer les accordéons tout de suite
    if (window.innerWidth < 969) {
        const categorizedLists = document.getElementById('categorizedLists');
        if (categorizedLists) {
            categorizedLists.style.display = 'flex';
            categorizedLists.classList.add('accordion-view');
        }
        const emptyState = document.getElementById('projectsEmptyState');
        if (emptyState) emptyState.style.display = 'none';
    }
}

// Flatten projects into list
function collectAllProjects() {
    const list = [];
    Object.keys(portfolioData.projects).forEach(cat => {
        portfolioData.projects[cat].forEach(p => {
            list.push(Object.assign({}, p, { __category: cat }));
        });
    });
    return list;
}

// Retour du HTML de la carte projet unique (utilisé pour les résultats)
function generateProjectCardHTML(project, category) {
    const title = typeof project.title === 'object' ? project.title[currentLang] : project.title;
    const description = project.shortDescription ? project.shortDescription[currentLang] : '';

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
                    <p style="color: white;">${currentLang === 'fr' ? 'Cliquez pour en savoir plus' : 'Click to learn more'}</p>
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
}

// Fonction d'initialisation du panneau de filtres (imbriquée dans generateProjects)
function initializeFilterPanel() {
    // category buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const cat = btn.dataset.cat;
            if (projectFilters.categories.has(cat)) {
                projectFilters.categories.delete(cat);
                btn.classList.remove('active');
            } else {
                projectFilters.categories.add(cat);
                btn.classList.add('active');
            }
            applyFilters();
        });
    });

    // tags chips
    document.querySelectorAll('.chip[data-tag]').forEach(chip => {
        chip.addEventListener('click', () => {
            const t = chip.dataset.tag;
            if (projectFilters.tags.has(t)) {
                projectFilters.tags.delete(t);
                chip.classList.remove('active');
            } else {
                projectFilters.tags.add(t);
                chip.classList.add('active');
            }
            applyFilters();
        });
    });

    // tech chips
    document.querySelectorAll('.chip[data-tech]').forEach(chip => {
        chip.addEventListener('click', () => {
            const t = chip.dataset.tech;
            if (projectFilters.techs.has(t)) {
                projectFilters.techs.delete(t);
                chip.classList.remove('active');
            } else {
                projectFilters.techs.add(t);
                chip.classList.add('active');
            }
            applyFilters();
        });
    });

    const clearBtn = document.getElementById('clearFilters');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            projectFilters.query = '';
            projectFilters.categories.clear();
            projectFilters.tags.clear();
            projectFilters.techs.clear();

            document.getElementById('projectSearch').value = '';
            document.querySelectorAll('.filter-btn, .chip').forEach(n => n.classList.remove('active'));
            applyFilters();
        });
    }

    const applyBtn = document.getElementById('applyFilters');
    if (applyBtn) applyBtn.addEventListener('click', applyFilters);
}

function applyFilters() {
    const query = (document.getElementById('projectSearch')?.value || '').trim().toLowerCase();
    projectFilters.query = query;

    const matched = collectAllProjects().filter(p => {
        // Query match
        const title = (typeof p.title === 'object' ? p.title[currentLang] : p.title || '').toLowerCase();
        const desc = ((p.shortDescription && p.shortDescription[currentLang]) || '').toLowerCase();
        const tags = (p.tags || []).map(t => t.toLowerCase());
        const techs = (p.technologies || []).map(t => t.toLowerCase());

        const qMatch = !query || title.includes(query) || desc.includes(query) || tags.join(' ').includes(query) || techs.join(' ').includes(query) || p.__category.includes(query);

        // Category filter
        const catMatch = projectFilters.categories.size === 0 || projectFilters.categories.has(p.__category);

        // Tags filter (all selected tags must be present)
        const tagsMatch = projectFilters.tags.size === 0 || Array.from(projectFilters.tags).every(t => tags.includes(t.toLowerCase()));

        // Techs filter
        const techMatch = projectFilters.techs.size === 0 || Array.from(projectFilters.techs).every(t => techs.includes(t.toLowerCase()));

        return qMatch && catMatch && tagsMatch && techMatch;
    });

    renderFilteredResults(matched);
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
    // Observer chaque carte de compétence individuellement
    // Seuil bas pour fonctionner sur mobile (pas besoin de 50% de visibilité)
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -30px 0px'
    };

    const animateSkillCard = (card) => {
        const skills = card.querySelectorAll('.competence');
        skills.forEach((skill, index) => {
            setTimeout(() => {
                const niveau = skill.querySelector('.niveau');
                if (!niveau) return;
                const targetWidth = niveau.dataset.niveau;
                niveau.style.width = targetWidth;
            }, index * 120);
        });
    };

    const skillsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillCard(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer chaque carte individuellement plutôt que la section entière
    const categories = document.querySelectorAll('.categorie');
    categories.forEach(cat => skillsObserver.observe(cat));

    // Fallback : si les cartes ne sont pas encore dans le DOM (génération async)
    if (categories.length === 0) {
        const competencesSection = document.getElementById('competences');
        if (competencesSection) {
            const sectionObserver = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        document.querySelectorAll('.categorie').forEach(cat => {
                            animateSkillCard(cat);
                        });
                        obs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            sectionObserver.observe(competencesSection);
        }
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
    const attach = () => {
        const btn = document.getElementById('langBtn');
        if (!btn) return;

        // show current language
        btn.textContent = currentLang.toUpperCase();
        btn.classList.toggle('lang-en', currentLang === 'en');
        btn.classList.toggle('lang-fr', currentLang === 'fr');

        btn.onclick = () => {
            currentLang = currentLang === 'fr' ? 'en' : 'fr';

            // Mettre à jour le titre et le sous-titre des réalisations
            const realTitle = document.getElementById('realisations-title');
            const realSubtitle = document.getElementById('realisations-subtitle');
            if (realTitle) {
                realTitle.textContent = currentLang === 'fr' ? 'Réalisations' : 'Projects';
            }
            if (realSubtitle) {
                realSubtitle.textContent = currentLang === 'fr' ? 'Découvrez mes derniers projets' : 'Discover my latest projects';
            }

            // Régénérer le contenu en nouvelle langue
            generateNavigation();
            generatePresentation();
            generateSkills();
            generateExperiences();
            generateDiplomas();
            generateProjects();
            generateContact();

            // Réattacher les écouteurs aux nouveaux éléments DOM
            initializeLanguage();
            initializeNavigation();
            initializeSkillsAnimation();
            initializeTheme();

            if (window.restartTyping) window.restartTyping();
        };
    };

    attach();
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

// ==================== FIN SCRIPT ====================