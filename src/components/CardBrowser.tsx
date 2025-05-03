
import React, { useState } from "react";
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
import { Card, CardType } from "@/types";

const CardBrowser = () => {
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const [isCardDetailOpen, setIsCardDetailOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterRarity, setFilterRarity] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const handleCardClick = (card: CardType) => {
    setSelectedCard(card);
    setIsCardDetailOpen(true);
  };

  const closeCardDetail = () => {
    setIsCardDetailOpen(false);
  };

  let filteredCards = sampleCards.filter((card) => {
    const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "" || card.type === filterType;
    const matchesRarity = filterRarity === "" || card.rarity === filterRarity;
    return matchesSearch && matchesType && matchesRarity;
  });

  // Sort cards
  filteredCards = [...filteredCards].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "price":
        return (b.price || 0) - (a.price || 0);
      case "rarity":
        return a.rarity.localeCompare(b.rarity);
      default:
        return 0;
    }
  });

  const cardTypes = Array.from(new Set(sampleCards.map((card) => card.type)));
  const rarities = Array.from(new Set(sampleCards.map((card) => card.rarity)));

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
        <div className="flex flex-wrap gap-2">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Card Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Types</SelectItem>
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
              <SelectItem value="">All Rarities</SelectItem>
              {rarities.map((rarity) => (
                <SelectItem key={rarity} value={rarity} className="capitalize">
                  {rarity}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="rarity">Rarity</SelectItem>
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
              setFilterType("");
              setFilterRarity("");
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

export default CardBrowser;
