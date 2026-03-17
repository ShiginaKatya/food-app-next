import type { Metadata } from 'next';

import FavoritesClient from './_components/FavoritesClient';

export const metadata: Metadata = {
  title: 'Food Client | Favorites',
  description: 'list of favorite recipes',
  robots: {
    index: false,
    follow: false,
  },
};

const FavoritesPage = () => {
  return <FavoritesClient />;
};

export default FavoritesPage;
