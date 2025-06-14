
import React, { useState, useEffect } from "react";
import { Card as CardType, Deck } from "@/types";
import { sampleCards, sampleDecks } from "@/data/sampleCards";
import DragDropCard from "./DragDropCard";
import CardDetail from "./CardDetail";
import DeckDropZone from "./DeckDropZone";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, BookOpen } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

const DeckBuilder = () => {
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const [isCardDetailOpen, setIsCardDetailOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeDeck, setActiveDeck] = useState<Deck | null>(null);
  const [isCreateDeckOpen, setIsCreateDeckOpen] = useState(false);
  const [deckCards, setDeckCards] = useState<CardType[]>([]);
  const [cardDetailContext, setCardDetailContext] = useState<'browse' | 'deck' | 'collection'>('browse');

  React.useEffect(() => {
    if (activeDeck) {
      setDeckCards([...activeDeck.cards]);
    }
  }, [activeDeck]);

  const handleCardClick = (card: CardType, context: 'browse' | 'deck' | 'collection' = 'browse') => {
    setSelectedCard(card);
    setCardDetailContext(context);
    setIsCardDetailOpen(true);
  };

  const closeCardDetail = () => {
    setIsCardDetailOpen(false);
  };

  const handleDeckClick = (deck: Deck) => {
    setActiveDeck(deck);
  };

  const handleCardDrop = (card: CardType, source: 'browse' | 'deck') => {
    if (source === 'browse') {
      // Add card to deck
      const existingCard = deckCards.find(c => c.id === card.id);
      if (existingCard) {
        setDeckCards(prev => prev.map(c =>
          c.id === card.id ? { ...c, quantity: c.quantity + 1 } : c
        ));
        toast({
          title: "Card added to deck",
          description: `${card.name}: ${existingCard.quantity + 1} copies in deck`,
        });
      } else {
        const newCard = { ...card, quantity: 1 };
        setDeckCards(prev => [...prev, newCard]);
        toast({
          title: "Card added to deck",
          description: `${card.name} added to deck`,
        });
      }
    } else if (source === 'deck') {
      // Remove card from deck (when dragged from deck and dropped outside)
      handleRemoveFromDeck(card);
    }
  };

  const handleRemoveFromDeck = (cardToRemove: CardType) => {
    const existingCard = deckCards.find(c => c.id === cardToRemove.id);
    if (existingCard && existingCard.quantity > 1) {
      setDeckCards(prev => prev.map(c =>
        c.id === cardToRemove.id ? { ...c, quantity: c.quantity - 1 } : c
      ));
      toast({
        title: "Card removed from deck",
        description: `${cardToRemove.name}: ${existingCard.quantity - 1} copies in deck`,
      });
    } else {
      setDeckCards(prev => prev.filter(c => c.id !== cardToRemove.id));
      toast({
        title: "Card removed from deck",
        description: `${cardToRemove.name} removed from deck`,
      });
    }
  };

  const handleAddToDeck = () => {
    if (!selectedCard) return;
    handleCardDrop(selectedCard, 'browse');
    closeCardDetail();
  };

  const filteredCards = sampleCards.filter((card) =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedCardsByType = deckCards.reduce((acc, card) => {
    const type = card.type;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(card);
    return acc;
  }, {} as Record<string, CardType[]>);

  return (
    <DeckDropZone onCardDrop={handleCardDrop}>
      <div className="space-y-6">
        {!activeDeck ? (
          <>
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold">My Decks</h2>
              <Dialog open={isCreateDeckOpen} onOpenChange={setIsCreateDeckOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> New Deck
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Deck</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-2">
                    <div className="space-y-2">
                      <label htmlFor="name">Deck Name</label>
                      <Input id="name" placeholder="Enter deck name" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="format">Format</label>
                      <Input id="format" placeholder="Standard, Modern, etc." />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="description">Description (optional)</label>
                      <Input id="description" placeholder="Describe your deck" />
                    </div>
                    <Button className="w-full">Create Deck</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sampleDecks.map((deck) => (
                <Card
                  key={deck.id}
                  className="cursor-pointer overflow-hidden"
                  onClick={() => handleDeckClick(deck)}
                >
                  <div className="aspect-video w-full overflow-hidden bg-muted">
                    {deck.coverCard && (
                      <img
                        src={sampleCards.find((c) => c.id === deck.coverCard)?.imageUrl}
                        alt={deck.name}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle>{deck.name}</CardTitle>
                    <CardDescription>{deck.format}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {deck.description}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <BookOpen className="mr-1 h-4 w-4" />
                      {deck.cards.length} cards
                    </div>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between">
              <div>
                <h2 className="text-2xl font-bold">{activeDeck.name}</h2>
                <p className="text-muted-foreground">
                  {activeDeck.format} • {deckCards.length} cards
                </p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setActiveDeck(null)}
                >
                  Back to Decks
                </Button>
                <Button>Save Deck</Button>
              </div>
            </div>

            <Tabs defaultValue="deck" className="w-full">
              <TabsList>
                <TabsTrigger value="deck">Deck Content</TabsTrigger>
                <TabsTrigger value="add">Add Cards</TabsTrigger>
              </TabsList>
              <TabsContent value="deck" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Mana Curve
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[100px] flex items-end justify-around">
                        {[1, 2, 3, 4, 5, 6].map((cost) => (
                          <div key={cost} className="flex flex-col items-center">
                            <div
                              className="w-6 bg-primary rounded-t"
                              style={{
                                height: `${Math.random() * 80 + 10}px`,
                              }}
                            ></div>
                            <span className="text-xs mt-1">{cost}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Card Types
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(groupedCardsByType).map(([type, cards]) => (
                          <Badge key={type} variant="outline" className="capitalize">
                            {type}: {cards.length}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Rarities
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                      {Array.from(
                        new Set(deckCards.map((c) => c.rarity))
                      ).map((rarity) => (
                        <Badge key={rarity} variant="outline" className="capitalize">
                          {rarity}:{" "}
                          {
                            deckCards.filter((c) => c.rarity === rarity)
                              .length
                          }
                        </Badge>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                <div>
                  {Object.entries(groupedCardsByType).map(([type, cards]) => (
                    <div key={type} className="mb-6">
                      <h3 className="font-bold text-lg mb-2 capitalize">{type} ({cards.length})</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {cards.map((card) => (
                          <DragDropCard
                            key={card.id}
                            card={card}
                            onClick={() => handleCardClick(card, 'deck')}
                            isDraggable={true}
                            isInDeck={true}
                            compact={true}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="add" className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="relative flex-grow">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search cards to add..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="card-grid">
                  {filteredCards.map((card) => (
                    <DragDropCard
                      key={card.id}
                      card={card}
                      onClick={() => handleCardClick(card, 'deck')}
                      isDraggable={true}
                      isInDeck={false}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        <CardDetail
          card={selectedCard}
          isOpen={isCardDetailOpen}
          onClose={closeCardDetail}
          onAddToDeck={handleAddToDeck}
          context={cardDetailContext}
        />
      </div>
    </DeckDropZone>
  );
};

export default DeckBuilder;
