import { useState, useCallback, useEffect } from 'react';

import { type RecipeList } from '@api/requests';

const STORAGE_KEY = 'recently_viewed';
const MAX_ITEMS = 10;

export const useRecentlyViewed = () => {
  const [recentlyViewed, setRecentlyViewed] = useState<RecipeList[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored) setRecentlyViewed(JSON.parse(stored));
    } catch {
      // ignore storage errors
    }
  }, []);

  const addRecipe = useCallback((recipe: RecipeList) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((r) => r.id !== recipe.id);
      const next = [recipe, ...filtered].slice(0, MAX_ITEMS);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore storage errors
      }
      return next;
    });
  }, []);

  return { recentlyViewed, addRecipe };
};
