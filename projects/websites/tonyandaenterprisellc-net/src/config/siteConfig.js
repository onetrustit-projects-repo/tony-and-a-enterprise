export const siteConfig = {
    branding: {
        name: "Tony & A Enterprise LLC",
        shortName: "Tony & A",
        legalName: "Tony & A Enterprise LLC.",
        tagline: "Delivery with Speed. Security with Precision.",
        description: "Tony & A Enterprise offers premium Medical Courier and Private Security services. Unmatched reliability for your most critical assets.",
        logo: "/uploads/53dc1759-b4c5-40ca-9f7c-da579e58cb48.jpg",
        colors: {
            primary: "#1E3A8A", // Navy Blue
            secondary: "#3B82F6", // Blue-500
            dark: "#172554", // Darker Navy
            light: "#DBEAFE", // Blue-100
            security: {
                dark: "#1F2937",
                accent: "#4B5563",
                metal: "#9CA3AF"
            }
        }
    },

    contact: {
        phone: "(908) 251-9749",
        phoneLink: "tel:+19082519749",
        email: "contact@tonyandaenterprisellc.net",
        address: {
            street: "380 Park Avenue",
            city: "Orange",
            state: "NJ",
            zip: "07050"
        },
        hours: "24 Hours, 7 Days a Week"
    },

    navigation: [
        { name: 'Home', path: '/' },
        { name: 'Medical Courier', path: '/medical-courier' },
        { name: 'Private Security', path: '/private-security' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ],

    pages: {
        home: {
            hero: {
                badge: "TRUSTED & SECURE SERVICES",
                titlePrefix: "Delivery with",
                titleAccent1: "Speed",
                titleMid: "Security with",
                titleAccent2: "Precision",
                image: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80"
            },
            homeHealthCare: {
                title: "Non Medical Home Health Care",
                image: "/home-health-care.jpg?v=2",
                services: [
                    "Non Medical Home Care",
                    "Companion, light Exercise",
                    "Meal Prep, Home Cleaning"
                ]
            },
            coreServices: [
                {
                    title: "Medical Courier Services",
                    description: "Urgent lab specimens, pharmaceuticals, medical records, and supplies. Licensed, bonded, and HIPAA compliant.",
                    path: "/medical-courier",
                    color: "brand"
                },
                {
                    title: "Private Security Services",
                    description: "Professional unarmed security personnel for events and site monitoring. Ensuring safety through integrity.",
                    path: "/private-security",
                    color: "brand"
                }
            ],
            features: [
                {
                    title: "24/7 Availability",
                    description: "Round-the-clock service for both medical deliveries and security monitoring."
                },
                {
                    title: "HIPAA Certified",
                    description: "Fully compliant medical couriers trained in HIPAA and BBP protocols."
                },
                {
                    title: "Women-Owned",
                    description: "Proudly a women-owned enterprise bringing dedication, care, and precision."
                }
            ]
        },
        about: {
            heroTitle: "About Tony & A Enterprise",
            heroSubtitle: "Dedicated to excellence in logistics and security. Proudly women-owned and community focused.",
            storyTitle: "Providing trusted care with heart and dedication",
            storyP1: "In today's fast-paced world, efficiency and trust are paramount. Tony & A Enterprise was founded to bridge the gap between critical logistics needs and reliable security services.",
            storyP2: "As a proudly women-owned business, we bring a unique perspective to the industry—one that values detailed care, communication, and unwavering commitment to our clients.",
            badge: "Women Owned Business",
            managementBio: "Our management team has over 20 years in Non Medical Home Healthcare and 30 years in Private Security, Management, Loss Prevention, and Concierge experience.",
            nonMedicalCareImage: "/non-medical-care.jpg",
            privateSecurityImage: "/private-security.jpg"
        },
        medicalCourier: {
            heroTitle: "Medical Courier Services",
            heroSubtitle: "Reliable, HIPAA-compliant transport for the healthcare industry. When lives are on the line, we deliver.",
            heroImage: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80",
            introTitle: "HIPAA & BBP Certified",
            introParagraphs: [
                "All our drivers undergo rigorous training and certification in HIPAA regulations and Bloodborne Pathogens (BBP) handling. We understand the critical nature of medical logistics and ensure the highest standards of safety, privacy, and speed.",
                "From specimen transport to at-home medical supply delivery, our team treats every package with the care it deserves-as if it were for our own family."
            ],
            introImage: "/uploads/0b036754-7de6-4ce7-94ef-a22353f46dfa.jpeg",
            introImageAlt: "Medical courier service",
            solutionsTitle: "Our Courier Solutions",
            solutions: [
                {
                    "title": "Same Day Delivery",
                    "description": "Immediate pickup and delivery for urgent medical supplies, specimens, and equipment."
                },
                {
                    "title": "Scheduled Routes",
                    "description": "Reliable, recurring pickups for laboratories, hospitals, and clinics."
                },
                {
                    "title": "Medical Records",
                    "description": "Secure transport of sensitive patient files and documents, fully HIPAA compliant."
                },
                {
                    "title": "Temperature Controlled",
                    "description": "Specialized handling for specimens requiring specific temperature ranges."
                }
            ],
            homeCareTitle: "Non-Medical Home Care",
            homeCareSubtitle: "Compassionate support to help your loved ones maintain independence and quality of life at home.",
            homeCareImage: "/uploads/1768494281111-434788177.jpg",
            homeCareImageAlt: "Non-medical home care companion",
            homeCareCards: [
                {
                    "emoji": "❤️",
                    "title": "Companion Care",
                    "description": "Friendly company, conversation, and emotional support."
                },
                {
                    "emoji": "🏃",
                    "title": "Light Exercise",
                    "description": "Assistance with mobility and prescribed exercise routines."
                },
                {
                    "emoji": "🥗",
                    "title": "Meal Prep",
                    "description": "Nutritious meal planning and preparation."
                },
                {
                    "emoji": "🏠",
                    "title": "Home Cleaning",
                    "description": "Light housekeeping to ensure a safe environment."
                }
            ],
            ctaTitle: "Need a Rush Delivery?",
            ctaSubtitle: "Call our dispatch team immediately for time-critical requests."
        },
        privateSecurity: {
            heroTitle: "Private Security Services",
            heroSubtitle: "Professional protection services designed to secure what matters most. Vigilance, Integrity, and Safety.",
            heroImage: "/uploads/a299bcfe-75d1-49fd-8c4e-a561cab246e4.jpg",
            introTitle: "Why Choose Our Security?",
            introBody: "At Tony & A Enterprise, we understand that security is about more than just presence-it's about preparation and professionalism. Our security personnel are carefully vetted, trained, and equipped to handle a variety of scenarios, ensuring peace of mind for our clients.",
            featureTitle: "Professional Protection Services",
            featureBody: "Our trained security professionals provide round-the-clock protection for your business, events, and assets. With expertise in threat assessment and preventive security measures, we ensure your safety while maintaining a welcoming atmosphere.",
            featureImage: "/uploads/a299bcfe-75d1-49fd-8c4e-a561cab246e4.jpg",
            featureImageAlt: "Professional private security guard",
            highlights: [
                "Licensed & Bonded",
                "24/7 Availability",
                "CPR Certified",
                "Background Checked"
            ],
            solutionsTitle: "Security Solutions",
            solutions: [
                {
                    "title": "Private Unarmed Security",
                    "description": "Professional guards tailored to your specific risk profile and needs."
                },
                {
                    "title": "Event Security",
                    "description": "Crowd control and access management for corporate events, parties, and gatherings."
                },
                {
                    "title": "Asset Protection",
                    "description": "Dedicated security for high-value assets during transport or storage."
                },
                {
                    "title": "Site Monitoring",
                    "description": "Vigilant surveillance and patrol for construction sites, residential complexes, and offices."
                }
            ],
            ctaTitle: "Secure Your Assets Today",
            ctaSubtitle: "Contact our security specialists for a confidential consultation."
        }
    }
};
