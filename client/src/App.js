import React, { useEffect, useState, createRef } from "react";
import "./App.css";
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

  const idRef = createRef();

  return (
    <>
      <MainLayout></MainLayout>
      <input type='button' value='get products' onClick={() => getProducts()} />

      <br />
      <input
        type='button'
        value='remove product'
        onClick={() => removeProduct(idRef.current.value)}
      />
      <input type='text' name='id' id='id' ref={idRef} />

      <table>
        <thead>
          <tr>
            <td>id</td>
            <td>name</td>
            <td>cat id</td>
            <td>buy cost</td>
            <td>sell cost</td>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.category_id}</td>
              <td>{product.purchase_cost}</td>
              <td>{product.selling_cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
