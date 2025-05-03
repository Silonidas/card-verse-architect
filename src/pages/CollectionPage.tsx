
import React from "react";
import Layout from "@/components/Layout";
import Collection from "@/components/Collection";

const CollectionPage = () => {
  return (
    <Layout>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">My Collection</h1>
        <p className="text-muted-foreground">
          Manage and organize your card collection
        </p>
        <Collection />
      </div>
    </Layout>
  );
};

export default CollectionPage;
