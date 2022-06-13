import React, { useEffect, useState, createRef } from "react";
import "./App.css";

function App() {
  const [returnData, setReturnData] = useState([]);

  const textBoxRef = createRef();

  async function getFirstName() {
    let res;
    if (!textBoxRef.current.value) {
      res = await fetch(`/api/users`);
    } else {
      res = await fetch(`/api/users?firstname=${textBoxRef.current.value}`);
    }
    const data = await res.json();
    if (data.length === 0) {
      setReturnData(null);
    } else {
      setReturnData(data);
    }
  }

  useEffect(() => {
    getFirstName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1>User Name Search</h1>
      <div className='form'>
        <input type='text' name='firstName' id='firstName' ref={textBoxRef} />
        <input type='button' value='Search' onClick={() => getFirstName()} />
      </div>
      {returnData === null ? (
        <h3>No result.</h3>
      ) : returnData.length === 0 ? (
        <h3>Loading...</h3>
      ) : (
        <table>
          <thead>
            <tr>
              <td>ID</td>
              <td>First Name</td>
              <td>Last Name</td>
              <td>Email</td>
              <td>Gender</td>
            </tr>
          </thead>
          <tbody>
            {returnData === []
              ? null
              : returnData.map((d, key) => (
                  <tr key={key}>
                    <td>{d.id}</td>
                    <td>{d.first_name}</td>
                    <td>{d.last_name}</td>
                    <td>{d.email}</td>
                    <td>{d.gender}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default App;
