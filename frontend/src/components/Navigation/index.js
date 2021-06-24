import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <NavLink className='nav-link' to='/explore-photos'>Explore</NavLink>
        <NavLink className='nav-link' to='/upload'>Upload Photo</NavLink>
        <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <NavLink className='nav-link' to="/login">Log In</NavLink>
        <NavLink className='nav-link' to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div className='nav-container'>
      <NavLink className='nav-link' exact to="/explore-photos">Touristr</NavLink>
      {isLoaded && sessionLinks}
    </div>




  );
}

export default Navigation;
