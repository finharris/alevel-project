import React, { useState } from "react";
import "./App.css";
import AccountChoice from "./components/accountChoice/AccountChoice";
import MainLayout from "./components/MainLayout";
import ManagerArea from "./components/managerArea/ManagerArea";
import WaiterArea from "./components/waiterArea/WaiterArea";

function App() {
  const [userOption, setUserOption] = useState(undefined); // undefined default
  const [isLoading, setIsLoading] = useState(false);

  function handleUserOption(option) {
    setUserOption(option);
  }

  function handleSignOut() {
    setUserOption(undefined);
  }

  function handleRenderSwitch(param) {
    switch (param) {
      case "Waiter":
        return (
          <WaiterArea
            handleSignOut={handleSignOut}
            setIsLoading={setIsLoading}
          ></WaiterArea>
        );

      case "Manager":
        return (
          <ManagerArea
            handleSignOut={handleSignOut}
            setIsLoading={setIsLoading}
          ></ManagerArea>
        );

      default:
        return (
          <AccountChoice
            handleUserOption={handleUserOption}
            setIsLoading={setIsLoading}
          ></AccountChoice>
        );
    }
  }

  return (
    <>
      {isLoading ? (
        <div className='loading'>
          <p>loading...</p>
        </div>
      ) : null}
      <MainLayout>{handleRenderSwitch(userOption)}</MainLayout>
    </>
  );
}

export default App;
