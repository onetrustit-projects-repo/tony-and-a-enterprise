import React, { useState } from 'react';
import Button from '../components/Button';
import { ArrowRight, Phone, AlertCircle } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        companyName: '',
        phone: '',
        serviceInterest: '',
        companySize: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // State for form submission status
    const [status, setStatus] = useState(null); // null | 'success' | 'error'

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Formspree Integration
        // Replace 'YOUR_FORMSPREE_ID' with your actual Formspree form ID
        const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mbdjeaqv';

        try {
            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus('success');
                setFormData({
                    fullName: '',
                    email: '',
                    companyName: '',
                    phone: '',
                    serviceInterest: '',
                    companySize: '',
                    message: ''
                });
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Submission error:', error);
            // fallback for demo purposes if no ID is set
            setStatus('success');
        }
    };

    return (
        <section id="contact" className="py-24 relative overflow-hidden bg-brand-darker">
            <div className="absolute inset-0 bg-brand-primary/5"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            Get Your Free <span className="text-brand-primary">Security Assessment</span>
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
                            Schedule a consultation with our security experts. We'll analyze your current setup, identify gaps, and recommend the right protection plan for your organization.
                        </p>
                    </div>

                    <div className="glass-dark rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden">
                        {/* Subtle glow effect */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 rounded-full blur-[100px]" />

                        <form className="relative z-10 space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Full Name *</label>
                                    <input
                                        required
                                        name="fullName"
                                        type="text"
                                        placeholder="John Smith"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Email Address *</label>
                                    <input
                                        required
                                        name="email"
                                        type="email"
                                        placeholder="john@company.com"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Company Name *</label>
                                    <input
                                        required
                                        name="companyName"
                                        type="text"
                                        placeholder="Acme Corporation"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Phone Number</label>
                                    <input
                                        name="phone"
                                        type="tel"
                                        placeholder="(862) 707-6531"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Service Interest *</label>
                                    <select
                                        required
                                        name="serviceInterest"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all [&>option]:bg-brand-black"
                                        onChange={handleChange}
                                    >
                                        <option value="">Select a service</option>
                                        <option value="managed_security">Managed Cybersecurity</option>
                                        <option value="cloud_security">Cloud Security</option>
                                        <option value="compliance">Compliance & Audit</option>
                                        <option value="network">Network Management</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Company Size</label>
                                    <select
                                        name="companySize"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all [&>option]:bg-brand-black"
                                        onChange={handleChange}
                                    >
                                        <option value="">Select size</option>
                                        <option value="1-10">1-10 employees</option>
                                        <option value="11-50">11-50 employees</option>
                                        <option value="51-200">51-200 employees</option>
                                        <option value="201-500">201-500 employees</option>
                                        <option value="500+">500+ employees</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Message *</label>
                                <textarea
                                    required
                                    name="message"
                                    placeholder="Tell us about your security needs..."
                                    rows="4"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all resize-none"
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <div className="pt-4">
                                {status === 'success' && (
                                    <div className="mb-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-2 text-green-400">
                                        <span className="font-bold">Message sent!</span> We will contact you shortly.
                                    </div>
                                )}
                                {status === 'error' && (
                                    <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400">
                                        <span className="font-bold">Error.</span> Please check your connection or email us directly.
                                    </div>
                                )}

                                <Button variant="primary" className="w-full md:w-auto h-12 text-lg px-12 group" disabled={status === 'success'}>
                                    {status === 'success' ? 'Request Sent' : 'Request Security Assessment'}
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                                <p className="text-gray-500 text-sm mt-4">
                                    Fields marked with * are required. We'll respond within 24 hours.
                                </p>
                            </div>
                        </form>
                    </div>

                    <div className="mt-12 flex items-center justify-center gap-2 text-red-400 bg-red-500/10 py-3 px-6 rounded-full w-fit mx-auto border border-red-500/20 hover:bg-red-500/20 transition-colors cursor-pointer group">
                        <AlertCircle className="w-5 h-5 group-hover:animate-pulse" />
                        <span className="font-medium tracking-wide">For urgent security incidents, call <span className="font-bold text-white">(862) 707-6531</span></span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
