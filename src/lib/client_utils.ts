"use client";

import { useEffect, useState } from "react";
import { ComponentCategory } from "./db";

export function useLocalStorage<T>(key: string, fallbackValue: T) {
  const [value, setValue] = useState(fallbackValue);
  useEffect(() => {
    const stored = localStorage.getItem(key);
    setValue(stored ? JSON.parse(stored) : fallbackValue);
  }, [fallbackValue, key]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

export type ComponentStorageType = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: ComponentCategory;
  quantity: number;
  slug: string;
};

export function useComponentStorage() {
  const [components, setComponents] = useLocalStorage<ComponentStorageType[]>(
    "components",
    [],
  );

  const addComponent = (component: ComponentStorageType) => {
    setComponents((prev) => [...prev, component]);
  };

  const removeComponent = (id: string) => {
    setComponents((prev) => prev.filter((c) => c.id !== id));
  };

  return {
    components,
    addComponent,
    removeComponent,
  };
}