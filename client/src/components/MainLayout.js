import React from "react";

function MainLayout(props) {
  return (
    <>
      <header>
        <img
          src={require("../assets/images/logo.png")}
          alt='logo'
          className='logo'
        />
      </header>

      {props.children}
    </>
  );
}

export default MainLayout;
