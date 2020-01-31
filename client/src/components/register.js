import React from 'react';
import axios from 'axios'

function Register(props) {

    

    const handleChange = e => {
        props.setCredentials({
            ...props.credentials,
            [e.target.name]: e.target.value
        })
    }

    const register = e => {
        e.preventDefault();
        axios.post('http://localhost:3300/api/auth/register', {
         username: props.credentials.username,
         password: props.credentials.password,
    })
    .then(res => {
        console.log(res);
        alert('Successfull Register')
        props.history.push('/login')
    })
    .catch(error => {
        alert(error.message);
        alert('Unsucessfull Register')
      });
  };
    

  return (
    <div>
    <h2>Register</h2>
      <form onSubmit={register}>
          <input onChange={handleChange} placeholder='Username' type='text' name='username' value={props.credentials.username} />
          <input onChange={handleChange} placeholder='Password' type='password' name='password' value={props.credentials.password} />
          <input type='submit' />
      </form>
    </div>
  );
}

export default Register;
