import React from "react";

function MainLayout() {
  return (
    <>
      <header>
        <img
          src={require("../assets/images/logo.png")}
          alt='logo'
          className='logo'
        />
      </header>
    </>
  );
}

export default MainLayout;
