import React from 'react';
import { Award, Heart, CheckCircle } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

const About = () => {
    const { about } = siteConfig.pages;
    const { branding } = siteConfig;

    return (
        <div className="bg-white min-h-screen">
            {/* Hero */}
            <div className="bg-brand-dark text-white py-24 text-center">
                <h1 className="text-4xl font-bold mb-4">{about.heroTitle}</h1>
                <p className="text-xl text-brand-light/80 max-w-2xl mx-auto px-4">
                    {about.heroSubtitle}
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <span className="text-brand-primary font-bold tracking-wider text-sm uppercase">Our Story</span>
                        <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-6">{about.storyTitle}</h2>
                        <div className="space-y-6 text-gray-600 leading-relaxed">
                            <p>{about.storyP1}</p>
                            <p>{about.storyP2}</p>
                        </div>
                    </div>
                    <div className="bg-gray-100 rounded-3xl p-8 relative">
                        <div className="absolute -top-6 -right-6 bg-brand-secondary text-white w-24 h-24 rounded-full flex items-center justify-center font-bold text-center text-xs p-2 shadow-xl rotate-12">
                            {about.badge}
                        </div>
                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="bg-white p-3 rounded-full text-brand-primary shadow-sm mt-1">
                                    <Award size={24} />
                                </div>
                                <div className="ml-4">
                                    <h3 className="font-bold text-lg text-gray-900">Certified Excellence</h3>
                                    <p className="text-gray-600 text-sm mt-1">HIPAA & BBP Certified couriers ensuring compliance.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="bg-white p-3 rounded-full text-brand-primary shadow-sm mt-1">
                                    <Heart size={24} />
                                </div>
                                <div className="ml-4">
                                    <h3 className="font-bold text-lg text-gray-900">Community Focused</h3>
                                    <p className="text-gray-600 text-sm mt-1">Serving New York, New Jersey, and beyond with local dedication.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="bg-white p-3 rounded-full text-brand-primary shadow-sm mt-1">
                                    <CheckCircle size={24} />
                                </div>
                                <div className="ml-4">
                                    <h3 className="font-bold text-lg text-gray-900">24/7 Reliability</h3>
                                    <p className="text-gray-600 text-sm mt-1">Always available when you need us most.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
