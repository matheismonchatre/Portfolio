// ==================== BASE DE DONNÉES ==================== 

const portfolioData = {
    // Informations personnelles
    profile: {
        name: "Mathéis MONCHATRE",
        title: {
            fr: "Développeur Web",
            en: "Web Developer"
        },
        image: "./img/profile.jpg",
        email: "math.monchatre@gmail.com",
        linkedin: "https://www.linkedin.com/in/matheis-monchatre",
        github: "#",
        cv: {
            fr: "./img/MONCHATRE_MATHEIS_CV_FR.pdf",
            en: "./img/MONCHATRE_MATHEIS_CV_EN.pdf"
        },
        description: {
            fr: [
                "Développeur web, aujourd'hui en première année de Master MTI3D à Laval, je suis curieux et passionné par les innovations technologiques et la réalité virtuelle. De joueur à concepteur, je mets ma créativité et mes compétences techniques au service de projets interactifs et immersifs variés.",
                "Passionné de sport, notamment d'équitation que je pratique depuis plusieurs années, j'aime aussi l'art et le dessin. Les jeux vidéo et les animations ont marqué mon enfance et continuent de m'inspirer dans mon travail créatif."
            ],
            en: [
                "Web developer, currently in the first year of the MTI3D Master's in Laval, I am curious and passionate about technological innovation and virtual reality. From player to designer, I put my creativity and technical skills to work on varied interactive and immersive projects.",
                "Sports enthusiast, especially horse riding which I have practiced for several years, I also love art and drawing. Video games and animations shaped my childhood and continue to inspire my creative work."
            ]
        },
        keywords: {
            fr: ["Développeur web", "Créatif", "Curieux", "Passionné", "Immersif"],
            en: ["web developer", "Creative", "Curious", "Passionate", "Immersive"]
        }
    },

    // Compétences ---------------------------------------------------------------------------------------------------
    skills: [
        {
            id: "frontend",
            icon: "bi-code-slash",
            title: {
                fr: "Front-end",
                en: "Front-end"
            },
            items: [
                { name: "HTML / CSS", level: 90 },
                { name: "JavaScript", level: 80 },
                { name: "ChartJs", level: 75 },
                { name: "Three.js", level: 75 },
                { name: "Vue.js", level: 60 },
                { name: "React.js", level: 75 },
                { name: "API REST", level: 70 },

            ]
        },
        {
            id: "CMS",
            icon: "bi-grid-1x2-fill",
            title: {
                fr: "CMS",
                en: "CMS"
            },
            items: [
                { name: "WordPress", level: 75 },
                { name: "Joomla", level: 60 },

            ]
        },
        {
            id: "design",
            icon: "bi-palette",
            title: {
                fr: "Graphisme",
                en: "Design"
            },
            items: [
                { name: "Figma", level: 70 },
                { name: "App Adobe", level: 75 }
            ]
        },
        {
            id: "modeling3d",
            icon: "bi-box",
            title: { fr: "Modélisation 3D & autres", en: "3D Modeling & more" },
            items: [
                { name: "Unity", level: 80 },
                { name: "Blender", level: 75 },
                { name: "Fusion", level: 70 }
            ]
        },
        {
            id: "backend",
            icon: "bi-server",
            title: {
                fr: "Back-end",
                en: "Back-end"
            },
            items: [
                { name: "PHP / SQL", level: 85 },
                { name: "Laravel", level: 65 },
                { name: "Symfony", level: 75 },
                { name: "NodeJs / Express", level: 50 },
                { name: "Python / Flask", level: 60 },
                { name: "C++", level: 70 },
                { name: "Git", level: 80 },
                { name: "Docker", level: 50 }
            ]
        },
        {
            id: "languages",
            icon: "bi-translate",
            title: {
                fr: "Langues",
                en: "Languages"
            },
            items: [
                {
                    name: { fr: "Français", en: "French" },
                    level: 100
                },
                {
                    name: { fr: "Anglais", en: "English" },
                    level: 70
                },
                {
                    name: { fr: "Espagnol", en: "Spanish" },
                    level: 45
                }
            ]
        },
        {
            id: "Sciences",
            icon: "bi-cpu",
            title: {
                fr: "Sciences",
                en: "Sciences"
            },
            items: [
                { name: { fr: "Automate", en: "Automation" }, level: 70 },
                { name: { fr: "Circuit électronique", en: "Electronic Circuit" }, level: 60 },
                { name: { fr: "Architecture", en: "Architecture" }, level: 75 },
                { name: { fr: "Mécanique des forces", en: "Mechanics of Forces" }, level: 70 }

            ]
        }
    ],

    // Expériences ------------------------------------------------------------------------------------------------------------------------------------------------------------------
    experiences: [
        {
            id: "exp1",
            year: "2026",
            time: "15 semaines",
            company: "Pixim Communication - Saumur",
            role: {
                fr: "Stage - Développeur front & back end",
                en: "Internship - Front & back end developer"
            },
            description: {
                fr: "Développement de plusieurs sites internet avec Joomla (Domaine de Nerleux, Timmerman traiteur à Saumur, pages du Domaine de Bourgueil) et d'une application administrative en React et Symfony pour gérer les sites et domaines de l'agence.",
                en: "Development of several websites with Joomla (Domaine de Nerleux, Timmerman caterer in Saumur, pages of the Domaine de Bourgueil) and of an administrative application in React and Symfony to manage the agency's websites and domains."
            }
        },
        {
            id: "exp2",
            year: "2025",
            time: "11 semaines",
            company: "Laboratoire LIFAT - Blois",
            role: {
                fr: "Stage en entreprise",
                en: "Internship"
            },
            description: {
                fr: "Développement d'un site web responsive et d'une API Python (Flask) avec visualisations interactives. Utilisation de Git, Figma et Chart.js pour créer des interfaces modernes et performantes.",
                en: "Development of a responsive website and Python API (Flask) with interactive visualizations. Used Git, Figma and Chart.js to create modern and performant interfaces."
            }
        },
        {
            id: "exp3",
            year: "2023 - 2025",
            time: "2 mois chaque année",
            company: "SEL TON CHAR - Barbâtre",
            role: {
                fr: "Moniteur char à voile",
                en: "Sand yachting instructor"
            },
            description: {
                fr: "Animation et enseignement du char à voile durant la saison estivale (Juillet-Août). Encadrement de groupes et garantie de la sécurité des participants.",
                en: "Sand yachting instruction and coaching during summer season (July-August). Group supervision and participant safety management."
            }
        },
        {
            id: "exp4",
            year: "2021 - 2023",
            time: "2 mois chaque année",
            company: "SARL Champmarin - Aubigné-Racan",
            role: {
                fr: "Employé saisonnier agricole",
                en: "Seasonal agricultural worker"
            },
            description: {
                fr: "Travail saisonnier dans le secteur agricole : castration du maïs et du cerfeuil. Développement de compétences en travail d'équipe et rigueur.",
                en: "Seasonal agricultural work: corn and chervil pollination. Developed teamwork skills and rigor."
            }
        },
        {
            id: "exp5",
            year: "2019",
            time: "1 semaine",
            company: "PMB - Château-du-Loir",
            role: {
                fr: "Stage découverte développement web en entreprise",
                en: "Web development discovery internship in a company"
            },
            description: {
                fr: "Stage 3ème - Découverte du travail en entreprise/ développement web (HTML), lors de se stage je suis venu réaliser mon propre cv en explorant toutes les possibilités du HTML et CSS.",
                en: "3rd grade internship - Discovery of working in a company/ web development (HTML), during this internship I came to create my own CV by exploring all the possibilities of HTML and CSS."
            }
        }
    ],

    // Diplômes
    diplomas: [
        {
            id: "dip0",
            year: "2026-2028",
            title: { fr: "Master MTI3D", en: "MTI3D Master's" },
            institution: "Laval Virtual Center - Laval",
            description: {
                fr: "Master Management des Technologies Interactives 3D : réalité virtuelle, projets interactifs et immersifs.",
                en: "Master's in Management of 3D Interactive Technologies: virtual reality, interactive and immersive projects."
            }
        },
        {
            id: "dip1",
            year: "2023-2026",
            title: {
                fr: "BUT MMI",
                en: "BUT MMI"
            },
            institution: "IUT de Blois",
            description: {
                fr: "Formation du Métiers du Multimédia et de l'Internet - projet, design et dev web, en parcours Development Web.",
                en: "Bachelor of Multimedia and Internet - projects, design and web dev, in the Development Web track."
            }
        },
        {
            id: "dip2",
            year: "2023",
            title: {
                fr: "CQP Moniteur de char à voile",
                en: "CQP Sand Yachting Instructor"
            },
            institution: "Base nautique de Saint-Jean-de-Monts",
            description: {
                fr: "Formation d'encadrement en char à voile et gestion de la sécurité d'un groupe.",
                en: "Training in sand yachting instruction and group safety management."
            }
        },
        {
            id: "dip3",
            year: "2020-2023",
            title: {
                fr: "Baccalauréat STI2D",
                en: "STI2D High School Diploma"
            },
            institution: "Lycée d'Estournelles de Constant - La Flèche",
            description: {
                fr: "Formation technologique orientée sciences et technologies de l'industrie et du développement durable, en parcour Systèmes d'Information et Numérique.",
                en: "Technological orientation focused on industrial sciences and techniques and development sustainability, in the field of Information Systems and Digital Technologya."
            }
        }
    ],

    // Projets ------------------------------------------------------------------------------------------------------------------------------------------------------------------
    projects: {
        dev: [
            {
                id: "project-dev-1",
                title: "Site E-commerce Nature",
                category: "dev",
                thumbnail: "./img/dev/lf.png",
                images: ["./img/dev/lf.png"],
                tags: ["HTML", "CSS", "JSON"],
                shortDescription: {
                    fr: "Site de e-commerce pour plantes et accessoires animaliers",
                    en: "E-commerce website for plants and pet accessories"
                },
                fullDescription: {
                    fr: "Création d'un site de e-commerce complet destiné à la vente de plantes, d'accessoires et d'alimentation pour les animaux. Le projet a été réalisé entièrement en HTML/CSS avec une gestion dynamique des produits en JSON. L'interface utilisateur a été conçue pour être intuitive et responsive, offrant une expérience d'achat fluide sur tous les appareils.",
                    en: "Complete e-commerce website for selling plants, accessories and pet food. The project was built entirely with HTML/CSS with dynamic product management in JSON. The user interface was designed to be intuitive and responsive, providing a smooth shopping experience on all devices."
                },
                technologies: ["HTML5", "CSS3", "JavaScript", "JSON"],
                features: {
                    fr: [
                        "Catalogue de produits dynamique",
                        "Système de filtrage par catégorie",
                        "Panier d'achat interactif",
                        "Design responsive et moderne",
                        "Gestion des données en JSON"
                    ],
                    en: [
                        "Dynamic product catalog",
                        "Category filtering system",
                        "Interactive shopping cart",
                        "Responsive and modern design",
                        "JSON data management"
                    ]
                },
                challenges: {
                    fr: "Le principal défi a été de créer un système de gestion de panier entièrement en JavaScript vanilla, sans framework, tout en maintenant une performance optimale.",
                    en: "The main challenge was to create a cart management system entirely in vanilla JavaScript, without framework, while maintaining optimal performance."
                },
                link: "#",
                github: "#"
            },
            {
                id: "project-dev-2",
                title: "LeenScreen - E-commerce",
                category: "dev",
                thumbnail: "./img/dev/leenscreen.png",
                images: ["./img/dev/leenscreen.png"],
                tags: ["Vue.js", "Figma", "JSON"],
                shortDescription: {
                    fr: "Plateforme e-commerce pour composants d'écran",
                    en: "E-commerce platform for screen components"
                },
                fullDescription: {
                    fr: "Site de e-commerce spécialisé dans la vente de composants d'écran pour PC et ordinateurs portables. Le projet a été développé avec Vue.js pour offrir une interface réactive et moderne. Une maquette complète a été réalisée sur Figma avant le développement, permettant une conception user-centered et une expérience utilisateur optimisée.",
                    en: "E-commerce website specialized in selling screen components for PC and laptops. The project was developed with Vue.js to offer a reactive and modern interface. A complete mockup was created on Figma before development, allowing user-centered design and optimized user experience."
                },
                technologies: ["Vue.js 3", "Figma", "JavaScript", "JSON", "CSS3"],
                features: {
                    fr: [
                        "Interface développée avec Vue.js",
                        "Maquette Figma détaillée",
                        "Composants réutilisables",
                        "Gestion d'état avec Vue",
                        "Animations fluides"
                    ],
                    en: [
                        "Interface built with Vue.js",
                        "Detailed Figma mockup",
                        "Reusable components",
                        "State management with Vue",
                        "Smooth animations"
                    ]
                },
                challenges: {
                    fr: "L'apprentissage de Vue.js et l'implémentation d'une architecture de composants maintenable ont été les principaux défis relevés avec succès.",
                    en: "Learning Vue.js and implementing a maintainable component architecture were the main challenges successfully overcome."
                },
                link: "#",
                github: "#"
            },
            {
                id: "project-dev-3",
                title: "Tenor Not - Application Web",
                category: "dev",
                thumbnail: "./img/dev/tenornot.png",
                images: [
                    "./img/dev/tenornot.png",
                    "./img/dev/tenornot1.png",
                    "./img/dev/tenornot2.png",
                    "./img/dev/tenornot3.png",
                    "./img/dev/tenornot4.png"
                ],
                tags: ["HTML", "CSS", "JavaScript"],
                shortDescription: {
                    fr: "Application web interactive multi-pages",
                    en: "Interactive multi-page web application"
                },
                fullDescription: {
                    fr: "Application web complète avec plusieurs interfaces et fonctionnalités dynamiques. Le projet présente une navigation fluide entre différentes sections, chacune offrant des interactions uniques. L'architecture du code a été pensée pour être modulaire et facilement extensible.",
                    en: "Complete web application with multiple interfaces and dynamic features. The project features smooth navigation between different sections, each offering unique interactions. The code architecture was designed to be modular and easily extensible."
                },
                technologies: ["HTML5", "CSS3", "JavaScript ES6", "Local Storage"],
                features: {
                    fr: [
                        "Navigation multi-pages fluide",
                        "Interfaces interactives variées",
                        "Animations CSS avancées",
                        "Architecture modulaire",
                        "Stockage local des préférences"
                    ],
                    en: [
                        "Smooth multi-page navigation",
                        "Various interactive interfaces",
                        "Advanced CSS animations",
                        "Modular architecture",
                        "Local storage of preferences"
                    ]
                },
                challenges: {
                    fr: "Créer une expérience utilisateur cohérente à travers plusieurs pages tout en maintenant des performances optimales.",
                    en: "Creating a consistent user experience across multiple pages while maintaining optimal performance."
                },
                link: "#",
                github: "#"
            },
            {
                id: "project-dev-11",
                title: "Selexini - Recherche lexicale",
                category: "dev",
                thumbnail: "./img/dev/selexini.png",
                images: ["./img/dev/selexini.png"],
                tags: ["Recherche lexicale", "Multilingue", "Stage"],
                internship: { fr: "Réalisé pendant mon stage à l'IUT de Blois (laboratoire LIFAT)", en: "Built during my internship at IUT de Blois (LIFAT laboratory)" },
                shortDescription: {
                    fr: "Extension d'un site existant avec une recherche lexicale par mot, multilingue",
                    en: "Extension of an existing website with a multilingual, word-based lexical search"
                },
                fullDescription: {
                    fr: "Selexini est un projet de recherche (ANR) autour de l'induction de lexiques sémantiques, auquel participe le LIFAT à Blois. Durant mon stage, j'ai réalisé une extension du site existant pour y ajouter un système de recherche lexicale par mot, disponible en plusieurs langues.",
                    en: "Selexini is a research project (ANR) on semantic lexicon induction, in which the LIFAT laboratory in Blois takes part. During my internship, I built an extension of the existing website to add a word-based lexical search system, available in several languages."
                },
                technologies: ["Recherche lexicale", "Multilingue", "Extension de site"],
                features: {
                    fr: ["Recherche lexicale par mot", "Recherche multilingue", "Extension intégrée au site existant"],
                    en: ["Word-based lexical search", "Multilingual search", "Extension integrated into the existing website"]
                },
                challenges: {
                    fr: "Étendre un site existant avec un système de recherche multilingue sans perturber son fonctionnement.",
                    en: "Extending an existing website with a multilingual search system without disrupting how it works."
                },
                link: "https://selexini.lis-lab.fr",
                github: "#"
            },
            {
                id: "project-dev-4",
                title: "Olympeak - Application Web",
                category: "dev",
                thumbnail: "./img/dev/olympeak.png",
                images: [
                    "./img/dev/olympeak.png",
                    "./img/dev/olympeak1.png",
                    "./img/dev/olympeak2.png",
                    "./img/dev/olympeak3.png",
                    "./img/dev/olympeak4.png",
                    "./img/dev/olympeak5.png",
                    "./img/dev/olympeak6.png",
                ],
                tags: ["REACT", "Symfony", "HTML", "CSS", "JavaScript"],
                shortDescription: {
                    fr: "Création d'une appli web interactive en methode fullstack avec React et Symfony",
                    en: "Creating an interactive multi-page web application with React and Symfony"
                },
                fullDescription: {
                    fr: "Réalisation d'un site permetant de venir retrouver toute les nouvelles du monde du sport, de suivre les compétitions en direct et de consulter les résultats. Le projet a été développé en méthode fullstack avec React pour le front-end et Symfony pour le back-end, offrant une expérience utilisateur fluide et moderne.",
                    en: "Development of a website allowing users to find all the latest news in the world of sports, follow live competitions and check results. The project was developed in fullstack method with React for the front-end and Symfony for the back-end, providing a smooth and modern user experience."
                },
                technologies: ["REACT", "Symfony", "HTML5", "CSS3", "JavaScript"],
                features: {
                    fr: [
                        "Navigation multi-pages fluide",
                        "Interfaces interactives variées",
                        "Architecture react et symfony",
                        "Stockage local des préférences",
                        "Gestion des données avec Symfony et des rôles utilisateurs"
                    ],
                    en: [
                        "Smooth multi-page navigation",
                        "Various interactive interfaces",
                        "React and Symfony architecture",
                        "Local storage of preferences",
                        "Data management with Symfony and user roles"
                    ]
                },
                challenges: {
                    fr: "Créer une expérience utilisateur agréable à travers plusieurs fonctionnalités à la gestion de l'utilisateur tout en maintenant des performances optimales.",
                    en: "Creating an enjoyable user experience across multiple features related to user management while maintaining optimal performance."
                },
                link: "#",
                github: "#"
            },
            {
                id: "project-dev-5",
                title: "Sportivea - Evenement Web",
                category: "dev",
                thumbnail: "./img/dev/Sportivea.png",
                images: [
                    "./img/dev/Sportivea.png",
                    "./img/dev/Sportivea1.png",
                    "./img/dev/Sportivea2.png",
                    "./img/dev/Sportivea3.png",
                    "./img/dev/Sportivea4.png",
                    "./img/dev/Sportivea5.png",
                    "./img/dev/Sportivea6.png",
                ],
                tags: ["NodeJs", "Express", "HTML", "Tailwind CSS", "JavaScript"],
                shortDescription: {
                    fr: "Application web gestion d'évènement participatif ",
                    en: "Interactive multi-page web application for event management"
                },
                fullDescription: {
                    fr: "Une création dédié à la gestion d'évènement sportif, permettant aux utilisateurs de créer, gérer et participer à des événements sportifs locaux. Le projet a été développé avec NodeJs et Express pour le back-end, offrant une expérience utilisateur fluide et moderne. Pour voir le projet, cliquez sur le lien suivant : <a href=\"http://sportivea.alwaysdata.net\" target=\"_blank\">Voir le projet</a>",
                    en: "A creation dedicated to sports event management, allowing users to create, manage and participate in local sports events. The project was developed with NodeJs and Express for the back-end, providing a smooth and modern user experience. To view the project, click on the following link: <a href=\"http://sportivea.alwaysdata.net\" target=\"_blank\">View the project</a>"
                },
                technologies: ["NodeJs", "Express", "HTML5", "Tailwind CSS", "JavaScript"],
                features: {
                    fr: [
                        "Utilisation simple, rapide et fluide",
                        "Interfaces interactives variées et modernes",
                        "Architecture nodejs et express",
                        "Gestion des données sous forme de JSON"
                    ],
                    en: [
                        "Simple, fast and smooth to use",
                        "Various interactive interfaces and modern",
                        "NodeJs and Express architecture",
                        "Data management with JSON"
                    ]
                },
                challenges: {
                    fr: "Créer un endroit dédié à la gestion d'évènements sportifs, pour tous les athlètes et passionnés de sport.",
                    en: "Creating a dedicated place for sports event management, for all athletes and sports enthusiasts."
                },
                link: "http://sportivea.alwaysdata.net",
                github: "#"
            }
            ,
            {
                id: "project-dev-6",
                title: "Domaine de Nerleux - Site Joomla",
                category: "dev",
                thumbnail: "./img/dev/nerleux.png",
                images: ["./img/dev/nerleux.png"],
                tags: ["Joomla", "Stage", "CMS"],
                internship: { fr: "Réalisé pendant mon stage chez Pixim Communication", en: "Built during my internship at Pixim Communication" },
                shortDescription: { fr: "Site vitrine d'un domaine viticole réalisé en stage avec Joomla", en: "Showcase website for a wine estate, built during my internship with Joomla" },
                fullDescription: { fr: "Réalisation du site du Domaine de Nerleux avec Joomla, durant mon stage chez Pixim Communication. Intégration des maquettes, mise en place de la structure du CMS et personnalisation du template pour un rendu fidèle à l'identité du domaine.", en: "Creation of the Domaine de Nerleux website with Joomla, during my internship at Pixim Communication. Mockup integration, CMS structure setup and template customisation to match the estate's identity." },
                technologies: ["Joomla", "HTML5", "CSS3", "PHP"],
                features: { fr: ["Site réalisé en stage chez Pixim Communication", "Structure de contenu Joomla", "Template personnalisé", "Design responsive"], en: ["Built during an internship at Pixim Communication", "Joomla content structure", "Customised template", "Responsive design"] },
                challenges: { fr: "Adapter un CMS à l'identité visuelle d'un client tout en gardant un site simple à administrer.", en: "Adapting a CMS to a client's visual identity while keeping the site easy to manage." },
                link: "#",
                github: "#"
            },
            {
                id: "project-dev-7",
                title: "Timmerman - Traiteur de Saumur",
                category: "dev",
                thumbnail: "./img/dev/timmerman.png",
                images: ["./img/dev/timmerman.png"],
                tags: ["Joomla", "Stage", "CMS"],
                internship: { fr: "Réalisé pendant mon stage chez Pixim Communication", en: "Built during my internship at Pixim Communication" },
                shortDescription: { fr: "Site du traiteur Timmerman à Saumur, réalisé en stage avec Joomla", en: "Website for the Timmerman caterer in Saumur, built during my internship with Joomla" },
                fullDescription: { fr: "Site complet du traiteur Timmerman (Saumur) réalisé avec Joomla lors de mon stage chez Pixim Communication : présentation de l'offre, pages de contenu et mise en page soignée pour le client.", en: "Complete website for the Timmerman caterer (Saumur) built with Joomla during my internship at Pixim Communication: offer presentation, content pages and a polished layout for the client." },
                technologies: ["Joomla", "HTML5", "CSS3", "PHP"],
                features: { fr: ["Site réalisé en stage chez Pixim Communication", "Pages de présentation de l'offre", "Gestion de contenu simple pour le client", "Design responsive"], en: ["Built during an internship at Pixim Communication", "Offer presentation pages", "Simple content management for the client", "Responsive design"] },
                challenges: { fr: "Livrer un site clair et facile à mettre à jour par le client, dans les délais du stage.", en: "Delivering a clear site the client can easily update, within the internship timeframe." },
                link: "#",
                github: "#"
            },
            {
                id: "project-dev-8",
                title: "Domaine de Bourgueil - Pages Joomla",
                category: "dev",
                thumbnail: "./img/dev/bourgueil.png",
                images: ["./img/dev/bourgueil.png"],
                tags: ["Joomla", "Stage", "CMS"],
                internship: { fr: "Réalisé pendant mon stage chez Pixim Communication", en: "Built during my internship at Pixim Communication" },
                shortDescription: { fr: "Réalisation de plusieurs pages du site du Domaine de Bourgueil", en: "Creation of several pages of the Domaine de Bourgueil website" },
                fullDescription: { fr: "Contribution au site du Domaine de Bourgueil sous Joomla pendant mon stage chez Pixim Communication : j'ai réalisé certains éléments et certaines pages du site, en cohérence avec le reste de l'existant.", en: "Contribution to the Domaine de Bourgueil website on Joomla during my internship at Pixim Communication: I built some page elements and pages, consistent with the existing site." },
                technologies: ["Joomla", "HTML5", "CSS3"],
                features: { fr: ["Contribution réalisée en stage chez Pixim Communication", "Pages et éléments de page", "Cohérence avec l'existant"], en: ["Contribution made during an internship at Pixim Communication", "Pages and page elements", "Consistency with the existing site"] },
                challenges: { fr: "Intégrer mes pages dans un site existant sans casser sa cohérence visuelle.", en: "Integrating my pages into an existing site without breaking its visual consistency." },
                link: "#",
                github: "#"
            },
            {
                id: "project-dev-9",
                title: "Pixim Admin - Back-office",
                category: "dev",
                thumbnail: "./img/dev/pixim-admin.png",
                images: ["./img/dev/pixim-admin.png"],
                tags: ["React", "Symfony", "Stage", "Admin"],
                internship: { fr: "Réalisé pendant mon stage chez Pixim Communication", en: "Built during my internship at Pixim Communication" },
                shortDescription: { fr: "Application d'administration pour gérer les sites et domaines de l'agence", en: "Administration app to manage the agency's websites and domains" },
                fullDescription: { fr: "Application administrative créée pour l'agence Pixim Communication afin de gérer son portefeuille de sites internet, les domaines liés aux adresses e-mail et son serveur interne. Elle comprend un système d'authentification avec un super utilisateur et des utilisateurs classiques. Une évolution vers la comptabilité est prévue.", en: "Administration application created for the agency Pixim Communication to manage its portfolio of websites, the domains linked to email addresses and its internal server. It includes authentication with a super user and standard users. An evolution towards accounting is planned." },
                technologies: ["React", "Symfony", "API REST", "SQL"],
                features: { fr: ["Gestion du portefeuille de sites", "Gestion des domaines et adresses e-mail", "Gestion du serveur interne", "Connexion avec super utilisateur et utilisateurs", "Évolution prévue : comptabilité"], en: ["Website portfolio management", "Domain and email address management", "Internal server management", "Login with super user and standard users", "Planned: accounting module"] },
                challenges: { fr: "Concevoir une gestion des rôles et des accès fiable, et une base évolutive pour la comptabilité.", en: "Designing reliable role and access management, and a scalable base for accounting." },
                link: "#",
                github: "#"
            },
            {
                id: "project-dev-10",
                title: "Aetheria - Jeu de plateforme",
                category: "dev",
                thumbnail: "./img/dev/aetheria.png",
                images: ["./img/dev/aetheria.png", "./img/dev/aetheria1.png", "./img/dev/aetheria2.png", "./img/dev/aetheria3.png"],
                tags: ["C++", "SFML", "Jeu vidéo"],
                
                shortDescription: { fr: "Jeu de plateforme 2D en C++ avec SFML", en: "2D platformer game in C++ with SFML" },
                fullDescription: { fr: "Conception d'un jeu de plateforme original en C++ (SFML) respectant un cahier des charges rigoureux, avec gestion des collisions, des mouvements et de la physique des personnages. Le design a été réalisé par mes soins ; face à un délai assez court, certains éléments graphiques ont été générés par IA plutôt que dessinés à la main ou repris de sprite sheets en ligne.", en: "Design of an original platformer in C++ (SFML) meeting strict specifications, with collision handling, movement and character physics. The design was made by me; given a fairly short deadline, some graphic assets were AI-generated rather than hand-drawn or taken from online sprite sheets." },
                technologies: ["C++", "SFML", "Game design"],
                features: { fr: ["Gestion des collisions", "Mouvements et physique des personnages", "Plusieurs niveaux et menu", "Design réalisé par mes soins, avec une part d'éléments générés par IA"], en: ["Collision handling", "Character movement and physics", "Several levels and a menu", "Design made by me, with some AI-generated assets"] },
                challenges: { fr: "Respecter un cahier des charges strict dans un délai court, avec un moteur de jeu et une physique codés en C++.", en: "Meeting strict specifications on a short deadline, with game engine and physics coded in C++." },
                link: "#",
                github: "#"
            },
            {
                id: "project-dev-12",
                title: { fr: "Jeu d'infiltration - Unity", en: "Stealth Game - Unity" },
                category: "dev",
                status: { fr: "Projet en cours", en: "Work in progress" },
                tags: ["Unity", "C#", "Blender", "Jeu vidéo"],
                shortDescription: {
                    fr: "Jeu de quête sous Unity : récupérer un objet sans se faire repérer par les militaires",
                    en: "Unity quest game: retrieve an object without being spotted by the soldiers"
                },
                fullDescription: {
                    fr: "Jeu créé sur Unity, avec des modèles 3D réalisés sur Blender et importés dans le moteur. La plupart des éléments du jeu sont programmés en C#, le langage de Unity. Le joueur doit récupérer un objet sans se faire remarquer par les militaires, qui disposent d'un cône de vision et peuvent réagir de plusieurs façons : tirer ou attraper le joueur. La mission se termine en rejoignant un point d'extraction. Projet en cours de réalisation.",
                    en: "Game created in Unity, with 3D models made in Blender and imported into the engine. Most of the game is scripted in C#, Unity's language. The player must retrieve an object without being noticed by the soldiers, who have a vision cone and can react in several ways: shooting or grabbing the player. The mission ends by reaching an extraction point. Work in progress."
                },
                technologies: ["Unity", "C#", "Blender"],
                features: {
                    fr: ["Mission : récupérer un objet sans se faire repérer", "Militaires avec cône de vision", "Réactions des militaires : tirer ou attraper le joueur", "Point d'extraction pour terminer la mission", "Modèles 3D réalisés sur Blender"],
                    en: ["Mission: retrieve an object without being spotted", "Soldiers with a vision cone", "Soldier reactions: shoot or grab the player", "Extraction point to complete the mission", "3D models made in Blender"]
                },
                link: "#",
                github: "#"
            }
        ],
        // Design ------------------------------------------------------------------------------------------------------------------------------------------------------------------
        design: [
            {
                id: "project-design-1",
                title: {
                    fr: "Pochette d'album",
                    en: "Album Cover"
                },
                category: "design",
                thumbnail: "./img/design/Album devant.png",
                images: ["./img/design/Album devant.png", "./img/design/album derrière.png"],
                tags: ["Design", "Photoshop"],
                shortDescription: {
                    fr: "Conception graphique d'une pochette d'album musicale avec pour thème Imagine Dragons",
                    en: "Graphic design of a music album cover with the theme Imagine Dragons"
                },
                fullDescription: {
                    fr: "Projet universitaire de conception graphique d'une pochette d'album complète (recto/verso) avec une identité visuelle forte et cohérente. Le design a été pensé pour capturer l'essence de l'artiste tout en respectant les codes visuels du genre musical. L'utilisation de Photoshop a permis de créer des effets visuels sophistiqués et une composition équilibrée.",
                    en: "University project involving the graphic design of a complete album cover (front and back) with a strong and consistent visual identity. The design was conceived to capture the essence of the artist while respecting the visual codes of the musical genre. The use of Photoshop made it possible to create sophisticated visual effects and a balanced composition."
                },
                technologies: ["Adobe Photoshop", "Typography", "Color Theory"],
                features: {
                    fr: [
                        "Design recto/verso complet",
                        "Identité visuelle forte",
                        "Composition typographique soignée",
                        "Effets visuels créatifs",
                        "Respect des normes d'impression"
                    ],
                    en: [
                        "Complete front/back design",
                        "Strong visual identity",
                        "Careful typographic composition",
                        "Creative visual effects",
                        "Print standards compliance"
                    ]
                },
                link: "#"
            },
            {
                id: "project-design-2",
                title: "ChocoYum - Identité visuelle",
                category: "design",
                thumbnail: "./img/design/ChocoYum.png",
                images: [
                    "./img/design/ChocoYum.png",
                    "./img/design/ChocoYumZone.png",
                    "./img/design/ChocoYumGris.png"
                ],
                tags: ["Branding", "Logo", "Adobe Illustrator"],
                shortDescription: {
                    fr: "Refonte complète de l'identité visuelle d'entreprise",
                    en: "Complete corporate visual identity redesign"
                },
                fullDescription: {
                    fr: "Création complète d'un logo et de son identité visuelle suite à une refonte d'entreprise dans un cadre universitaire basé sur un cas réel. Le projet inclut la charte graphique complète avec les zones de protection, les déclinaisons couleur (couleur, noir et blanc, niveaux de gris), et les règles d'utilisation. L'objectif était de moderniser l'image de marque tout en conservant une reconnaissance immédiate.",
                    en: "Complete logo creation and visual identity following company rebranding in academic context based on real case. The project includes complete brand guidelines with protection zones, color variations (color, black and white, grayscale), and usage rules. The goal was to modernize the brand image while maintaining immediate recognition."
                },
                technologies: ["Adobe Illustrator", "Branding", "Vector Design"],
                features: {
                    fr: [
                        "Logo vectoriel complet",
                        "Charte graphique détaillée",
                        "Déclinaisons couleur multiples",
                        "Zones de protection définies",
                        "Guide d'utilisation"
                    ],
                    en: [
                        "Complete vector logo",
                        "Detailed brand guidelines",
                        "Multiple color variations",
                        "Defined protection zones",
                        "Usage guide"
                    ]
                },
                link: "#"
            },
            {
                id: "project-design-3",
                title: {
                    fr: "Maquette Interactive",
                    en: "Interactive Mockup"
                },
                category: "design",
                thumbnail: "./img/design/figma3.png",
                images: [
                    "./img/design/figma3.png",
                    "./img/design/figma4.png",
                    "./img/design/figma2.png",
                    "./img/design/figma.png"
                ],
                tags: ["Figma", "UI/UX"],
                shortDescription: {
                    fr: "Maquette interactive avec système de design complet",
                    en: "Interactive mockup with complete design system"
                },
                fullDescription: {
                    fr: "Création d'une maquette interactive complète sous Figma avec charte graphique et guide de style détaillés. Le projet comprend tous les écrans de l'application, les interactions entre les pages, et un système de design avec composants réutilisables. L'accent a été mis sur l'expérience utilisateur et l'accessibilité.",
                    en: "Complete interactive mockup created in Figma with detailed brand guidelines and style guide. The project includes all application screens, page interactions, and a design system with reusable components. Focus was placed on user experience and accessibility."
                },
                technologies: ["Figma", "UI Design", "UX Design", "Prototyping"],
                features: {
                    fr: [
                        "Maquette interactive complète",
                        "Système de design unifié",
                        "Guide de style détaillé",
                        "Composants réutilisables",
                        "Prototype fonctionnel"
                    ],
                    en: [
                        "Complete interactive mockup",
                        "Unified design system",
                        "Detailed style guide",
                        "Reusable components",
                        "Functional prototype"
                    ]
                },
                link: "#"
            },
            {
                id: "project-design-4",
                title: {
                    fr: "Pictogramme thématique",
                    en: "Thematic Pictogram"
                },
                category: "design",
                thumbnail: "./img/design/pictograme.png",
                images: [
                    "./img/design/pictograme.png"
                ],
                tags: ["Picto", "Adobe Illustrator"],
                shortDescription: {
                    fr: "Pictogramme thématique sur le thème du japon ",
                    en: "Thematic pictogram on the theme of japan"
                },
                fullDescription: {
                    fr: "Création de pictogramme sur le thème du Japon, inspiré des motifs traditionnels et de l'esthétique japonaise. En respectant des contraintes imposées lors de l'exercice, qui était de venir séparé le pictogramme en 2 partie distinctes et reprensenté des éléments de la région choisis afin de venir réalisé des éléments symboliques de tous les jours.",
                    en: "Thematic pictogram created on the theme of Japan, inspired by traditional motifs and Japanese aesthetics. The constraints imposed during the exercise required splitting the pictogram into two distinct parts and representing elements of the chosen region to create symbolic elements of everyday life."
                },
                technologies: ["Adobe Illustrator", "Picto Design", "Vector Graphics"],
                features: {
                    fr: [
                        "Pictogramme thématique complet",
                        "Conception vectorielle précise",
                        "Respect des contraintes de design",
                        "Composants réutilisables",
                        "Pictogramme fonctionnel"
                    ],
                    en: [
                        "Complete thematic pictogram",
                        "Precise vector design",
                        "Design constraints respected",
                        "Reusable components",
                        "Functional pictogram"
                    ]
                },
                link: "#"
            },
            {
                id: "project-design-6",
                title: { fr: "Séance photo - Groupe de musique", en: "Photo Shoot - Music Band" },
                category: "design",
                icon: "bi-camera-fill",
                badgeIcon: "bi-mortarboard-fill",
                internship: { fr: "Réalisé lors d'une SAE (projet tutoré)", en: "Made during a SAE (tutored project)" },
                // Si tu obtiens quelques photos : ajoute "thumbnail" et "images": [...] puis supprime "imageNote".
                imageNote: {
                    fr: "Pour des raisons de droit à l'image, je ne peux pas afficher les photos de ce projet, mais je peux vous en parler.",
                    en: "For image rights reasons, I can't display the photos from this project, but I'm happy to talk about it."
                },
                tags: ["Photographie", "Prise de vue", "SAE"],
                shortDescription: {
                    fr: "Séance photo réalisée pour un groupe de musique lors d'une SAE",
                    en: "Photo shoot made for a music band during a SAE"
                },
                fullDescription: {
                    fr: "Dans le cadre d'une SAE (projet tutoré) en lien avec un groupe de musique, j'ai réalisé une séance de photographie et de prise de vue.",
                    en: "As part of a SAE (tutored project) connected to a music band, I carried out a photography and shooting session."
                },
                technologies: ["Photographie", "Prise de vue"],
                features: {
                    fr: ["Séance de photographie et prise de vue", "Projet tutoré (SAE) en lien avec un groupe de musique"],
                    en: ["Photography and shooting session", "Tutored project (SAE) connected to a music band"]
                },
                link: "#"
            },
            {
                id: "project-design-5",
                title: { fr: "Île 3D - Scène Blender & Unity VR", en: "3D Island - Blender & Unity VR Scene" },
                category: "design",
                status: { fr: "Projet en cours", en: "Work in progress" },
                tags: ["3D", "Blender", "Unity", "VR"],
                shortDescription: {
                    fr: "Scène 3D d'une île insulaire modélisée sur Blender, explorable sous Unity en VR ou en déplacement classique",
                    en: "3D scene of a tropical island modeled in Blender, explorable in Unity in VR or with standard movement"
                },
                fullDescription: {
                    fr: "Réalisation d'une scène 3D sur le thème d'une île insulaire. L'île est modélisée sur Blender, puis importée dans Unity pour être explorée directement en réalité virtuelle ou en mode classique, en se déplaçant comme dans un jeu. Projet en cours de réalisation.",
                    en: "Creation of a 3D scene themed around an island. The island is modeled in Blender, then imported into Unity so it can be explored directly in virtual reality or in standard mode, moving around like in a game. Work in progress."
                },
                technologies: ["Blender", "Unity", "VR"],
                features: {
                    fr: ["Modélisation 3D d'une île sur Blender", "Import et mise en scène dans Unity", "Visite en réalité virtuelle (VR)", "Visite en déplacement classique, comme dans un jeu"],
                    en: ["3D modeling of an island in Blender", "Import and scene setup in Unity", "Virtual reality (VR) visit", "Standard movement visit, like in a game"]
                },
                link: "#"
            }
        ],
        // Animation ------------------------------------------------------------------------------------------------------------------------------------------------------------------
        animation: [
            {
                id: "project-anim-1",
                title: {
                    fr: "Animation Frame by Frame",
                    en: "Frame by Frame Animation"
                },
                category: "animation",
                thumbnail: "./img/animation/animation_Matheis_MONCHATRE.mp4",
                video: "./img/animation/animation_Matheis_MONCHATRE.mp4",
                tags: ["Blender", "2D", "animation"],
                shortDescription: {
                    fr: "Animation 3D réalisée image par image",
                    en: "3D animation created frame by frame"
                },
                fullDescription: {
                    fr: "Animation 3D complète réalisée frame by frame sous Blender. Chaque image a été soigneusement modelée et animée pour créer un mouvement fluide et naturel. Le projet démontre une maîtrise des principes d'animation classiques appliqués à la 3D : anticipation, timing, et follow-through. L'attention portée aux détails dans chaque frame crée une animation vivante et expressive.",
                    en: "Complete 3D animation created frame by frame in Blender. Each frame was carefully modeled and animated to create smooth and natural movement. The project demonstrates mastery of classic animation principles applied to 3D: anticipation, timing, and follow-through. Attention to detail in each frame creates a lively and expressive animation."
                },
                technologies: ["Blender 3D", "Animation", "Modeling", "Rendering"],
                features: {
                    fr: [
                        "Animation frame by frame",
                        "Modélisation 3D détaillée",
                        "Principes d'animation appliqués",
                        "Rendu haute qualité",
                        "Timing précis"
                    ],
                    en: [
                        "Frame by frame animation",
                        "Detailed 3D modeling",
                        "Applied animation principles",
                        "High quality rendering",
                        "Precise timing"
                    ]
                },
                link: "#"
            },
            {
                id: "project-anim-2",
                title: "Vortex - Shading",
                category: "animation",
                thumbnail: "./img/animation/vortex0001-0250.mp4",
                video: "./img/animation/vortex0001-0250.mp4",
                tags: ["Blender", "Shading"],
                shortDescription: {
                    fr: "Animation avec techniques de shading avancées",
                    en: "Animation with advanced shading techniques"
                },
                fullDescription: {
                    fr: "Création d'une animation sous Blender utilisant des techniques de shading avancées pour créer des effets visuels impressionnants. Le projet explore les matériaux procéduraux, l'éclairage dynamique et les effets de particules. L'animation a été intégrée dans une vidéo pour un projet universitaire, démontrant la capacité à combiner 3D et vidéo en post-production.",
                    en: "Animation created in Blender using advanced shading techniques to create impressive visual effects. The project explores procedural materials, dynamic lighting and particle effects. The animation was integrated into a video for an academic project, demonstrating the ability to combine 3D and video in post-production."
                },
                technologies: ["Blender", "Shader Editor", "Node-based Materials", "Compositing"],
                features: {
                    fr: [
                        "Shading procédural avancé",
                        "Effets de lumière dynamiques",
                        "Systèmes de particules",
                        "Compositing vidéo",
                        "Intégration post-production"
                    ],
                    en: [
                        "Advanced procedural shading",
                        "Dynamic light effects",
                        "Particle systems",
                        "Video compositing",
                        "Post-production integration"
                    ]
                },
                link: "#"
            },
            {
                id: "project-anim-3",
                title: {
                    fr: "Animations 3D Variées",
                    en: "Various 3D Animations"
                },
                category: "animation",
                thumbnail: "./img/animation/tigre.mp4",
                videos: ["./img/animation/tigre.mp4", "./img/animation/oreille1.mp4"],
                tags: ["Blender", "3D", "Animation"],
                shortDescription: {
                    fr: "Collection d'animations 3D avec éléments solides",
                    en: "Collection of 3D animations with solid elements"
                },
                fullDescription: {
                    fr: "Série d'animations 3D créées sous Blender mettant en scène des éléments solides avec physique réaliste. Les animations ont été intégrées dans des vidéos pour des projets universitaires, démontrant la polyvalence dans différents styles d'animation. Chaque animation explore différentes techniques : rigging, physique, simulation de fluides, et animation de caméra cinématique.",
                    en: "Series of 3D animations created in Blender featuring solid elements with realistic physics. The animations were integrated into videos for academic projects, demonstrating versatility in different animation styles. Each animation explores different techniques: rigging, physics, fluid simulation, and cinematic camera animation."
                },
                technologies: ["Blender 3D", "Physics Simulation", "Rigging", "Camera Animation"],
                features: {
                    fr: [
                        "Physique réaliste des objets",
                        "Rigging de personnages/objets",
                        "Animation de caméra",
                        "Simulations diverses",
                        "Intégration vidéo"
                    ],
                    en: [
                        "Realistic object physics",
                        "Character/object rigging",
                        "Camera animation",
                        "Various simulations",
                        "Video integration"
                    ]
                },
                link: "#"
            }
        ]
    },

    // Navigation ------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // ==================== RECHERCHE DE STAGE (badge + fenêtre sur l'accueil) ====================
    availability: {
        badge: { fr: "Recherche de stage", en: "Open to internships" },
        title: { fr: "Je recherche un stage", en: "I'm looking for an internship" },
        rows: [
            { icon: "bi-code-slash", label: { fr: "Domaine", en: "Field" }, text: { fr: "Développement web, 3D & réalité virtuelle", en: "Web development, 3D & virtual reality" } },
            { icon: "bi-geo-alt-fill", label: { fr: "Basé à", en: "Based in" }, text: { fr: "Le Lude (Sarthe, 72)", en: "Le Lude (Sarthe, 72), France" } },
            { icon: "bi-map", label: { fr: "Zone", en: "Area" }, text: { fr: "Pays de la Loire et au-delà : Le Mans, Angers, Laval, Nantes, Tours…", en: "Pays de la Loire and beyond: Le Mans, Angers, Laval, Nantes, Tours…" } },
            { icon: "bi-car-front-fill", label: { fr: "Mobilité", en: "Mobility" }, text: { fr: "Véhiculé, prêt à me déplacer", en: "I have a car and I'm ready to travel" } }
        ],
        // Dates / durée du stage : s'affichent seulement si tu les renseignes (ex. fr: "Avril à août 2027 (16 semaines)")
        period: { fr: "", en: "" }
    },

    // ==================== MENTIONS LÉGALES ====================
    legal: {
        link: { fr: "Mentions légales", en: "Legal notice" },
        title: { fr: "Mentions légales", en: "Legal notice" },
        sections: [
            { h: { fr: "Éditeur du site", en: "Website publisher" },
              p: { fr: "Site personnel à but non commercial, édité par Mathéis MONCHATRE, également directeur de la publication.", en: "Personal, non-commercial website published by Mathéis MONCHATRE, who is also the publication director." } },
            { h: { fr: "Contact", en: "Contact" },
              p: { fr: "E-mail : {email}", en: "Email: {email}" } },
            { h: { fr: "Hébergement", en: "Hosting" },
              p: { fr: "Ce site est hébergé par GitHub Pages (GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis).", en: "This website is hosted by GitHub Pages (GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA)." } },
            { h: { fr: "Propriété intellectuelle", en: "Intellectual property" },
              p: { fr: "Les textes, visuels et projets présentés sont la propriété de leur auteur, sauf mention contraire. Les sites, logos et marques de clients ou d'organisations cités restent la propriété de leurs détenteurs. Toute reproduction sans autorisation est interdite.", en: "The texts, visuals and projects shown belong to their author unless stated otherwise. Websites, logos and brands of clients or organisations mentioned remain the property of their owners. Any reproduction without permission is prohibited." } },
            { h: { fr: "Données personnelles et cookies", en: "Personal data and cookies" },
              p: { fr: "Ce site n'utilise ni cookies de suivi ni outil d'analyse. Seule votre préférence de thème (clair / sombre) est enregistrée sur votre appareil. Le lecteur Spotify, contenu tiers, n'est chargé que si vous cliquez sur « Écouter » et peut déposer ses propres cookies (voir la politique de Spotify). Les icônes et la 3D sont chargées depuis des CDN (jsDelivr, cdnjs).", en: "This website uses no tracking cookies or analytics tools. Only your theme preference (light / dark) is saved on your device. The Spotify player, a third-party content, is only loaded if you click « Listen » and may set its own cookies (see Spotify's policy). Icons and 3D are loaded from CDNs (jsDelivr, cdnjs)." } }
        ]
    },

    // ==================== PASSIONS (centres d'intérêt) ====================
    // Pour ajouter une photo / un titre / un jeu : ajoute simplement une ligne dans la liste concernée.
    passions: {
        header: {
            title: { fr: "Passions", en: "Passions" },
            subtitle: { fr: "Ce qui me fait vibrer quand je ne suis pas devant un écran", en: "What gets me excited when I'm away from a screen" }
        },
        equestrian: {
            icon: "horse",
            label: { fr: "Ma plus grande passion", en: "My biggest passion" },
            title: { fr: "Équitation", en: "Horse riding" },
            since: { value: "3", fr: "ans · mes débuts en selle", en: "years old · my first time in the saddle" },
            paragraphs: [
                {
                    fr: "Je monte à cheval depuis l'âge de 3 ans. C'est bien plus qu'un loisir : c'est là que je me recentre, et que j'ai appris la patience, la confiance et l'écoute d'un partenaire qui ne dit pas un mot.",
                    en: "I've been riding since I was 3. It's way more than a hobby: it's where I recharge, and where I learned patience, trust and how to listen to a partner who never says a word."
                },
                {
                    fr: "J'ai validé mes Galops jusqu'au Galop 4, Galop 4 Nature compris. Avec mes études et la période Covid, je n'ai pas pu passer les suivants, mais ils arrivent très bientôt, avec une reprise plus intensive de la pratique.",
                    en: "I've passed my Galops up to Galop 4, including Galop 4 Nature. Because of my studies and the Covid period, I couldn't take the next ones, but they're coming very soon, together with a more intense return to riding."
                }
            ],
            levelsTitle: { fr: "Mon parcours en Galops", en: "My Galop journey" },
            levels: [
                { label: "Galop 1", done: true },
                { label: "Galop 2", done: true },
                { label: "Galop 3", done: true },
                { label: "Galop 4", done: true },
                { label: "Galop 4 Nature", done: true },
                { label: { fr: "Bientôt : la suite !", en: "Coming soon: what's next!" }, done: false }
            ],
            // Ajoute autant de photos que tu veux : src + légende + texte (affichés au survol / au clic)
            photos: [
                { src: "./img/passions/cheval-1.jpg", title: { fr: "Légende n°1", en: "Caption #1" }, text: { fr: "Quelques mots sur cette photo.", en: "A few words about this photo." } },
                { src: "./img/passions/cheval-2.jpg", title: { fr: "Légende n°2", en: "Caption #2" }, text: { fr: "Quelques mots sur cette photo.", en: "A few words about this photo." } },
                { src: "./img/passions/cheval-3.jpg", title: { fr: "Légende n°3", en: "Caption #3" }, text: { fr: "Quelques mots sur cette photo.", en: "A few words about this photo." } },
                { src: "./img/passions/cheval-4.jpg", title: { fr: "Légende n°4", en: "Caption #4" }, text: { fr: "Quelques mots sur cette photo.", en: "A few words about this photo." } },
                { src: "./img/passions/cheval-5.jpg", title: { fr: "Légende n°5", en: "Caption #5" }, text: { fr: "Quelques mots sur cette photo.", en: "A few words about this photo." } },
                { src: "./img/passions/cheval-6.jpg", title: { fr: "Légende n°6", en: "Caption #6" }, text: { fr: "Quelques mots sur cette photo.", en: "A few words about this photo." } }
            ]
        },
        music: {
            icon: "music",
            title: { fr: "Mes 5 hits préférés", en: "My 5 favorite hits" },
            subtitle: { fr: "Ma bande-son du moment : choisis un titre et lance le son.", en: "My current soundtrack: pick a track and hit play." },
            // Pour chaque titre :
            //  - spotify : le code <iframe> copié depuis Spotify (Partager > Intégrer le titre), entre `` ; un simple lien Spotify marche aussi
            //  - title / artist : le texte affiché dans la liste
            //  - cover : la pochette (image .png dans ./img/passions/music/), facultatif
            tracks: [
                { spotify: `<iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/track/04aAxqtGp5pv12UXAg4pkq?utm_source=generator&si=a9ffb39860804a93" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`, title: "Centuries", artist: "Fall Out Boy", cover: "./img/passions/music/centuries.jpg" },
                { spotify: `<iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/track/65uoaqX5qcjXZRheAj1qQT?utm_source=generator&si=19a6464431d143a0" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`, title: "Dernière danse", artist: "Indila", cover: "./img/passions/music/derniere-danse.jpg" },
                { spotify: `<iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/track/6NgYIETQ8U72CVfkzYhK30?utm_source=generator&si=b7aa98a76eb7482b" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`, title: "Fairytale", artist: "Alexander Rybak", cover: "./img/passions/music/fairytale.jpg" },
                { spotify: `<iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/track/2UHK8agSYWJUzMuQTPMCVq?utm_source=generator&si=3d24cfe10f964c14" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`, title: "I'm Still Standing", artist: "Elton John", cover: "./img/passions/music/im-still-standing.jpg" },
                { spotify: `<iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/track/7kUljt0NM5sISL3OGNVxYd?utm_source=generator&si=81e40a9665bf4390" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`, title: "Royalty", artist: "Egzod, Maestro Chives", cover: "./img/passions/music/royalty.jpg" }
            ]
        },
        games: {
            icon: "gamepad",
            title: { fr: "Mes 5 jeux préférés", en: "My 5 favorite games" },
            subtitle: { fr: "Les jeux qui m'ont donné envie de créer les miens.", en: "The games that made me want to build my own." },
            items: [
                { name: { fr: "Jeu n°1", en: "Game #1" }, platform: { fr: "Plateforme · Genre", en: "Platform · Genre" }, text: { fr: "Pourquoi je l'adore, en une phrase.", en: "Why I love it, in one sentence." }, image: "./img/passions/game-1.jpg", link: "" },
                { name: { fr: "Jeu n°2", en: "Game #2" }, platform: { fr: "Plateforme · Genre", en: "Platform · Genre" }, text: { fr: "Pourquoi je l'adore, en une phrase.", en: "Why I love it, in one sentence." }, image: "./img/passions/game-2.jpg", link: "" },
                { name: { fr: "Jeu n°3", en: "Game #3" }, platform: { fr: "Plateforme · Genre", en: "Platform · Genre" }, text: { fr: "Pourquoi je l'adore, en une phrase.", en: "Why I love it, in one sentence." }, image: "./img/passions/game-3.jpg", link: "" },
                { name: { fr: "Jeu n°4", en: "Game #4" }, platform: { fr: "Plateforme · Genre", en: "Platform · Genre" }, text: { fr: "Pourquoi je l'adore, en une phrase.", en: "Why I love it, in one sentence." }, image: "./img/passions/game-4.jpg", link: "" },
                { name: { fr: "Jeu n°5", en: "Game #5" }, platform: { fr: "Plateforme · Genre", en: "Platform · Genre" }, text: { fr: "Pourquoi je l'adore, en une phrase.", en: "Why I love it, in one sentence." }, image: "./img/passions/game-5.jpg", link: "" }
            ]
        },
        others: {
            title: { fr: "Et aussi…", en: "And also…" },
            items: [
                { icon: "palette", title: { fr: "Dessin", en: "Drawing" }, text: { fr: "Un crayon, une feuille, et mes idées prennent forme. Ça nourrit mon œil pour le design et la 3D.", en: "A pencil, a sheet of paper, and my ideas take shape. It feeds my eye for design and 3D." } },
                { icon: "archery", title: { fr: "Tir à l'arc", en: "Archery" }, text: { fr: "Concentration et précision : respirer, viser, relâcher.", en: "All about focus and precision: breathe, aim, release." } }
            ]
        }
    },

    navigation: {
        fr: [
            { id: "presentation", text: "Accueil", href: "#presentation" },
            { id: "competences", text: "Compétences", href: "#competences" },
            { id: "diplomes", text: "Diplômes", href: "#diplomes" },
            { id: "experience", text: "Expérience", href: "#experience" },
            {
                id: "realisations",
                text: "Réalisations",
                href: "#realisations",
                dropdown: [
                    { text: "Dev Web", href: "#realisations-dev" },
                    { text: "Design", href: "#realisations-design" },
                    { text: "Animation", href: "#realisations-animation" }
                ]
            },
            { id: "passions", text: "Passions", href: "#passions" },
            { id: "contact", text: "Contact", href: "#contact" }
        ],
        en: [
            { id: "presentation", text: "Home", href: "#presentation" },
            { id: "competences", text: "Skills", href: "#competences" },
            { id: "diplomes", text: "Diplomas", href: "#diplomes" },
            { id: "experience", text: "Experience", href: "#experience" },
            {
                id: "realisations",
                text: "Projects",
                href: "#realisations",
                dropdown: [
                    { text: "Dev Web", href: "#realisations-dev" },
                    { text: "Design", href: "#realisations-design" },
                    { text: "Animation", href: "#realisations-animation" }
                ]
            },
            { id: "passions", text: "Passions", href: "#passions" },
            { id: "contact", text: "Contact", href: "#contact" }
        ]
    }
};

// Export pour utilisation ------------------------------------------------------------------------------------------------------------------------------------------------------------------
if (typeof module !== 'undefined' && module.exports) {
    module.exports = portfolioData;
}