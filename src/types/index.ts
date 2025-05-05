
export type CardRarity = "common" | "uncommon" | "rare" | "mythic" | "legendary";

export type CardType = 
  | "creature" 
  | "instant" 
  | "sorcery" 
  | "artifact" 
  | "enchantment" 
  | "planeswalker" 
  | "land";

export type CardCondition = "mint" | "near mint" | "excellent" | "good" | "played" | "poor";

export type TCGType = "Magic: The Gathering" | "Pokemon" | "Yu-Gi-Oh" | "Flesh and Blood" | "Lorcana";

export interface Card {
  id: string;
  name: string;
  imageUrl: string;
  type: CardType;
  rarity: CardRarity;
  set: string;
  tcg?: TCGType;
  manaCost?: string;
  description?: string;
  power?: string;
  toughness?: string;
  price?: number;
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
