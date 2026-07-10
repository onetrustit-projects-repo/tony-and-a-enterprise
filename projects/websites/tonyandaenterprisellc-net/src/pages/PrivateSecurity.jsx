import React from 'react';
import { Shield, Lock, Eye, UserCheck } from 'lucide-react';
import { useSiteContent } from '../content/SiteContentContext';

const solutionIcons = [Shield, UserCheck, Lock, Eye];

const PrivateSecurity = () => {
    const { pages } = useSiteContent();
    const { privateSecurity } = pages;

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header - Dark Gradient Theme */}
            <div className="relative overflow-hidden bg-gray-900 text-white py-20">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-dark to-security-dark opacity-90 z-10" />
                <div className="absolute inset-0 bg-cover bg-top opacity-40 z-0 mix-blend-overlay" style={{ backgroundImage: `url(${privateSecurity.heroImage})` }} />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Shield className="text-brand-secondary" size={32} />
                        <h1 className="text-4xl font-bold">{privateSecurity.heroTitle}</h1>
                    </div>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        {privateSecurity.heroSubtitle}
                    </p>
                </div>
            </div>

            {/* Intro */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold text-security-accent mb-4">{privateSecurity.introTitle}</h2>
                    <p className="text-gray-700 leading-relaxed text-lg">
                        {privateSecurity.introBody}
                    </p>
                </div>
            </div>

            {/* Security Image Feature Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="bg-gray-900 rounded-3xl overflow-hidden shadow-2xl">
                    <div className="flex flex-col lg:flex-row">
                        <div className="lg:w-1/2 relative min-h-[400px]">
                            <img
                                src={privateSecurity.featureImage}
                                alt={privateSecurity.featureImageAlt}
                                className="absolute inset-0 w-full h-full object-cover object-top"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent lg:hidden" />
                        </div>
                        <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center text-white">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-brand-secondary p-3 rounded-xl">
                                    <Shield size={28} className="text-white" />
                                </div>
                                <h3 className="text-2xl font-bold">{privateSecurity.featureTitle}</h3>
                            </div>
                            <p className="text-gray-300 leading-relaxed mb-8">
                                {privateSecurity.featureBody}
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                {privateSecurity.highlights.map((highlight, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-brand-secondary rounded-full" />
                                        <span className="text-sm text-gray-300">{highlight}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Service Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 border-l-4 border-security-metal pl-4">{privateSecurity.solutionsTitle}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {privateSecurity.solutions.map((service, index) => {
                        const Icon = solutionIcons[index % solutionIcons.length];
                        return (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-security-metal/30 transition-all">
                            <div className="w-12 h-12 bg-brand-secondary/10 text-brand-secondary rounded-lg flex items-center justify-center mb-4">
                                <Icon size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                            <p className="text-gray-600">{service.description}</p>
                        </div>
                    )})}
                </div>
            </div>

            {/* Security specific CTA */}
            <div className="bg-security-accent text-white py-16 text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-4">{privateSecurity.ctaTitle}</h2>
                    <p className="text-lg text-gray-400 mb-8">{privateSecurity.ctaSubtitle}</p>
                    <a href="/contact" className="inline-flex items-center px-8 py-3 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-secondary transition-colors">
                        Request Consultation
                    </a>
                </div>
            </div>
        </div>
    );
};

export default PrivateSecurity;
