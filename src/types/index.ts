
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
  id: string; // This will be the cardnumber
  name: string;
  imageUrl: string;
  type: string;
  rarity: string;
  set?: string; // This is in the set_name array
  tcg: string; // This is the series
  play_cost?: string;
  main_effect?: string;
  source_effect?: string;
  dp?: string;
  level?: string;
  quantity?: number; // This will be managed in the frontend
  condition?: CardCondition;
  favorite?: boolean;
  color?: string;
  cardnumber: string;
}

export interface Deck {
  id: string;
  name: string;
  format: string;
  cards: Card[];
  description?: string;
  coverCard?: string;
}
