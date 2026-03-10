'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useRecipeQuery } from '@api/queries';
import { getRecipe } from '@api/requests';
import classNames from 'classnames';
import parse from 'html-react-parser';
import type { Metadata } from 'next';

import s from '@/app/recipes/[id]/page.module.scss';

import ArrowDownIcon from '@components/icons/ArrowDownIcon';
import EquipIcon from '@components/icons/EquipIcon';
import IngredIcon from '@components/icons/IngredIcon';
import Loader from '@components/Loader';
import Text from '@components/Text';

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

const RecipeClient = () => {
  const { id } = useParams<{ id: string }>();
  const { data: recipe, isLoading, isError, error } = useRecipeQuery(id);
  if (isLoading) {
    return (
      <div className={s.content__loader}>
        <Loader size="m" />
      </div>
    );
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <main className={s.recipe}>
      <div className={s.recipe__title}>
        <Link href="..">
          <ArrowDownIcon
            width={32}
            height={32}
            viewBox="0 0 32 32"
            className={s.icon_flip}
            color="accent"
          />
        </Link>
        <Text view="title" tag="h1" weight="bold">
          {recipe?.data.name}
        </Text>
      </div>
      <div className={s.recipe__content}>
        <div className={classNames(s.recipe__overview, s.overview)}>
          {recipe && (
            <Image
              src={recipe.data.images[0].url}
              alt="overview"
              width={550}
              height={250}
              className={s.overview__image}
            />
          )}
          <ul className={classNames(s.overview__list, s.list)}>
            <li className={s.list__item}>
              <Text view="p-16">Preparation</Text>
              <Text view="p-16" color="accent" className={s.text_bolder}>
                {recipe?.data.preparationTime} minutes
              </Text>
            </li>
            <li className={s.list__item}>
              <Text view="p-16">Cooking</Text>
              <Text view="p-16" color="accent" className={s.text_bolder}>
                {recipe?.data.cookingTime} minutes
              </Text>
            </li>
            <li className={s.list__item}>
              <Text view="p-16">Total</Text>
              <Text view="p-16" color="accent" className={s.text_bolder}>
                {recipe?.data.totalTime} minutes
              </Text>
            </li>
            <li className={s.list__item}>
              <Text view="p-16">Likes</Text>
              <Text view="p-16" color="accent" className={s.text_bolder}>
                {recipe?.data.likes}
              </Text>
            </li>
            <li className={s.list__item}>
              <Text view="p-16">Servings</Text>
              <Text view="p-16" color="accent" className={s.text_bolder}>
                {recipe?.data.servings} servings
              </Text>
            </li>
            <li className={s.list__item}>
              <Text view="p-16">Ratings</Text>
              <Text view="p-16" color="accent" className={s.text_bolder}>
                {recipe?.data.rating}
              </Text>
            </li>
          </ul>
        </div>
        <p className={s.recipe__description}>{recipe && parse(recipe.data.summary)}</p>
        <div className={s.recipe__needs}>
          <div className={s.recipe__ingred}>
            <Text view="p-20" className={s.text_bolder}>
              Ingrediants
            </Text>
            <ul className={s.needs__list}>
              {recipe &&
                recipe.data.ingradients.map((ingradient) => {
                  return (
                    <li key={ingradient.id} className={s.needs__item}>
                      <IngredIcon className={s.item__icon} color="accent" />
                      <Text view="p-16">{ingradient.name}</Text>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className={s.recipe__equip}>
            <Text view="p-20" className={s.text_bolder}>
              Equipment
            </Text>
            <ul className={s.needs__list}>
              {recipe &&
                recipe.data.equipments.map((equipment) => {
                  return (
                    <li key={equipment.id} className={s.needs__item}>
                      <EquipIcon className={s.item__icon} color="accent" />
                      <Text view="p-16">{equipment.name}</Text>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
        <div className={s.recipe__steps}>
          <Text view="p-20" className={s.text_bolder}>
            Directions
          </Text>
          <ul className={s.steps__list}>
            {recipe &&
              recipe.data.directions.map((direction, index) => {
                return (
                  <li key={direction.id} className={s.steps__item}>
                    <Text view="p-16" className={s.text_bolder}>
                      Step {index + 1}
                    </Text>
                    <Text view="p-14" className={s.step__info}>
                      {direction.description}
                    </Text>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default RecipeClient;
