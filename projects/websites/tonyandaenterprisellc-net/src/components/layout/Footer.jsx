import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Linkedin, Facebook } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

const Footer = () => {
    const { branding, contact } = siteConfig;
    return (
        <footer className="bg-brand-dark text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Info */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold tracking-tight">{branding.name}</h3>
                        <p className="text-brand-light/80 text-sm leading-relaxed max-w-xs">
                            {branding.description}
                        </p>
                        <div className="flex space-x-4 pt-2">
                            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-brand-primary transition-colors">
                                <Linkedin size={18} />
                            </a>
                            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-brand-primary transition-colors">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-brand-primary transition-colors">
                                <Facebook size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6 text-brand-secondary">Services</h4>
                        <ul className="space-y-3 text-brand-light/70 text-sm">
                            <li><Link to="/medical-courier" className="hover:text-white transition-colors">Medical Courier</Link></li>
                            <li><Link to="/medical-courier" className="hover:text-white transition-colors">Same Day Delivery</Link></li>
                            <li><Link to="/private-security" className="hover:text-white transition-colors">Private Security</Link></li>
                            <li><Link to="/private-security" className="hover:text-white transition-colors">Asset Protection</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6 text-brand-secondary">Company</h4>
                        <ul className="space-y-3 text-brand-light/70 text-sm">
                            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition-colors">Get a Quote</Link></li>
                            <li><Link to="/about" className="hover:text-white transition-colors">Careers</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6 text-brand-secondary">Contact Us</h4>
                        <ul className="space-y-4 text-brand-light/80 text-sm">
                            <li className="flex items-start">
                                <Phone size={18} className="mr-3 mt-0.5 text-brand-secondary flex-shrink-0" />
                                <span>{contact.phone}</span>
                            </li>
                            <li className="flex items-center">
                                <Mail size={18} className="mr-3 text-brand-secondary flex-shrink-0" />
                                <span className="truncate">{contact.email}</span>
                            </li>
                            <li className="flex items-start">
                                <MapPin size={18} className="mr-3 mt-0.5 text-brand-secondary flex-shrink-0" />
                                <span>{contact.address.street}, {contact.address.city} {contact.address.state} {contact.address.zip}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-brand-light/50">
                    <p>© {new Date().getFullYear()} {branding.legalName} All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-white">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
