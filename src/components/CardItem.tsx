
import React from "react";
import { Card as CardType, TCGType } from "../types";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface CardItemProps {
  card: CardType;
  onClick?: () => void;
  compact?: boolean;
}

// Made the color function more generic for easy addition of new TCGs
const getRarityColor = (rarity: string, tcg: TCGType) => {
  // Digimon Card Game 2020 rarities
  if (tcg === "Digimon Card Game 2020") {
    switch (rarity) {
      case "C": return "bg-gray-400";  // Common
      case "U": return "bg-blue-400"; // Uncommon
      case "R": return "bg-tcg-purple"; // Rare
      case "SR": return "holo-badge"; // Super Rare - holographic effect
      case "SEC": return "holo-badge-scr"; // Secret Rare - enhanced holographic effect
      case "P": return "bg-green-500"; // Promo
      case "AA": return "bg-yellow-500"; // Alternative Art
      default: return "bg-gray-400";
    }
  }
  
  // Default colors for future TCGs
  switch (rarity) {
    case "C": return "bg-gray-400";  // Common
    case "U": case "UC": return "bg-blue-400"; // Uncommon
    case "R": return "bg-tcg-purple"; // Rare
    case "SR": return "holo-badge"; // Super Rare with holographic effect
    case "SCR": case "SEC": return "holo-badge-scr"; // Secret Rare with enhanced holographic effect
    case "PR": case "P": return "bg-green-500"; // Promo
    default: return "bg-gray-400";
  }
};

const getCardHoloClass = (rarity: string) => {
  switch (rarity) {
    case "SR": return "card-holo-sr";
    case "SCR": case "SEC": return "card-holo-scr";
    default: return "";
  }
};

const CardItem: React.FC<CardItemProps> = ({ card, onClick, compact = false }) => {
  // Get the display rarity text - returns the rarity as is
  const getRarityDisplayText = (rarity: string) => {
    return rarity;
  };

  return (
    <div 
      className={`${compact ? 'deck-card' : 'card-item'} cursor-pointer relative group ${getCardHoloClass(card.rarity)}`}
      onClick={onClick}
    >
      {card.favorite && (
        <div className="absolute top-2 z-10 left-1/2 transform -translate-x-1/2">
          <Star className="fill-yellow-400 text-yellow-400" size={20} />
        </div>
      )}
      
      <div className="absolute top-2 right-2 z-10">
        <Badge variant="secondary" className={`${getRarityColor(card.rarity, card.tcg)} text-white`}>
          {getRarityDisplayText(card.rarity)}
        </Badge>
      </div>
      
      {card.quantity && card.quantity > 1 && (
        <div className="absolute top-2 left-2 z-10">
          <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
            x{card.quantity}
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
        </div>
      )}
    </div>
  );
};

export default CardItem;
