import React from "react";
import "./optionsArea.css";
import ItemsMenu from "./optionsMenus/itemMenu/ItemsMenu";
import CatagoryMenu from "./optionsMenus/catagoryMenu/CatagoryMenu";
import CodeMenu from "./optionsMenus/codeMenu/CodeMenu";
import ReportMenu from "./optionsMenus/reportMenu/ReportMenu";

export default function OptionsArea({ selectedMenu }) {
  function handleRenderMenu() {
    switch (selectedMenu) {
      case "Add/Remove Items":
        return <ItemsMenu></ItemsMenu>;

      case "Add/Remove Catagories":
        return <CatagoryMenu></CatagoryMenu>;

      case "Modify Access Codes":
        return <CodeMenu></CodeMenu>;

      case "Reports":
        return <ReportMenu></ReportMenu>;

      default:
        break;
    }
  }

  return <div className='optionsArea'>{handleRenderMenu()}</div>;
}
