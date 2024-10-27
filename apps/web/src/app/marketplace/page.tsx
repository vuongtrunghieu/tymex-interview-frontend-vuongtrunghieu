import HeroBanner from '@/app/marketplace/HeroBanner';
import MainContent from '@/app/marketplace/MainContent';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Image from 'next/image';
import React from 'react';
import mainBackground from '../../../public/main-bg.webp';

const Marketplace = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />
      <HeroBanner />
      <main className="relative">
        <Image
          src={mainBackground}
          alt="main-background"
          fill
          className="object-cover absolute"
        />
        <MainContent />
      </main>
      <Footer />
    </div>
  );
};

export default Marketplace;
