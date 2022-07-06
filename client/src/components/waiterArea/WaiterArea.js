import React, { useEffect, useState } from "react";
import FoodSelection from "./foodSelection/FoodSelection";
import TableChoiceMenu from "./tableChoiceMenu/TableChoiceMenu";
import "./WaiterArea.css";

function WaiterArea(props) {
  const [activeTables, setActiveTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(undefined);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  async function getCategories() {
    const res = await fetch("/api/categories");
    setCategories(await res.json());
  }

  async function getProducts() {
    const res = await fetch("/api/products");
    setProducts(await res.json());
  }

  async function addTable(number) {
    const res = await fetch(`/api/tables/add?number=${number}`);
    const data = await res.json();
    if ((await data.serverStatus) !== 2) {
      console.log(data);
    }
  }

  async function getTables() {
    const res = await fetch("/api/tables");
    setActiveTables(await res.json());
  }

  useEffect(() => {
    getTables();
    getCategories();
    getProducts();
  }, []);

  function handleCreateTable(number) {
    addTable(number);
    getTables();
    handleSelectTable(number);
  }

  function handleSelectTable(number) {
    setSelectedTable(number);
  }

  function handleGoBack() {
    if (selectedTable) {
      return setSelectedTable(undefined);
    }

    // go back to waiter/manager choice area
    return props.handleSignOut();
  }

  function handleGridRefresh() {
    getProducts();
    getCategories();
  }

  return (
    <div className='waiterAreaContainer'>
      {selectedTable ? (
        <FoodSelection
          selectedTable={selectedTable}
          handleGoBack={handleGoBack}
          categories={categories}
          products={products}
          refresh={handleGridRefresh}
        ></FoodSelection>
      ) : (
        <TableChoiceMenu
          activeTables={activeTables}
          handleCreateTable={handleCreateTable}
          handleSelectTable={handleSelectTable}
          handleGoBack={handleGoBack}
          getTables={getTables}
        ></TableChoiceMenu>
      )}
    </div>
  );
}

export default WaiterArea;
