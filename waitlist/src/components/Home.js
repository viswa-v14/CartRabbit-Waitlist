import React, { useEffect, useState } from 'react';
import './Home.css';
import { CartState } from './context/Context';

function Home() {
  const cast=CartState();
  const[data,setdata]=useState({})
  useEffect(() => {
     setdata(cast.data);
  }, [cast.data])
  
  return (
    <div className="container">
      <h1>Home</h1>
      <div className="user-details">
        <p>{data.userName}</p>
        <p>{data.email}</p>
        {/* <p>Referred by: {data.ref_by==undefined ? "Nill" : data.ref_by}</p> */}
      </div>
      <div className="stats">
        <h3>#{data.ref_id} is your position</h3>
        {/* <p>{data.ref_user_ids} members signed up using your referral link</p> */}
      </div>
    </div>
  );
}

export default Home;
