
import React from "react";
import { Card } from "@/types";
import CardItem from "../CardItem";
import { Button } from "@/components/ui/button";

interface CardGridProps {
  filteredCards: Card[];
  onCardClick: (card: Card) => void;
  clearFilters: () => void;
  layout?: 'grid' | 'list';
}

const CardGrid = ({ filteredCards, onCardClick, clearFilters, layout = 'grid' }: CardGridProps) => {
  if (filteredCards.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No cards found matching your filters</p>
        <Button variant="link" onClick={clearFilters}>
          Clear filters
        </Button>
      </div>
    );
  }

  return (
    <div className={`grid gap-4 ${layout === 'grid' ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6' : 'grid-cols-1'}`}>
      {filteredCards.map((card) => (
        <CardItem key={card.id} card={card} onClick={() => onCardClick(card)} />
      ))}
    </div>
  );
};

export default CardGrid;
