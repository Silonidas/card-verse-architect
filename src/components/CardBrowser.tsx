
import React, { useState, useEffect } from "react";
import { sampleCards } from "@/data/sampleCards";
import CardItem from "./CardItem";
import CardDetail from "./CardDetail";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Database } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/types";
import { fetchAllDigimon } from "@/services/digimonApi";
import { toast } from "@/hooks/use-toast";

const CardBrowser = () => {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [isCardDetailOpen, setIsCardDetailOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterRarity, setFilterRarity] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [dataSource, setDataSource] = useState<"sample" | "digimon">("sample");
  const [allCards, setAllCards] = useState<Card[]>(sampleCards);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (dataSource === "sample") {
      setAllCards(sampleCards);
    }
  }, [dataSource]);

  const handleFetchDigimon = async () => {
    setLoading(true);
    try {
      const digimonCards = await fetchAllDigimon();
      setAllCards(digimonCards);
      setDataSource("digimon");
      toast({
        title: "Success",
        description: `Loaded ${digimonCards.length} Digimon cards`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load Digimon cards",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (card: Card) => {
    setSelectedCard(card);
    setIsCardDetailOpen(true);
  };

  const closeCardDetail = () => {
    setIsCardDetailOpen(false);
  };

  let filteredCards = allCards.filter((card) => {
    const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || card.type === filterType;
    const matchesRarity = filterRarity === "all" || card.rarity === filterRarity;
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

  const cardTypes = Array.from(new Set(allCards.map((card) => card.type)));
  const rarities = Array.from(new Set(allCards.map((card) => card.rarity)));

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
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={handleFetchDigimon}
            disabled={loading}
          >
            <Database className="h-4 w-4" />
            {loading ? "Loading..." : "Load Digimon Cards"}
          </Button>
          {dataSource === "digimon" && (
            <Button
              variant="outline"
              onClick={() => {
                setDataSource("sample");
                setFilterType("all");
                setFilterRarity("all");
              }}
            >
              Switch to Sample Cards
            </Button>
          )}
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

export default CardBrowser;
