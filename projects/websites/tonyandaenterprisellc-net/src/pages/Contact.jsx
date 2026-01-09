import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
    return (
        <div className="bg-gray-50 min-h-screen py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900">Get in Touch</h1>
                    <p className="mt-4 text-xl text-gray-600">Request a quote or discuss your logistics and security needs.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="bg-brand-dark text-white rounded-3xl p-10 shadow-xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-12 translate-x-12"></div>

                        <h2 className="text-2xl font-bold mb-8 relative z-10">Contact Information</h2>
                        <div className="space-y-8 relative z-10">
                            <div className="flex items-start space-x-4">
                                <Phone className="text-brand-secondary h-6 w-6 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-brand-light">Phone</h3>
                                    <p className="mt-1 text-lg">(908) 251-9749</p>
                                    <p className="text-sm text-brand-light/60 mt-1">24 Hours, 7 Days a Week</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <Mail className="text-brand-secondary h-6 w-6 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-brand-light">Email</h3>
                                    <p className="mt-1 text-lg break-all">contact@tonyandaenterprisellc.net</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <MapPin className="text-brand-secondary h-6 w-6 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-brand-light">Address</h3>
                                    <p className="mt-1 text-lg">380 Park Avenue<br />Orange, NJ 07050</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-3xl p-10 shadow-lg border border-gray-100">
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input type="text" id="name" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all" placeholder="John Doe" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input type="email" id="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all" placeholder="john@example.com" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">Service Interested In</label>
                                <select id="service" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all bg-white">
                                    <option value="">Select a service...</option>
                                    <option value="medical">Medical Courier Service</option>
                                    <option value="delivery">Standard Delivery</option>
                                    <option value="security">Private Security</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea id="message" rows="4" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all" placeholder="Tell us about your needs..."></textarea>
                            </div>

                            <button type="submit" className="w-full bg-brand-primary text-white font-bold py-4 rounded-xl hover:bg-brand-dark transition-colors flex items-center justify-center shadow-lg hover:shadow-brand-primary/30 transform hover:-translate-y-0.5">
                                Send Message <Send className="ml-2" size={18} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
