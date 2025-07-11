
export type DigimonRarity = "C" | "U" | "R" | "SR" | "SEC" | "P" | "AA";

export type CardRarity = DigimonRarity;

export type CardType = 
  | "digimon" 
  | "tamer" 
  | "option";

export type CardCondition = "mint" | "near mint" | "excellent" | "good" | "played" | "poor";

// Changed to string type to make it easy to add new TCGs in the future
export type TCGType = string;

export interface Card {
  id: string;
  name: string;
  imageUrl: string;
  type: CardType;
  rarity: CardRarity;
  set: string;
  tcg: TCGType;
  manaCost?: string;
  description?: string;
  power?: string;
  toughness?: string;
  level?: string;
  quantity: number;
  condition?: CardCondition;
  favorite?: boolean;
}

export interface Deck {
  id: string;
  name: string;
  format: string;
  cards: Card[];
  description?: string;
  coverCard?: string;
}
