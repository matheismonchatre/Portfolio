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
        cv: "#",
        description: {
            fr: [
                "Développeur web passionné par la création de sites modernes et dynamiques. Étudiant en BUT MMI à l'IUT de Blois, j'allie technique et créativité pour concevoir des interfaces interactives et intuitives.",
                "Passionné de sport, notamment d'équitation que je pratique depuis plusieurs années, j'aime aussi l'art et le dessin. Les jeux vidéo et les animations ont marqué mon enfance et continuent de m'inspirer dans mon travail créatif."
            ],
            en: [
                "Web developer passionate about creating modern and dynamic websites. Student in BUT MMI at IUT de Blois, I combine technical skills and creativity to design interactive and intuitive interfaces.",
                "Sports enthusiast, especially horse riding which I have practiced for several years, I also love art and drawing. Video games and animations shaped my childhood and continue to inspire my creative work."
            ]
        },
        keywords: {
            fr: ["Développeur web", "Créatif", "Curieux", "Passionné"],
            en: ["web developer", "Creative", "Curious", "Passionate"]
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
                { name: "Vue.js", level: 60 },
                { name: "React.js", level: 75 }

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
                { name: "Symfony", level: 75 }

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
                { name: "Blender", level: 60 },
                { name: "Adobe Photoshop", level: 75 }
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
        }
    ],

    // Expériences ------------------------------------------------------------------------------------------------------------------------------------------------------------------
    experiences: [
        {
            id: "exp1",
            year: "2026",
            time: "15 semaines",
            company: "Pixim - Saumur",
            role: {
                fr: "Stage en entreprise",
                en: "Internship"
            },
            description: {
                fr: "Développement d'un dashboard interactif avec Joomla pour venir géré la gestion des sites héberger de l'entreprise, développement d'applications web plus aide dévellopeur.",
                en: "Development of an interactive dashboard with Joomla to manage the company's hosted websites, development of web applications and developer assistance."
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
            id: "exp4",
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
            id: "dip1",
            year: "2025",
            title: {
                fr: "BUT MMI",
                en: "BUT MMI"
            },
            institution: "IUT de Blois",
            description: {
                fr: "Parcours en Métiers du Multimédia et de l'Internet - projet, design et dev web.",
                en: "Bachelor of Multimedia and Internet - projects, design and web dev."
            }
        },
        {
            id: "dip2",
            year: "2022",
            title: {
                fr: "Baccalauréat STI2D",
                en: "STI2D High School Diploma"
            },
            institution: "Lycée local",
            description: {
                fr: "Formation technologique orientée sciences et techniques industrielles.",
                en: "Technological orientation focused on industrial sciences and techniques."
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
                    fr: "Une création dédié à la gestion d'évènement sportif, permettant aux utilisateurs de créer, gérer et participer à des événements sportifs locaux. Le projet a été développé avec NodeJs et Express pour le back-end, offrant une expérience utilisateur fluide et moderne.",
                    en: "A creation dedicated to sports event management, allowing users to create, manage and participate in local sports events. The project was developed with NodeJs and Express for the back-end, providing a smooth and modern user experience."
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
                    fr: "Conception graphique d'une pochette d'album musicale",
                    en: "Graphic design of a music album cover"
                },
                fullDescription: {
                    fr: "Projet de conception graphique d'une pochette d'album complète (recto/verso) avec une identité visuelle forte et cohérente. Le design a été pensé pour capturer l'essence de l'artiste tout en respectant les codes visuels du genre musical. L'utilisation de Photoshop a permis de créer des effets visuels sophistiqués et une composition équilibrée.",
                    en: "Complete album cover graphic design project (front/back) with strong and consistent visual identity. The design was created to capture the essence of the artist while respecting the visual codes of the musical genre. Using Photoshop allowed creating sophisticated visual effects and balanced composition."
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
                tags: ["Blender", "3D"],
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
    navigation: {
        fr: [
            { id: "presentation", text: "Accueil", href: "#presentation" },
            { id: "competences", text: "Compétences", href: "#competences" },
            { id: "experience", text: "Expérience", href: "#experience" },
            { id: "diplomes", text: "Diplômes", href: "#diplomes" },
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
            { id: "contact", text: "Contact", href: "#contact" }
        ],
        en: [
            { id: "presentation", text: "Home", href: "#presentation" },
            { id: "competences", text: "Skills", href: "#competences" },
            { id: "experience", text: "Experience", href: "#experience" },
            { id: "diplomes", text: "Diplomas", href: "#diplomes" },
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
            { id: "contact", text: "Contact", href: "#contact" }
        ]
    }
};

// Export pour utilisation ------------------------------------------------------------------------------------------------------------------------------------------------------------------
if (typeof module !== 'undefined' && module.exports) {
    module.exports = portfolioData;
}