import React from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'

function Login(props) {

    const handleChange = e => {
        props.setCredentials({
            ...props.credentials,
            [e.target.name]: e.target.value
        })
    }

    const login = e => {
        e.preventDefault();
        axios.post('http://localhost:3300/api/auth/login', {
         username: props.credentials.username,
         password: props.credentials.password,
    })
    .then(res => {
        console.log(res);
        alert('Successfull Login')
    })
    .catch(error => {
        alert(error.message);
        alert('Unsucessfull Login')
      });
  };
    

  return (
    <div>
        <h2>Login</h2>
      <form onSubmit={login}>
          <input onChange={handleChange} placeholder='Username' type='text' name='username' value={props.credentials.username} />
          <input onChange={handleChange} placeholder='Password' type='password' name='password' value={props.credentials.password} />
          <input type='submit' />
      </form>
      <Link to='/register'><p>Sign up</p></Link>
    </div>
  );
}

export default Login;
