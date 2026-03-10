import type { Metadata } from 'next';

import { getRecipe } from '@/api/requests';

import RecipeClient from './_components/RecipeClient';

type MetaProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: MetaProps): Promise<Metadata> {
  const { id } = await params;
  const recipe = await getRecipe(id);
  return {
    title: recipe.data.name,
    description: recipe.data.summary,
    openGraph: {
      images: [recipe.data.images[0].url],
    },
  };
}

const RecipePage = () => {
  return <RecipeClient />;
};

export default RecipePage;
