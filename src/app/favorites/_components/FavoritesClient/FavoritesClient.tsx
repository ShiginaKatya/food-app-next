'use client';
import { useCallback } from 'react';

import RecipeCard from '@/app/recipes/_components/RecipeCard/RecipeCard';
import { useRemoveFavoritesMutation } from '@api/mutations';
import { useFavoritesQuery } from '@api/queries';
import Loader from '@components/Loader';
import Text from '@components/Text';

import s from './FavoritesClient.module.scss';

const FavoritesClient = () => {
  const { data: favorites, isLoading, isError, error, isFetching } = useFavoritesQuery();
  const {
    mutate: removeFavorite,
    isPending: isNoSaving,
    variables: removeV,
  } = useRemoveFavoritesMutation();

  const favoriteRemove = useCallback(
    (recipeId: number) => {
      removeFavorite(recipeId);
    },
    [removeFavorite]
  );

  return (
    <main className={s.main}>
      <Text view="title" tag="h1" weight="bold">
        Favorites Recipes
      </Text>
      {favorites?.length === 0 ? (
        <Text view="p-16" color="secondary">
          Your favorites is empty. Add recipe from a recipes page.
        </Text>
      ) : (
        <Text view="p-16" color="secondary">
          Saved: {favorites?.length} recipes
        </Text>
      )}
      {isLoading ? (
        <div className={s.main__loader}>
          <Loader size="m" />
        </div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <ul className={s.main__list}>
          {favorites?.map((item) => {
            const isProcessing = isNoSaving && removeV === item.recipe.id;
            return (
              <RecipeCard
                key={item.id}
                recipe={item.recipe}
                isSaved={true}
                isPending={isProcessing}
                onToggle={() => favoriteRemove(item.recipe.id)}
              />
            );
          })}
          {isFetching && (
            <li className={s['main__list-loader_s']}>
              <Loader size="s" />
            </li>
          )}
        </ul>
      )}
    </main>
  );
};

export default FavoritesClient;
