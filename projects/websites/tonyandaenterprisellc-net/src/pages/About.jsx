import React from 'react';
import { Award, Heart, CheckCircle, Shield, Users, Briefcase } from 'lucide-react';
import { useSiteContent } from '../content/SiteContentContext';

const About = () => {
    const siteContent = useSiteContent();
    const { about } = siteContent.pages;

    return (
        <div className="bg-white min-h-screen">
            {/* Hero - Dark Gradient Theme */}
            <div className="relative overflow-hidden bg-gray-900 text-white py-24">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-dark to-security-dark opacity-90 z-10" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30 z-0 mix-blend-overlay" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center">
                    <h1 className="text-4xl font-bold mb-4">{about.heroTitle}</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        {about.heroSubtitle}
                    </p>
                </div>
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
                        <div className="absolute -top-6 -right-6 bg-pink-500 text-white w-24 h-24 rounded-full flex items-center justify-center font-bold text-center text-xs p-2 shadow-xl rotate-12">
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

            {/* Management Experience Section */}
            <div className="bg-brand-light/20 py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="bg-brand-primary text-white p-3 rounded-full">
                            <Briefcase size={28} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Management Experience</h2>
                    </div>
                    <p className="text-xl text-gray-700 leading-relaxed">
                        {about.managementBio}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
