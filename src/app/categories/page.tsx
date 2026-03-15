import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import type { Metadata } from 'next';

import { getCategories } from '@/api/requests';
import Text from '@/shared/components/Text';

import CategoriesList from './_components/CategoriesList/CategoriesList';
import s from './page.module.scss';

export const metadata: Metadata = {
  title: 'Food Client | Meal categories',
  description: 'list of meal categories',
};

const CategoriesPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className={s.main}>
        <Text view="title" tag="h1" weight="bold">
          Meal Categories
        </Text>
        <CategoriesList />
      </main>
    </HydrationBoundary>
  );
};

export default CategoriesPage;
