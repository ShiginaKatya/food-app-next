'use client';
import Image from 'next/image';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useState, useMemo, useDeferredValue, useEffect, useCallback } from 'react';

import { useAddFavoritesMutation, useRemoveFavoritesMutation } from '@api/mutations';
import { useRecipesQuery, useCategoriesQuery, useFavoritesQuery } from '@api/queries';
import Button from '@components/Button';
import SearchIcon from '@components/icons/SearchIcon';
import Input from '@components/Input';
import Loader from '@components/Loader';
import MultiDropdown from '@components/MultiDropdown';
import Text from '@components/Text';
import banner from '@public/food-banner.png';

import s from './RecipesClient.module.scss';
import Pagination from '../Pagination/Pagination';
import RecipeCard from '../RecipeCard/RecipeCard';

const RecipesClient = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const page = Number(searchParams.get('page')) || 1;
  const searchValue = searchParams.get('searchValue') || '';
  const categoryId = searchParams.get('categoryId') ? Number(searchParams.get('categoryId')) : null;

  const [inputValue, setInputValue] = useState(searchValue);
  const deferredValue = useDeferredValue(inputValue);
  const { data, isLoading, isError, error, isFetching } = useRecipesQuery(
    page,
    searchValue,
    categoryId
  );
  const { data: categories } = useCategoriesQuery();
  const { data: favorites } = useFavoritesQuery();

  const { mutate: addFavorite, isPending: isSaving, variables: addV } = useAddFavoritesMutation();
  const {
    mutate: removeFavorite,
    isPending: isNoSaving,
    variables: removeV,
  } = useRemoveFavoritesMutation();

  const updateFilters = useCallback(
    (key: string, value: string | number | null) => {
      const prev = new URLSearchParams(searchParams.toString());
      if (!value) {
        prev.delete(key);
      } else {
        prev.set(key, String(value));
      }
      if (key !== 'page') {
        prev.set('page', '1');
      }
      router.replace(`${pathname}?${prev.toString()}`, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  const categoryOptions = useMemo(() => {
    const optionsList =
      categories?.data.map((category) => ({ key: String(category.id), value: category.title })) ||
      [];
    return [{ key: 'all', value: 'Categories' }, ...optionsList];
  }, [categories]);

  const allPages = data?.meta.pagination.pageCount || 1;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [page]);

  const cleanInput = () => {
    setInputValue('');
    updateFilters('searchValue', '');
  };

  const favoriteAction = useCallback(
    (recipeId: number, isSaved: boolean) => {
      if (isSaved) {
        removeFavorite(recipeId);
      } else {
        addFavorite(recipeId);
      }
    },
    [addFavorite, removeFavorite]
  );

  return (
    <main className={s.main}>
      <Image className={s.main__img} src={banner} loading="eager" alt="" />
      <div className={s.main__content}>
        <Text className={s.main__text} view="p-20">
          Find the perfect food and <span className={s['main__text_decor']}>drink ideas</span> for{' '}
          every occasion, from <span className={s['main__text_decor']}>weeknight dinners</span> to{' '}
          <span className={s['main__text_decor']}>holiday feasts</span>.
        </Text>
        <ul className={s['main__inputs']}>
          <li className={s['main__search']}>
            <Input
              className={s['main__search-input']}
              placeholder="Enter dishes"
              value={inputValue}
              onChange={setInputValue}
              afterSlot={
                inputValue && (
                  <button type="button" className={s['main__search-btn']} onClick={cleanInput}>
                    &times;
                  </button>
                )
              }
            />
            <Button type="button" onClick={() => updateFilters('searchValue', deferredValue)}>
              <SearchIcon className={s['main__search-icon_white']} />
            </Button>
          </li>
          <li className={s['main__drops']}>
            <MultiDropdown
              className={s['main__drops-drop']}
              options={categoryOptions}
              value={
                categoryId
                  ? categoryOptions.filter((opt) => opt.key === String(categoryId))
                  : [{ key: 'all', value: 'Categories' }]
              }
              onChange={(options) => {
                const selected = options[options.length - 1];
                if (selected.key === 'all') {
                  updateFilters('categoryId', null);
                } else {
                  updateFilters('categoryId', Number(selected.key));
                }
              }}
              getTitle={(values) => {
                if (values.length === 0 || values[0].key === 'all') return 'Categories';
                return values[0].value;
              }}
            />
          </li>
        </ul>
        {isLoading ? (
          <div className={s['main__loader']}>
            <Loader size="m" />
          </div>
        ) : isError ? (
          <div>Error: {error.message}</div>
        ) : (
          <ul className={s['main__list']}>
            {data?.data.map((recipe) => {
              const isSaved = favorites?.some((item) => item.recipe.id === recipe.id);
              const isProcessing =
                (isSaving && addV === recipe.id) || (isNoSaving && removeV === recipe.id);
              return (
                <RecipeCard
                  key={recipe.documentId}
                  recipe={recipe}
                  isSaved={!!isSaved}
                  onToggle={favoriteAction}
                  isPending={isProcessing}
                />
              );
            })}
          </ul>
        )}
        {isFetching && (
          <div className={s['main__loader_s']}>
            <Loader size="s" />
          </div>
        )}
        <Pagination
          stopPage={page}
          allPages={allPages}
          onPageChange={(newPage) => updateFilters('page', newPage)}
        />
      </div>
    </main>
  );
};

export default RecipesClient;
