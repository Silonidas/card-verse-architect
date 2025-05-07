
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Card as CardType, TCGType } from "@/types";

interface CollectionStatsProps {
  tcgCards: CardType[];
}

const CollectionStats = ({ tcgCards }: CollectionStatsProps) => {
  const totalCards = tcgCards.reduce((sum, card) => sum + card.quantity, 0);
  const uniqueCards = tcgCards.length;
  const estimatedValue = tcgCards.reduce(
    (sum, card) => sum + (card.price || 0) * card.quantity,
    0
  );
  const rarities = Array.from(new Set(tcgCards.map((card) => card.rarity)));

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Cards</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalCards}</div>
          <p className="text-xs text-muted-foreground">
            {uniqueCards} unique cards
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Collection Value</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${estimatedValue.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            Estimated market value
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Rarity Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {rarities.map((rarity) => (
            <Badge
              key={rarity}
              variant="outline"
              className="capitalize"
            >
              {rarity}: {tcgCards.filter(c => c.rarity === rarity).reduce((sum, card) => sum + card.quantity, 0)}
            </Badge>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default CollectionStats;
