import React from "react";
import "./optionsButton.css";

export default function OptionsButton({ name, handleMenuSelect }) {
  return (
    <div className='optionsButton' onClick={() => handleMenuSelect(name)}>
      {name}
    </div>
  );
}
