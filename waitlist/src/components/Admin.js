import React, { useState } from 'react';
import './Admin.css';
import axios from 'axios';
import { useEffect } from 'react';


function Admin() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3005/user/leaderboard")
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="admin-container">
      <h1>Admin</h1>
      {console.log(data)}
      <h1 id="leaderboard">Leaderboard</h1>
  
      <table>
        <thead>
          <tr>
            <th>Referral ID</th>
            <th>User Name</th>
            <th>Total Referrals</th>
          </tr>
        </thead>
        <tbody>
          {data && Array.isArray(data) && data.map((item,index) => (
            <tr key={index}>
              <td>{item.ref_id}</td>
              <td>{item.userName}</td>
              <td>{item.ref_user_ids.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
