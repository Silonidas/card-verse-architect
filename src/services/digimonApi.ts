
import { Card, CardRarity } from "@/types";

const DIGIMON_API_BASE_URL = "https://digimon-api.vercel.app/api/digimon";

// Transform a Digimon API response into our Card type
const mapDigimonToCard = (digimon: any): Card => {
  // Check if the image URL is valid
  const imageUrl = isValidImageUrl(digimon.img) 
    ? digimon.img 
    : `https://images.unsplash.com/photo-1582562124811-c09040d0a901?q=80&w=300&auto=format`;

  return {
    id: `digimon-${digimon.name.toLowerCase().replace(/\s+/g, '-')}`,
    name: digimon.name,
    imageUrl: imageUrl,
    type: digimon.level.toLowerCase(),
    rarity: mapLevelToRarity(digimon.level),
    set: "Digimon Card Collection",
    description: `Level: ${digimon.level}`,
    quantity: 1
  };
};

// Helper function to check if an image URL is likely to be valid
const isValidImageUrl = (url: string): boolean => {
  // Check if the URL ends with common image extensions
  const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  const lowercaseUrl = url.toLowerCase();
  return validExtensions.some(ext => lowercaseUrl.endsWith(ext)) && 
         !lowercaseUrl.includes('placeholder') &&
         !lowercaseUrl.includes('undefined') &&
         url.startsWith('http');
};

// Map Digimon levels to card rarities
const mapLevelToRarity = (level: string): CardRarity => {
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
