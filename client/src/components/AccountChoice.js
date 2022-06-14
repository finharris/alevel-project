import React, { useEffect, useState } from "react";
import Keypad from "./utility/Keypad";
import Popup from "./utility/Popup";

function AccountChoice() {
  const [userType, setUserType] = useState("");
  const [userOption, setUserOption] = useState("");
  const [popupShown, setPopupShown] = useState(false);

  function handleClosePopup() {
    setPopupShown(false);
  }

  function handleOptionSelect(e) {
    const option = e.target.value;
    setUserOption(option);
    setPopupShown(true);
  }

  function handleKeypadSubmit(value) {
    if (userOption === "Waiter" && value == "1111") {
      setUserType(userOption);
    } else if (userOption === "Manager" && value == "2222") {
      setUserType(userOption);
    }
  }

  return (
    <>
      {popupShown ? (
        <Popup handleClose={handleClosePopup}>
          <Keypad handleKeypadSubmit={handleKeypadSubmit}></Keypad>
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
