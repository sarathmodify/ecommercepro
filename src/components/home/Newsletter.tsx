'use client';

import { useState } from 'react';

export default function Newsletter() {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // TODO: Add newsletter subscription logic
        setTimeout(() => {
            setIsSubmitting(false);
            setEmail('');
            alert('Thank you for subscribing!');
        }, 1000);
    };

    return (
        <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                    Subscribe to Our Newsletter
                </h2>
                <p className="text-lg text-white/90 mb-8">
                    Get the latest updates on new products and exclusive offers!
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 px-4 py-3 rounded-lg text-[var(--color-text)] border-2 border-white/30 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                        required
                        disabled={isSubmitting}
                    />
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-600 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                    </button>
                </form>
            </div>
        </section>
    );
}
