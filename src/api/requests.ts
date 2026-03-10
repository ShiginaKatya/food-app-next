import { notFound } from 'next/navigation';

import qs from 'qs';

const BASE_URL = 'https://front-school-strapi.ktsdev.ru/api/recipes';
const CATEGORY_URL = 'https://front-school-strapi.ktsdev.ru/api/meal-categories';
const FAVORITE_URL = 'https://front-school-strapi.ktsdev.ru/api';

type RecipeImage = {
  id: number;
  url: string;
  name: string;
  formats?: {
    small: {
      url: string;
    };
  };
};

type Ingradients = {
  id: number;
  name: string;
};

type Directions = {
  id: number;
  description: string;
};

export type RecipeList = {
  id: number;
  documentId: string;
  name: string;
  summary: string;
  calories: number;
  totalTime: number;
  images: RecipeImage[];
};

type Recipe = {
  id: number;
  documentId: string;
  name: string;
  summary: string;
  calories: number;
  preparationTime: number;
  cookingTime: number;
  totalTime: number;
  likes: number;
  servings: number;
  rating: number;
  ingradients: Ingradients[];
  equipments: Ingradients[];
  directions: Directions[];
  images: RecipeImage[];
};

type RecipesResponse = {
  data: RecipeList[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

type RecipeResponse = {
  data: Recipe;
};

export const getRecipes = async (
  page: number,
  searchValue: string | null,
  categoryId: number | null
) => {
  const filters: Record<string, unknown> = {};
  if (searchValue) {
    filters.name = { $containsi: searchValue };
  }
  if (categoryId) {
    filters.category = { id: { $eq: categoryId } };
  }
  const query = qs.stringify(
    {
      populate: ['images'],
      pagination: {
        page: page,
        pageSize: 9,
      },
      filters: filters,
    },
    { encodeValuesOnly: true }
  );
  const response = await fetch(`${BASE_URL}?${query}`, {
    next: { revalidate: 300 },
  });
  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    throw new Error(`Error recipes: ${response.status}`);
  }
  const data: RecipesResponse = await response.json();
  return data;
};

export const getRecipe = async (id: string | undefined) => {
  const query = qs.stringify(
    {
      populate: ['ingradients', 'equipments', 'directions.image', 'images', 'category'],
    },
    { encodeValuesOnly: true }
  );
  const response = await fetch(`${BASE_URL}/${id}?${query}`, {
    next: { revalidate: 300 },
  });
  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    throw new Error(`Error recipe: ${response.status}`);
  }
  const data: RecipeResponse = await response.json();
  return data;
};

type Category = {
  id: number;
  title: string;
};

type CategoriesResponse = {
  data: Category[];
};

export const getCategories = async () => {
  const query = qs.stringify({ populate: '*' });
  const response = await fetch(`${CATEGORY_URL}?${query}`, {
    next: { revalidate: 3600 },
  });
  if (!response.ok) {
    throw new Error(`Error categories: ${response.status}`);
  }
  const data: CategoriesResponse = await response.json();
  return data;
};

type Favorites = {
  recipe: RecipeList;
  id: number;
};

type FavoritesResponse = Favorites[];

export const getFavorites = async (token: string | null) => {
  const response = await fetch(`${FAVORITE_URL}/favorites`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error(`Error favorites: ${response.status}`);
  }
  const data: FavoritesResponse = await response.json();
  return data;
};

type FavoriteResponse = {
  id: number;
  recipe: number;
};
export const addFavorites = async (
  recipe: number,
  token: string | null
): Promise<FavoriteResponse> => {
  const response = await fetch(`${FAVORITE_URL}/favorites/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ recipe }),
  });
  if (!response.ok) {
    throw new Error(`Error favorites: ${response.status}`);
  }
  const data: FavoriteResponse = await response.json();
  return data;
};

export const removeFavorites = async (
  recipe: number,
  token: string | null
): Promise<FavoriteResponse> => {
  const response = await fetch(`${FAVORITE_URL}/favorites/remove/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ recipe }),
  });
  if (!response.ok) {
    throw new Error(`Error favorites: ${response.status}`);
  }
  const data: FavoriteResponse = await response.json();
  return data;
};
