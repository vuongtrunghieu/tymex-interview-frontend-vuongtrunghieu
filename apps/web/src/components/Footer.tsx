import { Button } from '@fpoon-tymex/ui/button';
import { Icons } from '@fpoon-tymex/ui/icons';
import { Input } from '@fpoon-tymex/ui/input';
import { Separator } from '@fpoon-tymex/ui/separator';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  // TODO complete this footer

  return (
    <footer className="bg-background py-8" data-testid="page-footer">
      <div className="container space-y-8">
        <div className="grid grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 ">NAVIGATION</h3>
            <div className="grid grid-cols-3 gap-6">
              <div className="space-y-3 text-sm">
                <Link href="/marketplace" className="block">
                  Home
                </Link>
                <Link href="/marketplace" className="block">
                  About us
                </Link>
                <Link href="/marketplace" className="block">
                  Our teams
                </Link>
              </div>
              <div className="space-y-3 text-sm">
                <Link href="/marketplace" className="block">
                  Whitepaper
                </Link>
                <Link href="/marketplace" className="block">
                  Marketplace
                </Link>
                <Link href="/marketplace" className="block">
                  Roadmap
                </Link>
              </div>
              <div className="space-y-3 text-sm">
                <Link href="/marketplace" className="block">
                  FAQs
                </Link>
                <Link href="/marketplace" className="block">
                  News
                </Link>
                <Link href="/marketplace" className="block">
                  Community
                </Link>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold mb-4">CONTACT US</h3>
            <p className="flex items-center gap-4">
              <Icons.Phone
                className="h-4 w-4 outline-0 inline-block rounded-full bg-foreground stroke-background fill-background p-0.5"
                tabIndex={0}
              />
              01234567810
            </p>
            <p className="flex items-center gap-4">
              <Icons.MessageSquareText
                className="-m-1 h-6 w-6 outline-0 inline-block text-background fill-foreground"
                tabIndex={0}
              />
              tymex-talent@tyme.com
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">
              SUBSCRIBE TO RECEIVE OUR LATEST UPDATE
            </h3>
            <div className="flex w-full max-w-sm items-center space-x-4">
              <Input
                type="email"
                placeholder="Your email address"
                className="w-[300px] border-foreground"
              />
              <Button type="submit" variant="accent" className="min-w-[150px]">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex items-center justify-between text-sm">
          <p>©2023 Tyme - Edit. All Rights reserved.</p>
          <div className="space-x-8">
            <Link href="/marketplace" className="">
              Security
            </Link>
            <Link href="/marketplace" className="">
              Legal
            </Link>
            <Link href="/marketplace" className="">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
