// ==================== EXTRAS : rail de sections, ambiance, footer ====================
(function () {
    const ids = ['presentation', 'competences', 'diplomes', 'experience', 'realisations', 'contact'];
    let rail = null, cur = 'presentation';

    function buildRail() {
        if (!rail) {
            rail = document.createElement('nav');
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
        if (rail) rail.querySelectorAll('a').forEach((a, i) => { a.className = i === k ? 'on' : (i < k ? 'past' : ''); });
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
        const p = portfolioData.profile, fr = currentLang === 'fr';
        f.innerHTML = `
            <div class="ft-links">
                <a href="${p.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a>
                <a href="mailto:${p.email}" aria-label="Email"><i class="bi bi-envelope-fill"></i></a>
            </div>
            <p class="ft-line">${fr ? 'Site conçu, designé et développé par' : 'Website designed and developed by'} <strong>${p.name}</strong></p>
            <p class="ft-line">${fr ? 'Réalisé avec HTML, CSS, JavaScript, Three.js et Bootstrap Icons.' : 'Built with HTML, CSS, JavaScript, Three.js and Bootstrap Icons.'}</p>
            <p class="ft-line">&copy; ${new Date().getFullYear()} ${p.name}. ${fr ? 'Tous droits réservés.' : 'All rights reserved.'}</p>`;
    }

    function init() {
        buildRail();
        buildFooter();
        const io = new IntersectionObserver(es => {
            es.forEach(e => { if (e.isIntersecting) mark(e.target.id); });
        }, { rootMargin: '-45% 0px -45% 0px' });
        ids.forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });
    }

    // Changement de langue : le bouton est régénéré par script.js, on reconstruit après son handler
    document.addEventListener('click', e => {
        if (e.target.closest && e.target.closest('#langBtn')) setTimeout(() => { buildRail(); buildFooter(); }, 0);
    });

    init();
})();
