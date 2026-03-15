'use client';

import dynamic from 'next/dynamic';

const DynamicFavoritesCounter = dynamic(() => import('../FavoritesCounter'), { ssr: false });

export default DynamicFavoritesCounter;
