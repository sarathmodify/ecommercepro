'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    icon?: React.ReactNode;
    fullWidth?: boolean;
}

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    loading = false,
    icon,
    fullWidth = false,
    className = '',
    disabled,
    ...props
}: ButtonProps) {
    // Base button classes
    const baseClasses = 'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    // Size classes
    const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg'
    };

    // Variant classes
    const variantClasses = {
        primary: 'bg-primary text-white hover:opacity-90 focus:ring-primary-400 shadow-md hover:shadow-lg',
        secondary: 'bg-secondary text-white hover:opacity-90 focus:ring-secondary-400 shadow-md hover:shadow-lg',
        accent: 'bg-accent text-white hover:opacity-90 focus:ring-accent-400 shadow-md hover:shadow-lg',
        outline: 'border-2 border-primary text-primary hover:bg-primary hover:!text-white focus:ring-primary-400',
        ghost: 'text-primary hover:bg-primary-50 focus:ring-primary-200',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-400 shadow-md hover:shadow-lg'
    };

    const widthClass = fullWidth ? 'w-full' : '';

    return (
        <button
            className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${className}`}
            disabled={disabled || loading}
            aria-busy={loading}
            {...props}
        >
            {loading && (
                <svg
                    className="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            )}
            {!loading && icon && <span>{icon}</span>}
            <span>{children}</span>
        </button>
    );
}
