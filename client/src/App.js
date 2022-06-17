import React, { useState } from "react";
import "./App.css";
import AccountChoice from "./components/accountChoice/AccountChoice";
import MainLayout from "./components/MainLayout";
import WaiterArea from "./components/waiterArea/WaiterArea";

function App() {
  const [products, setProducts] = useState([]);
  const [userOption, setUserOption] = useState(undefined); // undefined default

  function handleUserOption(option) {
    setUserOption(option);
  }

  function handleSignOut() {
    setUserOption(undefined);
  }

  function handleRenderSwitch(param) {
    switch (param) {
      case "Waiter":
        return <WaiterArea handleSignOut={handleSignOut}></WaiterArea>;

      case "Manager":
        return <h1>Manager</h1>;

      default:
        return (
          <AccountChoice handleUserOption={handleUserOption}></AccountChoice>
        );
    }
  }

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
      <MainLayout>{handleRenderSwitch(userOption)}</MainLayout>
    </>
  );
}

export default App;
