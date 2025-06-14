import { Card, Deck } from "../types";

export const sampleCards: Card[] = [
  // Dragon Ball Super cards
  {
    id: "1",
    name: "Dragon Ruler",
    imageUrl: "https://placehold.co/300x400/8B5CF6/FFFFFF?text=Dragon+Ruler",
    type: "battle",
    rarity: "R",
    set: "Core Set 2023",
    manaCost: "2RR",
    description: "Flying\nWhen Dragon Ruler enters the battlefield, it deals 3 damage to any target.",
    power: "4",
    toughness: "4",
    quantity: 2,
    condition: "near mint",
    tcg: "Dragon Ball Super Card Game Fusion World",
    favorite: true
  },
  {
    id: "2",
    name: "Mystic Counterspell",
    imageUrl: "https://placehold.co/300x400/3B82F6/FFFFFF?text=Mystic+Counterspell",
    type: "extra",
    rarity: "UC",
    set: "Modern Horizons",
    manaCost: "UU",
    description: "Counter target spell. If that spell is countered this way, exile it instead of putting it into its owner's graveyard.",
    quantity: 4,
    condition: "mint",
    tcg: "Dragon Ball Super Card Game Fusion World"
  },
  {
    id: "3",
    name: "Ancient Artifact",
    imageUrl: "https://placehold.co/300x400/6366F1/FFFFFF?text=Ancient+Artifact",
    type: "extra",
    rarity: "SR",
    set: "Masters Edition",
    manaCost: "3",
    description: "T: Add one mana of any color to your mana pool.\nSacrifice Ancient Artifact: Draw a card.",
    quantity: 1,
    condition: "excellent",
    tcg: "Dragon Ball Super Card Game Fusion World"
  },
  {
    id: "8",
    name: "Son Goku",
    imageUrl: "https://placehold.co/300x400/FFA500/FFFFFF?text=Son+Goku",
    type: "battle",
    rarity: "SR",
    set: "FW-01",
    description: "When this card attacks, draw 1 card. If your life is 4 or less, draw 2 cards instead.",
    quantity: 2,
    condition: "mint",
    tcg: "Dragon Ball Super Card Game Fusion World",
    favorite: true
  },
  {
    id: "9",
    name: "Vegeta, Prince of Saiyans",
    imageUrl: "https://placehold.co/300x400/0000FF/FFFFFF?text=Vegeta",
    type: "battle",
    rarity: "R",
    set: "FW-01",
    description: "When you play this card, if you have a blue 'Saiyan' in play, KO one of your opponent's Battle Cards with 2 energy or less.",
    quantity: 3,
    condition: "near mint",
    tcg: "Dragon Ball Super Card Game Fusion World"
  },
  {
    id: "10",
    name: "Son Gohan, Awakened Power",
    imageUrl: "https://placehold.co/300x400/800080/FFFFFF?text=Gohan",
    type: "battle",
    rarity: "SCR",
    set: "FW-02",
    description: "Dual Attack, Critical\nWhen you play this card, your opponent chooses 2 of their Battle Cards and KOs them.",
    quantity: 1,
    condition: "excellent",
    tcg: "Dragon Ball Super Card Game Fusion World"
  },
  {
    id: "11",
    name: "Krillin",
    imageUrl: "https://placehold.co/300x400/FFA500/FFFFFF?text=Krillin",
    type: "battle",
    rarity: "C",
    set: "FW-01",
    description: "When this card is KO'd, draw 1 card.",
    quantity: 4,
    condition: "played",
    tcg: "Dragon Ball Super Card Game Fusion World"
  },
  {
    id: "12",
    name: "Son Goku, World Champion",
    imageUrl: "https://placehold.co/300x400/FFA500/FFFFFF?text=Goku+Leader",
    type: "leader",
    rarity: "SR",
    set: "FW-03",
    description: "Front: When this card attacks, draw 1 card.\nBack: [Awaken] When your life is 4 or less: Draw 2 cards, flip this card over.",
    quantity: 1,
    condition: "mint",
    tcg: "Dragon Ball Super Card Game Fusion World",
    favorite: true
  },
  {
    id: "13",
    name: "Vegeta, Saiyan Prince",
    imageUrl: "https://placehold.co/300x400/0000FF/FFFFFF?text=Vegeta+Leader",
    type: "leader",
    rarity: "SR",
    set: "FW-03",
    description: "Front: When you take damage, draw 1 card.\nBack: [Awaken] When your life is 4 or less: Draw 2 cards, flip this card over.",
    quantity: 1,
    condition: "near mint",
    tcg: "Dragon Ball Super Card Game Fusion World"
  },
  // Digimon Card Game 2020 cards
  {
    id: "14",
    name: "Agumon",
    imageUrl: "https://placehold.co/300x400/FF6B35/FFFFFF?text=Agumon",
    type: "digimon",
    rarity: "C",
    set: "BT1-010",
    description: "[Your Turn] When this Digimon attacks, gain +1000 DP.",
    quantity: 4,
    condition: "mint",
    tcg: "Digimon Card Game 2020",
    favorite: true
  },
  {
    id: "15",
    name: "Gabumon",
    imageUrl: "https://placehold.co/300x400/4A90E2/FFFFFF?text=Gabumon",
    type: "digimon",
    rarity: "C",
    set: "BT1-029",
    description: "[Your Turn] When this Digimon attacks, gain +1000 DP.",
    quantity: 3,
    condition: "near mint",
    tcg: "Digimon Card Game 2020"
  },
  {
    id: "16",
    name: "WarGreymon",
    imageUrl: "https://placehold.co/300x400/FF6B35/FFFFFF?text=WarGreymon",
    type: "digimon",
    rarity: "SR",
    set: "BT1-011",
    description: "[When Digivolving] Delete 1 of your opponent's Digimon with 9000 DP or less.",
    quantity: 1,
    condition: "mint",
    tcg: "Digimon Card Game 2020",
    favorite: true
  },
  {
    id: "17",
    name: "MetalGarurumon",
    imageUrl: "https://placehold.co/300x400/4A90E2/FFFFFF?text=MetalGarurumon",
    type: "digimon",
    rarity: "SR",
    set: "BT1-030",
    description: "[When Digivolving] Return 1 of your opponent's Digimon to their hand.",
    quantity: 1,
    condition: "excellent",
    tcg: "Digimon Card Game 2020"
  },
  {
    id: "18",
    name: "Tai Kamiya",
    imageUrl: "https://placehold.co/300x400/FF9500/FFFFFF?text=Tai+Kamiya",
    type: "tamer",
    rarity: "R",
    set: "BT1-085",
    description: "[Start of Your Turn] If you have 2 or less memory, set your memory to 3.",
    quantity: 2,
    condition: "near mint",
    tcg: "Digimon Card Game 2020"
  },
  {
    id: "19",
    name: "Matt Ishida",
    imageUrl: "https://placehold.co/300x400/4A90E2/FFFFFF?text=Matt+Ishida",
    type: "tamer",
    rarity: "R",
    set: "BT1-086",
    description: "[Start of Your Turn] If you have 2 or less memory, set your memory to 3.",
    quantity: 2,
    condition: "mint",
    tcg: "Digimon Card Game 2020"
  },
  {
    id: "20",
    name: "Gaia Force",
    imageUrl: "https://placehold.co/300x400/FF6B35/FFFFFF?text=Gaia+Force",
    type: "option",
    rarity: "U",
    set: "BT1-112",
    description: "Delete 1 of your opponent's Digimon with 9000 DP or less.",
    quantity: 3,
    condition: "excellent",
    tcg: "Digimon Card Game 2020"
  },
  {
    id: "21",
    name: "Omnimon",
    imageUrl: "https://placehold.co/300x400/GOLD/FFFFFF?text=Omnimon",
    type: "digimon",
    rarity: "SEC",
    set: "BT1-111",
    description: "[When Digivolving] Delete all of your opponent's Digimon with 8000 DP or less.",
    quantity: 1,
    condition: "mint",
    tcg: "Digimon Card Game 2020",
    favorite: true
  }
];

export const sampleDecks: Deck[] = [
  {
    id: "1",
    name: "Blue Control",
    format: "Standard",
    description: "A control deck focusing on counters and card draw",
    coverCard: "2",
    cards: [sampleCards[1], sampleCards[2]].map(card => ({...card, quantity: 4}))
  },
  {
    id: "2",
    name: "Red Aggro",
    format: "Modern",
    description: "Fast aggro deck with burn spells",
    coverCard: "5",
    cards: [sampleCards[0], sampleCards[3]].map(card => ({...card, quantity: 4}))
  },
  {
    id: "3",
    name: "Green Stompy",
    format: "Legacy",
    description: "Big creatures and ramp",
    coverCard: "7",
    cards: [sampleCards[4], sampleCards[5]].map(card => ({...card, quantity: 4}))
  }
];
