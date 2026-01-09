import React from 'react';
import { Shield, Lock, Eye, UserCheck } from 'lucide-react';

const PrivateSecurity = () => {
    const securityServices = [
        {
            title: "Armed & Unarmed Security",
            description: "Professional guards tailored to your specific risk profile and needs.",
            icon: Shield
        },
        {
            title: "Event Security",
            description: "Crowd control and access management for corporate events, parties, and gatherings.",
            icon: UserCheck
        },
        {
            title: "Asset Protection",
            description: "Dedicated security for high-value assets during transport or storage.",
            icon: Lock
        },
        {
            title: "Site Monitoring",
            description: "Vigilant surveillance and patrol for construction sites, residential complexes, and offices.",
            icon: Eye
        }
    ];

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header - Darker Theme for Security */}
            <div className="bg-security-dark text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center space-x-3 mb-4">
                        <Shield className="text-brand-secondary" size={32} />
                        <h1 className="text-4xl font-bold">Private Security Services</h1>
                    </div>
                    <p className="text-xl text-gray-400 max-w-2xl ml-1">
                        Professional protection services designed to secure what matters most. Vigilance, Integrity, and Safety.
                    </p>
                </div>
            </div>

            {/* Intro */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold text-security-accent mb-4">Why Choose Our Security?</h2>
                    <p className="text-gray-700 leading-relaxed text-lg">
                        At Tony & A Enterprise, we understand that security is about more than just presence—it's about preparation and professionalism.
                        Our security personnel are carefully vetted, trained, and equipped to handle a variety of scenarios, ensuring peace of mind for our clients.
                    </p>
                </div>
            </div>

            {/* Service Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 border-l-4 border-security-metal pl-4">Security Solutions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {securityServices.map((service, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-security-metal/30 transition-all">
                            <div className="w-12 h-12 bg-brand-secondary/10 text-brand-secondary rounded-lg flex items-center justify-center mb-4">
                                <service.icon size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                            <p className="text-gray-600">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Security specific CTA */}
            <div className="bg-security-accent text-white py-16 text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-4">Secure Your Assets Today</h2>
                    <p className="text-lg text-gray-400 mb-8">Contact our security specialists for a confidential consultation.</p>
                    <a href="/contact" className="inline-flex items-center px-8 py-3 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-secondary transition-colors">
                        Request Consultation
                    </a>
                </div>
            </div>
        </div>
    );
};

export default PrivateSecurity;
