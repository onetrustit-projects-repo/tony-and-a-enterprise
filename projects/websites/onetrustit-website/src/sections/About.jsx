import React from 'react';
import { CheckCircle } from 'lucide-react';
import Button from '../components/Button';

const About = () => {
    return (
        <section id="about" className="py-20 bg-brand-darker relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-brand-primary/5 to-transparent pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <div className="order-2 lg:order-1">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Why Choose <span className="text-brand-primary">One Trust IT</span>?
                        </h2>
                        <p className="text-gray-400 mb-8 leading-relaxed">
                            At One Trust IT, we believe that security is the foundation of innovation. As a premier MSP/MSSP, we provide robust technology solutions that empower businesses to operate with confidence in an increasingly digital world.
                        </p>

                        <div className="space-y-4 mb-8">
                            {[
                                "24/7 Security Operations Center (SOC)",
                                "Proactive Threat Hunting & Neutralization",
                                "Certified Security Experts",
                                "Tailored Compliance Frameworks (GDPR, HIPAA, SOC2)"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-brand-primary shrink-0" />
                                    <span className="text-gray-300 font-medium">{item}</span>
                                </div>
                            ))}
                        </div>

                        <Button variant="outline" href="#contact">Learn More About Us</Button>
                    </div>

                    <div className="order-1 lg:order-2 relative">
                        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl glass p-2">
                            <div className="bg-brand-black/50 rounded-xl overflow-hidden min-h-[400px] flex items-center justify-center relative">
                                {/* Visual representation of trust/security */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-brand-black via-brand-dark to-brand-primary opacity-50" />
                                <div className="relative z-10 text-center p-8">
                                    <div className="text-5xl font-bold text-white mb-2">99.9%</div>
                                    <div className="text-brand-primary font-medium mb-8">Uptime Guaranteed</div>

                                    <div className="text-5xl font-bold text-white mb-2">0</div>
                                    <div className="text-brand-primary font-medium">Breaches for Managed Clients</div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative element */}
                        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-brand-primary/20 rounded-full blur-3xl animate-pulse" />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;
