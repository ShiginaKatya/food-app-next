'use client';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

import parse from 'html-react-parser';

import { useRecipeQuery } from '@api/queries';
import ArrowDownIcon from '@components/icons/ArrowDownIcon';
import EquipIcon from '@components/icons/EquipIcon';
import IngredIcon from '@components/icons/IngredIcon';
import Loader from '@components/Loader';
import Text from '@components/Text';

import s from './RecipeClient.module.scss';

const RecipeClient = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { data: recipe, isLoading, isError, error } = useRecipeQuery(id);
  if (isLoading) {
    return (
      <div className={s.recipe__loader}>
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
        <ArrowDownIcon
          width={32}
          height={32}
          viewBox="0 0 32 32"
          className={s['recipe__title-icon_flip']}
          color="accent"
          onClick={() => router.back()}
        />
        <Text view="title" tag="h1" weight="bold">
          {recipe?.data.name}
        </Text>
      </div>
      <div className={s.recipe__content}>
        <div className={s.recipe__overview}>
          {recipe && (
            <Image
              src={recipe.data.images[0].url}
              alt="overview"
              width={550}
              height={250}
              className={s['recipe__overview-image']}
            />
          )}
          <ul className={s['recipe__overview-list']}>
            <li className={s['recipe__overview-item']}>
              <Text view="p-16">Preparation</Text>
              <Text view="p-16" color="accent" weight="bold">
                {recipe?.data.preparationTime} minutes
              </Text>
            </li>
            <li className={s['recipe__overview-item']}>
              <Text view="p-16">Cooking</Text>
              <Text view="p-16" color="accent" weight="bold">
                {recipe?.data.cookingTime} minutes
              </Text>
            </li>
            <li className={s['recipe__overview-item']}>
              <Text view="p-16">Total</Text>
              <Text view="p-16" color="accent" weight="bold">
                {recipe?.data.totalTime} minutes
              </Text>
            </li>
            <li className={s['recipe__overview-item']}>
              <Text view="p-16">Likes</Text>
              <Text view="p-16" color="accent" weight="bold">
                {recipe?.data.likes}
              </Text>
            </li>
            <li className={s['recipe__overview-item']}>
              <Text view="p-16">Servings</Text>
              <Text view="p-16" color="accent" weight="bold">
                {recipe?.data.servings} servings
              </Text>
            </li>
            <li className={s['recipe__overview-item']}>
              <Text view="p-16">Ratings</Text>
              <Text view="p-16" color="accent" weight="bold">
                {recipe?.data.rating}
              </Text>
            </li>
          </ul>
        </div>
        <p className={s.recipe__description}>{recipe && parse(recipe.data.summary)}</p>
        <div className={s.recipe__needs}>
          <div className={s.recipe__ingred}>
            <Text view="p-20" weight="bold">
              Ingrediants
            </Text>
            <ul className={s['recipe__needs-list']}>
              {recipe &&
                recipe.data.ingradients.map((ingradient) => {
                  return (
                    <li key={ingradient.id} className={s['recipe__needs-item']}>
                      <IngredIcon className={s['recipe__needs-icon']} color="accent" />
                      <Text view="p-16">{ingradient.name}</Text>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className={s.recipe__equip}>
            <Text view="p-20" weight="bold">
              Equipment
            </Text>
            <ul className={s['recipe__needs-list']}>
              {recipe &&
                recipe.data.equipments.map((equipment) => {
                  return (
                    <li key={equipment.id} className={s['recipe__needs-item']}>
                      <EquipIcon className={s['recipe__needs-icon']} color="accent" />
                      <Text view="p-16">{equipment.name}</Text>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
        <div className={s.recipe__steps}>
          <Text view="p-20" weight="bold">
            Directions
          </Text>
          <ul className={s['recipe__steps-list']}>
            {recipe?.data.directions.map((direction, index) => (
              <li key={direction.id} className={s['recipe__steps-item']}>
                <Text view="p-16" weight="bold">
                  Step {index + 1}
                </Text>
                <Text view="p-14" className={s['recipe__steps-info']}>
                  {direction.description}
                </Text>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default RecipeClient;
