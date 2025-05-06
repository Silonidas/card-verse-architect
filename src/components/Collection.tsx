
import React, { useState, useEffect } from "react";
import { sampleCards } from "@/data/sampleCards";
import CardItem from "./CardItem";
import CardDetail from "./CardDetail";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card as CardUI, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Card, TCGType } from "@/types";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const Collection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterRarity, setFilterRarity] = useState("all");
  const [allCards] = useState<Card[]>(sampleCards);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [isCardDetailOpen, setIsCardDetailOpen] = useState(false);
  const [currentTCG, setCurrentTCG] = useState<TCGType>("Digimon Card Game 2020");

  // Listen for TCG changes from Layout component
  useEffect(() => {
    const handleTCGChange = (event: Event) => {
      const customEvent = event as CustomEvent<TCGType>;
      setCurrentTCG(customEvent.detail);
    };

    window.addEventListener('tcgChanged', handleTCGChange as EventListener);
    
    return () => {
      window.removeEventListener('tcgChanged', handleTCGChange as EventListener);
    };
  }, []);

  const handleCardClick = (card: Card) => {
    setSelectedCard(card);
    setIsCardDetailOpen(true);
  };

  const closeCardDetail = () => {
    setIsCardDetailOpen(false);
  };

  // Filter cards based on the selected TCG
  const tcgFilteredCards = allCards.filter(card => card.tcg === currentTCG);

  const filteredCards = tcgFilteredCards.filter((card) => {
    const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || card.type === filterType;
    const matchesRarity = filterRarity === "all" || card.rarity === filterRarity;
    return matchesSearch && matchesType && matchesRarity;
  });

  const totalCards = tcgFilteredCards.reduce((sum, card) => sum + card.quantity, 0);
  const uniqueCards = tcgFilteredCards.length;
  const estimatedValue = tcgFilteredCards.reduce(
    (sum, card) => sum + (card.price || 0) * card.quantity,
    0
  );

  const cardTypes = Array.from(new Set(tcgFilteredCards.map((card) => card.type)));
  const rarities = Array.from(new Set(tcgFilteredCards.map((card) => card.rarity)));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CardUI>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Cards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCards}</div>
            <p className="text-xs text-muted-foreground">
              {uniqueCards} unique cards
            </p>
          </CardContent>
        </CardUI>
        <CardUI>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Collection Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${estimatedValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Estimated market value
            </p>
          </CardContent>
        </CardUI>
        <CardUI>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Rarity Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {rarities.map((rarity) => (
              <Badge
                key={rarity}
                variant="outline"
                className="capitalize"
              >
                {rarity}: {tcgFilteredCards.filter(c => c.rarity === rarity).reduce((sum, card) => sum + card.quantity, 0)}
              </Badge>
            ))}
          </CardContent>
        </CardUI>
      </div>

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
        <div className="flex gap-2 flex-wrap">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Card Type" />
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
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Rarity" />
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

      {filteredCards.length > 0 ? (
        <div className="card-grid">
          {filteredCards.map((card) => (
            <CardItem key={card.id} card={card} onClick={() => handleCardClick(card)} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No cards found matching your filters</p>
          <Button
            variant="link"
            onClick={() => {
              setSearchTerm("");
              setFilterType("all");
              setFilterRarity("all");
            }}
          >
            Clear filters
          </Button>
        </div>
      )}

      <CardDetail
        card={selectedCard}
        isOpen={isCardDetailOpen}
        onClose={closeCardDetail}
      />
    </div>
  );
};

export default Collection;
