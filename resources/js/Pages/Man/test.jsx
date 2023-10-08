import React, { useState, useEffect } from 'react';

function Clock() {
  const [data,setData] = useState([]);

  useEffect(() => console.log(data),[data]);

  function tambahData() {
    const baru = [...data];
    baru.push("hai");
    setData(baru); 
  } 

  return (
    <div>
      <button onClick={tambahData}  className='btn btn-success'>Tekan</button>
    </div>
  );
}

export default Clock;
