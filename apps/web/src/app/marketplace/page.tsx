import HeroBanner from '@/app/marketplace/HeroBanner';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import React from 'react';

const Marketplace = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />
      <HeroBanner />
      <main className="flex-grow container mx-auto py-8">Main content</main>
      <Footer />
    </div>
  );
};

export default Marketplace;
