
import React from "react";
import Layout from "@/components/Layout";
import Collection from "@/components/Collection";

const CollectionPage = () => {
  const [currentTCG, setCurrentTCG] = React.useState("Digimon Card Game 2020");

  // Listen for TCG changes from Layout component
  React.useEffect(() => {
    const handleTCGChange = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
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
