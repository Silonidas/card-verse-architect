
import React, { useState } from "react";
import { Card as CardType, CardCondition } from "../types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface CardDetailProps {
  card: CardType | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToDeck?: () => void;
  onUpdateCard?: (updatedCard: CardType) => void;
}

const CardDetail: React.FC<CardDetailProps> = ({
  card,
  isOpen,
  onClose,
  onAddToDeck,
  onUpdateCard,
}) => {
  const [localCard, setLocalCard] = useState<CardType | null>(null);

  React.useEffect(() => {
    if (card) {
      setLocalCard({...card});
    }
  }, [card]);

  if (!card || !localCard) return null;

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-400";
      case "uncommon":
        return "bg-blue-400";
      case "rare":
        return "bg-tcg-purple";
      case "mythic":
        return "bg-orange-500";
      case "legendary":
        return "bg-yellow-400";
      default:
        return "bg-gray-400";
    }
  };

  const getConditionColor = (condition: CardCondition | undefined) => {
    switch (condition) {
      case "mint":
        return "text-green-500";
      case "near mint":
        return "text-emerald-400";
      case "excellent":
        return "text-blue-400";
      case "good":
        return "text-yellow-400";
      case "played":
        return "text-orange-400";
      case "poor":
        return "text-red-500";
      default:
        return "text-gray-400";
    }
  };

  const handleQuantityChange = (increment: boolean) => {
    const newQuantity = increment ? localCard.quantity + 1 : Math.max(0, localCard.quantity - 1);
    const updatedCard = { ...localCard, quantity: newQuantity };
    setLocalCard(updatedCard);
    
    if (onUpdateCard) {
      onUpdateCard(updatedCard);
      toast({
        title: increment ? "Card added" : "Card removed",
        description: `${updatedCard.name}: ${updatedCard.quantity} in collection`,
      });
    }
  };

  const handleConditionChange = (value: CardCondition) => {
    const updatedCard = { ...localCard, condition: value };
    setLocalCard(updatedCard);
    
    if (onUpdateCard) {
      onUpdateCard(updatedCard);
      toast({
        title: "Condition updated",
        description: `${updatedCard.name}: now marked as ${value}`,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>{card.name}</DialogTitle>
          <DialogDescription>
            {card.type} - {card.set}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <img
              src={card.imageUrl}
              alt={card.name}
              className="w-full object-cover rounded-lg"
            />
            <Badge
              className={`absolute top-2 right-2 ${getRarityColor(
                card.rarity
              )} text-white`}
            >
              {card.rarity}
            </Badge>
          </div>
          <div className="flex flex-col space-y-3">
            <div>
              <p className="text-sm font-medium mb-1">Card Information</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Type:</span>
                  <span className="capitalize">{card.type}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Set:</span>
                  <span>{card.set}</span>
                </div>
                {card.manaCost && (
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Mana Cost:</span>
                    <span>{card.manaCost}</span>
                  </div>
                )}
                {card.power && card.toughness && (
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">P/T:</span>
                    <span>
                      {card.power}/{card.toughness}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {card.description && (
              <div>
                <p className="text-sm font-medium mb-1">Card Text</p>
                <p className="text-sm whitespace-pre-line">{card.description}</p>
              </div>
            )}

            <div>
              <p className="text-sm font-medium mb-1">Collection Details</p>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-muted-foreground text-sm">Quantity:</span>
                    <div className="flex items-center space-x-2 mt-1">
                      <Button 
                        size="icon" 
                        variant="outline" 
                        className="h-7 w-7"
                        onClick={() => handleQuantityChange(false)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span>{localCard.quantity}</span>
                      <Button 
                        size="icon" 
                        variant="outline" 
                        className="h-7 w-7"
                        onClick={() => handleQuantityChange(true)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-muted-foreground text-sm">Price:</span>
                    <div className="text-lg font-bold text-tcg-teal">
                      ${card.price?.toFixed(2) || "N/A"}
                    </div>
                  </div>
                </div>
                
                <div>
                  <span className="text-muted-foreground text-sm">Condition:</span>
                  <div className="mt-1">
                    <Select 
                      value={localCard.condition || "played"} 
                      onValueChange={(value) => handleConditionChange(value as CardCondition)}
                    >
                      <SelectTrigger className={getConditionColor(localCard.condition)}>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mint" className="text-green-500">Mint</SelectItem>
                        <SelectItem value="near mint" className="text-emerald-400">Near Mint</SelectItem>
                        <SelectItem value="excellent" className="text-blue-400">Excellent</SelectItem>
                        <SelectItem value="good" className="text-yellow-400">Good</SelectItem>
                        <SelectItem value="played" className="text-orange-400">Played</SelectItem>
                        <SelectItem value="poor" className="text-red-500">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex space-x-2">
              {onAddToDeck && (
                <Button
                  onClick={onAddToDeck}
                  className="w-full bg-tcg-purple hover:bg-tcg-purple/90"
                >
                  Add to Deck
                </Button>
              )}
              <Button
                variant="outline"
                onClick={onClose}
                className="w-full"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CardDetail;
