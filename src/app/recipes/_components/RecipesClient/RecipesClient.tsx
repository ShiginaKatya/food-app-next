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
import { useRecentlyViewed } from '@hooks/useRecentlyViewed';
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
  const rating = searchParams.get('rating') ? Number(searchParams.get('rating')) : null;
  const maxTotalTime = searchParams.get('maxTotalTime')
    ? Number(searchParams.get('maxTotalTime'))
    : null;
  const maxPreparationTime = searchParams.get('maxPreparationTime')
    ? Number(searchParams.get('maxPreparationTime'))
    : null;
  const maxCookingTime = searchParams.get('maxCookingTime')
    ? Number(searchParams.get('maxCookingTime'))
    : null;

  const [inputValue, setInputValue] = useState(searchValue);
  const [totalTimeInput, setTotalTimeInput] = useState(maxTotalTime ? String(maxTotalTime) : '');
  const [prepTimeInput, setPrepTimeInput] = useState(
    maxPreparationTime ? String(maxPreparationTime) : ''
  );
  const [cookTimeInput, setCookTimeInput] = useState(maxCookingTime ? String(maxCookingTime) : '');

  const deferredValue = useDeferredValue(inputValue);
  const { data, isLoading, isError, error, isFetching } = useRecipesQuery(
    page,
    searchValue,
    categoryId,
    rating,
    maxTotalTime,
    maxPreparationTime,
    maxCookingTime
  );
  const { data: categories } = useCategoriesQuery();
  const { data: favorites } = useFavoritesQuery();

  const { recentlyViewed } = useRecentlyViewed();

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

  const ratingOptions = useMemo(
    () => [
      { key: 'all', value: 'Ratings' },
      { key: '1', value: '1 star' },
      { key: '2', value: '2 stars' },
      { key: '3', value: '3 stars' },
      { key: '4', value: '4 stars' },
      { key: '5', value: '5 stars' },
    ],
    []
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

  const clearFilter = (
    key: 'searchValue' | 'maxTotalTime' | 'maxPreparationTime' | 'maxCookingTime'
  ) => {
    if (key === 'searchValue') setInputValue('');
    if (key === 'maxTotalTime') setTotalTimeInput('');
    if (key === 'maxPreparationTime') setPrepTimeInput('');
    if (key === 'maxCookingTime') setCookTimeInput('');
    updateFilters(key, null);
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

  const applyNumericFilter = (key: string, value: string) => {
    const num = Number(value);
    updateFilters(key, value === '' || isNaN(num) || num <= 0 ? null : num);
  };

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
                  <button
                    type="button"
                    className={s['main__search-btn']}
                    onClick={() => clearFilter('searchValue')}
                  >
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
            <MultiDropdown
              className={s['main__drops-drop']}
              options={ratingOptions}
              value={
                rating
                  ? ratingOptions.filter((opt) => opt.key === String(rating))
                  : [{ key: 'all', value: 'Ratings' }]
              }
              onChange={(options) => {
                const selected = options[options.length - 1];
                if (selected.key === 'all') {
                  updateFilters('rating', null);
                } else {
                  updateFilters('rating', Number(selected.key));
                }
              }}
              getTitle={(values) => {
                if (values.length === 0 || values[0].key === 'all') return 'Ratings';
                return values[0].value;
              }}
            />
          </li>
          <li className={s['main__filters']}>
            <Input
              className={s['main__filters-field']}
              placeholder="Max total time (min)"
              value={totalTimeInput}
              onChange={(val) => setTotalTimeInput(val.replace(/\D/g, ''))}
              onBlur={() => applyNumericFilter('maxTotalTime', totalTimeInput)}
              afterSlot={
                totalTimeInput && (
                  <button
                    type="button"
                    className={s['main__search-btn']}
                    onClick={() => clearFilter('maxTotalTime')}
                  >
                    &times;
                  </button>
                )
              }
            />
            <Input
              className={s['main__filters-field']}
              placeholder="Max preparation time (min)"
              value={prepTimeInput}
              onChange={(val) => setPrepTimeInput(val.replace(/\D/g, ''))}
              onBlur={() => applyNumericFilter('maxPreparationTime', prepTimeInput)}
              afterSlot={
                prepTimeInput && (
                  <button
                    type="button"
                    className={s['main__search-btn']}
                    onClick={() => clearFilter('maxPreparationTime')}
                  >
                    &times;
                  </button>
                )
              }
            />
            <Input
              className={s['main__filters-field']}
              placeholder="Max cooking time (min)"
              value={cookTimeInput}
              onChange={(val) => setCookTimeInput(val.replace(/\D/g, ''))}
              onBlur={() => applyNumericFilter('maxCookingTime', cookTimeInput)}
              afterSlot={
                cookTimeInput && (
                  <button
                    type="button"
                    className={s['main__search-btn']}
                    onClick={() => clearFilter('maxCookingTime')}
                  >
                    &times;
                  </button>
                )
              }
            />
          </li>
        </ul>
        {isLoading ? (
          <div className={s['main__loader']}>
            <Loader size="m" />
          </div>
        ) : isError ? (
          <div>Error: {error.message}</div>
        ) : data?.data.length === 0 ? (
          <Text view="p-16" color="secondary">
            There are no such recipes. Try something else or try later.
          </Text>
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
            {isFetching && (
              <li className={s['main__list-loader_s']}>
                <Loader size="s" />
              </li>
            )}
          </ul>
        )}
        <Pagination
          stopPage={page}
          allPages={allPages}
          onPageChange={(newPage) => updateFilters('page', newPage)}
        />
        {recentlyViewed.length > 0 && (
          <div className={s['main__recent']}>
            <Text view="p-20" weight="bold">
              Recently Viewed
            </Text>
            <ul className={s['main__list']}>
              {recentlyViewed.map((recipe) => {
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
          </div>
        )}
      </div>
    </main>
  );
};

export default RecipesClient;
