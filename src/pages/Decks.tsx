
import React from "react";
import Layout from "@/components/Layout";
import DeckBuilder from "@/components/DeckBuilder";

const Decks = () => {
  return (
    <Layout>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Deck Builder</h1>
        <p className="text-muted-foreground">
          Create and manage your custom card decks
        </p>
        <DeckBuilder />
      </div>
    </Layout>
  );
};

export default Decks;
