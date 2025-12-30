import React from 'react';
import { Cloud, Shield, Lock, Server, Database, Globe, Activity, Eye } from 'lucide-react';

const Ecosystem = () => {
    const partners = [
        { name: 'CrowdStrike', category: 'EDR', icon: <Shield className="w-6 h-6" /> },
        { name: 'SentinelOne', category: 'EDR', icon: <Activity className="w-6 h-6" /> },
        { name: 'Splunk', category: 'SIEM', icon: <Database className="w-6 h-6" /> },
        { name: 'Microsoft Sentinel', category: 'SIEM', icon: <Shield className="w-6 h-6" /> },
        { name: 'AWS Security Hub', category: 'Cloud', icon: <Cloud className="w-6 h-6" /> },
        { name: 'Azure Security Center', category: 'Cloud', icon: <Cloud className="w-6 h-6" /> },
        { name: 'Google Cloud SCC', category: 'Cloud', icon: <Cloud className="w-6 h-6" /> },
        { name: 'Okta', category: 'Identity', icon: <Lock className="w-6 h-6" /> },
        { name: 'Duo Security', category: 'Identity', icon: <Lock className="w-6 h-6" /> },
        { name: 'Palo Alto Networks', category: 'Network', icon: <Globe className="w-6 h-6" /> },
        { name: 'Tenable', category: 'Vulnerability', icon: <Eye className="w-6 h-6" /> },
        { name: 'Qualys', category: 'Vulnerability', icon: <Eye className="w-6 h-6" /> },
    ];

    // Tripling the list to ensure smooth infinite scrolling
    const marqueeItems = [...partners, ...partners, ...partners];

    return (
        <section className="py-20 bg-brand-black overflow-hidden relative border-t border-white/5">
            <div className="container mx-auto px-6 mb-12 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-300">
                    Integrated <span className="text-brand-primary">Technology Ecosystem</span>
                </h2>
                <p className="text-gray-500 mt-2 text-sm">
                    Seamlessly integrating with industry-leading security tools
                </p>
            </div>

            <div className="relative w-full">
                {/* Gradients for fade effect on edges */}
                <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-brand-black to-transparent z-10 pointer-events-none" />
                <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-brand-black to-transparent z-10 pointer-events-none" />

                <div className="flex animate-scroll hover:[animation-play-state:paused] w-max gap-8 px-4">
                    {marqueeItems.map((partner, index) => (
                        <div
                            key={`${partner.name}-${index}`}
                            className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl px-6 py-4 min-w-[240px] hover:bg-white/10 hover:border-brand-primary/30 transition-all duration-300 group"
                        >
                            <div className="p-2 bg-brand-primary/10 rounded-lg text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors">
                                {partner.icon}
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-md whitespace-nowrap">{partner.name}</h4>
                                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{partner.category}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Ecosystem;
