import React, { createContext, useState, useContext, ReactNode } from "react";
import { Deck, Card } from "@/types";
import { toast } from "@/hooks/use-toast";
import { sampleDecks } from "@/data/sampleCards";

interface DeckContextType {
  decks: Deck[];
  createDeck: (deck: Omit<Deck, "id" | "cards">) => void;
  updateDeck: (deck: Deck) => void;
  deleteDeck: (deckId: string) => void;
  addCardToDeck: (deckId: string, card: Card) => void;
  removeCardFromDeck: (deckId: string, cardId: string) => void;
}

const DeckContext = createContext<DeckContextType | undefined>(undefined);

export const useDecks = () => {
  const context = useContext(DeckContext);
  if (!context) {
    throw new Error("useDecks must be used within a DeckProvider");
  }
  return context;
};

interface DeckProviderProps {
  children: ReactNode;
}

export const DeckProvider = ({ children }: DeckProviderProps) => {
  const [decks, setDecks] = useState<Deck[]>(sampleDecks);

  const createDeck = (deck: Omit<Deck, "id" | "cards">) => {
    const newDeck: Deck = {
      ...deck,
      id: Date.now().toString(),
      cards: [],
    };
    setDecks((prevDecks) => [...prevDecks, newDeck]);
    toast({
      title: "Deck created",
      description: `${deck.name} has been created.`,
    });
  };

  const updateDeck = (updatedDeck: Deck) => {
    setDecks((prevDecks) =>
      prevDecks.map((deck) => (deck.id === updatedDeck.id ? updatedDeck : deck))
    );
    toast({
      title: "Deck updated",
      description: `${updatedDeck.name} has been updated.`,
    });
  };

  const deleteDeck = (deckId: string) => {
    setDecks((prevDecks) => prevDecks.filter((deck) => deck.id !== deckId));
    toast({
      title: "Deck deleted",
      description: "The deck has been deleted.",
    });
  };

  const addCardToDeck = (deckId: string, card: Card) => {
    setDecks((prevDecks) =>
      prevDecks.map((deck) => {
        if (deck.id === deckId) {
          const existingCard = deck.cards.find((c) => c.id === card.id);
          if (existingCard) {
            return {
              ...deck,
              cards: deck.cards.map((c) =>
                c.id === card.id ? { ...c, quantity: (c.quantity || 0) + 1 } : c
              ),
            };
          } else {
            return {
              ...deck,
              cards: [...deck.cards, { ...card, quantity: 1 }],
            };
          }
        }
        return deck;
      })
    );
  };

  const removeCardFromDeck = (deckId: string, cardId: string) => {
    setDecks((prevDecks) =>
      prevDecks.map((deck) => {
        if (deck.id === deckId) {
          const existingCard = deck.cards.find((c) => c.id === cardId);
          if (existingCard && existingCard.quantity && existingCard.quantity > 1) {
            return {
              ...deck,
              cards: deck.cards.map((c) =>
                c.id === cardId ? { ...c, quantity: c.quantity! - 1 } : c
              ),
            };
          } else {
            return {
              ...deck,
              cards: deck.cards.filter((c) => c.id !== cardId),
            };
          }
        }
        return deck;
      })
    );
  };

  return (
    <DeckContext.Provider
      value={{ decks, createDeck, updateDeck, deleteDeck, addCardToDeck, removeCardFromDeck }}
    >
      {children}
    </DeckContext.Provider>
  );
};
