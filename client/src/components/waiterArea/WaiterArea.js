import React, { useEffect, useState } from "react";
import FoodSelection from "./foodSelection/FoodSelection";
import TableChoiceMenu from "./tableChoiceMenu/TableChoiceMenu";
import "./WaiterArea.css";

function WaiterArea(props) {
  const [activeTables, setActiveTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(undefined);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  // get all categories from database
  async function getCategories() {
    const res = await fetch("/api/categories");
    setCategories(await res.json());
  }

  // get all products from database
  async function getProducts() {
    const res = await fetch("/api/products");
    setProducts(await res.json());
  }

  // call the api to add a table number into the database
  async function addTable(number) {
    const res = await fetch(`/api/tables/add?number=${number}`);
    const data = await res.json();
    if ((await data.serverStatus) !== 200) {
      console.log(data);
    }
  }

  // get all tables from the database
  async function getTables() {
    const res = await fetch("/api/tables");
    setActiveTables(await res.json());
  }

  // fetch tables, categories and proucts when the component mounts
  useEffect(() => {
    getTables();
    getCategories();
    getProducts();
  }, []);

  // create a table when a new number is added to the keypad
  function handleCreateTable(number) {
    addTable(number);
    getTables();
    handleSelectTable(number);
  }

  // select an already existing table number
  function handleSelectTable(number) {
    setSelectedTable(number);
  }

  // use the passed in function 'setSelectedTable' to go back to the accountChoice page
  function handleGoBack() {
    if (selectedTable) {
      return setSelectedTable(undefined);
    }

    // go back to waiter/manager choice area
    return props.handleSignOut();
  }

  // fetch again anything in the food grid
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
          setIsLoading={props.setIsLoading}
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
