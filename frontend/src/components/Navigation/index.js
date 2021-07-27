import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import UploadPhotoModal from '../UploadPhotoPage/UploadPhotoModal';
import './Navigation.css';

function Navigation({ isLoaded }){

  const sessionUser = useSelector(state => state.session.user);


  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <div className="logo-you-nav">
          <div>
            <NavLink className='nav-link' exact to="/explore-photos">Touristr</NavLink>
          </div>
          <div>
            <NavLink className='you-link' to={`/users/${sessionUser.id}`}>You</NavLink>
          </div>
        </div>

        <NavLink className='nav-link' to='/explore-photos'>Explore</NavLink>

        <div className="upload-profile-nav">
          <div className="upload-button">
            <UploadPhotoModal />
          </div>
          <div className="profile-button-container">
            <ProfileButton user={sessionUser} />
          </div>
        </div>
      </>
    );
  } else {
    sessionLinks = (
      <>
        <NavLink className='nav-link' exact to="/">Touristr</NavLink>
        <NavLink className='nav-link' to="/login">Log In</NavLink>
        <NavLink className='nav-link' to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div className='nav-container'>
      {isLoaded && sessionLinks}
    </div>

  );
}

export default Navigation;
