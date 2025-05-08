
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
  const [filterCondition, setFilterCondition] = useState("all");
  const [currentTCG, setCurrentTCG] = useState<TCGType>("Dragon Ball Super Card Game Fusion World");
  
  // Filter cards based on the current TCG first
  const tcgCards = sampleCards.filter(card => card.tcg === currentTCG);
  
  // Use the dynamic card types from the data but only display the specified ones in the UI
  const cardTypes = ["leader", "battle", "extra"];
  const rarities = Array.from(new Set(tcgCards.map((card) => card.rarity)));
  const conditions = Array.from(
    new Set(tcgCards.filter(card => card.condition).map((card) => card.condition))
  ) as string[];

  const filteredCards = tcgCards.filter((card) => {
    const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || card.type === filterType;
    const matchesRarity = filterRarity === "all" || card.rarity === filterRarity;
    const matchesCondition = filterCondition === "all" || card.condition === filterCondition;
    return matchesSearch && matchesType && matchesRarity && matchesCondition;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setFilterType("all");
    setFilterRarity("all");
    setFilterCondition("all");
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
          <Select value={filterCondition} onValueChange={setFilterCondition}>
            <SelectTrigger>
              <SelectValue placeholder="All Conditions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Conditions</SelectItem>
              {conditions.map((condition) => (
                <SelectItem key={condition} value={condition} className="capitalize">
                  {condition}
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
      />
    </div>
  );
};

export default CardBrowser;
