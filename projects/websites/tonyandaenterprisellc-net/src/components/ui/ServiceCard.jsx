import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ServiceCard = ({ title, description, icon: Icon, path, color = 'brand' }) => {
    const isSecurity = color === 'security';
    const bgColor = isSecurity ? 'bg-security-accent' : 'bg-white';
    const textColor = isSecurity ? 'text-white' : 'text-gray-900';
    const iconColor = isSecurity ? 'text-brand-light' : 'text-brand-primary';
    const buttonColor = isSecurity ? 'bg-brand-primary hover:bg-brand-light hover:text-brand-dark' : 'bg-brand-primary hover:bg-brand-dark text-white';

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className={`${bgColor} ${textColor} p-8 rounded-2xl shadow-xl border border-transparent hover:border-brand-primary/20 transition-all duration-300 flex flex-col h-full`}
        >
            <div className={`${isSecurity ? 'bg-white/10' : 'bg-brand-light/30'} w-14 h-14 rounded-xl flex items-center justify-center mb-6`}>
                <Icon className={`${iconColor}`} size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-4">{title}</h3>
            <p className={`mb-8 flex-grow leading-relaxed ${isSecurity ? 'text-gray-300' : 'text-gray-600'}`}>
                {description}
            </p>
            <Link
                to={path}
                className={`inline-flex items-center font-semibold group ${isSecurity ? 'text-brand-secondary' : 'text-brand-primary'}`}
            >
                Learn more <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
        </motion.div>
    );
};

export default ServiceCard;
