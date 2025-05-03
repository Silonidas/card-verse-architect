
import React from "react";
import Layout from "@/components/Layout";
import CardBrowser from "@/components/CardBrowser";

const Browse = () => {
  return (
    <Layout>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Browse Cards</h1>
        <p className="text-muted-foreground">
          Explore all available trading cards in our database
        </p>
        <CardBrowser />
      </div>
    </Layout>
  );
};

export default Browse;
