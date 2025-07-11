import React, { useState, useEffect } from "react";
import { Card as CardType, Deck } from "@/types";
import { sampleCards, sampleDecks } from "@/data/sampleCards";
import DragDropCard from "./DragDropCard";
import CardDetail from "./CardDetail";
import DeckDropZone from "./DeckDropZone";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, BookOpen, Minus, Filter, Grid, List } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

const DeckBuilder = () => {
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const [isCardDetailOpen, setIsCardDetailOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeDeck, setActiveDeck] = useState<Deck | null>(null);
  const [isCreateDeckOpen, setIsCreateDeckOpen] = useState(false);
  const [deckCards, setDeckCards] = useState<{[key: string]: number}>({});
  const [cardDetailContext, setCardDetailContext] = useState<'browse' | 'deck' | 'collection'>('browse');
  const [deckViewMode, setDeckViewMode] = useState<'grid' | 'list'>('grid');
  
  // Form state for creating new deck
  const [newDeckName, setNewDeckName] = useState("");
  const [newDeckFormat, setNewDeckFormat] = useState("");
  const [newDeckDescription, setNewDeckDescription] = useState("");

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
    // Initialize deck cards from the deck
    const initialCards: {[key: string]: number} = {};
    deck.cards.forEach(card => {
      initialCards[card.id] = card.quantity || 1;
    });
    setDeckCards(initialCards);
  };

  const handleAddCard = (card: CardType) => {
    const currentCount = deckCards[card.id] || 0;
    if (currentCount < 4) {
      setDeckCards(prev => ({
        ...prev,
        [card.id]: currentCount + 1
      }));
      toast({
        title: "Card added to deck",
        description: `${card.name}: ${currentCount + 1} copies in deck`
      });
    }
  };

  const handleRemoveCard = (card: CardType) => {
    const currentCount = deckCards[card.id] || 0;
    if (currentCount > 0) {
      if (currentCount === 1) {
        const newDeckCards = { ...deckCards };
        delete newDeckCards[card.id];
        setDeckCards(newDeckCards);
      } else {
        setDeckCards(prev => ({
          ...prev,
          [card.id]: currentCount - 1
        }));
      }
      toast({
        title: "Card removed from deck",
        description: `${card.name}: ${Math.max(0, currentCount - 1)} copies in deck`
      });
    }
  };

  const handleCreateDeck = () => {
    if (!newDeckName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a deck name",
        variant: "destructive"
      });
      return;
    }

    const newDeck: Deck = {
      id: Date.now().toString(),
      name: newDeckName,
      format: newDeckFormat || "Standard",
      description: newDeckDescription,
      cards: []
    };

    setActiveDeck(newDeck);
    setDeckCards({});
    setIsCreateDeckOpen(false);
    
    // Reset form
    setNewDeckName("");
    setNewDeckFormat("");
    setNewDeckDescription("");

    toast({
      title: "Deck created!",
      description: `${newDeck.name} has been created successfully`
    });
  };

  const filteredCards = sampleCards.filter(card => 
    card.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper function to get card color based on type/name
  const getCardColor = (card: CardType) => {
    if (card.name.toLowerCase().includes('red') || card.type === 'digimon') return '#ef4444';
    if (card.name.toLowerCase().includes('blue') || card.type === 'tamer') return '#3b82f6';
    if (card.name.toLowerCase().includes('green') || card.type === 'option') return '#22c55e';
    if (card.name.toLowerCase().includes('yellow')) return '#eab308';
    if (card.name.toLowerCase().includes('purple')) return '#a855f7';
    return '#64748b'; // default gray
  };

  // Get deck cards with their quantities
  const getDeckCardsList = () => {
    return Object.entries(deckCards).map(([cardId, quantity]) => {
      const card = sampleCards.find(c => c.id === cardId);
      return card ? { ...card, quantity } : null;
    }).filter(Boolean) as (CardType & { quantity: number })[];
  };

  // Group deck cards by type
  const groupedDeckCards = getDeckCardsList().reduce((acc, card) => {
    const type = card.type;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(card);
    return acc;
  }, {} as Record<string, (CardType & { quantity: number })[]>);

  const totalCards = Object.values(deckCards).reduce((sum, count) => sum + count, 0);

  return (
    <DeckDropZone onCardDrop={() => {}}>
      <div className="min-h-screen bg-background">
        {!activeDeck ? (
          // Deck Selection View
          <>
            <div className="flex justify-between p-4 border-b">
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
                      <Input 
                        id="name" 
                        placeholder="Enter deck name" 
                        value={newDeckName}
                        onChange={e => setNewDeckName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="format">Format</label>
                      <Input 
                        id="format" 
                        placeholder="Standard, Modern, etc." 
                        value={newDeckFormat}
                        onChange={e => setNewDeckFormat(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="description">Description (optional)</label>
                      <Input 
                        id="description" 
                        placeholder="Describe your deck" 
                        value={newDeckDescription}
                        onChange={e => setNewDeckDescription(e.target.value)}
                      />
                    </div>
                    <Button className="w-full" onClick={handleCreateDeck}>Create Deck</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sampleDecks.map(deck => (
                <Card key={deck.id} className="cursor-pointer overflow-hidden" onClick={() => handleDeckClick(deck)}>
                  <div className="aspect-video w-full overflow-hidden bg-muted">
                    {deck.coverCard && (
                      <img 
                        src={sampleCards.find(c => c.id === deck.coverCard)?.imageUrl} 
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
                    <p className="text-sm text-muted-foreground">{deck.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <BookOpen className="mr-1 h-4 w-4" />
                      {deck.cards.length} cards
                    </div>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </>
        ) : (
          // Main Deck Builder View - Two Panel Layout
          <div className="flex min-h-screen">
            {/* Left Panel - Card Catalog */}
            <div className="flex-1 flex flex-col border-r">
              {/* Search Header */}
              <div className="flex items-center gap-4 p-4 border-b bg-card">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Suchen..." 
                    className="pl-10" 
                    value={searchTerm} 
                    onChange={e => setSearchTerm(e.target.value)} 
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>

              {/* Cards Grid */}
              <div className="flex-1 p-4 overflow-auto bg-background">
                <div className="grid grid-cols-5 gap-3">
                  {filteredCards.map(card => (
                    <div key={card.id} className="relative group">
                      <div 
                        className="relative bg-card rounded-lg overflow-hidden border cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() => handleCardClick(card, 'browse')}
                      >
                        {/* Card Image */}
                        <div className="aspect-[3/4] overflow-hidden">
                          <img 
                            src={card.imageUrl} 
                            alt={card.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Cost and Level badges in corners */}
                        <div className="absolute top-2 left-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                             style={{ backgroundColor: getCardColor(card) }}>
                          {card.manaCost || '0'}
                        </div>
                        
                        {card.level && (
                          <div className="absolute top-2 right-2 bg-black/70 rounded px-1 text-xs text-white">
                            Lv.{card.level}
                          </div>
                        )}

                        {/* Card counter and add/remove buttons */}
                        <div className="absolute bottom-2 left-2 right-2">
                          <div className="flex items-center justify-between">
                            {/* Counter */}
                            <div className="bg-black/70 rounded px-2 py-1 text-xs text-white font-medium">
                              {deckCards[card.id] || 0} / 4
                            </div>
                            
                            {/* Add/Remove buttons */}
                            <div className="flex gap-1">
                              {(deckCards[card.id] || 0) > 0 && (
                                <Button 
                                  size="sm" 
                                  variant="secondary" 
                                  className="h-6 w-6 p-0"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveCard(card);
                                  }}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                              )}
                              <Button 
                                size="sm" 
                                variant="secondary" 
                                className="h-6 w-6 p-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAddCard(card);
                                }}
                                disabled={(deckCards[card.id] || 0) >= 4}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Panel - Deck Construction */}
            <div className="w-80 flex flex-col bg-card">
              {/* Deck Header */}
              <div className="p-4 border-b">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">{activeDeck.name}</h3>
                  <Button variant="outline" size="sm" onClick={() => setActiveDeck(null)}>
                    ✕
                  </Button>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-muted-foreground">
                    Charaktere {Object.entries(deckCards).filter(([id]) => {
                      const card = sampleCards.find(c => c.id === id);
                      return card?.type === 'digimon';
                    }).reduce((sum, [, count]) => sum + count, 0)}
                  </div>
                  <div className="flex rounded border">
                    <Button
                      variant={deckViewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setDeckViewMode('grid')}
                      className="rounded-r-none px-2"
                    >
                      <Grid className="h-3 w-3" />
                    </Button>
                    <Button
                      variant={deckViewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setDeckViewMode('list')}
                      className="rounded-l-none px-2"
                    >
                      <List className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Deck Cards Display */}
              <div className="flex-1 overflow-auto p-4">
                {deckViewMode === 'grid' ? (
                  // Grid View
                  <div className="space-y-4">
                    {Object.entries(groupedDeckCards).map(([type, cards]) => (
                      <div key={type}>
                        <h4 className="font-medium text-sm text-muted-foreground mb-2 uppercase">
                          {type}
                        </h4>
                        <div className="grid grid-cols-4 gap-2">
                          {cards.map(card => (
                            <div key={card.id} className="relative group">
                              <div 
                                className="relative bg-card rounded-lg overflow-hidden border cursor-pointer hover:shadow-lg transition-shadow"
                                onClick={() => handleCardClick(card, 'deck')}
                              >
                                {/* Card Image */}
                                <div className="aspect-[3/4] overflow-hidden">
                                  <img 
                                    src={card.imageUrl} 
                                    alt={card.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>

                                {/* Cost and Level badges in corners */}
                                <div className="absolute top-1 left-1 w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold text-white"
                                     style={{ backgroundColor: getCardColor(card) }}>
                                  {card.manaCost || '0'}
                                </div>
                                
                                {card.level && (
                                  <div className="absolute top-1 right-1 bg-black/70 rounded px-1 text-xs text-white">
                                    {card.level}
                                  </div>
                                )}

                                {/* Quantity counter and controls */}
                                <div className="absolute bottom-1 left-1 right-1">
                                  <div className="flex items-center justify-between">
                                    <div className="bg-black/70 rounded px-1 text-xs text-white font-medium">
                                      {card.quantity}
                                    </div>
                                    <div className="flex gap-1">
                                      <Button 
                                        size="sm" 
                                        variant="secondary" 
                                        className="h-4 w-4 p-0"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleRemoveCard(card);
                                        }}
                                      >
                                        <Minus className="h-2 w-2" />
                                      </Button>
                                      <Button 
                                        size="sm" 
                                        variant="secondary" 
                                        className="h-4 w-4 p-0"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleAddCard(card);
                                        }}
                                        disabled={card.quantity >= 4}
                                      >
                                        <Plus className="h-2 w-2" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  // List View
                  <div className="space-y-4">
                    {Object.entries(groupedDeckCards).map(([type, cards]) => (
                      <div key={type}>
                        <h4 className="font-medium text-sm text-muted-foreground mb-2 uppercase">
                          {type}
                        </h4>
                        <div className="space-y-1">
                          {cards.map(card => (
                            <div 
                              key={card.id}
                              className="flex items-center gap-3 p-2 rounded hover:bg-muted cursor-pointer"
                              onClick={() => handleCardClick(card, 'deck')}
                            >
                              <img 
                                src={card.imageUrl} 
                                alt={card.name}
                                className="w-8 h-10 object-cover rounded"
                              />
                              <div className="flex-1">
                                <div className="font-medium text-sm">{card.name}</div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <span 
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: getCardColor(card) }}
                                  ></span>
                                  <span>Cost: {card.manaCost || '0'}</span>
                                  {card.level && <span>Lv.{card.level}</span>}
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="h-6 w-6 p-0"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveCard(card);
                                  }}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="text-sm font-medium w-8 text-center">
                                  {card.quantity}
                                </span>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="h-6 w-6 p-0"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddCard(card);
                                  }}
                                  disabled={card.quantity >= 4}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Deck Stats Footer */}
              <div className="p-4 border-t">
                <div className="text-sm">
                  <div className="flex justify-between">
                    <span>Total Cards:</span>
                    <span className="font-medium">{totalCards}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <CardDetail 
          card={selectedCard} 
          isOpen={isCardDetailOpen} 
          onClose={closeCardDetail} 
          onAddToDeck={() => selectedCard && handleAddCard(selectedCard)}
          context={cardDetailContext}
        />
      </div>
    </DeckDropZone>
  );
};

export default DeckBuilder;