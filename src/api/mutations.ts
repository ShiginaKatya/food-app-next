'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getJWT } from './register_auth';
import { addFavorites, removeFavorites } from './requests';
import { log, logError } from '../utils/log';

export const useGetJWTMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: getJWT,
    onSuccess: (data) => {
      if (data.jwt) {
        localStorage.setItem('token', data.jwt);
        log('JWT succes', data.jwt);
        queryClient.invalidateQueries();
      }
    },
    onError: (error) => {
      logError('Error login', error);
    },
  });
};

export const useAddFavoritesMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (recipe: number) => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      return addFavorites(recipe, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
    },
    onError: (error) => {
      logError('fail add favorites', error.message);
    },
  });
};

export const useRemoveFavoritesMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (recipe: number) => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      return removeFavorites(recipe, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
    },
    onError: (error) => {
      logError('fail remove fovorites', error.message);
    },
  });
};
