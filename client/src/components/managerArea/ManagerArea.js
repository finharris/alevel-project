import React, { useState } from "react";
import "./ManagerArea.css";
import OptionsButton from "./optionsButton/OptionsButton";
import OptionsArea from "./optionsArea/OptionsArea";

export default function ManagerArea({ handleSignOut }) {
  const [selectedMenu, setSelectedMenu] = useState(null);
  function handleMenuSelect(name) {
    setSelectedMenu(name);
  }

  return (
    <>
      <div className='goBackArea clickable' onClick={() => handleSignOut()}>
        <h3>Sign Out</h3>
      </div>
      <div className='managerAreaContainer'>
        <table className='optionsTable' border='1'>
          <tr>
            <td className='optionsDivision'>
              <OptionsButton
                name={"Add/Remove Items"}
                handleMenuSelect={handleMenuSelect}
              ></OptionsButton>
            </td>
            <td
              height='100%'
              width='100%'
              rowSpan={4}
              className='optionsAreaDivision'
            >
              <OptionsArea selectedMenu={selectedMenu}></OptionsArea>
            </td>
          </tr>
          <tr>
            <td className='optionsDivision'>
              <OptionsButton
                handleMenuSelect={handleMenuSelect}
                name={"Add/Remove Catagories"}
              ></OptionsButton>
            </td>
          </tr>
          <tr>
            <td className='optionsDivision'>
              <OptionsButton
                handleMenuSelect={handleMenuSelect}
                name={"Modify Access Codes"}
              ></OptionsButton>
            </td>
          </tr>
          <tr>
            <td className='optionsDivision'>
              <OptionsButton
                handleMenuSelect={handleMenuSelect}
                name={"Reports"}
              ></OptionsButton>
            </td>
          </tr>
        </table>
      </div>
    </>
  );
}
