
import React, { useState } from 'react';
import { Card } from '@/types';
import { Plus } from 'lucide-react';

interface DeckDropZoneProps {
  onCardDrop: (card: Card, source: 'browse' | 'deck') => void;
  children: React.ReactNode;
}

const DeckDropZone: React.FC<DeckDropZoneProps> = ({ onCardDrop, children }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      if (data.card && data.source) {
        onCardDrop(data.card, data.source);
      }
    } catch (error) {
      console.error('Error parsing dropped data:', error);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative ${isDragOver ? 'bg-primary/10 border-2 border-primary border-dashed rounded-lg' : ''}`}
    >
      {isDragOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-primary/5 rounded-lg z-10 pointer-events-none">
          <div className="flex items-center gap-2 text-primary font-medium">
            <Plus className="h-5 w-5" />
            Add to Deck
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default DeckDropZone;
