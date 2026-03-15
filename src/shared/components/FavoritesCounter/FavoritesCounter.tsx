'use client';

import { useFavoritesQuery } from '@api/queries';

import s from './FavoritesCounter.module.scss';

const FavoritesCounter = () => {
  const { data: favorites } = useFavoritesQuery();

  if (!favorites?.length) return null;
  return <span className={s.counter}>{favorites.length}</span>;
};

export default FavoritesCounter;
