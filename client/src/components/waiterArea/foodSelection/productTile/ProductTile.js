import React from "react";

function ProductTile(props) {
  return (
    <div
      className='productTile'
      onClick={() => props.handleProductSelect(props.product)}
    >
      {props.product.name}
      <br></br>£{props.product.selling_cost}
    </div>
  );
}

export default ProductTile;
