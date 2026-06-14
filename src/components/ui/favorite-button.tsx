'use client';

import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FavoritesManager } from '@/lib/favorites/favorites-manager';
import { cn } from '@/lib/utils';

interface FavoriteButtonProps {
  sheetId: string;
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  showLabel?: boolean;
  className?: string;
}

export function FavoriteButton({
  sheetId,
  variant = 'ghost',
  size = 'icon',
  showLabel = false,
  className,
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkFavoriteStatus();
  }, [sheetId]);

  async function checkFavoriteStatus() {
    try {
      const status = await FavoritesManager.isFavorite(sheetId);
      setIsFavorite(status);
    } catch (error) {
      console.error('Error checking favorite status:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleToggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    
    setIsLoading(true);
    try {
      const newStatus = await FavoritesManager.toggleFavorite(sheetId);
      setIsFavorite(newStatus);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleToggle}
      disabled={isLoading}
      className={cn(
        'transition-all',
        isFavorite && 'text-yellow-500 hover:text-yellow-600',
        className
      )}
      title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
    >
      <Star
        className={cn(
          'w-5 h-5',
          isFavorite && 'fill-yellow-500'
        )}
      />
      {showLabel && (
        <span className="ml-2">
          {isFavorite ? 'Favori' : 'Ajouter'}
        </span>
      )}
    </Button>
  );
}
