'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

interface FavoriteButtonProps {
  sheetId: string;
}

export function FavoriteButton({ sheetId }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(sheetId));
  }, [sheetId]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (isFavorite) {
      const newFavorites = favorites.filter((id: string) => id !== sheetId);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      setIsFavorite(false);
    } else {
      favorites.push(sheetId);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  return (
    <Button
      onClick={toggleFavorite}
      variant={isFavorite ? 'default' : 'outline'}
      size="sm"
    >
      <Star className={`w-4 h-4 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
      {isFavorite ? 'Favori' : 'Ajouter aux favoris'}
    </Button>
  );
}
