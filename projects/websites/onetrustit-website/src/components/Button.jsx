import React from 'react';

const Button = ({ children, variant = 'primary', className = '', href, ...props }) => {
    const baseStyles = "inline-flex items-center justify-center px-6 py-2.5 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-brand-primary hover:bg-brand-dark text-white shadow-lg shadow-brand-primary/30",
        secondary: "bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/10",
        outline: "border border-brand-primary text-brand-primary hover:bg-brand-primary/10",
        ghost: "text-gray-300 hover:text-white hover:bg-white/5"
    };

    const classes = `${baseStyles} ${variants[variant]} ${className}`;

    if (href) {
        return (
            <a href={href} className={classes} {...props}>
                {children}
            </a>
        );
    }

    return (
        <button
            className={classes}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
