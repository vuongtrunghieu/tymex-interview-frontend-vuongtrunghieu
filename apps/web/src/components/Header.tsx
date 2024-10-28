'use client';

import { Button } from '@fpoon-tymex/ui/button';
import { cn } from '@fpoon-tymex/ui/cn';
import { Icons } from '@fpoon-tymex/ui/icons';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@fpoon-tymex/ui/select';
import { Separator } from '@fpoon-tymex/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@fpoon-tymex/ui/sheet';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Footer = () => {
  const [language, setLanguage] = useState('en');
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Scroll threshold in px
      const THRESHOLD = 10;
      const currentScrollPos = window.scrollY;
      // Hide the header when the user scrolls down
      // Show the header when the user scrolls up
      setVisible(
        prevScrollPos > currentScrollPos || currentScrollPos < THRESHOLD,
      );
      setPrevScrollPos(currentScrollPos);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  // Using hardcoded href because it doesn't matter for this assessment
  // Right now we only need /marketplace
  const navItems = [
    { label: 'Home', href: '/marketplace' },
    { label: 'About Us', href: '/marketplace' },
    { label: 'Our Teams', href: '/marketplace' },
    { label: 'Marketplace', href: '/marketplace', hardcoded: true },
    { label: 'Roadmap', href: '/marketplace' },
    { label: 'Whitepaper', href: '/marketplace' },
  ];

  return (
    <header
      className={cn(
        'fixed w-full top-0 z-50 transition-transform duration-300',
        visible ? 'translate-y-0' : '-translate-y-full',
      )}
      data-testid="page-header"
    >
      <div className="backdrop-blur-0 bg-black/60 border-b border-gray-800 py-2 lg:py-4">
        <div className="hidden container mx-auto lg:flex justify-between items-center">
          <nav>
            <ul className="flex space-x-12">
              {navItems.map((item, index) => (
                <li key={`${item.href}_${index}`}>
                  <Link
                    href={item.href}
                    className={cn(
                      'hover:text-pink-500 font-semibold uppercase tracking-tight text-sm',
                      item.hardcoded
                        ? 'text-pink-500 underline underline-offset-4'
                        : 'text-white',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-6">
            <Button variant="accent" data-testid="connect-wallet-button">
              Connect Wallet
            </Button>
            <Select
              value={language}
              onValueChange={(value) => setLanguage(value)}
            >
              <SelectTrigger
                className="border-0 outline-0 space-x-2"
                data-testid="language-selector"
              >
                <Icons.RadixGlobeIcon className="w-6 h-6" />
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Language</SelectLabel>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        {/* Mobile Menu */}
        <div className="lg:hidden px-4 flex items-center justify-between">
          <span className="px-2 text-lg md:text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-white rounded-sm">
            Marketplace
          </span>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-300">
                <Icons.Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[300px] sm:w-[350px] bg-gray-900/95 backdrop-blur-md border-gray-800 text-white"
            >
              <div className="flex flex-col space-y-6 mt-6">
                {navItems.map((item) => (
                  <div key={item.label} className="flex flex-col space-y-2">
                    <Link
                      href={item.href}
                      className={cn(
                        'text-gray-300 hover:text-white transition-colors text-lg font-medium',
                        item.hardcoded ? 'text-pink-500' : 'text-white',
                      )}
                    >
                      {item.label}
                    </Link>
                  </div>
                ))}
                <Separator className="bg-gray-600" />
                <div className="flex flex-col space-y-4 justify-between">
                  <Button
                    variant="default"
                    className="bg-pink-500 hover:bg-pink-600 w-full transition-colors"
                  >
                    Connect Wallet
                  </Button>
                  <Select
                    value={language}
                    onValueChange={(value) => setLanguage(value)}
                  >
                    <SelectTrigger className="border-0 outline-0 space-x-2">
                      <Icons.Globe />
                      <SelectValue placeholder="Language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Language</SelectLabel>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Footer;
