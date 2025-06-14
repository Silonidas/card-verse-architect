import React, { useState, useEffect } from "react";
import { sampleCards } from "@/data/sampleCards";
import { Card, TCGType } from "@/types";
import DragDropCard from "./DragDropCard";
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
import { Button } from "./ui/button";

const CardBrowser = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterRarity, setFilterRarity] = useState("all");
  const [currentTCG, setCurrentTCG] = useState<TCGType>("Digimon Card Game 2020");
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [isCardDetailOpen, setIsCardDetailOpen] = useState(false);
  const [collectionCards, setCollectionCards] = useState<Card[]>([]);
  
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

    const existingCard = collectionCards.find(card => card.id === selectedCard.id);
    
    if (existingCard) {
      // If card exists, increment quantity
      const updatedCards = collectionCards.map(card =>
        card.id === selectedCard.id
          ? { ...card, quantity: card.quantity + 1 }
          : card
      );
      setCollectionCards(updatedCards);
      toast({
        title: "Card added",
        description: `${selectedCard.name}: ${existingCard.quantity + 1} in collection`,
      });
    } else {
      // If card doesn't exist, add it with quantity 1 and condition "near mint"
      const newCard = {
        ...selectedCard,
        quantity: 1,
        condition: "near mint" as const
      };
      setCollectionCards([...collectionCards, newCard]);
      toast({
        title: "Card added to collection",
        description: `${selectedCard.name} added to your collection`,
      });
    }
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

  if (filteredCards.length === 0) {
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

          <div className="text-center py-10">
            <p className="text-muted-foreground">No cards found matching your filters</p>
            <Button variant="link" onClick={clearFilters}>
              Clear filters
            </Button>
          </div>
        </div>
        
        <CardDetail
          card={selectedCard}
          isOpen={isCardDetailOpen}
          onClose={closeCardDetail}
          onAddToDeck={handleAddToCollection}
        />
      </>
    );
  }

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

        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {filteredCards.map((card) => (
            <DragDropCard
              key={card.id}
              card={card}
              onClick={() => handleCardClick(card)}
              isDraggable={true}
              isInDeck={false}
              showCondition={false}
            />
          ))}
        </div>
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
