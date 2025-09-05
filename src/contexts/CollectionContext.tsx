import React, { createContext, useState, useContext, ReactNode } from "react";
import { Card } from "@/types";
import { toast } from "@/hooks/use-toast";

interface CollectionContextType {
  collection: Card[];
  addToCollection: (card: Card) => void;
  removeFromCollection: (cardId: string) => void;
}

const CollectionContext = createContext<CollectionContextType | undefined>(undefined);

export const useCollection = () => {
  const context = useContext(CollectionContext);
  if (!context) {
    throw new Error("useCollection must be used within a CollectionProvider");
  }
  return context;
};

interface CollectionProviderProps {
  children: ReactNode;
}

export const CollectionProvider = ({ children }: CollectionProviderProps) => {
  const [collection, setCollection] = useState<Card[]>([]);

  const addToCollection = (card: Card) => {
    setCollection((prevCollection) => {
      const existingCard = prevCollection.find((c) => c.id === card.id);
      if (existingCard) {
        const updatedCollection = prevCollection.map((c) =>
          c.id === card.id ? { ...c, quantity: (c.quantity || 0) + 1 } : c
        );
        toast({
          title: "Card added",
          description: `${card.name}: ${existingCard.quantity ? existingCard.quantity + 1 : 1} in collection`,
        });
        return updatedCollection;
      } else {
        const newCard = { ...card, quantity: 1, condition: "near mint" as const };
        toast({
          title: "Card added to collection",
          description: `${card.name} added to your collection`,
        });
        return [...prevCollection, newCard];
      }
    });
  };

  const removeFromCollection = (cardId: string) => {
    setCollection((prevCollection) => {
      const existingCard = prevCollection.find((c) => c.id === cardId);
      if (existingCard && existingCard.quantity && existingCard.quantity > 1) {
        return prevCollection.map((c) =>
          c.id === cardId ? { ...c, quantity: c.quantity! - 1 } : c
        );
      } else {
        return prevCollection.filter((c) => c.id !== cardId);
      }
    });
  };

  return (
    <CollectionContext.Provider value={{ collection, addToCollection, removeFromCollection }}>
      {children}
    </CollectionContext.Provider>
  );
};
