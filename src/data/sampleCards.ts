
import { Card, Deck } from "../types";

export const sampleCards: Card[] = [
  {
    id: "1",
    name: "Agumon",
    imageUrl: "https://placehold.co/300x400/FFA500/FFFFFF?text=Agumon",
    type: "digimon",
    rarity: "C",
    set: "BT1-010",
    description: "[Your Turn] When this Digimon digivolves into a Digimon with [Greymon] in its name, gain 1 memory.",
    power: "3000",
    quantity: 4,
    condition: "near mint",
    tcg: "Digimon Card Game 2020",
    favorite: true
  },
  {
    id: "2",
    name: "Gabumon",
    imageUrl: "https://placehold.co/300x400/4169E1/FFFFFF?text=Gabumon",
    type: "digimon",
    rarity: "C",
    set: "BT1-030",
    description: "[Your Turn] When this Digimon digivolves into a Digimon with [Garurumon] in its name, gain 1 memory.",
    power: "3000",
    quantity: 4,
    condition: "mint",
    tcg: "Digimon Card Game 2020"
  },
  {
    id: "3",
    name: "MetalGreymon",
    imageUrl: "https://placehold.co/300x400/8B4513/FFFFFF?text=MetalGreymon",
    type: "digimon",
    rarity: "U",
    set: "BT1-055",
    description: "[When Digivolving] Delete 1 of your opponent's Digimon with 4000 DP or less.",
    power: "7000",
    quantity: 2,
    condition: "excellent",
    tcg: "Digimon Card Game 2020"
  },
  {
    id: "4",
    name: "WarGreymon",
    imageUrl: "https://placehold.co/300x400/FF4500/FFFFFF?text=WarGreymon",
    type: "digimon",
    rarity: "SR",
    set: "BT1-054",
    description: "[When Digivolving] Delete all of your opponent's Digimon with 5000 DP or less. [Your Turn] This Digimon gets +2000 DP.",
    power: "11000",
    quantity: 1,
    condition: "mint",
    tcg: "Digimon Card Game 2020",
    favorite: true
  },
  {
    id: "5",
    name: "Tai Kamiya",
    imageUrl: "https://placehold.co/300x400/FF6347/FFFFFF?text=Tai+Kamiya",
    type: "tamer",
    rarity: "R",
    set: "BT1-085",
    description: "[Start of Your Turn] If you have 2 or less memory, set your memory to 3. [Your Turn] When one of your Digimon digivolves, by suspending this Tamer, gain 1 memory.",
    quantity: 2,
    condition: "near mint",
    tcg: "Digimon Card Game 2020"
  },
  {
    id: "6",
    name: "Matt Ishida",
    imageUrl: "https://placehold.co/300x400/4682B4/FFFFFF?text=Matt+Ishida",
    type: "tamer",
    rarity: "R",
    set: "BT1-086",
    description: "[Start of Your Turn] If you have 2 or less memory, set your memory to 3. [Your Turn] When one of your Digimon with [Garurumon] in its name attacks, by suspending this Tamer, gain 1 memory.",
    quantity: 2,
    condition: "excellent",
    tcg: "Digimon Card Game 2020",
    favorite: true
  },
  {
    id: "7",
    name: "Gaia Force",
    imageUrl: "https://placehold.co/300x400/32CD32/FFFFFF?text=Gaia+Force",
    type: "option",
    rarity: "U",
    set: "BT1-105",
    description: "[Main] Delete 1 of your opponent's Digimon with 9000 DP or less. [Security] Delete 1 of your opponent's Digimon with 6000 DP or less.",
    quantity: 3,
    condition: "played",
    tcg: "Digimon Card Game 2020"
  },
  {
    id: "8",
    name: "Omnimon",
    imageUrl: "https://placehold.co/300x400/C0C0C0/000000?text=Omnimon",
    type: "digimon",
    rarity: "SEC",
    set: "BT1-111",
    description: "[When Digivolving] Delete all of your opponent's Digimon with 8000 DP or less. [Your Turn] This Digimon gets +3000 DP.",
    power: "15000",
    quantity: 1,
    condition: "mint",
    tcg: "Digimon Card Game 2020",
    favorite: true
  },
  {
    id: "9",
    name: "Memory Boost!",
    imageUrl: "https://placehold.co/300x400/FFD700/000000?text=Memory+Boost",
    type: "option",
    rarity: "C",
    set: "BT1-109",
    description: "[Main] Gain 2 memory. [Security] Gain 1 memory.",
    quantity: 4,
    condition: "near mint",
    tcg: "Digimon Card Game 2020"
  }
];

export const sampleDecks: Deck[] = [
  {
    id: "1",
    name: "Red Aggro",
    format: "Standard",
    description: "A fast red deck focusing on Greymon line",
    coverCard: "4",
    cards: [sampleCards[0], sampleCards[2], sampleCards[3]].map(card => ({...card, quantity: 4}))
  },
  {
    id: "2",
    name: "Blue Control",
    format: "Standard",
    description: "Control deck with Garurumon line",
    coverCard: "1",
    cards: [sampleCards[1], sampleCards[5]].map(card => ({...card, quantity: 4}))
  },
  {
    id: "3",
    name: "Yellow Midrange",
    format: "Standard",
    description: "Balanced deck with various tamers",
    coverCard: "5",
    cards: [sampleCards[4], sampleCards[6]].map(card => ({...card, quantity: 4}))
  }
];
