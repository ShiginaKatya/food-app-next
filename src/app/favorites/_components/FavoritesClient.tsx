'use client';
import { useCallback } from 'react';

import { useRemoveFavoritesMutation } from '@api/mutations';
import { useFavoritesQuery } from '@api/queries';

import RecipeCard from '@/app/recipes/_components/RecipeCard/RecipeCard';
import s from '@/app/recipes/page.module.scss';

import Loader from '@components/Loader';
import Text from '@components/Text';

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
    <main className={s.main__content}>
      <Text view="title" tag="h1" weight="bold">
        Favorites Recipes
      </Text>
      <Text view="p-20" weight="medium">
        Сохранено: {favorites?.length} рецептов
      </Text>
      {isLoading ? (
        <div className={s.content__loader}>
          <Loader size="m" />
        </div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <ul className={s.content__list}>
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
        </ul>
      )}
      {isFetching && (
        <div className={s.content__loader_s}>
          <Loader size="s" />
        </div>
      )}
    </main>
  );
};

export default FavoritesClient;
