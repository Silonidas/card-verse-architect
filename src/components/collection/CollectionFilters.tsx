
import React from "react";
import { Input } from "@/components/ui/input";
import { Search, Star } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface CollectionFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filterType: string;
  setFilterType: (value: string) => void;
  filterRarity: string;
  setFilterRarity: (value: string) => void;
  cardTypes: string[];
  rarities: string[];
  showFavorites?: boolean;
  setShowFavorites?: (value: boolean) => void;
}

const CollectionFilters: React.FC<CollectionFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType,
  filterRarity,
  setFilterRarity,
  cardTypes,
  rarities,
  showFavorites = false,
  setShowFavorites
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="relative flex-grow">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search cards..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="flex flex-wrap gap-2 items-center">
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[150px]">
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
          <SelectTrigger className="w-[150px]">
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
        
        {setShowFavorites && (
          <div className="flex items-center space-x-2">
            <Switch 
              id="favorites" 
              checked={showFavorites}
              onCheckedChange={setShowFavorites}
            />
            <Label htmlFor="favorites" className="flex items-center cursor-pointer">
              <Star className={`mr-1 ${showFavorites ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`} size={16} />
              Favorites
            </Label>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionFilters;
