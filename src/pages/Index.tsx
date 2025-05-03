
import React from "react";
import { Link } from "react-router-dom";
import { sampleCards, sampleDecks } from "@/data/sampleCards";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { BookOpen, Search, Cards, LayoutGrid } from "lucide-react";
import CardItem from "@/components/CardItem";

const Index = () => {
  // Get a few recent cards
  const recentCards = sampleCards.slice(0, 4);
  
  // Calculate collection stats
  const totalCards = sampleCards.reduce((sum, card) => sum + card.quantity, 0);
  const totalDecks = sampleDecks.length;
  const collectionValue = sampleCards.reduce(
    (sum, card) => sum + (card.price || 0) * card.quantity,
    0
  );

  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">CardVerse Architect</h1>
          <p className="text-xl text-muted-foreground">
            Manage your card collection and build powerful decks
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Cards</CardTitle>
              <Cards className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCards}</div>
              <p className="text-xs text-muted-foreground">
                {sampleCards.length} unique cards
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Decks</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalDecks}</div>
              <p className="text-xs text-muted-foreground">
                Ready to play
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Collection Value</CardTitle>
              <LayoutGrid className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${collectionValue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                Estimated market value
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Most Valuable</CardTitle>
              <Search className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${Math.max(...sampleCards.map((card) => card.price || 0)).toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                Highest card price
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Recent Cards</h2>
            <Link to="/browse">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          <div className="card-grid">
            {recentCards.map((card) => (
              <Link key={card.id} to={`/browse?card=${card.id}`}>
                <CardItem card={card} />
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Quick Actions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/browse" className="no-underline">
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <Search className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Browse Cards</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Search and browse through all cards in your collection
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/decks" className="no-underline">
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <BookOpen className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Deck Builder</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Create and manage your custom card decks
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/collection" className="no-underline">
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <Cards className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Collection</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Manage your card collection and track card quantities
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
