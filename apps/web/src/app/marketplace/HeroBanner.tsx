import Image from 'next/image';
import React from 'react';
import background from '../../../public/banner-bg.webp';
import content from '../../../public/banner-content.webp';

const HeroBanner = () => {
  return (
    <div className="inline-block relative">
      <Image
        src={background}
        alt="banner-background"
        className="absolute inset-0 object-cover z-10"
        fill
      />
      <div className="relative z-20 pt-24">
        <Image src={content} alt="banner-content" className="object-contain " />
      </div>
    </div>
  );
};

export default HeroBanner;
