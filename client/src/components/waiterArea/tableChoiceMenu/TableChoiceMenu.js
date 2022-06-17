import React, { useState } from "react";
import Keypad from "../../utility/keypad/Keypad";
import "./TableChoice.css";

function TableChoiceMenu(props) {
  function handleKeypadSubmit(value) {
    let tableExists = false;
    for (const table of props.activeTables) {
      if (table.number === parseInt(value)) {
        tableExists = true;
      }
    }
    if (tableExists) {
      return props.handleSelectTable(parseInt(value));
    }
    return props.handleCreateTable(parseInt(value));
  }

  return (
    <>
      <div className='goBackArea'>
        <h3 onClick={() => props.handleGoBack()}>Sign Out</h3>
      </div>
      <h1>Table Choice</h1>
      <p>
        Type in an active table number to select it or type a non active table
        number to create and select it.
      </p>
      <div className='tableChoiceMain'>
        <table className='tableChoiceTable' border={1}>
          <thead>
            <tr>
              <td>Active Tables</td>
            </tr>
          </thead>
          <tbody>
            {props.activeTables.map((table, key) => (
              <tr key={key}>
                <td>{table.number}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <Keypad handleKeypadSubmit={handleKeypadSubmit}></Keypad>
      </div>
    </>
  );
}

export default TableChoiceMenu;
