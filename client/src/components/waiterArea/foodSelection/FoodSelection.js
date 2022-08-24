import React, { useEffect, useState } from "react";
import ProductTile from "./productTile/ProductTile";
import "./FoodSelection.css";
import TabList from "./tabList/TabList";

function FoodSelection(props) {
  const [activeCategory, setActiveCategory] = useState(undefined);
  const [tabItems, setTabItems] = useState([]);

  async function getTabItems(tableNumber) {
    const res = await fetch(`/api/sales`);
    const data = await res.json();
    const filteredData = data.filter(
      (item) => item.table_number === tableNumber
    );
    setTabItems(filteredData);
  }

  useEffect(() => {
    getTabItems(props.selectedTable);
  }, [props.selectedTable]);

  function handleSelectCategory(name) {
    for (const c of props.categories) {
      if (c.name === name) {
        setActiveCategory(c);
      }
    }
  }

  async function handleProductSelect(p) {
    // add item to tab in db
    if (tabItems.includes(p)) {
      // update
    } else {
      // add new
      const results = await fetch(
        `/api/sales/add?table_number=${props.selectedTable}&product_id=${p.productID}`
      );
      getTabItems(props.selectedTable);
      console.log(results);
    }
  }

  function handleRenderProducts() {
    if (activeCategory) {
      const filteredProducts = props.products.filter(
        (p) => p.categoryID === activeCategory.categoryID
      );
      if (filteredProducts.length === 0)
        return <h3>No products in this category</h3>;
      return filteredProducts.map((p) => (
        <ProductTile
          key={p.productID}
          product={p}
          handleProductSelect={handleProductSelect}
        ></ProductTile>
      ));
    } else {
      return <h3>Please select a category.</h3>;
    }
  }

  return (
    <div className='foodSelectionContainer'>
      <div className='goBackArea'>
        <h3 onClick={() => props.handleGoBack()} className='clickable'>
          Go Back
        </h3>
      </div>
      <div className='refreshArea'>
        <h4>Selected Table: {props.selectedTable}</h4>
        <h4 onClick={() => props.refresh()}>Refresh...</h4>
      </div>
      <div className='tablesArea'>
        <table className='foodTable' border={1}>
          <thead>
            <tr>
              {props.categories.map((c, key) => (
                <td
                  onClick={(e) => handleSelectCategory(e.target.innerText)}
                  className='clickable'
                  key={key}
                >
                  {c.name}
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan='100%'>
                <div className='productsGrid'>{handleRenderProducts()}</div>
              </td>
            </tr>
          </tbody>
        </table>
        <TabList
          selectedTable={props.selectedTable}
          tabItems={tabItems}
          getTabItems={getTabItems}
          setIsLoading={props.setIsLoading}
        ></TabList>
      </div>
    </div>
  );
}

export default FoodSelection;
