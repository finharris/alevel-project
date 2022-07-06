import React, { useEffect, useState } from "react";
import ProductTile from "./productTile/ProductTile";
import "./FoodSelection.css";
import TabItem from "./tabItem/TabItem";

function FoodSelection(props) {
  const [activeCategory, setActiveCategory] = useState(undefined);
  const [activeTab, setActiveTab] = useState([]);

  useEffect(() => {
    // update tab in db
    // props selectedTable
  }, [activeTab]);

  function handleSelectCategory(name) {
    for (const c of props.categories) {
      if (c.name === name) {
        setActiveCategory(c);
      }
    }
  }

  function handleProductSelect(p) {
    let currentIndex = -1;
    activeTab.forEach((item, i) => {
      if (item.name === p.name) {
        currentIndex = i;
      }
    });

    if (currentIndex === -1) {
      return setActiveTab([
        ...activeTab,
        {
          name: p.name,
          quantity: 1,
          selling_cost: p.selling_cost,
        },
      ]);
    } else {
      const newTab = [...activeTab];
      newTab[currentIndex].quantity += 1;
      return setActiveTab(newTab);
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

  function calculateTotalCost() {
    let total = 0;
    for (const item of activeTab) {
      total += item.selling_cost * item.quantity;
    }
    return total;
  }

  function handleQuantityChange(name, newQuantity) {
    let currentIndex = -1;
    activeTab.forEach((item, i) => {
      if (item.name === name) {
        currentIndex = i;
      }
    });

    if (currentIndex === -1) {
      return;
    } else {
      const newTab = [...activeTab];
      newTab[currentIndex].quantity = newQuantity >= 0 ? newQuantity : 0;
      return setActiveTab(newTab);
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
        <table className='tabList' border={1}>
          <thead>
            <tr>
              <td colSpan='100%'>
                <h2>TAB</h2>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr className='tabTableRow'>
              <td colSpan='100%'>
                <ol>
                  {activeTab.map((item, key) =>
                    item.quantity > 0 ? (
                      <TabItem
                        name={item.name}
                        quantity={item.quantity}
                        selling_cost={item.selling_cost}
                        handleQuantityChange={handleQuantityChange}
                        key={key}
                      ></TabItem>
                    ) : null
                  )}
                </ol>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan='100%'>
                <h4>Total: £{calculateTotalCost()}</h4>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default FoodSelection;
