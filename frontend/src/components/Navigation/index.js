import React, {useState} from 'react';
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
        <NavLink className='nav-link' to='/explore-photos'>Explore</NavLink>
        <div className="upload-profile-nav">
          <div className="upload-button">
            {/* <NavLink className='fas fa-upload' to='/upload' title="Upload a picture"></NavLink> */}
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
        <NavLink className='nav-link' exact to="/" hidden={!sessionUser}>Touristr</NavLink>
        <NavLink className='nav-link' to="/login">Log In</NavLink>
        <NavLink className='nav-link' to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div className='nav-container'>
      <NavLink className='nav-link' exact to="/">Touristr</NavLink>
      {isLoaded && sessionLinks}
    </div>

// if (!sessionUser) {
//   <NavLink className='nav-link' exact to="/">Touristr</NavLink>
// }


  );
}

export default Navigation;
