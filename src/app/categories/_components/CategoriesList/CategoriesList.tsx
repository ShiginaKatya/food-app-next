'use client';
import Link from 'next/link';

import { useCategoriesQuery } from '@/api/queries';
import Loader from '@components/Loader';
import Text from '@components/Text';

import s from './CategoriesList.module.scss';

const CategoriesList = () => {
  const { data: categories, isLoading, isError, error } = useCategoriesQuery();
  if (isLoading) {
    return (
      <div className={s.categories__loader}>
        <Loader size="m" />
      </div>
    );
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <ul className={s.categories}>
      {categories?.data.map((category) => {
        return (
          <Link key={category.id} href={`/recipes/?categoryId=${category.id}`}>
            <li className={s.categories__item}>
              <Text tag="p" view="p-20">
                {category.title}
              </Text>
            </li>
          </Link>
        );
      })}
    </ul>
  );
};

export default CategoriesList;
