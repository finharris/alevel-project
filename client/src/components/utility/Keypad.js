import React, { createRef } from "react";

function Keypad(props) {
  const valueRef = createRef();

  return (
    <div className='keypad'>
      <input type='text' ref={valueRef} />
      <input
        type='button'
        value='Submit'
        onClick={() => props.handleKeypadSubmit(valueRef.current.value)}
      />
    </div>
  );
}

export default Keypad;
