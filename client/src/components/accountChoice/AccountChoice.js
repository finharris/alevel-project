import React, { useState } from "react";
import Keypad from "../utility/keypad/Keypad";
import Popup from "../utility/popup/Popup";
import "./AccountChoice.css";

function AccountChoice(props) {
  const [userOption, setUserOption] = useState("");
  const [popupShown, setPopupShown] = useState(false);

  // gets auth codes from database
  async function fetchData() {
    const res = await fetch("/api/authcodes");
    return await res.json();
  }

  // close the keypad popup
  function handleClosePopup() {
    setPopupShown(false);
  }

  // set the variable to select the popup that was clicked and show the keypad popup
  function handleOptionSelect(e) {
    const option = e.target.value;
    setUserOption(option);
    setPopupShown(true);
  }

  async function handleKeypadSubmit(value) {
    // get correct auth codes from the database
    let authCodes = await fetchData();
    //check inputted values against values from database
    if (userOption === "Waiter" && value === authCodes[1].code) {
      props.handleUserOption(userOption);
    } else if (userOption === "Manager" && value === authCodes[0].code) {
      props.handleUserOption(userOption);
    } else {
      alert("Incorrect password.");
    }
  }

  return (
    <>
      {popupShown ? (
        <Popup handleClose={handleClosePopup}>
          <Keypad
            handleKeypadSubmit={handleKeypadSubmit}
            maxLength={4}
          ></Keypad>
        </Popup>
      ) : null}
      <div className='accountChoiceContainer'>
        <h3>Please select account type:</h3>
        <div className='choiceButtons'>
          <input
            type='button'
            value='Waiter'
            onClick={(e) => handleOptionSelect(e)}
          />
          <input
            type='button'
            value='Manager'
            onClick={(e) => handleOptionSelect(e)}
          />
        </div>
      </div>
    </>
  );
}

export default AccountChoice;
