import React, { useState } from "react";

async function getFirstName(name) {
  const data = await fetch(`/api/users?firstname=${name}`)
    .then((res) => res.json())
    .then((data) => console.log(data));
}

function App() {
  return (
    <>
      <h1>test</h1>
      <input type='text' name='firstName' id='firstName' />
      <input
        type='button'
        value='Search'
        onClick={() => getFirstName(document.querySelector("#firstName").value)}
      />
    </>
  );
}

export default App;
