interface Feature {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
}

export default function Features() {
    const features: Feature[] = [
        {
            id: '1',
            title: 'Free Shipping',
            description: 'On orders over $50',
            color: 'accent',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
            ),
        },
        {
            id: '2',
            title: '24/7 Support',
            description: 'Always here to help',
            color: 'primary',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ),
        },
        {
            id: '3',
            title: 'Secure Payment',
            description: '100% protected transactions',
            color: 'secondary',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            ),
        },
    ];

    const getColorClasses = (color: string) => {
        const colorMap: Record<string, { bg: string; text: string }> = {
            accent: { bg: 'bg-accent/10', text: 'text-accent' },
            primary: { bg: 'bg-primary/10', text: 'text-primary' },
            secondary: { bg: 'bg-secondary/10', text: 'text-secondary' },
        };
        return colorMap[color] || colorMap.primary;
    };

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature) => {
                        const colors = getColorClasses(feature.color);
                        return (
                            <div key={feature.id} className="text-center">
                                <div className={`w-16 h-16 ${colors.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                                    <div className={colors.text}>
                                        {feature.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold text-[var(--color-text)] mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-[var(--color-text-light)]">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
