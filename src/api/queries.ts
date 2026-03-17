'use client';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useSyncExternalStore } from 'react';

import { getRecipes, getRecipe, getCategories, getFavorites } from './requests';

export const useRecipesQuery = (
  page: number,
  searchValue: string | null,
  categoryId: number | null,
  rating: number | null,
  maxTotalTime: number | null,
  maxPreparationTime: number | null,
  maxCookingTime: number | null
) =>
  useQuery({
    queryKey: [
      'recipes',
      page,
      searchValue,
      categoryId,
      rating,
      maxTotalTime,
      maxPreparationTime,
      maxCookingTime,
    ],
    queryFn: () =>
      getRecipes(
        page,
        searchValue,
        categoryId,
        rating,
        maxTotalTime,
        maxPreparationTime,
        maxCookingTime
      ),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });

export const useRecipeQuery = (id: string | undefined) =>
  useQuery({
    queryKey: ['recipe', id],
    queryFn: () => getRecipe(id),
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
  });

export const useCategoriesQuery = () =>
  useQuery({ queryKey: ['categories'], queryFn: getCategories, staleTime: Infinity });

export const useFavoritesQuery = () => {
  const token = useSyncExternalStore(
    () => () => {},
    () => localStorage.getItem('token'),
    () => null
  );
  return useQuery({
    queryKey: ['favorites', token],
    queryFn: () => getFavorites(token),
    staleTime: 5 * 60 * 1000,
    enabled: !!token,
  });
};
