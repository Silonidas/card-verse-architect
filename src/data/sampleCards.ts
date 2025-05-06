
import { Card, Deck } from "../types";

export const sampleCards: Card[] = [
  {
    id: "1",
    name: "Dragon Ruler",
    imageUrl: "https://placehold.co/300x400/8B5CF6/FFFFFF?text=Dragon+Ruler",
    type: "creature",
    rarity: "R", // Changed from "rare" to "R" to match CardRarity type
    set: "Core Set 2023",
    manaCost: "2RR",
    description: "Flying\nWhen Dragon Ruler enters the battlefield, it deals 3 damage to any target.",
    power: "4",
    toughness: "4",
    price: 15.99,
    quantity: 2,
    condition: "near mint"
  },
  {
    id: "2",
    name: "Mystic Counterspell",
    imageUrl: "https://placehold.co/300x400/3B82F6/FFFFFF?text=Mystic+Counterspell",
    type: "instant",
    rarity: "U", // Changed from "uncommon" to "U" to match CardRarity type
    set: "Modern Horizons",
    manaCost: "UU",
    description: "Counter target spell. If that spell is countered this way, exile it instead of putting it into its owner's graveyard.",
    price: 3.50,
    quantity: 4,
    condition: "mint"
  },
  {
    id: "3",
    name: "Ancient Artifact",
    imageUrl: "https://placehold.co/300x400/6366F1/FFFFFF?text=Ancient+Artifact",
    type: "artifact",
    rarity: "SR", // Changed from "mythic" to "SR" to match CardRarity type
    set: "Masters Edition",
    manaCost: "3",
    description: "T: Add one mana of any color to your mana pool.\nSacrifice Ancient Artifact: Draw a card.",
    price: 25.00,
    quantity: 1,
    condition: "excellent"
  },
  {
    id: "4",
    name: "MetalGreymon",
    imageUrl: "https://placehold.co/300x400/3B82F6/FFFFFF?text=MetalGreymon",
    type: "creature",
    rarity: "SR",
    set: "BT-01",
    description: "When digivolving, gain +2000 DP and delete 1 opposing Digimon with 4000 DP or less.",
    price: 12.50,
    quantity: 2,
    condition: "mint",
    tcg: "Digimon Card Game 2020"
  },
  {
    id: "5",
    name: "Agumon",
    imageUrl: "https://placehold.co/300x400/3B82F6/FFFFFF?text=Agumon",
    type: "creature",
    rarity: "C",
    set: "ST-1",
    description: "When attacking, gain +1000 DP for this battle.",
    price: 0.50,
    quantity: 4,
    condition: "near mint",
    tcg: "Digimon Card Game 2020"
  },
  {
    id: "6",
    name: "Greymon",
    imageUrl: "https://placehold.co/300x400/3B82F6/FFFFFF?text=Greymon",
    type: "creature",
    rarity: "U",
    set: "BT-01",
    description: "When digivolving, draw 1 card.",
    price: 1.00,
    quantity: 3,
    condition: "excellent",
    tcg: "Digimon Card Game 2020"
  },
  {
    id: "7",
    name: "Omnimon",
    imageUrl: "https://placehold.co/300x400/FF0000/FFFFFF?text=Omnimon",
    type: "creature",
    rarity: "SEC",
    set: "BT-01",
    description: "Security Attack +1. When digivolving, delete all opposing Digimon with 6000 DP or less.",
    price: 45.00,
    quantity: 1,
    condition: "mint",
    tcg: "Digimon Card Game 2020"
  },
  {
    id: "8",
    name: "Son Goku",
    imageUrl: "https://placehold.co/300x400/FFA500/FFFFFF?text=Son+Goku",
    type: "creature",
    rarity: "SR",
    set: "FW-01",
    description: "When this card attacks, draw 1 card. If your life is 4 or less, draw 2 cards instead.",
    price: 20.00,
    quantity: 2,
    condition: "mint",
    tcg: "Dragon Ball Super Card Game Fusion World"
  },
  {
    id: "9",
    name: "Vegeta, Prince of Saiyans",
    imageUrl: "https://placehold.co/300x400/0000FF/FFFFFF?text=Vegeta",
    type: "creature",
    rarity: "R",
    set: "FW-01",
    description: "When you play this card, if you have a blue 'Saiyan' in play, KO one of your opponent's Battle Cards with 2 energy or less.",
    price: 5.00,
    quantity: 3,
    condition: "near mint",
    tcg: "Dragon Ball Super Card Game Fusion World"
  },
  {
    id: "10",
    name: "Son Gohan, Awakened Power",
    imageUrl: "https://placehold.co/300x400/800080/FFFFFF?text=Gohan",
    type: "creature",
    rarity: "SCR",
    set: "FW-02",
    description: "Dual Attack, Critical\nWhen you play this card, your opponent chooses 2 of their Battle Cards and KOs them.",
    price: 80.00,
    quantity: 1,
    condition: "excellent",
    tcg: "Dragon Ball Super Card Game Fusion World"
  },
  {
    id: "11",
    name: "Krillin",
    imageUrl: "https://placehold.co/300x400/FFA500/FFFFFF?text=Krillin",
    type: "creature",
    rarity: "C",
    set: "FW-01",
    description: "When this card is KO'd, draw 1 card.",
    price: 0.25,
    quantity: 4,
    condition: "played",
    tcg: "Dragon Ball Super Card Game Fusion World"
  },
  {
    id: "12",
    name: "Son Goku, World Champion",
    imageUrl: "https://placehold.co/300x400/FFA500/FFFFFF?text=Goku+Leader",
    type: "leader",
    rarity: "L",
    set: "FW-03",
    description: "Front: When this card attacks, draw 1 card.\nBack: [Awaken] When your life is 4 or less: Draw 2 cards, flip this card over.",
    price: 15.00,
    quantity: 1,
    condition: "mint",
    tcg: "Dragon Ball Super Card Game Fusion World"
  },
  {
    id: "13",
    name: "Vegeta, Saiyan Prince",
    imageUrl: "https://placehold.co/300x400/0000FF/FFFFFF?text=Vegeta+Leader",
    type: "leader",
    rarity: "L",
    set: "FW-03",
    description: "Front: When you take damage, draw 1 card.\nBack: [Awaken] When your life is 4 or less: Draw 2 cards, flip this card over.",
    price: 12.50,
    quantity: 1,
    condition: "near mint",
    tcg: "Dragon Ball Super Card Game Fusion World"
  }
];

export const sampleDecks: Deck[] = [
  {
    id: "1",
    name: "Blue Control",
    format: "Standard",
    description: "A control deck focusing on counters and card draw",
    coverCard: "2",
    cards: [sampleCards[1], sampleCards[5]].map(card => ({...card, quantity: 4}))
  },
  {
    id: "2",
    name: "Red Aggro",
    format: "Modern",
    description: "Fast aggro deck with burn spells",
    coverCard: "5",
    cards: [sampleCards[0], sampleCards[4]].map(card => ({...card, quantity: 4}))
  },
  {
    id: "3",
    name: "Green Stompy",
    format: "Legacy",
    description: "Big creatures and ramp",
    coverCard: "7",
    cards: [sampleCards[3], sampleCards[6]].map(card => ({...card, quantity: 4}))
  }
];
