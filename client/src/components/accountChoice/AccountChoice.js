import React, { useEffect, useState } from "react";
import Keypad from "../utility/keypad/Keypad";
import Popup from "../utility/popup/Popup";
import "./AccountChoice.css";

function AccountChoice(props) {
  const [userOption, setUserOption] = useState("");
  const [popupShown, setPopupShown] = useState(false);

  async function fetchData() {
    const res = await fetch("/api/authcodes");
    return await res.json();
  }

  function handleClosePopup() {
    setPopupShown(false);
  }

  function handleOptionSelect(e) {
    const option = e.target.value;
    setUserOption(option);
    setPopupShown(true);
  }

  async function handleKeypadSubmit(value) {
    // maybe get correct values from db
    let authCodes = await fetchData();
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
