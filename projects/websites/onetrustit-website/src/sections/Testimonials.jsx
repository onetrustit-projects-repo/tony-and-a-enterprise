import React from 'react';
import { Quote, Star, CheckCircle } from 'lucide-react';

const Testimonials = () => {
    const testimonials = [
        {
            quote: "OneTrust IT transformed our security posture. We achieved HIPAA compliance in 90 days and now have 24/7 protection.",
            author: "Sarah Chen",
            role: "CTO, MedTech Solutions",
            metric: "HIPAA compliant in 90 days",
            highlightColor: "text-brand-primary"
        },
        {
            quote: "The vCISO service gave us strategic guidance we couldn't afford to hire full-time. Best decision we made.",
            author: "Michael Rodriguez",
            role: "CEO, FinServe Inc",
            metric: "SOC 2 Type II achieved",
            highlightColor: "text-green-400"
        },
        {
            quote: "When we had a security incident, their 15-minute response time and expert handling saved us from major damage.",
            author: "Emily Watson",
            role: "VP Engineering, CloudApp Systems",
            metric: "Incident contained in 45 minutes",
            highlightColor: "text-cyan-400"
        }
    ];

    return (
        <section id="testimonials" className="py-24 bg-brand-darker relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Client <span className="text-brand-primary">Success Stories</span>
                    </h2>
                    <p className="text-gray-400 text-lg">
                        See how we help organizations verify security, meet compliance, and protect their future.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <div
                            key={index}
                            className="glass-dark p-8 rounded-2xl border border-white/5 hover:border-brand-primary/30 transition-all duration-300 hover:-translate-y-1 group"
                        >
                            <div className="mb-6">
                                <Quote className="w-10 h-10 text-brand-primary/20 group-hover:text-brand-primary/40 transition-colors" />
                            </div>

                            <p className="text-gray-300 text-lg mb-8 leading-relaxed italic">
                                "{item.quote}"
                            </p>

                            <div className="border-t border-white/5 pt-6 mt-auto">
                                <div className="flex items-center gap-2 mb-4">
                                    <CheckCircle className={`w-5 h-5 ${item.highlightColor}`} />
                                    <span className={`font-semibold text-sm ${item.highlightColor}`}>{item.metric}</span>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center font-bold text-white border border-white/10">
                                        {item.author.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium">{item.author}</h4>
                                        <p className="text-gray-500 text-sm italic">{item.role}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
