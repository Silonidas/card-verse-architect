
import React, { useState, useEffect } from "react";
import { sampleCards } from "@/data/sampleCards";
import { Card, TCGType } from "@/types";
import CardGrid from "./collection/CardGrid";
import CardDetail from "./CardDetail";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "@/hooks/use-toast";

const CardBrowser = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterRarity, setFilterRarity] = useState("all");
  const [currentTCG, setCurrentTCG] = useState<TCGType>("Digimon Card Game 2020");
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [isCardDetailOpen, setIsCardDetailOpen] = useState(false);
  // State for managing user's collection
  const [userCollection, setUserCollection] = useState<Card[]>([]);
  
  // Filter cards based on the current TCG first
  const tcgCards = sampleCards.filter(card => card.tcg === currentTCG);
  
  // Use the dynamic card types from the data
  const cardTypes = ["digimon", "tamer", "option"];
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

  const handleCardClick = (card: Card) => {
    setSelectedCard(card);
    setIsCardDetailOpen(true);
  };

  const closeCardDetail = () => {
    setIsCardDetailOpen(false);
  };

  const handleAddToCollection = () => {
    if (!selectedCard) return;

    // Check if card already exists in collection
    const existingCardIndex = userCollection.findIndex(card => card.id === selectedCard.id);
    
    if (existingCardIndex >= 0) {
      // Update quantity if card exists
      const updatedCollection = [...userCollection];
      updatedCollection[existingCardIndex] = {
        ...updatedCollection[existingCardIndex],
        quantity: updatedCollection[existingCardIndex].quantity + 1
      };
      setUserCollection(updatedCollection);
    } else {
      // Add new card to collection
      const newCard = {
        ...selectedCard,
        quantity: 1,
        condition: "near mint" as const
      };
      setUserCollection([...userCollection, newCard]);
    }

    toast({
      title: "Card added to collection",
      description: `${selectedCard.name} has been added to your collection`,
    });
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
    <>
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
          onCardClick={handleCardClick} 
          clearFilters={clearFilters} 
          showCondition={false}
        />
      </div>
      
      <CardDetail
        card={selectedCard}
        isOpen={isCardDetailOpen}
        onClose={closeCardDetail}
        onAddToDeck={handleAddToCollection}
      />
    </>
  );
};

export default CardBrowser;
