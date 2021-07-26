import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './LoginForm.css'

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to="/explore-photos" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <div className='login-form-container'>
      <div className='login-form-page'>
        <form onSubmit={handleSubmit}>
          <div className="form-info">
            <ul classNamee="login-validations">
              {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <div className="logo-img"></div>
            <h1>Login to Touristr</h1>
            <div className='login-label'>
              <input className='login-input' type="text" placeholder="Username or Email" value={credential} onChange={(e) => setCredential(e.target.value)} required />
              {/* <label>Username or Email</label> */}
            </div>

            <div className='login-label'>
              <input className='login-input' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              {/* <label>Password</label> */}
            </div>

            <div className='login-label'>
              <button type="submit">Log In</button>
            </div>
          </div>


      </form>
     </div>
    </div>

  );
}

export default LoginFormPage;
