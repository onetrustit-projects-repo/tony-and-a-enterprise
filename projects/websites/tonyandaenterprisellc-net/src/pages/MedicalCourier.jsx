import React from 'react';
import { Truck, Clock, FileCheck, Thermometer, ShieldCheck } from 'lucide-react';
import { useSiteContent } from '../content/SiteContentContext';

const solutionIcons = [Clock, Truck, FileCheck, Thermometer];

const MedicalCourier = () => {
    const { contact, branding, pages } = useSiteContent();
    const { medicalCourier } = pages;

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="relative overflow-hidden bg-gray-900 text-white py-20">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-dark to-security-dark opacity-90 z-10" />
                <div className="absolute inset-0 bg-cover bg-center opacity-30 z-0 mix-blend-overlay" style={{ backgroundImage: `url(${medicalCourier.heroImage})` }} />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
                            <img src={branding.logo} alt={branding.name} className="h-24 md:h-32 w-auto object-contain bg-white rounded-xl p-2" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold mb-4">{medicalCourier.heroTitle}</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        {medicalCourier.heroSubtitle}
                    </p>
                </div>
            </div>

            {/* Intro */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="order-2 lg:order-1">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-green-100 p-3 rounded-xl text-green-700">
                                <ShieldCheck size={28} />
                            </div>
                            <h2 className="text-2xl font-bold text-brand-dark">{medicalCourier.introTitle}</h2>
                        </div>
                        {medicalCourier.introParagraphs.map((paragraph, index) => (
                            <p key={index} className={`text-gray-600 leading-relaxed ${index === 0 ? 'mb-6' : ''}`}>
                                {paragraph}
                            </p>
                        ))}
                    </div>
                    <div className="order-1 lg:order-2 w-full">
                        <img
                            src={medicalCourier.introImage}
                            alt={medicalCourier.introImageAlt}
                            className="rounded-xl shadow-lg w-full h-auto aspect-square object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Service Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 border-l-4 border-brand-secondary pl-4">{medicalCourier.solutionsTitle}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {medicalCourier.solutions.map((service, index) => {
                        const Icon = solutionIcons[index % solutionIcons.length];
                        return (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-brand-light/20 text-brand-primary rounded-lg flex items-center justify-center mb-4">
                                <Icon size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                            <p className="text-gray-600">{service.description}</p>
                        </div>
                    )})}
                </div>
            </div>

            {/* Non-Medical Home Care Section */}
            <div className="bg-white py-20 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{medicalCourier.homeCareTitle}</h2>
                    <p className="text-xl text-gray-600 mb-12 max-w-3xl">
                        {medicalCourier.homeCareSubtitle}
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                        <div>
                            <img
                                src={medicalCourier.homeCareImage}
                                alt={medicalCourier.homeCareImageAlt}
                                className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {medicalCourier.homeCareCards.map((card, index) => (
                                <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-center hover:bg-brand-light/10 transition-colors">
                                    <div className="w-14 h-14 bg-brand-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-md">
                                        {card.emoji}
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{card.title}</h3>
                                    <p className="text-gray-600 text-sm">{card.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gray-100 py-16 text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{medicalCourier.ctaTitle}</h2>
                    <p className="text-lg text-gray-600 mb-8">{medicalCourier.ctaSubtitle}</p>
                    <a href={contact.phoneLink} className="inline-flex items-center px-8 py-3 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-dark transition-colors">
                        <Truck className="mr-2" size={20} />
                        Call {contact.phone}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default MedicalCourier;
