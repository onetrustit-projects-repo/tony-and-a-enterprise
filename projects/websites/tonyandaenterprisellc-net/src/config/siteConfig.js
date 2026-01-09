export const siteConfig = {
    branding: {
        name: "Tony & A Enterprise LLC",
        shortName: "Tony & A",
        legalName: "Tony & A Enterprise LLC.",
        tagline: "Delivery with Speed. Security with Precision.",
        description: "Tony & A Enterprise offers premium Medical Courier and Private Security services. Unmatched reliability for your most critical assets.",
        logo: "/logo.png",
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
                image: "/home-health-care.jpg",
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
            managementBio: "Our management team has over 20 years in Non Medical Home Healthcare and 30 years in Private Security, Management, Loss Prevention, and Concierge experience."
        }
    }
};
