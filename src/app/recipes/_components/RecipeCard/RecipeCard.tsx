'use client';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import * as React from 'react';

import { type RecipeList, getRecipe } from '@api/requests';
import { useQueryClient } from '@tanstack/react-query';

import Button from '@components/Button';
import Card from '@components/Card';
import ClockIcon from '@components/icons/ClockIcon';

import s from './RecipeCard.module.scss';

const stripHtml = (html: string) => {
  return html.replace(/<[^>]*>?/gm, '');
};

type RecipeCardProps = {
  recipe: RecipeList;
  isSaved: boolean;
  isPending: boolean;
  onToggle: (id: number, isSaved: boolean) => void;
};

const RecipeCard = ({ recipe, isSaved, onToggle, isPending }: RecipeCardProps) => {
  const router = useRouter();
  const parsedSummary = useMemo(() => {
    const stripped = stripHtml(recipe.summary);
    return stripped;
  }, [recipe.summary]);

  const queryClient = useQueryClient();

  const prefetchRecipe = () => {
    queryClient.prefetchQuery({
      queryKey: ['recipe', recipe.documentId],
      queryFn: () => getRecipe(String(recipe.documentId)),
      staleTime: 60 * 1000,
    });
  };

  const saveRecipe = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    onToggle(recipe.id, isSaved);
  };
  return (
    <li
      className={s.list__item}
      onClick={() => router.push(`/recipes/${recipe.documentId}`)}
      onMouseEnter={prefetchRecipe}
    >
      <Card
        image={recipe.images[0].formats?.small.url || recipe.images[0].url}
        title={recipe.name}
        captionSlot={
          <span className={s.item__caption}>
            <ClockIcon color="accent" />
            {recipe.totalTime} minutes
          </span>
        }
        subtitle={parsedSummary}
        contentSlot={`${recipe.calories} kcal`}
        actionSlot={
          <Button onClick={saveRecipe} disabled={isPending}>
            {isPending ? '...' : isSaved ? 'Remove' : 'Save'}
          </Button>
        }
      />
    </li>
  );
};

export default React.memo(RecipeCard);
