import Link from 'next/link';
import Button from '../ui/Button';


export default function HeroSection() {
    return (
        <section className="relative bg-gradient-to-br from-primary to-secondary text-white py-20 lg:py-32 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                            <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                            <span className="text-sm font-medium">New Collection Available</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            Discover Amazing Products at{' '}
                            <span className="text-accent">Unbeatable Prices</span>
                        </h1>

                        <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl">
                            Shop the latest trends in fashion, electronics, home decor, and more.
                            Fast shipping, easy returns, and 24/7 customer support.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Button
                                variant="accent"
                                size="lg"
                                className="shadow-lg shadow-accent/50 hover:shadow-xl hover:shadow-accent/60 transition-all"
                            >
                                Shop Now
                            </Button>
                            <button
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-lg font-medium border-2 border-white text-white hover:bg-white hover:text-primary rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white cursor-pointer"
                            >
                                View Collections
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
                            <div>
                                <div className="text-3xl font-bold text-accent">10k+</div>
                                <div className="text-sm text-white/80">Products</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-accent">50k+</div>
                                <div className="text-sm text-white/80">Happy Customers</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-accent">4.9</div>
                                <div className="text-sm text-white/80">Rating</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Image Placeholder */}
                    <div className="hidden lg:block">
                        <div className="relative">
                            {/* Main Image Card */}
                            <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                                    <div className="text-center">
                                        <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                        </svg>
                                        <p className="text-gray-500 font-medium">Featured Product</p>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute -top-4 -right-4 bg-accent text-white px-6 py-3 rounded-full shadow-lg transform rotate-12 animate-pulse">
                                <span className="font-bold">50% OFF</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
