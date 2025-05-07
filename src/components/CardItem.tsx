import React from "react";
import { Card as CardType, CardCondition, TCGType } from "../types";
import { Badge } from "@/components/ui/badge";

interface CardItemProps {
  card: CardType;
  onClick?: () => void;
  compact?: boolean;
}

// Made the color function more generic for easy addition of new TCGs
const getRarityColor = (rarity: string, tcg: TCGType) => {
  // Dragon Ball Super rarities
  if (tcg === "Dragon Ball Super Card Game Fusion World") {
    switch (rarity) {
      case "L": return "bg-gold-500";  // Leader
      case "C": return "bg-gray-400";  // Common
      case "UC": return "bg-blue-400"; // Uncommon
      case "R": return "bg-tcg-purple"; // Rare
      case "SR": return "bg-yellow-500"; // Super Rare
      case "SCR": return "bg-red-600"; // Secret Rare
      case "PR": return "bg-green-500"; // Promo
      default: return "bg-gray-400";
    }
  }
  
  // Default colors for future TCGs
  switch (rarity) {
    case "C": return "bg-gray-400";  // Common
    case "U": case "UC": return "bg-blue-400"; // Uncommon
    case "R": return "bg-tcg-purple"; // Rare
    case "SR": return "bg-yellow-500"; // Super/Secret Rare
    case "SCR": case "SEC": return "bg-red-600"; // Secret Rare
    case "PR": case "P": return "bg-green-500"; // Promo
    case "L": return "bg-gold-500";  // Leader
    default: return "bg-gray-400";
  }
};

const getConditionColor = (condition: CardCondition | undefined) => {
  switch (condition) {
    case "mint":
      return "bg-green-500";
    case "near mint":
      return "bg-emerald-400";
    case "excellent":
      return "bg-blue-400";
    case "good":
      return "bg-yellow-400";
    case "played":
      return "bg-orange-400";
    case "poor":
      return "bg-red-500";
    default:
      return "bg-gray-300";
  }
};

const CardItem: React.FC<CardItemProps> = ({ card, onClick, compact = false }) => {
  // Get the display rarity text - returns the rarity as is
  const getRarityDisplayText = (rarity: string) => {
    return rarity;
  };

  return (
    <div 
      className={`${compact ? 'deck-card' : 'card-item'} cursor-pointer relative group`}
      onClick={onClick}
    >
      <div className="absolute top-2 right-2 z-10">
        <Badge variant="secondary" className={`${getRarityColor(card.rarity, card.tcg)} text-white`}>
          {getRarityDisplayText(card.rarity)}
        </Badge>
      </div>
      
      {card.quantity > 1 && (
        <div className="absolute top-2 left-2 z-10">
          <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
            x{card.quantity}
          </Badge>
        </div>
      )}
      
      {!compact && card.condition && (
        <div className="absolute top-10 right-2 z-10">
          <Badge variant="secondary" className={`${getConditionColor(card.condition)} text-white capitalize`}>
            {card.condition}
          </Badge>
        </div>
      )}
      
      <div className="h-full w-full overflow-hidden">
        <img
          src={card.imageUrl}
          alt={card.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      {!compact && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
          <h3 className="font-bold text-white truncate">{card.name}</h3>
          <p className="text-xs text-gray-300 truncate">{card.type} - {card.set}</p>
          {card.price && <p className="text-xs font-bold text-tcg-teal">${card.price.toFixed(2)}</p>}
        </div>
      )}
    </div>
  );
};

export default CardItem;
