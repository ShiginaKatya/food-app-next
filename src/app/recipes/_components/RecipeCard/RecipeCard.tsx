'use client';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import * as React from 'react';

import { type RecipeList } from '@api/requests';
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

  const prefetchRecipe = () => {
    router.prefetch(`/recipes/${recipe.documentId}`);
  };

  const saveRecipe = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    onToggle(recipe.id, isSaved);
  };
  return (
    <li
      role="button"
      onClick={() => router.push(`/recipes/${recipe.documentId}`)}
      onMouseEnter={prefetchRecipe}
    >
      <Card
        image={recipe.images[0].formats?.small.url || recipe.images[0].url}
        title={recipe.name}
        captionSlot={
          <span className={s.caption}>
            <ClockIcon color="accent" />
            {recipe.totalTime} minutes
          </span>
        }
        subtitle={parsedSummary}
        contentSlot={`${recipe.calories} kcal`}
        actionSlot={
          <Button type="button" onClick={saveRecipe} disabled={isPending}>
            <span suppressHydrationWarning> {isPending ? '...' : isSaved ? 'Remove' : 'Save'}</span>
          </Button>
        }
      />
    </li>
  );
};

export default React.memo(RecipeCard);
