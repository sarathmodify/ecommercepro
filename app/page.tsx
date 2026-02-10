'use client';

import { useState } from 'react';
import Button from '@/src/components/ui/Button';
import Loader from '@/src/components/ui/Loader';
import Modal from '@/src/components/ui/Modal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);

  const handleLoadingDemo = () => {
    setLoadingButton(true);
    setTimeout(() => setLoadingButton(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background-light">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4">E-Commerce Pro</h1>
          <p className="text-xl mb-8 text-white/90">
            Phase 1: Foundation & Design System Complete! 🎉
          </p>
          <div className="flex gap-4 flex-wrap">
            <Button variant="accent" size="lg">
              Get Started
            </Button>
            <Button variant="outline" size="lg" className="!text-white !border-white hover:!bg-white hover:!text-primary">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Button Variants Section */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text)] mb-6">Button Components</h2>

        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-6 mb-8">
          <h3 className="text-xl sm:text-2xl font-semibold text-[var(--color-text)] mb-4">Variants</h3>
          <div className="flex gap-3 flex-wrap">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-6 mb-8">
          <h3 className="text-xl sm:text-2xl font-semibold text-[var(--color-text)] mb-4">Sizes</h3>
          <div className="flex gap-3 items-center flex-wrap">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-6 mb-8">
          <h3 className="text-xl sm:text-2xl font-semibold text-[var(--color-text)] mb-4">States</h3>
          <div className="flex gap-3 flex-wrap">
            <Button loading={loadingButton} onClick={handleLoadingDemo}>
              {loadingButton ? 'Loading...' : 'Click to Load'}
            </Button>
            <Button disabled>Disabled</Button>
            <Button fullWidth variant="accent">Full Width Button</Button>
          </div>
        </div>
      </section>

      {/* Loader Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text)] mb-6">Loader Components</h2>

          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-6 mb-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-[var(--color-text)] mb-4">Sizes</h3>
            <div className="flex gap-8 items-center flex-wrap">
              <Loader size="sm" />
              <Loader size="md" />
              <Loader size="lg" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-6">
            <h3 className="text-xl sm:text-2xl font-semibold text-[var(--color-text)] mb-4">With Text</h3>
            <Loader size="md" text="Loading your data..." centered />
          </div>
        </div>
      </section>

      {/* Modal Section */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text)] mb-6">Modal Components</h2>

        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-6">
          <h3 className="text-xl sm:text-2xl font-semibold text-[var(--color-text)] mb-4">Try the Modal</h3>
          <p className="text-[var(--color-text-light)] mb-4">
            Click the button below to open a modal with full accessibility features:
            ESC key support, focus trap, and backdrop blur.
          </p>
          <Button onClick={() => setIsModalOpen(true)}>
            Open Modal
          </Button>
        </div>
      </section>

      {/* Badges & Utilities Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text)] mb-6">Badges & Utilities</h2>

          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-6 mb-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-[var(--color-text)] mb-4">Status Badges</h3>
            <div className="flex gap-3 flex-wrap">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--color-accent-100)] text-[var(--color-accent-700)]">Success</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">Warning</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">Danger</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--color-primary-100)] text-[var(--color-primary-700)]">Info</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-6">
            <h3 className="text-xl sm:text-2xl font-semibold text-[var(--color-text)] mb-4">Typography</h3>
            <h1 className="text-4xl sm:text-5xl font-bold text-[var(--color-text)] mb-2">Heading 1</h1>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text)] mb-2">Heading 2</h2>
            <h3 className="text-2xl sm:text-3xl font-semibold text-[var(--color-text)] mb-2">Heading 3</h3>
            <h4 className="text-xl sm:text-2xl font-semibold text-[var(--color-text)] mb-2">Heading 4</h4>
            <p className="text-[var(--color-text-light)]">Muted text for less important information</p>
          </div>
        </div>
      </section>

      {/* Phase 1 Summary */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[var(--color-primary-50)] to-[var(--color-secondary-50)] border border-[var(--color-primary-200)] rounded-xl shadow-md p-4 sm:p-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text)] mb-4">✅ Phase 1 Complete!</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Implemented:</h4>
              <ul className="list-disc list-inside space-y-1 text-[var(--color-text-light)]">
                <li>Pure Tailwind CSS design system</li>
                <li>Button component (6 variants, 3 sizes, loading states)</li>
                <li>Loader component (3 sizes, with text support)</li>
                <li>Modal component (fully accessible, animations)</li>
                <li>Clean globals.css with color variables only</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Features:</h4>
              <ul className="list-disc list-inside space-y-1 text-text-light">
                <li>Your custom color scheme (Indigo, Violet, Emerald)</li>
                <li>Smooth animations and transitions</li>
                <li>Full accessibility support</li>
                <li>Responsive design utilities</li>
                <li>Focus visible states for keyboard navigation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Demo */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Welcome to E-Commerce Pro!"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-[var(--color-text-light)]">
            This is a fully accessible modal component with the following features:
          </p>
          <ul className="list-disc list-inside space-y-2 text-[var(--color-text-light)]">
            <li>Press ESC to close</li>
            <li>Click backdrop to close</li>
            <li>Focus trap keeps keyboard navigation inside</li>
            <li>Backdrop blur effect</li>
            <li>Smooth slide-in animation</li>
          </ul>
          <div className="flex gap-3 pt-4">
            <Button variant="primary" onClick={() => setIsModalOpen(false)}>
              Got it!
            </Button>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
