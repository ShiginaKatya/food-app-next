import { useSyncExternalStore, useCallback } from 'react';

const STORAGE_KEY = 'shopping_list';

export type ShoppingItem = {
  id: number;
  name: string;
  recipeId: string;
  recipeName: string;
  checked: boolean;
};

type Ingredient = {
  id: number;
  name: string;
};

let listeners: Array<() => void> = [];
let currentItems: ShoppingItem[] = [];
let initialized = false;
const EMPTY_SNAPSHOT: ShoppingItem[] = [];

function emitChange() {
  for (const listener of listeners) listener();
}

function setItems(next: ShoppingItem[]) {
  currentItems = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {}
  emitChange();
}

function subscribe(listener: () => void) {
  if (!initialized) {
    initialized = true;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) currentItems = JSON.parse(stored);
    } catch {}
  }
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function getSnapshot() {
  return currentItems;
}

function getServerSnapshot(): ShoppingItem[] {
  return EMPTY_SNAPSHOT;
}

export const useShoppingList = () => {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const addIngredients = useCallback(
    (ingradients: Ingredient[], recipeId: string, recipeName: string) => {
      const existingIds = new Set(
        currentItems.filter((i) => i.recipeId === recipeId).map((i) => i.id)
      );
      const newItems: ShoppingItem[] = ingradients
        .filter((ing) => !existingIds.has(ing.id))
        .map((ing) => ({ id: ing.id, name: ing.name, recipeId, recipeName, checked: false }));
      setItems([...currentItems, ...newItems]);
    },
    []
  );

  const toggleItem = useCallback((id: number) => {
    setItems(
      currentItems.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  }, []);

  const removeItem = useCallback((id: number) => {
    setItems(currentItems.filter((item) => item.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setItems([]);
  }, []);

  const uncheckedCount = items.filter((i) => !i.checked).length;

  return { items, addIngredients, toggleItem, removeItem, clearAll, uncheckedCount };
};
