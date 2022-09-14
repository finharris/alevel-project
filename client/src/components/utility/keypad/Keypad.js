import React, { createRef, useEffect } from "react";
import KeypadButton from "./KeypadButton";
import "./Keypad.css";

function Keypad(props) {
  const outputRef = createRef();

  function handleClick(value) {
    if (value === "C") return (outputRef.current.value = "");
    if (value === "Enter") {
      return props.handleKeypadSubmit(outputRef.current.value);
    }

    if (props.maxLength && outputRef.current.value.length === props.maxLength) {
      return;
    }
    outputRef.current.value += value;
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleClick("Enter");
    }
  }

  useEffect(() => {
    outputRef.current.focus();
  }, []);

  return (
    <table className='keypadTable' cellSpacing={0} onKeyDown={handleKeyDown}>
      {/* <input type='text' ref={valueRef} />
    <input
      type='button'
      value='Submit'
      onClick={() => props.handleKeypadSubmit(valueRef.current.value)}
    /> */}
      <thead>
        <tr>
          <td colSpan={3}>
            <input
              type='number'
              name='Output'
              id='output'
              className='output'
              ref={outputRef}
            />
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <KeypadButton value='7' handleClick={handleClick}></KeypadButton>
          </td>
          <td>
            <KeypadButton value='8' handleClick={handleClick}></KeypadButton>
          </td>
          <td>
            <KeypadButton value='9' handleClick={handleClick}></KeypadButton>
          </td>
        </tr>

        <tr>
          <td>
            <KeypadButton value='4' handleClick={handleClick}></KeypadButton>
          </td>
          <td>
            <KeypadButton value='5' handleClick={handleClick}></KeypadButton>
          </td>
          <td>
            <KeypadButton value='6' handleClick={handleClick}></KeypadButton>
          </td>
        </tr>

        <tr>
          <td>
            <KeypadButton value='1' handleClick={handleClick}></KeypadButton>
          </td>
          <td>
            <KeypadButton value='2' handleClick={handleClick}></KeypadButton>
          </td>
          <td>
            <KeypadButton value='3' handleClick={handleClick}></KeypadButton>
          </td>
        </tr>

        <tr>
          <td colSpan={2}>
            <KeypadButton value='0' handleClick={handleClick}></KeypadButton>
          </td>
          <td colSpan={1}>
            <KeypadButton value='C' handleClick={handleClick}></KeypadButton>
          </td>
        </tr>

        <tr>
          <td colSpan={3}>
            <KeypadButton
              value='Enter'
              handleClick={handleClick}
            ></KeypadButton>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Keypad;
