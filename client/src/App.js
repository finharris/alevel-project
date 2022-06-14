import React, { useState } from "react";
import "./App.css";
import AccountChoice from "./components/AccountChoice";
import MainLayout from "./components/MainLayout";

function App() {
  const [products, setProducts] = useState([]);

  async function getProducts() {
    const res = await fetch("/api/products");
    setProducts(await res.json());
  }

  async function removeProduct(id) {
    const res = await fetch(`/api/products/remove?id=${id}`);
    console.log(await res.json());
    getProducts();
  }

  return (
    <>
      <MainLayout>
        <AccountChoice></AccountChoice>
      </MainLayout>
    </>
  );
}

export default App;
