import React from 'react';
import './SignUp.css';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CartState } from './context/Context';

function SignUp() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const cart=CartState();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);

    axios.post("http://localhost:3005/user/newUser_signup",{
      email:email,
      userName:username,
      password:password
    })
      .then((res) => {
        if(res.data.mes==="signup successfull")
        {
            cart.setData(res.data.newUser)
        }
        else{
          alert("please enter valid details");
          setEmail("");
          setPassword("");
          setUsername("");
        }
       // setData(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

 


  return (
    <div className='signup-container'>
      <h1>SignUp</h1>
      <form className='form-group' onSubmit={handleSubmit}>
        <div className='input'>
          <label>User Name: </label>
          <input type='text' id='username' value={username} onChange={handleUsernameChange} />
        </div>
        <div className='input'>
          <label>Email: </label>
          <input type='email' id='email' value={email} onChange={handleEmailChange} />
        </div>
        <div className='input'>
          <label>Password: </label>
          <input type='password' id='password' value={password} onChange={handlePasswordChange} />
        </div>
        <button type='submit'>Sign Up</button>
        <p>Already have an account, <Link to='/login'>Log In</Link></p>
      </form>
    </div>
  );
}

export default SignUp;