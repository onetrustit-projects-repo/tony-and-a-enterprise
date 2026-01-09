import React from 'react';
import { Truck, Clock, FileCheck, Thermometer, ShieldCheck } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

const MedicalCourier = () => {
    const { contact } = siteConfig;
    const services = [
        {
            title: "Same Day Delivery",
            description: "Immediate pickup and delivery for urgent medical supplies, specimens, and equipment.",
            icon: Clock
        },
        {
            title: "Scheduled Routes",
            description: "Reliable, recurring pickups for laboratories, hospitals, and clinics.",
            icon: Truck
        },
        {
            title: "Medical Records",
            description: "Secure transport of sensitive patient files and documents, fully HIPAA compliant.",
            icon: FileCheck
        },
        {
            title: "Temperature Controlled",
            description: "Specialized handling for specimens requiring specific temperature ranges.",
            icon: Thermometer
        }
    ];

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="bg-brand-primary text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-8">
                    <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm shrink-0">
                        <img src="/logo.png" alt="Tony & A Enterprise" className="h-32 w-auto object-contain bg-white rounded-xl p-2" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold mb-4">Medical Courier Services</h1>
                        <p className="text-xl text-brand-light/80 max-w-2xl">
                            Reliable, HIPAA-compliant transport for the healthcare industry. When lives are on the line, we deliver.
                        </p>
                    </div>
                </div>
            </div>

            {/* Intro */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="order-2 lg:order-1">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-green-100 p-3 rounded-xl text-green-700">
                                <ShieldCheck size={28} />
                            </div>
                            <h2 className="text-2xl font-bold text-brand-dark">HIPAA & BBP Certified</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            All our drivers undergo rigorous training and certification in HIPAA regulations and Bloodborne Pathogens (BBP) handling.
                            We understand the critical nature of medical logistics and ensure the highest standards of safety, privacy, and speed.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            From specimen transport to at-home medical supply delivery, our team treats every package with the care it deserves—as if it were for our own family.
                        </p>
                    </div>
                    <div className="order-1 lg:order-2 h-full">
                        <img
                            src="/medical-care.jpg"
                            alt="Compassionate medical care"
                            className="rounded-xl shadow-lg w-full h-full object-cover min-h-[300px]"
                        />
                    </div>
                </div>
            </div>

            {/* Service Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 border-l-4 border-brand-secondary pl-4">Our Courier Solutions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {services.map((service, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-brand-light/20 text-brand-primary rounded-lg flex items-center justify-center mb-4">
                                <service.icon size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                            <p className="text-gray-600">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Non-Medical Home Care Section */}
            <div className="bg-white py-20 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Non-Medical Home Care</h2>
                    <p className="text-xl text-gray-600 mb-12 max-w-3xl">
                        Compassionate support to help your loved ones maintain independence and quality of life at home.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-center hover:bg-brand-light/10 transition-colors">
                            <div className="w-14 h-14 bg-brand-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-md">
                                ❤️
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Companion Care</h3>
                            <p className="text-gray-600 text-sm">Friendly company, conversation, and emotional support.</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-center hover:bg-brand-light/10 transition-colors">
                            <div className="w-14 h-14 bg-brand-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-md">
                                🏃
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Light Exercise</h3>
                            <p className="text-gray-600 text-sm">Assistance with mobility and prescribed exercise routines.</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-center hover:bg-brand-light/10 transition-colors">
                            <div className="w-14 h-14 bg-brand-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-md">
                                🥗
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Meal Prep</h3>
                            <p className="text-gray-600 text-sm">Nutritious meal planning and preparation.</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-center hover:bg-brand-light/10 transition-colors">
                            <div className="w-14 h-14 bg-brand-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-md">
                                🏠
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Home Cleaning</h3>
                            <p className="text-gray-600 text-sm">Light housekeeping to ensure a safe environment.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gray-100 py-16 text-center">
                <div className="max-w-3xl auto px-4">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Need a Rush Delivery?</h2>
                    <p className="text-lg text-gray-600 mb-8">Call our dispatch team immediately for time-critical requests.</p>
                    <a href={contact.phoneLink} className="inline-flex items-center px-8 py-3 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-dark transition-colors">
                        <Truck className="mr-2" size={20} />
                        Call {contact.phone}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default MedicalCourier;
