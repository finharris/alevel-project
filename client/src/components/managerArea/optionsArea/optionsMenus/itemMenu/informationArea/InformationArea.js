import React, { useRef } from "react";

export default function InformationArea({
  currentItem,
  getProducts,
  currentCategory,
  setCategory,
}) {
  let nameRef = useRef();
  let purchaseCostRef = useRef();
  let sellingCostRef = useRef();
  let productIDRef = useRef();

  async function handleSaveChanges() {
    console.log(currentCategory);
    if (productIDRef.current.value === "") {
      const res = await fetch(
        `/api/products/add?name=${nameRef.current.value}&category_id=${currentCategory.categoryID}&purchase_cost=${purchaseCostRef.current.value}&selling_cost=${sellingCostRef.current.value}`
      );

      if (res.status === 200) {
        console.log(res);
        alert("Product Added!");
        getProducts();
      } else {
        console.log(res);
      }

      return;
    }

    const res = await fetch(
      `/api/products/update?name=${nameRef.current.value}&purchase_cost=${purchaseCostRef.current.value}&selling_cost=${sellingCostRef.current.value}&productID=${productIDRef.current.value}`
    );

    if (res.status === 200) {
      console.log(res);
      alert("Changes Saved!");
      getProducts();
    } else {
      console.log(`change bad: ${res}`);
    }
  }

  async function handleDeleteItem() {
    if (
      window.confirm(
        "Are you sure you want to delete this item? THIS CANNOT BE UNDONE"
      )
    ) {
      console.log(true);
      const res = await fetch(
        `/api/products/remove?id=${productIDRef.current.value}`
      );
      getProducts();
      setCategory("SELECT CATEGORY");
      alert("Item Deleted!");
    }
  }

  return (
    <div className='informationArea'>
      {/* ID */}
      <h4>
        ID:{" "}
        <input
          type='text'
          ref={productIDRef}
          defaultValue={currentItem.productID}
          readOnly={true}
        />
      </h4>
      {/* NAME */}
      <h4>
        Name:{" "}
        <input type='text' ref={nameRef} defaultValue={currentItem.name} />
      </h4>
      {/* PURCHACE COST */}
      <h4>
        Purchase Cost:{" "}
        <input
          type='text'
          ref={purchaseCostRef}
          defaultValue={currentItem.purchase_cost}
        />
      </h4>
      {/* SELLING COST */}
      <h4>
        Selling Cost:{" "}
        <input
          type='text'
          ref={sellingCostRef}
          defaultValue={currentItem.selling_cost}
        />
      </h4>
      <button onClick={() => handleSaveChanges()}>Save Changes</button>
      <button onClick={() => handleDeleteItem()}>Delete Item</button>
    </div>
  );
}
