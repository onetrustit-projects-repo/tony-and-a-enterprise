import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Medical Courier', path: '/medical-courier' },
        { name: 'Private Security', path: '/private-security' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    const closeMenu = () => setIsOpen(false);

    return (
        <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-3" onClick={closeMenu}>
                            <img src="/logo.png" alt="Tony & A Enterprise Logo" className="h-12 w-auto object-contain bg-white rounded-lg p-1" />
                            <div className="flex flex-col">
                                <span className="font-bold text-brand-dark text-lg leading-tight">Tony & A</span>
                                <span className="text-xs text-brand-secondary font-medium tracking-wider">ENTERPRISE LLC</span>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-sm font-medium transition-colors duration-200 ${location.pathname === link.path
                                    ? 'text-brand-primary font-bold'
                                    : 'text-gray-600 hover:text-brand-primary'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            to="/contact"
                            className="bg-brand-primary hover:bg-brand-dark text-white px-5 py-2.5 rounded-full font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm"
                        >
                            Get a Quote
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 hover:text-brand-primary focus:outline-none p-2"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-2 shadow-inner">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={closeMenu}
                                    className={`block px-4 py-3 rounded-lg text-base font-medium ${location.pathname === link.path
                                        ? 'bg-brand-light/20 text-brand-primary'
                                        : 'text-gray-700 hover:bg-gray-50 hover:text-brand-primary'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-4">
                                <Link
                                    to="/contact"
                                    onClick={closeMenu}
                                    className="block w-full text-center bg-brand-primary text-white px-5 py-3 rounded-xl font-medium shadow-md active:scale-95 transition-transform"
                                >
                                    Get a Quote
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
