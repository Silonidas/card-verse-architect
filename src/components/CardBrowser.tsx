
import React, { useState, useEffect } from "react";
import { sampleCards } from "@/data/sampleCards";
import { Card, TCGType } from "@/types";
import CardGrid from "./collection/CardGrid";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const CardBrowser = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterRarity, setFilterRarity] = useState("all");
  const [currentTCG, setCurrentTCG] = useState<TCGType>("Dragon Ball Super Card Game Fusion World");
  
  // Filter cards based on the current TCG first
  const tcgCards = sampleCards.filter(card => card.tcg === currentTCG);
  
  // Get dynamic card types and rarities based on the current TCG
  const getCardTypesForTCG = (tcg: TCGType) => {
    if (tcg === "Digimon Card Game 2020") {
      return ["digimon", "tamer", "option"];
    }
    // Default for Dragon Ball Super and other TCGs
    return ["leader", "battle", "extra"];
  };
  
  const cardTypes = getCardTypesForTCG(currentTCG);
  const rarities = Array.from(new Set(tcgCards.map((card) => card.rarity)));

  const filteredCards = tcgCards.filter((card) => {
    const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || card.type === filterType;
    const matchesRarity = filterRarity === "all" || card.rarity === filterRarity;
    return matchesSearch && matchesType && matchesRarity;
  });

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
      clearFilters();
    };

    window.addEventListener('tcgChanged', handleTCGChange as EventListener);
    
    return () => {
      window.removeEventListener('tcgChanged', handleTCGChange as EventListener);
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search cards..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 md:flex gap-2">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger>
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {cardTypes.map((type) => (
                <SelectItem key={type} value={type} className="capitalize">
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterRarity} onValueChange={setFilterRarity}>
            <SelectTrigger>
              <SelectValue placeholder="All Rarities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Rarities</SelectItem>
              {rarities.map((rarity) => (
                <SelectItem key={rarity} value={rarity} className="capitalize">
                  {rarity}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <CardGrid 
        filteredCards={filteredCards} 
        onCardClick={() => {}} 
        clearFilters={clearFilters} 
        showCondition={false}
      />
    </div>
  );
};

export default CardBrowser;
