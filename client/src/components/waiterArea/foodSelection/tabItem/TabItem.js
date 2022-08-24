import React from "react";

function TabItem(props) {
  return (
    <li>
      <h5 className='tabItemName'>
        {props.name} (£{props.selling_cost})
      </h5>
      <div>
        <div className='quantityArea'>
          <input
            type='button'
            value='-'
            id='minusQuantity'
            onClick={() =>
              props.handleQuantityChange(props.sale_id, props.quantity - 1)
            }
          />
          <input
            type='text'
            name='quantity'
            id='quantity'
            value={props.quantity}
            readOnly
          />
          <input
            type='button'
            value='+'
            id='addQuantity'
            onClick={() =>
              props.handleQuantityChange(props.sale_id, props.quantity + 1)
            }
          />
        </div>
        <p className='tabItemCost'>£{props.selling_cost * props.quantity}</p>
      </div>
    </li>
  );
}

export default TabItem;
