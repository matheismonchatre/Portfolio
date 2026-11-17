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

// Mode léger (mobile / mouvement réduit)
const LITE = window.innerWidth < 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// ==================== ARRIÈRE-PLAN THREE.JS ====================
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('threejs-canvas'),
    alpha: true,
    antialias: !LITE
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(LITE ? 1 : Math.min(window.devicePixelRatio, 1.5));
camera.position.z = 5;

// Particules
// PARTICULES 2D (ROND / CARRÉ / ÉTOILE)
// =============================

function createShapeTexture(type) {
    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'white';
    ctx.beginPath();

    if (type === 'circle') {
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        ctx.fill();
    }

    if (type === 'square') {
        ctx.fillRect(0, 0, size, size);
    }

    if (type === 'star') {
        const spikes = 5;
        const outerRadius = size / 2;
        const innerRadius = size / 4;
        let rot = Math.PI / 2 * 3;
        let x = size / 2;
        let y = size / 2;
        const step = Math.PI / spikes;

        ctx.moveTo(size / 2, size / 2 - outerRadius);

        for (let i = 0; i < spikes; i++) {
            x = size / 2 + Math.cos(rot) * outerRadius;
            y = size / 2 + Math.sin(rot) * outerRadius;
            ctx.lineTo(x, y);
            rot += step;

            x = size / 2 + Math.cos(rot) * innerRadius;
            y = size / 2 + Math.sin(rot) * innerRadius;
            ctx.lineTo(x, y);
            rot += step;
        }

        ctx.lineTo(size / 2, size / 2 - outerRadius);
        ctx.fill();
    }

    return new THREE.CanvasTexture(canvas);
}

function createParticles(texture, count) {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 10;
    }

    geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3)
    );

    const material = new THREE.PointsMaterial({
        size: 0.025,
        map: texture,
        transparent: true,
        alphaTest: 0.5,
        depthWrite: false,
        color: 0x4fc3f7,
        blending: THREE.AdditiveBlending
    });

    return new THREE.Points(geometry, material);
}

const particlesCount = LITE ? 240 : 600;
const part = Math.floor(particlesCount / 3);

const circleParticles = createParticles(createShapeTexture('circle'), part);
const squareParticles = createParticles(createShapeTexture('square'), part);
const starParticles = createParticles(createShapeTexture('star'), part);

scene.add(circleParticles);
scene.add(squareParticles);
scene.add(starParticles);

// Formes géométriques qui changent selon la section
let currentShape = null;
const shapes = {
    presentation: createTorus(),
    competences: createIcosahedron(),
    // diplomas: createSphere(),
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
    // Pause quand l'onglet est caché ou après l'accueil (le fond devient une ambiance CSS)
    if (document.hidden || window.scrollY > window.innerHeight * 1.2) return;

    if (currentShape) {
        currentShape.rotation.x += 0.005;
        currentShape.rotation.y += 0.005;
    }

    circleParticles.rotation.y += 0.001;
    squareParticles.rotation.y += 0.001;
    starParticles.rotation.y += 0.001;

    circleParticles.rotation.x = mouseY * 0.1;
    squareParticles.rotation.x = mouseY * 0.1;
    starParticles.rotation.x = mouseY * 0.1;

    circleParticles.rotation.y = mouseX * 0.1;
    squareParticles.rotation.y = mouseX * 0.1;
    starParticles.rotation.y = mouseX * 0.1;

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
            mediaHtml = `<video autoplay loop muted playsinline preload="metadata"><source src="${project.video}" type="video/mp4"></video>`;
        } else if (project.videos && project.videos.length > 0) {
            mediaHtml = `<video autoplay loop muted playsinline preload="metadata"><source src="${project.videos[0]}" type="video/mp4"></video>`;
        } else {
            const imgSrc = project.thumbnail || (project.images && project.images[0]) || 'https://via.placeholder.com/400x300/1a1a1a/4fc3f7?text=Project';
            mediaHtml = `<img loading="lazy" decoding="async" src="${imgSrc}" alt="${title}" onerror="this.src='https://via.placeholder.com/400x300/1a1a1a/4fc3f7?text=Project'">`;
        if (!project.thumbnail && !(project.images && project.images.length)) mediaHtml = noImageHtml(project);
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
                    ${project.status ? `<span class="wip-badge"><i class="bi bi-hammer"></i> ${project.status[currentLang]}</span>` : ''}${project.internship ? `<span class="stage-badge"><i class="bi ${project.badgeIcon || 'bi-briefcase-fill'}"></i> ${project.internship[currentLang]}</span>` : ''}
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
        mediaHtml = `<img loading="lazy" decoding="async" src="${imgSrc}" alt="${title}" style="max-width: 100%; height: auto;" onerror="this.src='https://via.placeholder.com/400x300/1a1a1a/4fc3f7?text=Project'">`;
        if (!project.thumbnail && !(project.images && project.images.length)) mediaHtml = noImageHtml(project);
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
    generatePassions();
    generateContact();

    initializeNavigation();
    initializeTypingEffect();
    initializeSkillsAnimation();
    initializeScrollEffects();
    initializeTheme();
    initializeLanguage();
    initializeModals();
    // initializeRaindrops();
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
            
            ${availabilityHtml()}

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

                    // Scroll vers le haut de l'accordéon (après l'animation d'ouverture)
                    setTimeout(() => {
                        header.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }, 400);
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

    const applyFilters = (shouldScroll = true) => {
        const query = (document.getElementById('projectSearch')?.value || '').trim().toLowerCase();
        projectFilters.query = query;

        // Scroll vers le haut de la section réalisations (seulement si c'est une action utilisateur)
        if (shouldScroll) {
            const projectsHeader = document.querySelector('.projects-header');
            if (projectsHeader) {
                projectsHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
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

        const setMode = (mode, isInitial = false) => {
            projectViewMode = mode;
            // Mode liste : on masque le panneau de filtres
            document.querySelector('.realisations-wrapper')?.classList.toggle('list-mode', mode === 'accordion');
            gridBtn.setAttribute('aria-pressed', mode === 'grid');
            accBtn.setAttribute('aria-pressed', mode === 'accordion');
            applyFilters(!isInitial); // ne scroll que si ce n'est pas l'appel initial
        };

        gridBtn.addEventListener('click', () => setMode('grid'));
        accBtn.addEventListener('click', () => setMode('accordion'));
        setMode(projectViewMode, true); // true = appel initial, pas de scroll
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
        mediaHtml = `<video autoplay loop muted playsinline preload="metadata"><source src="${project.video}" type="video/mp4"></video>`;
    } else if (project.videos && project.videos.length > 0) {
        mediaHtml = `<video autoplay loop muted playsinline preload="metadata"><source src="${project.videos[0]}" type="video/mp4"></video>`;
    } else {
        const imgSrc = project.thumbnail || (project.images && project.images[0]) || 'https://via.placeholder.com/400x300/1a1a1a/4fc3f7?text=Project';
        mediaHtml = `<img loading="lazy" decoding="async" src="${imgSrc}" alt="${title}" onerror="this.src='https://via.placeholder.com/400x300/1a1a1a/4fc3f7?text=Project'">`;
        if (!project.thumbnail && !(project.images && project.images.length)) mediaHtml = noImageHtml(project);
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
                ${project.status ? `<span class="wip-badge"><i class="bi bi-hammer"></i> ${project.status[currentLang]}</span>` : ''}${project.internship ? `<span class="stage-badge"><i class="bi ${project.badgeIcon || 'bi-briefcase-fill'}"></i> ${project.internship[currentLang]}</span>` : ''}
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
    //  console.log(profile.cv[currentLang]);

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
                <a href="${profile.cv[currentLang]}" download target="_blank" rel="noopener" class="contact-link">
                    <i class="bi bi-file-earmark-person-fill"></i>
                    <span>CV</span>
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
    } else if (project.imageNote) {
        mediaHtml = `<div class="modal-media">${noImageHtml(project)}</div>`;
    }

    modalContent.innerHTML = `
        <div class="modal-header">
            <h2>${title}</h2>
            ${project.status ? `<span class="wip-badge"><i class="bi bi-hammer"></i> ${project.status[currentLang]}</span>` : ''}${project.internship ? `<span class="stage-badge"><i class="bi ${project.badgeIcon || 'bi-briefcase-fill'}"></i> ${project.internship[currentLang]}</span>` : ''}
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
                            <span>${project.category === 'dev' ? (currentLang === 'fr' ? 'Voir le site' : 'Visit the website') : (currentLang === 'fr' ? 'Voir le projet' : 'View project')}</span>
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
// function initializeRaindrops() {
//     const container = document.querySelector('.raindrop-impacts');

//     function createDrop() {
//         const drop = document.createElement('div');
//         drop.classList.add('drop');

//         drop.style.left = Math.random() * 100 + '%';
//         drop.style.top = Math.random() * 100 + '%';

//         const size = Math.random() * 40 + 20;
//         drop.style.width = size + 'px';
//         drop.style.height = size + 'px';

//         const duration = (Math.random() * 1.5 + 1.5).toFixed(2);
//         drop.style.animationDuration = duration + 's';

//         container.appendChild(drop);

//         setTimeout(() => {
//             drop.remove();
//         }, duration * 1000);
//     }

//     setInterval(createDrop, 400);
// }

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
        [circleParticles, squareParticles, starParticles].forEach(p => p.material.color.setHex(color));
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
            generatePassions();
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
        fr: ['Développeur Web', 'Designer UI/UX', 'Créateur 3D', 'Passionné de Code', 'Passionné de VR'],
        en: ['Web Developer', 'UI/UX Designer', '3D Creator', 'Code Enthusiast', 'VR Enthusiast']
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

// ==================== EXTRAS : rail de sections, ambiance, footer ====================
(function () {
    const ids = ['presentation', 'competences', 'diplomes', 'experience', 'realisations', 'passions', 'contact'];
    let rail = null, cur = 'presentation';

    function buildRail() {
        if (!rail) {
            rail = document.createElement('div');
            rail.setAttribute('role', 'navigation');
            rail.id = 'sideRail';
            rail.setAttribute('aria-label', 'Sections');
            document.body.appendChild(rail);
        }
        const labels = {};
        portfolioData.navigation[currentLang].forEach(i => labels[i.id] = i.text);
        rail.innerHTML = ids.map(id => `<a href="#${id}"><i></i><span>${labels[id] || id}</span></a>`).join('');
        mark(cur);
    }

    function mark(id) {
        cur = id;
        const k = ids.indexOf(id);
        if (rail) rail.querySelectorAll('a').forEach((a, i) => { a.className = i === k ? 'on' : (i === k - 1 ? 'prev' : (i === k + 1 ? 'next' : '')); });
        document.body.dataset.amb = id;
        document.body.classList.toggle('past-hero', id !== 'presentation');
    }

    function buildFooter() {
        let f = document.getElementById('siteFooter');
        if (!f) {
            f = document.createElement('footer');
            f.id = 'siteFooter';
            document.querySelector('.content-wrapper').appendChild(f);
        }
        const name = portfolioData.profile.name;
        f.innerHTML = `<p>&copy; ${new Date().getFullYear()} ${name}. ${currentLang === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'} &middot; <button type="button" class="legal-link">${portfolioData.legal.link[currentLang]}</button></p>`;
    }

    function init() {
        buildRail();
        buildFooter();
        const io = new IntersectionObserver(es => {
            es.forEach(e => { if (e.isIntersecting) mark(e.target.id); });
        }, { rootMargin: '-45% 0px -45% 0px' });
        ids.forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });
    }

    // Barre de navigation : se masque en descendant (desktop), revient en remontant ou en allant vers le haut
    function initNavHide() {
        const nav = document.getElementById('mainNav');
        const desk = window.matchMedia('(min-width: 769px) and (hover: hover)');
        if (!nav) return;
        let lastY = window.scrollY, ticking = false;
        const onScroll = () => {
            const y = window.scrollY, dy = y - lastY;
            if (!desk.matches || y < 120) nav.classList.remove('nav-hidden');
            else if (dy > 6) nav.classList.add('nav-hidden');
            else if (dy < -6) nav.classList.remove('nav-hidden');
            lastY = y; ticking = false;
        };
        window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
        document.addEventListener('mousemove', e => { if (desk.matches && e.clientY < 90) nav.classList.remove('nav-hidden'); }, { passive: true });
        nav.addEventListener('focusin', () => nav.classList.remove('nav-hidden'));
    }

    // Changement de langue : le bouton est régénéré par script.js, on reconstruit après son handler
    document.addEventListener('click', e => {
        if (e.target.closest && e.target.closest('#langBtn')) setTimeout(() => { buildRail(); buildFooter(); }, 0);
    });

    init();
    initNavHide();
})();


// Vignette locale pour les projets sans image (pas de service externe)
function noImageHtml(project) {
    const fr = currentLang === 'fr';
    const icon = project.icon || (project.category === 'design' ? 'bi-box' : 'bi-controller');
    const text = project.imageNote ? project.imageNote[currentLang] : (fr ? 'Aperçu bientôt disponible' : 'Preview coming soon');
    return `<div class="project-noimg"><i class="bi ${icon}"></i><span>${text}</span></div>`;
}

// ==================== PASSIONS ====================
const pT = v => (v && typeof v === 'object') ? (v[currentLang] ?? v.fr ?? '') : (v ?? '');
let psActivated = false, psIdx = 0, psPhotos = [], psLbI = 0;

// ---------- Pictogrammes : icônes Bootstrap Icons (déjà chargées sur le site) + un cheval dessiné en SVG ----------
const PS_BI = { music: 'bi-music-note-beamed', gamepad: 'bi-controller', palette: 'bi-palette', archery: 'bi-bullseye', sparkles: 'bi-stars' };
const PS_HORSE = '<svg class="ps-svg" viewBox="0 0 512 512" fill="currentColor" fill-rule="evenodd" aria-hidden="true"><path d="M 69 245 L 60 262 L 55 282 L 55 289 L 54 290 L 54 316 L 55 317 L 55 326 L 58 341 L 68 371 L 79 394 L 100 427 L 117 447 L 138 466 L 159 481 L 177 491 L 206 502 L 230 508 L 236 508 L 243 510 L 252 510 L 253 511 L 295 511 L 296 510 L 303 510 L 312 508 L 311 505 L 298 503 L 253 491 L 218 479 L 197 470 L 176 459 L 174 459 L 157 449 L 136 434 L 119 418 L 102 397 L 83 367 L 71 340 L 66 324 L 63 309 L 63 302 L 62 301 L 62 278 L 65 262 L 71 248 L 71 246 Z M 322 202 L 300 214 L 291 221 L 282 231 L 272 250 L 268 267 L 267 283 L 268 284 L 269 303 L 273 321 L 279 339 L 283 346 L 286 355 L 297 375 L 322 409 L 328 420 L 332 431 L 335 445 L 335 452 L 336 453 L 335 477 L 332 488 L 332 492 L 334 492 L 340 476 L 342 466 L 342 459 L 343 458 L 343 437 L 342 436 L 341 424 L 335 405 L 328 392 L 314 371 L 305 353 L 297 331 L 291 302 L 291 281 L 292 280 L 293 270 L 297 259 L 301 252 L 313 240 L 331 259 L 344 268 L 356 274 L 374 279 L 391 279 L 391 276 L 370 266 L 362 260 L 347 245 L 332 224 Z M 300 49 L 271 43 L 251 43 L 250 42 L 247 43 L 234 43 L 233 44 L 226 44 L 225 45 L 209 47 L 176 58 L 156 68 L 129 86 L 103 108 L 89 122 L 125 113 L 130 113 L 131 114 L 110 128 L 84 149 L 64 169 L 50 186 L 36 208 L 31 218 L 25 234 L 20 260 L 54 235 L 69 227 L 76 226 L 76 224 L 70 223 L 60 225 L 44 232 L 42 231 L 47 221 L 61 201 L 99 162 L 140 128 L 180 101 L 156 95 L 148 95 L 138 97 L 137 96 L 144 90 L 176 69 L 198 59 L 216 53 L 234 49 L 248 48 L 249 47 L 276 47 L 299 51 Z M 402 0 L 368 9 L 346 19 L 329 31 L 318 43 L 314 50 L 317 51 L 324 44 L 333 38 L 352 29 L 379 22 L 382 23 L 382 28 L 381 29 L 381 56 L 382 57 L 382 66 L 387 92 L 399 105 L 411 123 L 430 156 L 445 186 L 455 211 L 457 219 L 471 242 L 476 256 L 476 274 L 472 289 L 470 293 L 463 300 L 451 306 L 444 308 L 432 308 L 423 304 L 412 293 L 404 280 L 402 281 L 406 297 L 411 306 L 417 313 L 421 316 L 435 322 L 450 322 L 464 318 L 474 313 L 484 303 L 488 295 L 491 284 L 491 265 L 488 253 L 484 244 L 463 217 L 442 155 L 428 120 L 418 101 L 404 81 L 402 57 L 401 56 L 401 45 L 400 44 L 400 29 L 401 28 L 402 16 L 407 0 Z"/></svg>';
// Un nom connu => pictogramme ; sinon le texte tel quel (un emoji reste possible)
const psIcon = name => name === 'horse' ? PS_HORSE : (PS_BI[name] ? `<i class="bi ${PS_BI[name]} ps-bi" aria-hidden="true"></i>` : (name || ''));

// ---------- Musique : lecteur Spotify intégré (iframe) + liste des titres ----------
function psView(t) {
    return { title: pT(t.title), artist: pT(t.artist), album: pT(t.album), cover: t.cover || '' };
}

// Accepte : un lien Spotify, "spotify:track:ID", ou le code <iframe> copié depuis Spotify
function psEmbedSrc(s) {
    if (!s) return '';
    const frame = String(s).match(/src="([^"]+)"/);
    if (frame) s = frame[1];
    s = String(s).trim();
    const m = s.match(/open\.spotify\.com\/(?:intl-[a-z-]+\/)?(?:embed\/)?(track|album|playlist|episode|show|artist)\/([A-Za-z0-9]+)/) ||
              s.match(/^spotify:(track|album|playlist|episode|show|artist):([A-Za-z0-9]+)/);
    return m ? `https://open.spotify.com/embed/${m[1]}/${m[2]}?utm_source=generator&theme=0` : '';
}

function generatePassions() {
    const sec = document.getElementById('passions');
    if (!sec || !portfolioData.passions) return;
    const P = portfolioData.passions, eq = P.equestrian, mu = P.music, ga = P.games, ot = P.others;
    const fr = currentLang === 'fr';
    psIdx = 0; psPhotos = eq.photos || [];
    const head = (icon, title, sub) => `<div class="ps-head"><span class="ps-emoji">${psIcon(icon)}</span><div><h3>${pT(title)}</h3>${sub ? `<p>${pT(sub)}</p>` : ''}</div></div>`;
    const cover = (src) => `<span class="ps-cover">${src ? `<img src="${src}" alt="" loading="lazy" decoding="async" onerror="this.remove()">` : ''}</span>`;

    sec.innerHTML = `
        <div class="section-header">
            <h2>${pT(P.header.title)}</h2>
            <p>${pT(P.header.subtitle)}</p>
        </div>

        <div class="ps-block ps-horse reveal">
            <div class="ps-horse-info">
                <span class="ps-label">${pT(eq.label)}</span>
                <h3 class="ps-title">${psIcon(eq.icon)} ${pT(eq.title)}</h3>
                <div class="ps-since"><strong>${eq.since.value}</strong><span>${pT(eq.since)}</span></div>
                ${eq.paragraphs.map(p => `<p>${pT(p)}</p>`).join('')}
                <h4>${pT(eq.levelsTitle)}</h4>
                <ol class="ps-levels">${eq.levels.map(l => `<li class="${l.done ? 'done' : 'todo'}">${pT(l.label)}</li>`).join('')}</ol>
            </div>
            <div class="ps-mosaic">
                ${psPhotos.map((ph, i) => `
                    <figure class="ps-photo" data-i="${i}" tabindex="0" role="button" aria-label="${pT(ph.title)}">
                        <img src="${ph.src}" alt="${pT(ph.title)}" loading="lazy" decoding="async" onerror="this.parentElement.classList.add('noimg');this.remove()">
                        <figcaption><strong>${pT(ph.title)}</strong><span>${pT(ph.text)}</span></figcaption>
                    </figure>`).join('')}
            </div>
        </div>

        <div class="ps-block ps-music reveal">
            ${head(mu.icon, mu.title, mu.subtitle)}
            <div class="ps-player">
                <div class="ps-stage"><div id="psEmbed" class="ps-embed"></div></div>
                <div class="ps-side">
                    <ol class="ps-tracks">
                        ${mu.tracks.map((t, i) => { const v = psView(t); return `
                            <li data-i="${i}" tabindex="0">
                                <span class="n">${i + 1}</span>${cover(v.cover)}
                                <div class="txt"><b>${v.title}</b><small>${[v.artist, v.album].filter(Boolean).join(' · ')}</small></div>
                                <span class="ps-eq mini"><i></i><i></i><i></i></span>
                            </li>`; }).join('')}
                    </ol>
                    <p class="ps-tip">${fr ? 'Choisis un titre, puis appuie sur play dans le lecteur.' : 'Pick a track, then hit play in the player.'}</p>
                </div>
            </div>
        </div>

        <div class="ps-block ps-games reveal">
            ${head(ga.icon, ga.title, ga.subtitle)}
            <div class="ps-cards">
                ${ga.items.map((g, i) => `
                    <article class="ps-card">
                        <span class="rank">#${i + 1}</span>
                        <div class="ps-card-img">${g.image ? `<img src="${g.image}" alt="${pT(g.name)}" loading="lazy" decoding="async" onerror="this.remove()">` : ''}<span class="fallback">${psIcon('gamepad')}</span></div>
                        <div class="ps-card-body">
                            <h4>${pT(g.name)}</h4>
                            <small>${pT(g.platform)}</small>
                            <p>${pT(g.text)}</p>
                            ${g.link ? `<a href="${g.link}" target="_blank" rel="noopener">${fr ? 'Découvrir' : 'Check it out'} <i class="bi bi-arrow-up-right"></i></a>` : ''}
                        </div>
                    </article>`).join('')}
            </div>
        </div>

        <div class="ps-block ps-others reveal">
            ${head('sparkles', ot.title)}
            <div class="ps-other-grid">
                ${ot.items.map(o => `<div class="ps-other"><span class="ico">${psIcon(o.icon)}</span><h4>${pT(o.title)}</h4><p>${pT(o.text)}</p></div>`).join('')}
            </div>
        </div>`;
    initPassions();
}

function psSelect(i, instant) {
    const tracks = portfolioData.passions.music.tracks, box = document.getElementById('psEmbed');
    if (!tracks.length || !box) return;
    psIdx = (i + tracks.length) % tracks.length;
    document.querySelectorAll('.ps-tracks li').forEach((li, k) => li.classList.toggle('active', k === psIdx));
    const t = tracks[psIdx], src = psEmbedSrc(t.spotify), v = psView(t), fr = currentLang === 'fr';
    const render = () => {
        if (!src) {
            box.innerHTML = `<div class="ps-embed-empty">${psIcon('music')}<span>${fr ? 'Écoute bientôt disponible' : 'Listening coming soon'}</span></div>`;
        } else if (!psActivated) {
            // Le lecteur Spotify (contenu tiers) ne se charge qu'au clic : plus rapide et plus respectueux de la vie privée
            box.innerHTML = `
                <button type="button" class="ps-facade">
                    <span class="ps-facade-cover">${v.cover ? `<img src="${v.cover}" alt="" onerror="this.remove()">` : ''}</span>
                    <span class="ps-facade-title">${v.title}</span>
                    <span class="ps-facade-artist">${v.artist}</span>
                    <span class="ps-facade-play"><i class="bi bi-play-fill"></i> ${fr ? 'Écouter' : 'Listen'}</span>
                    <small>${fr ? 'Charge le lecteur Spotify (contenu tiers)' : 'Loads the Spotify player (third-party content)'}</small>
                </button>`;
        } else {
            box.innerHTML = `<iframe title="Spotify" src="${src}" width="100%" height="352" style="border:0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
        }
        box.classList.remove('swap');
    };
    if (instant) render(); else { box.classList.add('swap'); setTimeout(render, 220); }
}

function psLightboxShow(i) {
    const lb = document.getElementById('psLightbox');
    if (!lb || !psPhotos.length) return;
    psLbI = (i + psPhotos.length) % psPhotos.length;
    const ph = psPhotos[psLbI], media = lb.querySelector('.ps-lb-media');
    const img = new Image();
    img.alt = pT(ph.title);
    img.onerror = () => { media.innerHTML = `<div class="ps-lb-fallback">${psIcon('horse')}</div>`; };
    img.src = ph.src;
    media.innerHTML = '';
    media.appendChild(img);
    lb.querySelector('h4').textContent = pT(ph.title);
    lb.querySelector('p').textContent = pT(ph.text);
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function psLightboxClose() {
    const lb = document.getElementById('psLightbox');
    if (lb) lb.classList.remove('active');
    document.body.style.overflow = '';
}

function initPassions() {
    // Lightbox (au niveau du body pour rester en plein écran)
    if (!document.getElementById('psLightbox')) {
        const lb = document.createElement('div');
        lb.id = 'psLightbox';
        lb.className = 'ps-lightbox';
        lb.innerHTML = '<button class="ps-lb-btn ps-lb-close" aria-label="Close"><i class="bi bi-x-lg"></i></button>' +
            '<button class="ps-lb-btn ps-lb-prev" aria-label="Previous"><i class="bi bi-chevron-left"></i></button>' +
            '<button class="ps-lb-btn ps-lb-next" aria-label="Next"><i class="bi bi-chevron-right"></i></button>' +
            '<figure><div class="ps-lb-media"></div><figcaption><h4></h4><p></p></figcaption></figure>';
        document.body.appendChild(lb);
        lb.addEventListener('click', e => {
            if (e.target.closest('.ps-lb-prev')) psLightboxShow(psLbI - 1);
            else if (e.target.closest('.ps-lb-next')) psLightboxShow(psLbI + 1);
            else if (e.target === lb || e.target.closest('.ps-lb-close')) psLightboxClose();
        });
        document.addEventListener('keydown', e => {
            if (!lb.classList.contains('active')) return;
            if (e.key === 'Escape') psLightboxClose();
            else if (e.key === 'ArrowLeft') psLightboxShow(psLbI - 1);
            else if (e.key === 'ArrowRight') psLightboxShow(psLbI + 1);
        });
    }
    document.querySelectorAll('.ps-photo').forEach(f => {
        const open = () => psLightboxShow(parseInt(f.dataset.i, 10));
        f.addEventListener('click', open);
        f.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
    });

    // Liste des titres -> change le lecteur Spotify
    document.querySelectorAll('.ps-tracks li').forEach(li => {
        const go = () => psSelect(parseInt(li.dataset.i, 10), false);
        li.addEventListener('click', go);
        li.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
    });
    document.getElementById('psEmbed')?.addEventListener('click', e => {
        if (e.target.closest('.ps-facade')) { psActivated = true; psSelect(psIdx, true); }
    });
    psSelect(0, true);

    // Effet 3D léger sur les cartes de jeux (souris uniquement)
    if (window.matchMedia('(hover: hover)').matches) {
        document.querySelectorAll('.ps-card').forEach(c => {
            c.addEventListener('pointermove', e => {
                const r = c.getBoundingClientRect();
                c.style.setProperty('--ry', (((e.clientX - r.left) / r.width) - .5) * 10 + 'deg');
                c.style.setProperty('--rx', (-(((e.clientY - r.top) / r.height) - .5)) * 10 + 'deg');
            });
            c.addEventListener('pointerleave', () => { c.style.setProperty('--rx', '0deg'); c.style.setProperty('--ry', '0deg'); });
        });
    }

    // Apparition au scroll
    const blocks = document.querySelectorAll('#passions .reveal');
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.12 });
        blocks.forEach(b => io.observe(b));
    } else blocks.forEach(b => b.classList.add('in'));
}

// ==================== BADGE « RECHERCHE DE STAGE » ====================
function availabilityHtml() {
    const A = portfolioData.availability, p = portfolioData.profile, fr = currentLang === 'fr';
    if (!A) return '';
    const rows = A.rows.slice();
    if (pT(A.period)) rows.push({ icon: 'bi-calendar-event', label: { fr: 'Période', en: 'Period' }, text: A.period });
    return `
        <div class="avail">
            <button type="button" class="avail-badge" aria-expanded="false" aria-controls="availPanel">
                <span class="avail-dot"></span><span>${pT(A.badge)}</span><i class="bi bi-chevron-down"></i>
            </button>
            <div class="avail-panel" id="availPanel" role="dialog" aria-label="${pT(A.title)}">
                <h3>${pT(A.title)}</h3>
                <ul>${rows.map(r => `<li><i class="bi ${r.icon}"></i><div><small>${pT(r.label)}</small><span>${pT(r.text)}</span></div></li>`).join('')}</ul>
                <div class="avail-cta">
                    <a class="btn btn-primary" href="mailto:${p.email}">${fr ? "M'écrire" : 'Email me'}</a>
                    <a class="btn btn-secondary" href="${p.cv[currentLang]}" download target="_blank" rel="noopener">CV</a>
                </div>
            </div>
        </div>`;
}

function closeAvailability() {
    const w = document.querySelector('.avail');
    if (!w) return;
    w.classList.remove('open');
    const b = w.querySelector('.avail-badge');
    if (b) b.setAttribute('aria-expanded', 'false');
}

// ==================== MENTIONS LÉGALES ====================
function openLegal() {
    let ov = document.getElementById('legalModal');
    if (!ov) {
        ov = document.createElement('div');
        ov.id = 'legalModal';
        ov.className = 'modal-overlay legal-overlay';
        ov.innerHTML = '<div class="modal-container"><button class="modal-close" aria-label="Close"><i class="bi bi-x-lg"></i></button><div class="modal-content" id="legalContent"></div></div>';
        document.body.appendChild(ov);
        ov.addEventListener('click', e => { if (e.target === ov || e.target.closest('.modal-close')) closeLegal(); });
    }
    const L = portfolioData.legal, email = portfolioData.profile.email;
    document.getElementById('legalContent').innerHTML =
        `<div class="modal-header"><h2>${pT(L.title)}</h2></div><div class="modal-body">` +
        L.sections.map(s => `<div class="modal-section"><h3>${pT(s.h)}</h3><p>${pT(s.p).replace('{email}', `<a href="mailto:${email}">${email}</a>`)}</p></div>`).join('') + '</div>';
    requestAnimationFrame(() => ov.classList.add('active'));
    document.body.style.overflow = 'hidden';
}

function closeLegal() {
    const ov = document.getElementById('legalModal');
    if (ov) ov.classList.remove('active');
    document.body.style.overflow = '';
}

// Clics / clavier gérés une seule fois (les blocs concernés sont régénérés au changement de langue)
document.addEventListener('click', e => {
    const wrap = document.querySelector('.avail');
    if (wrap) {
        if (e.target.closest('.avail-badge')) {
            wrap.classList.toggle('open');
            wrap.querySelector('.avail-badge').setAttribute('aria-expanded', wrap.classList.contains('open'));
        } else if (!e.target.closest('.avail-panel')) closeAvailability();
    }
    if (e.target.closest('.legal-link')) openLegal();
});
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeAvailability(); closeLegal(); }
});
