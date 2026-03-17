'use client';
import { useMemo } from 'react';

import Button from '@components/Button';
import CheckBox from '@components/CheckBox';
import Text from '@components/Text';
import { useShoppingList } from '@hooks/useShoppingList';

import s from './ProductsClient.module.scss';

const ProductsClient = () => {
  const { items, toggleItem, removeItem, clearAll } = useShoppingList();

  const groups = useMemo(() => {
    const map = new Map<string, { recipeName: string; items: typeof items }>();
    for (const item of items) {
      if (!map.has(item.recipeId)) {
        map.set(item.recipeId, { recipeName: item.recipeName, items: [] });
      }
      map.get(item.recipeId)!.items.push(item);
    }
    return Array.from(map.entries()).map(([recipeId, group]) => ({ recipeId, ...group }));
  }, [items]);

  return (
    <main className={s.main}>
      <div className={s.main__header}>
        <Text view="title" tag="h1" weight="bold">
          Shopping List
        </Text>
        {items.length > 0 && <Button onClick={clearAll}>Clear all</Button>}
      </div>
      {items.length === 0 ? (
        <Text view="p-16" color="secondary">
          Your shopping list is empty. Add ingredients from a recipe page.
        </Text>
      ) : (
        <div className={s.main__groups}>
          {groups.map((group) => (
            <div key={group.recipeId} className={s.main__group}>
              <Text view="p-20" weight="bold" className={s['main__group-title']}>
                {group.recipeName}
              </Text>
              <ul className={s['main__group-list']}>
                {group.items.map((item) => (
                  <li
                    key={item.id}
                    className={`${s['main__group-item']} ${item.checked ? s['main__group-item_checked'] : ''}`}
                  >
                    <CheckBox checked={item.checked} onChange={() => toggleItem(item.id)} />
                    <Text
                      view="p-16"
                      className={`${s['main__group-name']} ${item.checked ? s['main__group-name_checked'] : ''}`}
                    >
                      {item.name}
                    </Text>
                    <button
                      className={s['main__group-remove']}
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remove ${item.name}`}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default ProductsClient;
