import React, { useState, useEffect } from "react";
import { Card as CardType, Deck } from "@/types";
import { sampleCards, sampleDecks } from "@/data/sampleCards";
import DragDropCard from "./DragDropCard";
import CardDetail from "./CardDetail";
import DeckDropZone from "./DeckDropZone";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, BookOpen, Grid, List, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const DeckBuilder = () => {
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const [isCardDetailOpen, setIsCardDetailOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeDeck, setActiveDeck] = useState<Deck | null>(null);
  const [isCreateDeckOpen, setIsCreateDeckOpen] = useState(false);
  const [deckCards, setDeckCards] = useState<CardType[]>([]);
  const [cardDetailContext, setCardDetailContext] = useState<'browse' | 'deck' | 'collection'>('browse');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
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
        setDeckCards(prev => prev.map(c => c.id === card.id ? {
          ...c,
          quantity: c.quantity + 1
        } : c));
        toast({
          title: "Card added to deck",
          description: `${card.name}: ${existingCard.quantity + 1} copies in deck`
        });
      } else {
        const newCard = {
          ...card,
          quantity: 1
        };
        setDeckCards(prev => [...prev, newCard]);
        toast({
          title: "Card added to deck",
          description: `${card.name} added to deck`
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
      setDeckCards(prev => prev.map(c => c.id === cardToRemove.id ? {
        ...c,
        quantity: c.quantity - 1
      } : c));
      toast({
        title: "Card removed from deck",
        description: `${cardToRemove.name}: ${existingCard.quantity - 1} copies in deck`
      });
    } else {
      setDeckCards(prev => prev.filter(c => c.id !== cardToRemove.id));
      toast({
        title: "Card removed from deck",
        description: `${cardToRemove.name} removed from deck`
      });
    }
  };
  const handleAddToDeck = () => {
    if (!selectedCard) return;
    handleCardDrop(selectedCard, 'browse');
    closeCardDetail();
  };
  const filteredCards = sampleCards.filter(card => card.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const groupedCardsByType = deckCards.reduce((acc, card) => {
    const type = card.type;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(card);
    return acc;
  }, {} as Record<string, CardType[]>);

  // Prepare chart data - Fixed memory curve with proper data calculation
  const memoryCurveData = [
    { cost: '0', count: deckCards.filter(c => {
      const cost = parseInt(c.manaCost || '0');
      return cost === 0;
    }).reduce((sum, card) => sum + (card.quantity || 1), 0) },
    { cost: '1', count: deckCards.filter(c => {
      const cost = parseInt(c.manaCost || '0');
      return cost === 1;
    }).reduce((sum, card) => sum + (card.quantity || 1), 0) },
    { cost: '2', count: deckCards.filter(c => {
      const cost = parseInt(c.manaCost || '0');
      return cost === 2;
    }).reduce((sum, card) => sum + (card.quantity || 1), 0) },
    { cost: '3', count: deckCards.filter(c => {
      const cost = parseInt(c.manaCost || '0');
      return cost === 3;
    }).reduce((sum, card) => sum + (card.quantity || 1), 0) },
    { cost: '4', count: deckCards.filter(c => {
      const cost = parseInt(c.manaCost || '0');
      return cost === 4;
    }).reduce((sum, card) => sum + (card.quantity || 1), 0) },
    { cost: '5', count: deckCards.filter(c => {
      const cost = parseInt(c.manaCost || '0');
      return cost === 5;
    }).reduce((sum, card) => sum + (card.quantity || 1), 0) },
    { cost: '6+', count: deckCards.filter(c => {
      const cost = parseInt(c.manaCost || '0');
      return cost >= 6;
    }).reduce((sum, card) => sum + (card.quantity || 1), 0) },
  ];

  const colorData = [
    { name: 'Red', value: deckCards.filter(c => c.name.includes('Red') || c.type === 'digimon').reduce((sum, card) => sum + card.quantity, 0), color: '#ef4444' },
    { name: 'Blue', value: deckCards.filter(c => c.name.includes('Blue') || c.type === 'tamer').reduce((sum, card) => sum + card.quantity, 0), color: '#3b82f6' },
    { name: 'Green', value: deckCards.filter(c => c.name.includes('Green') || c.type === 'option').reduce((sum, card) => sum + card.quantity, 0), color: '#22c55e' },
    { name: 'Yellow', value: deckCards.filter(c => c.name.includes('Yellow')).reduce((sum, card) => sum + card.quantity, 0), color: '#eab308' },
    { name: 'Purple', value: deckCards.filter(c => c.name.includes('Purple')).reduce((sum, card) => sum + card.quantity, 0), color: '#a855f7' },
  ].filter(item => item.value > 0);

  // Updated DP data instead of rarity
  const dpData = [
    { name: '0-2000', value: deckCards.filter(c => {
      const power = parseInt(c.power || '0');
      return power >= 0 && power <= 2000;
    }).reduce((sum, card) => sum + card.quantity, 0), color: '#94a3b8' },
    { name: '3000-5000', value: deckCards.filter(c => {
      const power = parseInt(c.power || '0');
      return power >= 3000 && power <= 5000;
    }).reduce((sum, card) => sum + card.quantity, 0), color: '#22c55e' },
    { name: '6000-8000', value: deckCards.filter(c => {
      const power = parseInt(c.power || '0');
      return power >= 6000 && power <= 8000;
    }).reduce((sum, card) => sum + card.quantity, 0), color: '#3b82f6' },
    { name: '9000+', value: deckCards.filter(c => {
      const power = parseInt(c.power || '0');
      return power >= 9000;
    }).reduce((sum, card) => sum + card.quantity, 0), color: '#a855f7' },
  ].filter(item => item.value > 0);

  const typeData = Object.entries(groupedCardsByType).map(([type, cards]) => ({
    name: type.charAt(0).toUpperCase() + type.slice(1),
    value: cards.reduce((sum, card) => sum + card.quantity, 0),
    color: type === 'digimon' ? '#3b82f6' : type === 'tamer' ? '#f97316' : '#ef4444'
  }));

  const chartConfig = {
    count: { label: "Count", color: "hsl(var(--chart-1))" },
    value: { label: "Value", color: "hsl(var(--chart-2))" }
  };

  // Helper function to get card color based on type/name
  const getCardColor = (card: CardType) => {
    if (card.name.toLowerCase().includes('red') || card.type === 'digimon') return '#ef4444';
    if (card.name.toLowerCase().includes('blue') || card.type === 'tamer') return '#3b82f6';
    if (card.name.toLowerCase().includes('green') || card.type === 'option') return '#22c55e';
    if (card.name.toLowerCase().includes('yellow')) return '#eab308';
    if (card.name.toLowerCase().includes('purple')) return '#a855f7';
    return '#64748b'; // default gray
  };

  const totalCards = deckCards.reduce((sum, card) => sum + card.quantity, 0);

  return (
    <DeckDropZone onCardDrop={handleCardDrop}>
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
          // Main Deck Builder View
          <div className="flex min-h-screen">
            {/* Left Sidebar - Card Catalog */}
            <div className="flex-1 flex flex-col">
              {/* Search and Filters Header */}
              <div className="flex items-center gap-4 p-4 border-b bg-card">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search..." 
                    className="pl-10" 
                    value={searchTerm} 
                    onChange={e => setSearchTerm(e.target.value)} 
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <div className="text-sm text-muted-foreground">
                  1867 cards
                </div>
              </div>

              {/* View Controls */}
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-2">
                  <span className="text-sm">View</span>
                  <div className="flex rounded border">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className="rounded-r-none px-3"
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className="rounded-l-none px-3"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Button variant="outline" onClick={() => setActiveDeck(null)}>
                  Back to Decks
                </Button>
              </div>

              {/* Cards Display */}
              <div className="flex-1 p-4 overflow-auto bg-background">
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                    {filteredCards.map(card => (
                      <div key={card.id} className="relative">
                        <DragDropCard 
                          card={card} 
                          onClick={() => handleCardClick(card, 'browse')} 
                          isDraggable={true} 
                          isInDeck={false} 
                          compact={false}
                        />
                        {/* Add to deck button */}
                        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                          <div className="bg-black/70 rounded px-1 text-xs text-white">
                            0 / 4
                          </div>
                          <Button size="sm" variant="secondary" className="h-6 w-6 p-0">
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-1">
                    {filteredCards.map(card => (
                      <div 
                        key={card.id}
                        className="flex items-center gap-3 p-2 hover:bg-muted rounded cursor-pointer border"
                        onClick={() => handleCardClick(card, 'browse')}
                      >
                        <img 
                          src={card.imageUrl} 
                          alt={card.name}
                          className="w-12 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <div className="font-medium">{card.name}</div>
                          <div className="text-sm text-muted-foreground">{card.set}</div>
                        </div>
                        <div className="text-sm font-medium">{card.manaCost || '0'}</div>
                        <div className="text-sm text-muted-foreground">0/4</div>
                        <Button size="sm" variant="outline" className="h-6 w-6 p-0">
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Sidebar - Deck Construction */}
            <div className="w-80 bg-card border-l flex flex-col">
              {/* Deck Header */}
              <div className="p-4 border-b">
                <div className="text-center mb-4">
                  <div className="text-lg font-bold">Unsaved deck</div>
                  <div className="text-sm text-muted-foreground">{totalCards} cards</div>
                </div>
                
                {/* Collection Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-500">0.0%</div>
                    <div className="text-xs text-muted-foreground">Collection</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-muted-foreground">Missing</div>
                    <div className="text-xs text-muted-foreground">{filteredCards.length} cards</div>
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-2">
                  <div className="w-3 h-3 bg-muted rounded-full"></div>
                  <span className="text-sm">Highlight</span>
                </div>
              </div>

              {/* Deck Navigation */}
              <div className="p-4 border-b">
                <div className="flex gap-2 mb-2">
                  <Button variant="outline" size="sm" className="flex-1">Menu</Button>
                  <Button variant="default" size="sm" className="flex-1">Cards</Button>
                  <Button variant="outline" size="sm" className="flex-1">Info</Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">Layout</Button>
                  <Button variant="outline" size="sm" className="flex-1">Group by</Button>
                  <Button variant="outline" size="sm" className="flex-1">Sort by</Button>
                  <Button variant="outline" size="sm" className="flex-1">View</Button>
                </div>
              </div>

              {/* Deck List */}
              <div className="flex-1 overflow-auto">
                <div className="p-4">
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    Characters 
                    <Badge variant="secondary" className="bg-orange-500 text-white">{deckCards.length}</Badge>
                  </h3>
                  
                  <div className="space-y-1">
                    {deckCards.map(card => (
                      <div 
                        key={card.id}
                        className="flex items-center gap-2 p-2 rounded hover:bg-muted cursor-pointer border-l-4"
                        style={{ borderLeftColor: getCardColor(card) }}
                        onClick={() => handleCardClick(card, 'deck')}
                      >
                        <div 
                          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                          style={{ backgroundColor: getCardColor(card) }}
                        >
                          {card.manaCost || '0'}
                        </div>
                        <div className="flex-1 text-sm truncate">{card.name}</div>
                        <div className="text-xs bg-green-500 text-white px-1 rounded">
                          Search
                        </div>
                        <div className="text-xs bg-orange-500 text-white px-1 rounded font-medium">
                          {card.quantity} / 4
                        </div>
                        <div className="text-xs bg-orange-500 text-white px-1 rounded">
                          {card.manaCost || '0'}
                        </div>
                      </div>
                    ))}
                  </div>

                  {deckCards.length === 0 && (
                    <div className="text-center text-muted-foreground text-sm py-8">
                      No cards in deck. Drag cards here to add them.
                    </div>
                  )}
                </div>

                {/* Memory Curve Chart */}
                {deckCards.length > 0 && (
                  <div className="p-4 border-t">
                    <h4 className="font-medium mb-2">Memory Curve</h4>
                    <ChartContainer config={chartConfig} className="h-24 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={memoryCurveData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                          <XAxis 
                            dataKey="cost" 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 10 }}
                          />
                          <YAxis 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 10 }}
                          />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="count" fill="hsl(var(--chart-1))" radius={[1, 1, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                )}
              </div>
            </div>
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
