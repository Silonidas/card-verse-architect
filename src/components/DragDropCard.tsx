
import React from 'react';
import { Card } from '@/types';
import CardItem from './CardItem';

interface DragDropCardProps {
  card: Card;
  onClick: (card: Card) => void;
  onDragStart?: (card: Card) => void;
  onDragEnd?: () => void;
  isDraggable?: boolean;
  isInDeck?: boolean;
  compact?: boolean;
}

const DragDropCard: React.FC<DragDropCardProps> = ({
  card,
  onClick,
  onDragStart,
  onDragEnd,
  isDraggable = false,
  isInDeck = false,
  compact = false,
}) => {
  const handleDragStart = (e: React.DragEvent) => {
    if (!isDraggable) return;
    
    e.dataTransfer.setData('application/json', JSON.stringify({
      card,
      source: isInDeck ? 'deck' : 'browse'
    }));
    e.dataTransfer.effectAllowed = isInDeck ? 'move' : 'copy';
    
    if (onDragStart) {
      onDragStart(card);
    }
  };

  const handleDragEnd = () => {
    if (onDragEnd) {
      onDragEnd();
    }
  };

  return (
    <div
      draggable={isDraggable}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`${isDraggable ? 'cursor-grab active:cursor-grabbing' : ''} ${
        isInDeck ? 'hover:opacity-75 transition-opacity' : ''
      }`}
      title={isInDeck ? 'Drag to remove from deck' : 'Drag to add to deck'}
    >
      <CardItem
        card={card}
        onClick={onClick}
        compact={compact}
      />
    </div>
  );
};

export default DragDropCard;
