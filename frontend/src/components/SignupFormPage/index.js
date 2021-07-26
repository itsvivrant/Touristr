import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';


function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, firstName, lastName, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  <div className='signup-label'>

  </div>

  return (
    <div className='login-form-container'>
      <div className='login-form-page'>
        <form className='form-info' onSubmit={handleSubmit}>
          <div className='login-label'>
            <ul className="login-validation">
              {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
          </div>
          <div className="logo-img"></div>
          <h1>Sign up to Touristr</h1>
          <div className='login-label'>
              <input className='login-input' type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className='login-label'>

              <input className='login-input' type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>

          <div className='login-label'>

              <input className='login-input' type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          </div>

          <div className='login-label'>

              <input className='login-input' type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          </div>

          <div className='login-label'>
              <input className='login-input' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <div className='login-label'>
              <input className='login-input' type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>

          <div className='login-label'>
            <button type="submit">Sign Up</button>
          </div>


        </form>
      </div>
    </div>
  );
}

export default SignupFormPage;
