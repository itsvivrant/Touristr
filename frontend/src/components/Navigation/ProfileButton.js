import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {Link, Redirect, useHistory} from 'react-router-dom'
import * as sessionActions from '../../store/session';
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

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = async (e) => {
    e.preventDefault();
    await dispatch(sessionActions.logout());

    history.push('/')
  };

  if (!sessionUser) <Redirect to="/"/>



  return (
    <>
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (
        <div  className='dropdown'>
          <ul className="profile-dropdown">
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li>
              <button className='logout-bttn' onClick={logout}>Logout</button>
            </li>
          </ul>
        </div>

      )}
    </>
  );
}

export default ProfileButton;
