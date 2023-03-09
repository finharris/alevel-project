import React, { useEffect, useRef, useState } from "react";
import TabItem from "../tabItem/TabItem";
import "./TabList.css";

function TabList({
  tabItems,
  getTabItems,
  selectedTable,
  setIsLoading,
  handleCloseTable,
}) {
  const [products, setProducts] = useState([]);

  const tabListRef = useRef();

  useEffect(() => {
    const getProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    };

    getProducts();
  }, []);

  useEffect(() => {
    // apply style if list is overflowing
    const tabListElement = tabListRef.current;
    if (tabListElement.scrollHeight > tabListElement.clientHeight) {
      // apply style
      tabListElement.classList.add("tabTableScrollShadow");
    } else {
      // remove style
      tabListElement.classList.remove("tabTableScrollShadow");
    }
  }, [tabItems]);

  async function handleQuantityChange(sale_id, newQuantity) {
    // call /api/sales/update?sale_id=?&new_quantity=?
    let url;

    if (newQuantity === 0) {
      // remove sale
      url = `/api/sales/remove?sale_id=${sale_id}`;
    } else {
      url = `/api/sales/update?sale_id=${sale_id}&new_quantity=${newQuantity}`;
    }

    await fetch(url).then(() => {
      setIsLoading(true);
      getTabItems(selectedTable).then(() => setIsLoading(false));
    });
  }

  function renderTabItems() {
    if (tabItems.length < 1) return null;
    if (products.length < 1) return null;

    let tabItemsComponents = [];
    for (const item of tabItems) {
      if (item.quantity >= 1) {
        const product = products.filter(
          (p) => p.productID === item.product_id
        )[0];
        tabItemsComponents.push(
          <TabItem
            name={product.name}
            quantity={item.quantity}
            selling_cost={product.selling_cost}
            handleQuantityChange={handleQuantityChange}
            key={item.sale_id}
            sale_id={item.sale_id}
          ></TabItem>
        );
      }
    }
    return tabItemsComponents;
  }

  function calculateTotalCost() {
    if (tabItems.length < 1) return 0;

    let total = 0;
    for (const item of tabItems) {
      const product = products.filter(
        (p) => p.productID === item.product_id
      )[0];

      total += product.selling_cost * item.quantity;
    }
    return total;
  }

  return (
    <div className='tabListContainer'>
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
              <ol ref={tabListRef}>{renderTabItems()}</ol>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colSpan='100%'>
              <h4 id='totalCost'>Total: £{calculateTotalCost()}</h4>
            </td>
          </tr>
        </tfoot>
      </table>
      <button
        id='closeTableButton'
        onClick={() => handleCloseTable(calculateTotalCost())}
      >
        Close Table
      </button>
    </div>
  );
}

export default TabList;
