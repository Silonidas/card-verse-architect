
import { Card, Deck } from "../types";

export const sampleCards: Card[] = [
  {
    id: "1",
    name: "Dragon Ruler",
    imageUrl: "https://placehold.co/300x400/8B5CF6/FFFFFF?text=Dragon+Ruler",
    type: "creature",
    rarity: "rare",
    set: "Core Set 2023",
    manaCost: "2RR",
    description: "Flying\nWhen Dragon Ruler enters the battlefield, it deals 3 damage to any target.",
    power: "4",
    toughness: "4",
    price: 15.99,
    quantity: 2
  },
  {
    id: "2",
    name: "Mystic Counterspell",
    imageUrl: "https://placehold.co/300x400/3B82F6/FFFFFF?text=Mystic+Counterspell",
    type: "instant",
    rarity: "uncommon",
    set: "Modern Horizons",
    manaCost: "UU",
    description: "Counter target spell. If that spell is countered this way, exile it instead of putting it into its owner's graveyard.",
    price: 3.50,
    quantity: 4
  },
  {
    id: "3",
    name: "Ancient Artifact",
    imageUrl: "https://placehold.co/300x400/6366F1/FFFFFF?text=Ancient+Artifact",
    type: "artifact",
    rarity: "mythic",
    set: "Masters Edition",
    manaCost: "3",
    description: "T: Add one mana of any color to your mana pool.\nSacrifice Ancient Artifact: Draw a card.",
    price: 25.00,
    quantity: 1
  },
  {
    id: "4",
    name: "Healing Spring",
    imageUrl: "https://placehold.co/300x400/2DD4BF/FFFFFF?text=Healing+Spring",
    type: "land",
    rarity: "rare",
    set: "Modern Horizons 2",
    description: "T: Add G to your mana pool.\n1, T: Gain 2 life.",
    price: 8.75,
    quantity: 3
  },
  {
    id: "5",
    name: "Fireball",
    imageUrl: "https://placehold.co/300x400/EF4444/FFFFFF?text=Fireball",
    type: "sorcery",
    rarity: "common",
    set: "Alpha",
    manaCost: "XR",
    description: "Fireball deals X damage divided evenly, rounded down, among any number of targets.",
    price: 0.25,
    quantity: 10
  },
  {
    id: "6",
    name: "Mind Control",
    imageUrl: "https://placehold.co/300x400/3B82F6/FFFFFF?text=Mind+Control",
    type: "enchantment",
    rarity: "uncommon",
    set: "Tenth Edition",
    manaCost: "3UU",
    description: "You control enchanted creature.",
    price: 1.25,
    quantity: 2
  },
  {
    id: "7",
    name: "Nature's Guardian",
    imageUrl: "https://placehold.co/300x400/22C55E/FFFFFF?text=Nature's+Guardian",
    type: "creature",
    rarity: "legendary",
    set: "Modern Masters",
    manaCost: "2GG",
    description: "Vigilance, reach\nOther creatures you control get +1/+1.",
    power: "3",
    toughness: "3",
    price: 35.00,
    quantity: 1
  },
  {
    id: "8",
    name: "Soul Drain",
    imageUrl: "https://placehold.co/300x400/1E293B/FFFFFF?text=Soul+Drain",
    type: "sorcery",
    rarity: "uncommon",
    set: "Shadows over Innistrad",
    manaCost: "2BB",
    description: "Target player discards two cards and loses 2 life. You gain 2 life.",
    price: 0.75,
    quantity: 4
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
