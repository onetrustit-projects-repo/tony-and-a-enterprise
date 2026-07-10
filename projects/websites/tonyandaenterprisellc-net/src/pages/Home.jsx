import React from 'react';
import Hero from '../components/ui/Hero';
import ServiceCard from '../components/ui/ServiceCard';
import { Truck, Shield, Clock, Award, Users } from 'lucide-react';
import { useSiteContent } from '../content/SiteContentContext';

const Home = () => {
    const siteContent = useSiteContent();
    const { home } = siteContent.pages;
    const { contact } = siteContent;

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
                    {home.coreServices.map((service, idx) => {
                        const icons = [Truck, Shield];
                        const Icon = icons[idx % icons.length];
                        return (
                            <ServiceCard
                                key={idx}
                                title={service.title}
                                description={service.description}
                                icon={Icon}
                                path={service.path}
                                color={service.color}
                            />
                        );
                    })}
                </div>

                {/* New Home Health Care Section */}
                <div className="mt-16 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="flex flex-col lg:flex-row">
                        <div className="lg:w-1/2">
                            <img
                                src={home.homeHealthCare.image}
                                alt={home.homeHealthCare.title}
                                className="w-full h-auto aspect-square object-cover rounded-xl shadow-lg"
                            />
                        </div>
                        <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                            <h3 className="text-3xl font-bold text-brand-primary mb-6">{home.homeHealthCare.title}</h3>
                            <ul className="space-y-4 text-lg text-gray-700">
                                {home.homeHealthCare.services.map((service, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <div className="mt-1 mr-4 bg-brand-light p-1 rounded-full text-brand-primary">
                                            <Award size={20} />
                                        </div>
                                        <span>{service}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-10">
                                <a href="/contact" className="inline-block px-8 py-4 bg-brand-primary text-white font-bold rounded-xl shadow-lg hover:bg-brand-secondary transition-colors">
                                    Learn More
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="bg-white py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        {home.features.map((feature, index) => {
                            const icons = [Clock, Award, Users];
                            const Icon = icons[index % icons.length];
                            return (
                                <div key={index} className="flex flex-col items-center">
                                    <div className="w-16 h-16 bg-brand-light/30 rounded-full flex items-center justify-center text-brand-primary mb-6">
                                        <Icon size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-brand-primary py-20">
                <div className="max-w-4xl mx-auto px-4 text-center text-white">
                    <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
                    <p className="text-xl text-brand-light/90 mb-10">{siteContent.branding.description}</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="/contact" className="px-8 py-4 bg-white text-brand-primary font-bold rounded-xl shadow-lg hover:bg-gray-100 transition-colors">
                            Get a Quote Now
                        </a>
                        <a href={contact.phoneLink} className="px-8 py-4 bg-brand-dark text-white font-bold rounded-xl shadow-lg hover:bg-brand-dark/80 transition-colors flex items-center justify-center">
                            Call {contact.phone}
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
