import React from 'react';
import { Shield, ArrowRight, Lock, Server } from 'lucide-react';
import Button from '../components/Button';

const Hero = () => {
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            {/* Dynamic Background */}
            <div className="absolute inset-0 bg-brand-black">
                {/* Gradient Orbs */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-primary/20 rounded-full blur-[128px] animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-electric-blue/10 rounded-full blur-[128px] animate-pulse delay-1000" />

                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <div className="absolute inset-0"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
                        backgroundSize: '50px 50px'
                    }}
                ></div>
            </div>

            <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Content */}
                <div className="max-w-3xl space-y-8 animate-slide-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-gray-300 text-sm font-medium">24/7 Threat Monitoring Active</span>
                    </div>

                    <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                        Securing Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-cyan-400">
                            Digital Future
                        </span>
                    </h1>

                    <p className="text-xl text-gray-400 leading-relaxed max-w-xl">
                        Enterprise-grade managed IT and cybersecurity solutions. We protect your infrastructure so you can focus on growth.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button variant="primary" className="flex items-center justify-center gap-2 h-14 px-8 text-lg" href="#contact">
                            Get Security Audit
                            <ArrowRight className="w-5 h-5" />
                        </Button>
                        <Button variant="secondary" className="flex items-center justify-center gap-2 h-14 px-8 text-lg" href="#services">
                            View Solutions
                        </Button>
                    </div>

                    <div className="pt-8 flex items-center gap-8 text-gray-500">
                        <div className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-brand-primary" />
                            <span className="text-sm">End-to-End Encryption</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Lock className="w-5 h-5 text-brand-primary" />
                            <span className="text-sm">Zero Trust Architecture</span>
                        </div>
                    </div>

                    <div className="mt-8 flex items-center justify-start gap-2 text-red-400 bg-red-500/10 py-3 px-6 rounded-full w-fit border border-red-500/20 hover:bg-red-500/20 transition-colors cursor-pointer group">
                        {/* We need to import AlertCircle first, but since this is a replace block, we can just use it if imported. Let's check imports. */}
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="font-medium tracking-wide text-sm">Urgent incident? Call <span className="font-bold text-white">1-862-707-6531</span></span>
                    </div>
                </div>

                {/* Visual/graphic side */}
                <div className="hidden lg:block relative">
                    {/* Abstract visual made of CSS/DIVs representing a shield or network */}
                    <div className="relative w-full h-[600px] flex items-center justify-center perspective-1000">
                        <div className="relative w-80 h-96 glass-dark border-brand-primary/30 rounded-2xl transform rotate-y-12 rotate-x-6 hover:rotate-y-0 hover:rotate-x-0 transition-all duration-700 shadow-2xl shadow-brand-primary/20 flex flex-col items-center justify-center p-8 border hover:border-brand-primary/50 group">
                            <div className="w-24 h-24 bg-brand-primary/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                <Shield className="w-12 h-12 text-brand-primary" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Network Security</h3>
                            <p className="text-center text-gray-400 text-sm">Real-time firewall & intrusion detection systems active.</p>

                            {/* Floating badges */}
                            <div className="absolute -right-12 top-20 bg-brand-darker border border-white/10 p-3 rounded-lg shadow-xl animate-bounce delay-75">
                                <Server className="w-6 h-6 text-green-400" />
                            </div>
                            <div className="absolute -left-12 bottom-20 bg-brand-darker border border-white/10 p-3 rounded-lg shadow-xl animate-bounce delay-150">
                                <Lock className="w-6 h-6 text-cyan-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
