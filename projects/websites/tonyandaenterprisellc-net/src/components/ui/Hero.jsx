import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Truck, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <div className="relative overflow-hidden bg-gray-900 text-white min-h-[85vh] flex items-center">
            {/* Abstract Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-dark to-security-dark opacity-90 z-10" />
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30 z-0 mix-blend-overlay" />

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 py-20 flex flex-col lg:flex-row items-center">
                <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-brand-primary/20 border border-brand-secondary/30 text-brand-light text-sm font-semibold mb-6 tracking-wide">
                            TRUSTED & SECURE SERVICES
                        </span>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                            Delivery with <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-light">Speed</span>.<br />
                            Security with <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white">Precision</span>.
                        </h1>
                        <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                            Tony & A Enterprise offers premium Medical Courier and Private Security services. Unmatched reliability for your most critical assets.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                    >
                        <Link
                            to="/medical-courier"
                            className="group flex items-center justify-center px-8 py-4 bg-brand-primary hover:bg-brand-secondary text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-brand-primary/40 transform hover:-translate-y-1"
                        >
                            <Truck className="mr-3" size={20} />
                            Courier Services
                            <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                        </Link>
                        <Link
                            to="/private-security"
                            className="group flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white rounded-xl font-bold transition-all transform hover:-translate-y-1"
                        >
                            <Shield className="mr-3" size={20} />
                            Private Security
                        </Link>
                    </motion.div>
                </div>

                {/* Visual Element / Cards */}
                <div className="lg:w-1/2 mt-16 lg:mt-0 relative hidden lg:block">
                    <div className="relative w-full max-w-lg mx-auto transform rotate-3 hover:rotate-0 transition-transform duration-500">
                        <div className="absolute -inset-4 bg-brand-secondary/30 rounded-full blur-3xl" />
                        <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl">
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="bg-brand-primary p-3 rounded-xl">
                                    <Truck className="text-white" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg">Medical Delivery</h3>
                                    <p className="text-gray-400 text-sm">Status: In Transit (On Time)</p>
                                </div>
                            </div>
                            <div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-2">
                                <div className="w-3/4 h-full bg-green-400" />
                            </div>
                            <div className="flex justify-between text-xs text-gray-400 mb-8">
                                <span>Pickup</span>
                                <span>Destination</span>
                            </div>

                            <div className="border-t border-white/10 pt-6"></div>

                            <div className="flex items-center space-x-4">
                                <div className="bg-security-accent p-3 rounded-xl">
                                    <Shield className="text-white" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg">Site Security</h3>
                                    <p className="text-green-400 text-sm flex items-center">
                                        <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                                        Active Monitoring
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
