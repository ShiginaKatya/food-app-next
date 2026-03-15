import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import type { Metadata } from 'next';

import { getRecipes, getCategories } from '@/api/requests';

import RecipesClient from './_components/RecipesClient';

export const metadata: Metadata = {
  title: 'Food Client | List of recipes',
  description:
    'A variety of recipes for each category, varying in difficulty and preparation time. Youre sure to find something you like.',
};

const RecipesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; searchValue?: string; categoryId?: string }>;
}) => {
  const queryClient = new QueryClient();
  const filters = await searchParams;
  const page = Number(filters.page) || 1;
  const searchValue = filters.searchValue || '';
  const categoryId = filters.categoryId ? Number(filters.categoryId) : null;

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['categories'],
      queryFn: getCategories,
    }),
    queryClient.prefetchQuery({
      queryKey: ['recipes', page, searchValue, categoryId],
      queryFn: () => getRecipes(page, searchValue, categoryId),
    }),
  ]);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RecipesClient />
    </HydrationBoundary>
  );
};
export default RecipesPage;
