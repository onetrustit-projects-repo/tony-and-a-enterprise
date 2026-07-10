import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useSiteContent } from '../content/SiteContentContext';

const Contact = () => {
    const { contact } = useSiteContent();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        service: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus({ type: 'success', message: 'Thank you! We will contact you shortly.' });
                setFormData({ name: '', email: '', service: '', message: '' });
            } else {
                throw new Error('Failed to send message');
            }
        } catch (_error) {
            // Fallback: show email link if API not configured
            setStatus({ 
                type: 'info', 
                message: 'Form submission is being configured. Please email us directly at ' + contact.email 
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero - Dark Gradient Theme */}
            <div className="relative overflow-hidden bg-gray-900 text-white py-20">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-dark to-security-dark opacity-90 z-10" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30 z-0 mix-blend-overlay" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center">
                    <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Request a quote or discuss your logistics and security needs.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
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
                                    <p className="mt-1 text-lg">{contact.phone}</p>
                                    <p className="text-sm text-brand-light/60 mt-1">{contact.hours}</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <Mail className="text-brand-secondary h-6 w-6 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-brand-light">Email</h3>
                                    <p className="mt-1 text-lg break-all">{contact.email}</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <MapPin className="text-brand-secondary h-6 w-6 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-brand-light">Address</h3>
                                    <p className="mt-1 text-lg">{contact.address.street}<br />{contact.address.city}, {contact.address.state} {contact.address.zip}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-3xl p-10 shadow-lg border border-gray-100">
                        {status.message && (
                            <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${status.type === 'success' ? 'bg-green-50 text-green-700' : status.type === 'info' ? 'bg-blue-50 text-blue-700' : 'bg-red-50 text-red-700'}`}>
                                {status.type === 'success' ? <CheckCircle size={20} className="mt-0.5" /> : <AlertCircle size={20} className="mt-0.5" />}
                                <p>{status.message}</p>
                            </div>
                        )}
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                                    <input type="text" id="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all" placeholder="John Doe" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                                    <input type="email" id="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all" placeholder="john@example.com" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">Service Interested In</label>
                                <select id="service" value={formData.service} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all bg-white">
                                    <option value="">Select a service...</option>
                                    <option value="medical">Medical Courier Service</option>
                                    <option value="delivery">Standard Delivery</option>
                                    <option value="security">Private Security</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                                <textarea id="message" required value={formData.message} onChange={handleChange} rows="4" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all" placeholder="Tell us about your needs..."></textarea>
                            </div>

                            <button type="submit" disabled={isSubmitting} className="w-full bg-brand-primary text-white font-bold py-4 rounded-xl hover:bg-brand-dark transition-colors flex items-center justify-center shadow-lg hover:shadow-brand-primary/30 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed">
                                {isSubmitting ? 'Sending...' : <>Send Message <Send className="ml-2" size={18} /></>}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
