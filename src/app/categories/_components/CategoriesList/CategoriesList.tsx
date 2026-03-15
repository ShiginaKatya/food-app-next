'use client';
import Link from 'next/link';

import { useCategoriesQuery } from '@/api/queries';
import Text from '@/shared/components/Text';

import s from './CategoriesList.module.scss';

const CategoriesList = () => {
  const { data: categories } = useCategoriesQuery();
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
