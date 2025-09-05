import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCards } from "@/lib/api";
import { useCollection } from "@/contexts/CollectionContext";
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
import { Skeleton } from "./ui/skeleton";

const CardBrowser = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterRarity, setFilterRarity] = useState("all");
  const [currentTCG, setCurrentTCG] = useState<TCGType>("Digimon Card Game");
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [isCardDetailOpen, setIsCardDetailOpen] = useState(false);
  const { addToCollection } = useCollection();

  const { data: cards, isLoading, error } = useQuery<Card[]>({
    queryKey: ["cards"],
    queryFn: getCards,
  });

  // Filter cards based on the current TCG first
  const tcgCards = cards?.filter(card => card.tcg === currentTCG) || [];

  // Use the dynamic card types from the data
  const cardTypes = Array.from(new Set(tcgCards.map((card) => card.type)));
  const rarities = Array.from(new Set(tcgCards.map((card) => card.rarity)));

  const filteredCards = tcgCards.filter((card) => {
    const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || card.type.toLowerCase() === filterType;
    const matchesRarity = filterRarity === "all" || card.rarity.toLowerCase() === filterRarity;
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
    if (selectedCard) {
      addToCollection(selectedCard);
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

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <Skeleton className="h-10 w-full" />
          <div className="grid grid-cols-2 md:flex gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {[...Array(12)].map((_, i) => <Skeleton key={i} className="h-60" />)}
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error fetching cards: {error.message}</div>;
  }

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
                    <SelectItem key={type} value={type.toLowerCase()} className="capitalize">
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
                    <SelectItem key={rarity} value={rarity.toLowerCase()} className="capitalize">
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
          context="browse"
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
                  <SelectItem key={type} value={type.toLowerCase()} className="capitalize">
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
                  <SelectItem key={rarity} value={rarity.toLowerCase()} className="capitalize">
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
            />
          ))}
        </div>
      </div>
      
      <CardDetail
        card={selectedCard}
        isOpen={isCardDetailOpen}
        onClose={closeCardDetail}
        onAddToDeck={handleAddToCollection}
        context="browse"
      />
    </>
  );
};

export default CardBrowser;
