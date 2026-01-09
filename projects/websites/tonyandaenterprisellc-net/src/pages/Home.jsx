import React from 'react';
import Hero from '../components/ui/Hero';
import ServiceCard from '../components/ui/ServiceCard';
import { Truck, Shield, Clock, Award, Users, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
    const features = [
        {
            icon: Clock,
            title: "24/7 Availability",
            description: "Round-the-clock service for both medical deliveries and security monitoring. We never sleep so you can."
        },
        {
            icon: Award,
            title: "HIPAA Certified",
            description: "Fully compliant medical couriers trained in HIPAA and BBP protocols for sensitive medical transport."
        },
        {
            icon: Users,
            title: "Women-Owned",
            description: "Proudly a women-owned enterprise bringing dedication, care, and precision to every job."
        }
    ];

    return (
        <div className="bg-gray-50">
            <Hero />

            {/* Services Section */}
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-brand-dark sm:text-4xl">Our Core Services</h2>
                    <p className="mt-4 text-xl text-gray-600">Specialized solutions tailored to your needs.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    <ServiceCard
                        title="Medical Courier Services"
                        description="Urgent lab specimens, pharmaceuticals, medical records, and supplies aimed at healthcare facilities. Licensed, bonded, and HIPAA compliant."
                        icon={Truck}
                        path="/medical-courier"
                        color="brand"
                    />
                    <ServiceCard
                        title="Private Security Services"
                        description="Professional security personnel for events, asset protection, and site monitoring. Ensuring safety through vigilance and integrity."
                        icon={Shield}
                        path="/private-security"
                        color="security"
                    />
                </div>
            </section>

            {/* Features Grid */}
            <section className="bg-white py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        {features.map((feature, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-brand-light/30 rounded-full flex items-center justify-center text-brand-primary mb-6">
                                    <feature.icon size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-brand-primary py-20">
                <div className="max-w-4xl mx-auto px-4 text-center text-white">
                    <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
                    <p className="text-xl text-brand-light/90 mb-10">Whether you need a package delivered urgently or a site secured professionally, we are here to help.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="/contact" className="px-8 py-4 bg-white text-brand-primary font-bold rounded-xl shadow-lg hover:bg-gray-100 transition-colors">
                            Get a Quote Now
                        </a>
                        <a href="tel:+19082519749" className="px-8 py-4 bg-brand-dark text-white font-bold rounded-xl shadow-lg hover:bg-brand-dark/80 transition-colors flex items-center justify-center">
                            Call (908) 251-9749
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
