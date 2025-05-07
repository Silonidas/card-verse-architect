
import React, { useState, useEffect } from "react";
import { sampleCards } from "@/data/sampleCards";
import CardDetail from "./CardDetail";
import { Card, TCGType } from "@/types";
import CollectionStats from "./collection/CollectionStats";
import CollectionFilters from "./collection/CollectionFilters";
import CardGrid from "./collection/CardGrid";

const Collection = () => {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [isCardDetailOpen, setIsCardDetailOpen] = useState(false);
  const [currentTCG, setCurrentTCG] = useState<TCGType>("Digimon Card Game 2020");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterRarity, setFilterRarity] = useState("all");
  
  // Filter cards based on the current TCG
  const tcgCards = sampleCards.filter(card => card.tcg === currentTCG);
  
  const filteredCards = tcgCards.filter((card) => {
    const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || card.type === filterType;
    const matchesRarity = filterRarity === "all" || card.rarity === filterRarity;
    return matchesSearch && matchesType && matchesRarity;
  });

  const cardTypes = Array.from(new Set(tcgCards.map((card) => card.type)));
  const rarities = Array.from(new Set(tcgCards.map((card) => card.rarity)));

  const handleCardClick = (card: Card) => {
    setSelectedCard(card);
    setIsCardDetailOpen(true);
  };

  const closeCardDetail = () => {
    setIsCardDetailOpen(false);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilterType("all");
    setFilterRarity("all");
  };

  // Listen for TCG changes from Layout component
  useEffect(() => {
    const handleTCGChange = (event: Event) => {
      const customEvent = event as CustomEvent<TCGType>;
      setCurrentTCG(customEvent.detail);
      
      // Reset filters when changing TCG
      setFilterType("all");
      setFilterRarity("all");
    };

    window.addEventListener('tcgChanged', handleTCGChange as EventListener);
    
    return () => {
      window.removeEventListener('tcgChanged', handleTCGChange as EventListener);
    };
  }, []);

  return (
    <>
      <div className="space-y-6">
        <CollectionStats tcgCards={tcgCards} />

        <CollectionFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterType={filterType}
          setFilterType={setFilterType}
          filterRarity={filterRarity}
          setFilterRarity={setFilterRarity}
          cardTypes={cardTypes}
          rarities={rarities}
        />

        <CardGrid 
          filteredCards={filteredCards} 
          onCardClick={handleCardClick} 
          clearFilters={clearFilters} 
        />
      </div>
      <CardDetail
        card={selectedCard}
        isOpen={isCardDetailOpen}
        onClose={closeCardDetail}
      />
    </>
  );
};

export default Collection;
