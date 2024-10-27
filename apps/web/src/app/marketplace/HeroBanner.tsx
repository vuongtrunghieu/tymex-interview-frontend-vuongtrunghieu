import Image from 'next/image';
import React from 'react';
import background from '../../../public/banner-bg.webp';
import content from '../../../public/banner-content.webp';

const HeroBanner = () => {
  return (
    <div className="inline-block relative" data-testid="hero-banner">
      <h1 className="text-2xl sr-only">New Arrivals</h1>
      <Image
        src={background}
        alt="banner-background"
        className="absolute object-cover w-full h-auto"
        sizes="100vw"
        fill
      />
      <div className="relative z-10 pt-24">
        <Image
          src={content}
          alt="banner-content"
          className="object-cover"
          sizes="(max-width: 480px) 100vw, (max-width: 768px) 75vw, (max-width: 1200px) 50vw, (max-width: 1600px) 40vw, 30vw"
          width={3840}
          height={1310}
        />
      </div>
    </div>
  );
};

export default HeroBanner;
