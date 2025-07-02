import React from "react";

function ProductTile(props) {
  return (
    <div
      className='productTile'
      onClick={() => props.handleProductSelect(props.product)}
    >
      <p>{props.product.name}</p>
      <p>£{props.product.selling_cost}</p>
    </div>
  );
}

export default ProductTile;
