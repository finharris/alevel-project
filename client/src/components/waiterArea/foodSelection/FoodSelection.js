import React from "react";
import "./FoodSelection.css";

function FoodSelection(props) {
  return (
    <div className='foodSelectionContainer'>
      <div className='goBackArea'>
        <h3 onClick={() => props.handleGoBack()}>Go Back</h3>
      </div>
      <h4>Selected Table: {props.selectedTable}</h4>
      <h1>Food Selectoin</h1>
    </div>
  );
}

export default FoodSelection;
