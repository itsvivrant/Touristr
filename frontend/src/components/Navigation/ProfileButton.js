import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {Link, Redirect, useHistory} from 'react-router-dom'
import * as sessionActions from '../../store/session';
import UserProfilePage from "../UserProfilePage";
import './Navigation.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = () => {
      setShowMenu(false);
    };
    document.addEventListener('click', closeMenu)
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = async (e) => {
    e.preventDefault();
    await dispatch(sessionActions.logout());
    history.push('/')
  };

  if (!sessionUser) <Redirect to="/"/>

  const routeToProfile = (e) => {
    e.preventDefault();
    history.push(`/users/${sessionUser.id}`)
  }


  return (
    <>
      <button className="profile-button" onClick={openMenu} text="Profile">
        <i className="far fa-user-circle"/>
      </button>
      {showMenu && (
        <div className="profile-dropdown">
            <div className="dropdown-p">
              <p>Hello, {user.username}!</p>
            </div>
            <div className="dropdown-div">
              <Link className="profile-link" href={`/users/${sessionUser.id}`} onClick={routeToProfile}>Profile</Link>
            </div>
            <div className="dropdown-div">
              <Link className='logout-bttn' onClick={logout}>Log Out</Link>
            </div>
        </div>
      )}
    </>
  );
}

export default ProfileButton;
