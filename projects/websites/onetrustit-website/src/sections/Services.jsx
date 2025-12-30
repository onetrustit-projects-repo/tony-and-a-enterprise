import React from 'react';
import { Shield, Cloud, Lock, Activity, Server, Smartphone } from 'lucide-react';

const Services = () => {
    const services = [
        {
            icon: <Shield className="w-8 h-8 text-brand-primary" />,
            title: "Managed Cybersecurity",
            description: "24/7 threat monitoring, incident response, and advanced endpoint protection to keep your business safe."
        },
        {
            icon: <Cloud className="w-8 h-8 text-brand-primary" />,
            title: "Cloud Solutions",
            description: "Secure cloud migration, management, and optimization for Azure, AWS, and private cloud infrastructures."
        },
        {
            icon: <Lock className="w-8 h-8 text-brand-primary" />,
            title: "Compliance & Audit",
            description: "Ensure your business meets industry standards with comprehensive security audits and compliance management."
        },
        {
            icon: <Activity className="w-8 h-8 text-brand-primary" />,
            title: "Network Monitoring",
            description: "Proactive network performance monitoring and maintenance to minimize downtime and latency."
        },
        {
            icon: <Server className="w-8 h-8 text-brand-primary" />,
            title: "Infrastructure Management",
            description: "End-to-end management of your servers, storage, and networking hardware."
        },
        {
            icon: <Smartphone className="w-8 h-8 text-brand-primary" />,
            title: "Mobile Device Management",
            description: "Secure remote workforces with enterprise-grade MDM solutions and policies."
        }
    ];

    return (
        <section id="services" className="py-20 relative bg-brand-black">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Comprehensive <span className="text-brand-primary">IT Solutions</span>
                    </h2>
                    <p className="text-gray-400">
                        We deliver enterprise-grade security and technology solutions tailored to your business needs.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group p-8 rounded-2xl glass-dark hover:bg-white/5 transition-all duration-300 border border-white/5 hover:border-brand-primary/30"
                        >
                            <div className="w-14 h-14 bg-brand-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-brand-primary transition-colors">
                                {service.title}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
