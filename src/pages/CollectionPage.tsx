
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Collection from "@/components/Collection";
import { TCGType } from "@/types";

const CollectionPage = () => {
  const [currentTCG, setCurrentTCG] = useState<TCGType>("Dragon Ball Super Card Game Fusion World");

  // Listen for TCG changes from Layout component
  useEffect(() => {
    const handleTCGChange = (event: Event) => {
      const customEvent = event as CustomEvent<TCGType>;
      setCurrentTCG(customEvent.detail);
    };

    window.addEventListener('tcgChanged', handleTCGChange as EventListener);
    
    return () => {
      window.removeEventListener('tcgChanged', handleTCGChange as EventListener);
    };
  }, []);
  
  return (
    <Layout>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">My Collection</h1>
        <p className="text-muted-foreground">
          {currentTCG} - Manage and organize your card collection
        </p>
        <Collection />
      </div>
    </Layout>
  );
};

export default CollectionPage;
