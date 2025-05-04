
import { Card } from "@/types";

const DIGIMON_API_BASE_URL = "https://digimon-api.vercel.app/api/digimon";

// Transform a Digimon API response into our Card type
const mapDigimonToCard = (digimon: any): Card => {
  return {
    id: `digimon-${digimon.name.toLowerCase().replace(/\s+/g, '-')}`,
    name: digimon.name,
    imageUrl: digimon.img,
    type: digimon.level.toLowerCase(),
    rarity: mapLevelToRarity(digimon.level),
    set: "Digimon Card Collection",
    description: `Level: ${digimon.level}`,
    quantity: 1
  };
};

// Map Digimon levels to card rarities
const mapLevelToRarity = (level: string): string => {
  switch (level) {
    case "Rookie":
      return "common";
    case "Champion":
      return "uncommon";
    case "Ultimate":
      return "rare";
    case "Mega":
      return "mythic";
    case "Armor":
      return "legendary";
    default:
      return "common";
  }
};

// Fetch all digimon
export const fetchAllDigimon = async (): Promise<Card[]> => {
  try {
    const response = await fetch(`${DIGIMON_API_BASE_URL}`);
    if (!response.ok) {
      throw new Error("Failed to fetch Digimon data");
    }
    const data = await response.json();
    return data.map(mapDigimonToCard);
  } catch (error) {
    console.error("Error fetching Digimon:", error);
    return [];
  }
};

// Fetch digimon by name
export const fetchDigimonByName = async (name: string): Promise<Card[]> => {
  try {
    const response = await fetch(`${DIGIMON_API_BASE_URL}/name/${name}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch Digimon with name: ${name}`);
    }
    const data = await response.json();
    return data.map(mapDigimonToCard);
  } catch (error) {
    console.error(`Error fetching Digimon with name ${name}:`, error);
    return [];
  }
};

// Fetch digimon by level
export const fetchDigimonByLevel = async (level: string): Promise<Card[]> => {
  try {
    const response = await fetch(`${DIGIMON_API_BASE_URL}/level/${level}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch Digimon with level: ${level}`);
    }
    const data = await response.json();
    return data.map(mapDigimonToCard);
  } catch (error) {
    console.error(`Error fetching Digimon with level ${level}:`, error);
    return [];
  }
};
