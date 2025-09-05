import { Card } from "@/types";

const API_URL = "https://digimoncard.io/api-public";

export const getCards = async (): Promise<Card[]> => {
  try {
    const response = await fetch(`${API_URL}/search.php?series=Digimon Card Game`);
    if (!response.ok) {
      throw new Error("Failed to fetch cards");
    }
    const data = await response.json();

    // The API returns a lot of cards, so for now, I'll just take the first 50
    // to avoid performance issues. I can add pagination later.
    const limitedData = data.slice(0, 50);

    return limitedData.map((card: any) => ({
      id: card.cardnumber,
      cardnumber: card.cardnumber,
      name: card.name,
      imageUrl: `https://images.digimoncard.io/images/cards/${card.cardnumber}.jpg`,
      type: card.type,
      rarity: card.rarity,
      set: card.set_name?.[0],
      tcg: card.series,
      play_cost: card.play_cost,
      main_effect: card.main_effect,
      source_effect: card.source_effect,
      dp: card.dp,
      level: card.level,
      color: card.color,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};
