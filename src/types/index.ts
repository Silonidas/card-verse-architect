
export type DigimonRarity = "C" | "U" | "R" | "SR" | "SEC" | "P";
export type DragonBallRarity = "L" | "C" | "UC" | "R" | "SR" | "SCR" | "PR";

export type CardRarity = 
  | "common" 
  | "uncommon" 
  | "rare" 
  | "mythic" 
  | "legendary"
  | DigimonRarity
  | DragonBallRarity;

export type CardType = 
  | "creature" 
  | "instant" 
  | "sorcery" 
  | "artifact" 
  | "enchantment" 
  | "planeswalker" 
  | "land";

export type CardCondition = "mint" | "near mint" | "excellent" | "good" | "played" | "poor";

export type TCGType = "Digimon Card Game 2020" | "Dragon Ball Super Card Game Fusion World";

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
