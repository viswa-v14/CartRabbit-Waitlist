// import React, { useState } from 'react';
// import './SignUp.css';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { CartState } from './context/Context';

// function LogIn() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const cart = CartState();


//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     console.log('Email:', email);
//     console.log('Password:', password);

//     axios.post("http://localhost:3005/user/login",{
//       email:email,
//       password:password
//     })
//       .then((res) => {
//         if(res.data.mess==="login successful")
//         {
//             console.log("success");
//             cart.setData(res.data.user);
//         }
//         else{
//           alert("please enter valid details");
//           setEmail("");
//           setPassword("");
//         }
//        // setData(res.data.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   };


//   return (
    
//     <div className='signup-container'>
//       <form className='form-group' onSubmit={handleSubmit}>
//       <h1>Login</h1>
//         <div className='input'>
//           <label>Email: </label>
//           <input type='email' id='email' value={email} onChange={handleEmailChange} />
//         </div>
//         <div className='input'>
//           <label>Password: </label>
//           <input type='password' id='password' value={password} onChange={handlePasswordChange} />
//         </div>
//         <button type='submit' >Submit</button>
//         <p>Doesn't have an account, <Link to='/signup'>Sign Up</Link></p>
//       </form>
//     </div>
//   );
// }

// export default LogIn;


import React, { useState } from 'react';
import './SignUp.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CartState } from './context/Context';

function LogIn({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const cart = CartState();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:3005/user/login", {
      email: email,
      password: password
    })
      .then((res) => {
        if (res.data.mess === "login successful") {
          console.log("success");
          cart.setData(res.data.user);
          history.push('/home'); // Redirect to the home page upon successful login
        } else {
          alert("Please enter valid details");
          setEmail('');
          setPassword('');
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <div className='signup-container'>
      <form className='form-group' onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className='input'>
          <label>Email: </label>
          <input type='email' id='email' value={email} onChange={handleEmailChange} />
        </div>
        <div className='input'>
          <label>Password: </label>
          <input type='password' id='password' value={password} onChange={handlePasswordChange} />
        </div>
        <button type='submit'>Log In</button>
        <p>Don't have an account? <Link to='/signup'>Sign up</Link></p>
      </form>
    </div>
  );
}

export default LogIn;
