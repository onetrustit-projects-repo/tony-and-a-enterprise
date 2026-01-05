import React from 'react';
import { Shield, Mail, Phone, MapPin, Linkedin, Twitter, Github } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-brand-darker border-t border-white/10 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <img src="/logo-full.png" alt="One Trust IT" className="h-10 w-auto object-contain mix-blend-screen grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Securing businesses with enterprise-grade cybersecurity solutions and managed IT services.
                        </p>
                        <div className="flex gap-4">
                            {[Linkedin, Twitter, Github].map((Icon, i) => (
                                <a key={i} href="#" className="text-gray-400 hover:text-brand-primary transition-colors">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Solutions</h4>
                        <ul className="space-y-4">
                            {['Network Security', 'Cloud Protection', 'Threat Monitoring', 'Compliance'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Company</h4>
                        <ul className="space-y-4">
                            {['About Us', 'Careers', 'Blog', 'Legal'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Contact</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-400 text-sm">
                                <MapPin className="w-5 h-5 text-brand-primary shrink-0" />
                                <span>PO Box 742,<br />Lake Hopatcong, NJ 07849</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400 text-sm">
                                <Phone className="w-4 h-4 text-brand-primary shrink-0" />
                                <span>+1 (862) 707-6531</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400 text-sm">
                                <Mail className="w-4 h-4 text-brand-primary shrink-0" />
                                <span>contact@onetrustit.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 text-center text-gray-500 text-sm">
                    <p>© {new Date().getFullYear()} One Trust IT. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
