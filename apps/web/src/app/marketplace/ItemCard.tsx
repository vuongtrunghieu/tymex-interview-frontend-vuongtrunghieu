// @ts-ignore
import type { IAuthor, IProduct } from '@fpoon-tymex/api';
import { AspectRatio } from '@fpoon-tymex/ui/aspect-ratio';
import { Avatar, AvatarFallback, AvatarImage } from '@fpoon-tymex/ui/avatar';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@fpoon-tymex/ui/card';
import { cn } from '@fpoon-tymex/ui/cn';
import { Icons } from '@fpoon-tymex/ui/icons';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@fpoon-tymex/ui/tooltip';
import Image from 'next/image';
import image1 from '../../../public/items/assassin.webp';
import image2 from '../../../public/items/basketball_girl.webp';
import ethIcon from '../../../public/items/eth.svg';
import image3 from '../../../public/items/mafia_england.webp';
import image4 from '../../../public/items/neon_guy.webp';
import image5 from '../../../public/items/the_dj.webp';

const getRarityBackground = (rarity: IProduct['category']) => {
  const rarityColors: Record<IProduct['category'], string> = {
    Rare: 'bg-gradient-to-r from-cyan-500 to-blue-500',
    Epic: 'bg-gradient-to-r from-fuchsia-500 to-violet-500',
    Legendary: 'bg-gradient-to-r from-orange-400 to-amber-300',
    Mythic: 'bg-gradient-to-r from-red-500 to-pink-500',
  };
  const rarityDefault = 'bg-gradient-to-r from-green-500 to-teal-500';

  return rarityColors[rarity] || rarityDefault;
};

const getOnlineStatusColor = (status: IAuthor['onlineStatus']) => {
  switch (status) {
    case 'online':
      return 'fill-green-500 text-white';
    case 'offline':
      return 'fill-gray-500';
    case 'idle':
      return 'fill-pink-500 text-white';
    default:
      return 'fill-gray-500';
  }
};

/* imageId mapping to image, imageId in range [1,20] */
const getImage = (imageId: IProduct['imageId']) => {
  switch (imageId % 5) {
    case 1:
      return image1;
    case 2:
      return image2;
    case 3:
      return image3;
    case 4:
      return image4;
    case 0:
      return image5;
    default:
      return image1;
  }
};

export const ItemCard = ({ item }: { item: IProduct }) => {
  return (
    <Card className="bg-gray-800">
      <CardHeader className="p-4">
        <AspectRatio
          ratio={1}
          className={cn(
            getRarityBackground(item?.category),
            'rounded-md aspect-square relative pt-10 overflow-hidden',
          )}
        >
          <div className="absolute top-2 left-2 rounded-md text-xs font-semibold backdrop-blur-sm bg-black/50 px-4 py-2 z-10">
            {item?.category}
          </div>
          <Icons.Heart
            className={cn(
              'absolute top-3 right-2 w-6 h-6 lg:w-4 lg:h-4 text-white opacity-100 cursor-pointer z-10',
              item?.isFavorite
                ? 'fill-accent hover:opacity-80'
                : 'fill-white hover:fill-accent',
            )}
          />
          <Image
            src={getImage(item?.imageId)}
            alt={item?.title}
            className="object-cover"
          />
        </AspectRatio>
      </CardHeader>
      <CardContent className="px-4 py-2">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold line-clamp-2">{item?.title}</h3>
          <span className="text-base font-medium inline-flex gap-2">
            <Image src={ethIcon} alt="eth" width={8} height={8} />
            {item?.price.toFixed(2)} ETH
          </span>
        </div>
      </CardContent>
      <CardFooter className="px-4 pt-0">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="flex items-center space-x-2">
                <Avatar className="w-8 h-8 rounded-full backdrop-blur-md relative ring-1 ring-background/50">
                  <AvatarImage src={item?.author?.avatar} />
                  <AvatarFallback>
                    {item?.author?.firstName?.[0]}
                  </AvatarFallback>
                  <Icons.CircleCheck
                    className={cn(
                      'absolute bottom-0 right-1 w-3 h-3 border-2 border-black rounded-full',
                      getOnlineStatusColor(item?.author?.onlineStatus),
                    )}
                  />
                </Avatar>
                <span className="text-sm text-gray-400">{`${item?.author?.firstName} ${item?.author?.lastName}`}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{item?.author?.email}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
};
