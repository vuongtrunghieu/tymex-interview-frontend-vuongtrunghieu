import { ItemCard } from '@/app/marketplace/ItemCard';
import { Button } from '@fpoon-tymex/ui/button';
import { Card } from '@fpoon-tymex/ui/card';
import { ScrollArea } from '@fpoon-tymex/ui/scroll-area';
import { Separator } from '@fpoon-tymex/ui/separator';
import React from 'react';

const mockData = [
  {
    id: 1,
    title: 'Metal Gear Girl',
    category: 'Mythic',
    price: 30.09,
    isFavorite: false,
    createdAt: 1624533946000,
    theme: 'Halloween',
    tier: 'Premium',
    imageId: 1,
    author: {
      firstName: 'Dewie',
      lastName: 'Labeuil',
      email: 'dlabeuilv@nba.com',
      gender: 'Male',
      avatar:
        'https://robohash.org/nihiltotamdolorem.png?size=100x100&set=set1',
      onlineStatus: 'idle',
    },
  },
  {
    id: 2,
    title: 'Rhythm Assassin',
    category: 'Rare',
    price: 18.41,
    isFavorite: true,
    createdAt: 1647970583000,
    theme: 'Dark',
    tier: 'Basic',
    imageId: 2,
    author: {
      firstName: 'Devland',
      lastName: 'Whitebrook',
      email: 'dwhitebrookr@loc.gov',
      gender: 'Male',
      avatar: 'https://robohash.org/doloremquequiaea.png?size=100x100&set=set1',
      onlineStatus: 'online',
    },
  },
  {
    id: 3,
    title: 'Rave Samurai',
    category: 'Epic',
    price: 188.01,
    isFavorite: false,
    createdAt: 1628137026000,
    theme: 'Colorful',
    tier: 'Premium',
    imageId: 3,
    author: {
      firstName: 'Johnathan',
      lastName: 'Tancock',
      email: 'jtancock17@issuu.com',
      gender: 'Male',
      avatar: 'https://robohash.org/quifacereunde.png?size=100x100&set=set1',
      onlineStatus: 'busy',
    },
  },
  {
    id: 4,
    title: 'Synthwave Knight',
    category: 'Legendary',
    price: 81.49,
    isFavorite: false,
    createdAt: 1635898134000,
    theme: 'Dark',
    tier: 'Premium',
    imageId: 4,
    author: {
      firstName: 'Anatollo',
      lastName: 'Myrie',
      email: 'amyrief@google.cn',
      gender: 'Male',
      avatar: 'https://robohash.org/etharumqui.png?size=100x100&set=set1',
      onlineStatus: 'online',
    },
  },
  {
    id: 5,
    title: 'The Neon Brawler',
    category: 'Upper Body',
    price: 50.05,
    isFavorite: false,
    createdAt: 1721655107000,
    theme: 'Halloween',
    tier: 'Premium',
    imageId: 5,
    author: {
      firstName: 'Robyn',
      lastName: 'Bradborne',
      email: 'rbradborney@yahoo.co.jp',
      gender: 'Female',
      avatar: 'https://robohash.org/istenostrumea.png?size=100x100&set=set1',
      onlineStatus: 'idle',
    },
  },
];

const MainContent = () => {
  const data = mockData;

  return (
    <div className="container flex-grow py-8 relative">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-64 flex-shrink-0">
          <Card className="p-4">
            <div className="space-y-4">
              <div className="font-medium">Filters</div>
              <Separator />
            </div>
          </Card>
        </div>

        <div className="flex-1 ">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <Button variant="accent" size="sm">
                  All
                </Button>
                {/* TODO add other filters */}
              </div>
            </div>
          </div>

          <ScrollArea className="h-[calc(100vh-2rem)] pr-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-8">
              {data.map((item, index) => (
                <ItemCard item={item} key={`${item?.id}_${index}`} />
              ))}
            </div>
          </ScrollArea>

          <div className="mt-8 flex justify-center text-primary">
            <Button variant="accent">Load More</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
