import HeroBanner from '@/app/marketplace/HeroBanner';
import MainContent from '@/app/marketplace/MainContent';
import { searchParamsCache } from '@/app/marketplace/search-params';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Image from 'next/image';
import type { SearchParams } from 'nuqs/server';
import React from 'react';
import mainBackground from '../../../public/main-bg.webp';

const Marketplace = async ({
  searchParams,
}: { searchParams: SearchParams }) => {
  searchParamsCache.parse(searchParams);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />
      <HeroBanner />
      <main className="relative pt-12 pb-20">
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
