import React, { useState, useEffect } from "react";
import { Card as CardType, Deck } from "@/types";
import { sampleCards, sampleDecks } from "@/data/sampleCards";
import DragDropCard from "./DragDropCard";
import CardDetail from "./CardDetail";
import DeckDropZone from "./DeckDropZone";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, BookOpen } from "lucide-react";
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

  return <DeckDropZone onCardDrop={handleCardDrop}>
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
              {sampleDecks.map(deck => <Card key={deck.id} className="cursor-pointer overflow-hidden" onClick={() => handleDeckClick(deck)}>
                  <div className="aspect-video w-full overflow-hidden bg-muted">
                    {deck.coverCard && <img src={sampleCards.find(c => c.id === deck.coverCard)?.imageUrl} alt={deck.name} className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" />}
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
                </Card>)}
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
                <Button variant="outline" onClick={() => setActiveDeck(null)}>
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Memory Curve</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer config={chartConfig} className="h-[180px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={memoryCurveData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
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
                            <Bar dataKey="count" fill="hsl(var(--chart-1))" radius={[2, 2, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Colors</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer config={chartConfig} className="h-[180px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={colorData}
                              cx="50%"
                              cy="50%"
                              innerRadius={25}
                              outerRadius={70}
                              dataKey="value"
                            >
                              {colorData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <ChartTooltip content={<ChartTooltipContent />} />
                          </PieChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">DP Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer config={chartConfig} className="h-[180px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={dpData}
                              cx="50%"
                              cy="50%"
                              innerRadius={25}
                              outerRadius={70}
                              dataKey="value"
                            >
                              {dpData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <ChartTooltip content={<ChartTooltipContent />} />
                          </PieChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Card Types</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer config={chartConfig} className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={typeData}
                              cx="50%"
                              cy="50%"
                              innerRadius={30}
                              outerRadius={80}
                              dataKey="value"
                            >
                              {typeData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <ChartTooltip content={<ChartTooltipContent />} />
                          </PieChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  {Object.entries(groupedCardsByType).map(([type, cards]) => (
                    <div key={type} className="mb-6">
                      <h3 className="font-bold text-lg mb-2 capitalize">{type} ({cards.length})</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {cards.map(card => (
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
                    <Input placeholder="Search cards to add..." className="pl-8" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                  </div>
                </div>

                <div className="card-grid">
                  {filteredCards.map(card => <DragDropCard key={card.id} card={card} onClick={() => handleCardClick(card, 'deck')} isDraggable={true} isInDeck={false} />)}
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
    </DeckDropZone>;
};

export default DeckBuilder;
