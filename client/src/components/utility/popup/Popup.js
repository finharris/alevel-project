import React from "react";
import "./Popup.css";

function Popup(props) {
  return (
    <div className='popup'>
      <div className='popupBox'>
        <span className='popupClose' onClick={props.handleClose}>
          x
        </span>
        {props.children}
      </div>
    </div>
  );
}

export default Popup;
