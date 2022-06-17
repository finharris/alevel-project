import React from "react";

function KeypadButton(props) {
  return (
    <>
      <input
        type='button'
        value={props.value}
        className='keypadButton'
        onClick={() => props.handleClick(props.value)}
      />
    </>
  );
}

export default KeypadButton;
