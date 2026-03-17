'use client';

import { useShoppingList } from '@hooks/useShoppingList';

import s from './ProductsCounter.module.scss';

const ProductsCounter = () => {
  const { uncheckedCount } = useShoppingList();

  if (!uncheckedCount) return null;
  return <span className={s.counter}>{uncheckedCount}</span>;
};

export default ProductsCounter;
