import { useState, useEffect } from 'react';

export interface FavoriteEntry {
  propertyId: number;
  email: string;
  priceAtTime: number;
  title: string;
  savedAt: string; // ISO date
}

const KEY = 'jp_favorites';

function load(): FavoriteEntry[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
}

function save(entries: FavoriteEntry[]) {
  localStorage.setItem(KEY, JSON.stringify(entries));
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteEntry[]>(load);

  useEffect(() => {
    save(favorites);
  }, [favorites]);

  const isFavorited = (propertyId: number, email?: string) =>
    favorites.some(f => f.propertyId === propertyId && (!email || f.email === email));

  const addFavorite = (entry: FavoriteEntry) => {
    setFavorites(prev => {
      // Avoid duplicates for same email + propertyId
      const exists = prev.some(f => f.propertyId === entry.propertyId && f.email === entry.email);
      if (exists) return prev;
      return [...prev, entry];
    });
  };

  const removeFavorite = (propertyId: number, email: string) => {
    setFavorites(prev => prev.filter(f => !(f.propertyId === propertyId && f.email === email)));
  };

  return { favorites, isFavorited, addFavorite, removeFavorite };
}
