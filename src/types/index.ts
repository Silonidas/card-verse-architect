
export type DragonBallRarity = "L" | "C" | "UC" | "R" | "SR" | "SCR" | "PR";

export type CardRarity = DragonBallRarity;

export type CardType = 
  | "creature" 
  | "instant" 
  | "sorcery" 
  | "artifact" 
  | "enchantment" 
  | "planeswalker" 
  | "land"
  | "leader";

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
  quantity: number;
  condition?: CardCondition;
}

export interface Deck {
  id: string;
  name: string;
  format: string;
  cards: Card[];
  description?: string;
  coverCard?: string;
}
