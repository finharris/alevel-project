import React from "react";

function ProductTile(props) {
  return (
    <div
      className='productTile'
      onClick={() => props.handleProductSelect(props.product)}
    >
      {props.product.name}
    </div>
  );
}

export default ProductTile;
