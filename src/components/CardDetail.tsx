
import React from "react";
import { Card as CardType } from "../types";
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

interface CardDetailProps {
  card: CardType | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToDeck?: () => void;
}

const CardDetail: React.FC<CardDetailProps> = ({
  card,
  isOpen,
  onClose,
  onAddToDeck,
}) => {
  if (!card) return null;

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
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-sm">Quantity:</span>
                  <div className="flex items-center space-x-2">
                    <Button size="icon" variant="outline" className="h-7 w-7">
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span>{card.quantity}</span>
                    <Button size="icon" variant="outline" className="h-7 w-7">
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-muted-foreground text-sm">Price:</span>
                  <span className="text-lg font-bold text-tcg-teal">
                    ${card.price?.toFixed(2) || "N/A"}
                  </span>
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
