import React, { useState, useEffect } from "react";
import InformationArea from "./informationArea/InformationArea";
import "./itemsMenu.css";

export default function ItemsMenu() {
  const [products, setProducts] = useState([]);
  const [filteredProucts, setFilteredProucts] = useState([]);
  const [currentItem, setCurrentItem] = useState({});
  const [catagories, setCatagories] = useState([]);
  const [category, setCategory] = useState("SELECT CATEGORY");

  useEffect(() => {
    getProducts();
    getCatagories();
  }, []);

  async function getProducts() {
    const res = await fetch("/api/products");
    setProducts(await res.json());
  }

  async function getCatagories() {
    const res = await fetch("/api/categories/");
    setCatagories(await res.json());
  }

  function handleSelectCatagory() {
    let catagoryName = document.querySelector("#catagorySelect").value;

    if (catagoryName === "SELECT CATEGORY") setFilteredProucts([]);

    let catagory;
    for (let c of catagories) {
      if (c.name === catagoryName) {
        catagory = c;
        setCategory(c);
      }
    }

    setFilteredProucts(
      products.filter((product) => {
        return product.categoryID === catagory.categoryID;
      })
    );

    handleSelectItem();
  }

  function handleSelectItem() {
    let itemName = document.querySelector("#itemSelect").value;

    if (itemName === "SELECT ITEM") return setCurrentItem({});
    if (itemName === "-ADD ITEM-")
      return setCurrentItem({
        categoryID: undefined,
        name: undefined,
        productID: undefined,
        purchase_cost: undefined,
        selling_cost: undefined,
      });

    for (let i of products) {
      if (i.name === itemName) {
        return setCurrentItem(i);
      }
    }
  }

  return (
    <div>
      <label htmlFor='catagorySelect'>Category: </label>
      <select
        name='catagorySelect'
        id='catagorySelect'
        onChange={() => handleSelectCatagory()}
        defaultValue={"SELECT CATEGORY"}
      >
        <option value={"SELECT CATEGORY"}>SELECT CATEGORY</option>
        {catagories.map((catagory) => {
          return (
            <option value={catagory.name} key={catagory.id}>
              {catagory.name}
            </option>
          );
        })}
      </select>

      <label htmlFor='itemSelect'>Item: </label>
      <select
        name='itemSelect'
        id='itemSelect'
        defaultValue={"SELECT ITEM"}
        onChange={() => handleSelectItem()}
      >
        <option value={"SELECT ITEM"}>SELECT ITEM</option>
        {filteredProucts.map((product) => {
          return (
            <option value={product.name} key={product.id}>
              {product.name}
            </option>
          );
        })}
        {category !== "SELECT CATEGORY" ? (
          <option value={"-ADD ITEM-"}>-ADD ITEM-</option>
        ) : null}
      </select>
      {Object.keys(currentItem).length === 0 ? (
        <h3>Select an item</h3>
      ) : (
        <InformationArea
          currentItem={currentItem}
          getProducts={getProducts}
          currentCategory={category}
          setCategory={setCategory}
        ></InformationArea>
      )}
    </div>
  );
}
