import React, { useState } from 'react';
import './App.css';
import Login from './components/login'
import { Route, Link } from 'react-router-dom'
import Register from './components/register';

function App() {

  const [credentials, setCredentials] = useState({
    username: '',
    password: ''

  })

  const [loginToggle, setLoginToggle] = useState({
    toggler: 'Login'
  })

  return (
    <div className="App">
      <Link to='/login'><h2 className='login'>Login</h2></Link>
      <Route exact path='/login' render={(props) => <Login {...props} credentials={credentials} setCredentials={setCredentials}  />}/>
      <Route exact path='/register' render={(props) => <Register {...props} credentials={credentials} setCredentials={setCredentials}  />}/>
    </div>
  );
}

export default App;
