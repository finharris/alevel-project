import React, { useState } from "react";
import FoodSelection from "./foodSelection/FoodSelection";
import TableChoiceMenu from "./tableChoiceMenu/TableChoiceMenu";
import "./WaiterArea.css";

function WaiterArea(props) {
  const [activeTables, setActiveTables] = useState([
    { number: 1 },
    { number: 2 },
    { number: 3 },
  ]);

  const [selectedTable, setSelectedTable] = useState(undefined);

  function handleCreateTable(number) {
    let newActiveTables = [...activeTables, { number: number }];
    newActiveTables.sort((a, b) => (a.number > b.number ? 1 : -1));
    setActiveTables(newActiveTables);
    handleSelectTable(number);
  }

  function handleSelectTable(number) {
    setSelectedTable(number);
  }

  function handleGoBack() {
    if (selectedTable) {
      return setSelectedTable(undefined);
    }

    // go back to waiter/manager choice area
    return props.handleSignOut();
  }

  return (
    <div className='waiterAreaContainer'>
      {selectedTable ? (
        <FoodSelection
          selectedTable={selectedTable}
          handleGoBack={handleGoBack}
        ></FoodSelection>
      ) : (
        <TableChoiceMenu
          activeTables={activeTables}
          handleCreateTable={handleCreateTable}
          handleSelectTable={handleSelectTable}
          handleGoBack={handleGoBack}
        ></TableChoiceMenu>
      )}
    </div>
  );
}

export default WaiterArea;
