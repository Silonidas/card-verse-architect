
import React, { useState } from "react";
import { sampleCards } from "@/data/sampleCards";
import CardItem from "./CardItem";
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
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Collection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterRarity, setFilterRarity] = useState("");

  const filteredCards = sampleCards.filter((card) => {
    const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "" || card.type === filterType;
    const matchesRarity = filterRarity === "" || card.rarity === filterRarity;
    return matchesSearch && matchesType && matchesRarity;
  });

  const totalCards = sampleCards.reduce((sum, card) => sum + card.quantity, 0);
  const uniqueCards = sampleCards.length;
  const estimatedValue = sampleCards.reduce(
    (sum, card) => sum + (card.price || 0) * card.quantity,
    0
  );

  const cardTypes = Array.from(new Set(sampleCards.map((card) => card.type)));
  const rarities = Array.from(new Set(sampleCards.map((card) => card.rarity)));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Cards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCards}</div>
            <p className="text-xs text-muted-foreground">
              {uniqueCards} unique cards
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Collection Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${estimatedValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Estimated market value
            </p>
          </CardContent>
        </Card>
        <Card>
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
                {rarity}: {sampleCards.filter(c => c.rarity === rarity).reduce((sum, card) => sum + card.quantity, 0)}
              </Badge>
            ))}
          </CardContent>
        </Card>
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
        <div className="flex gap-2">
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
        </div>
      </div>

      {filteredCards.length > 0 ? (
        <div className="card-grid">
          {filteredCards.map((card) => (
            <CardItem key={card.id} card={card} />
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
    </div>
  );
};

export default Collection;
