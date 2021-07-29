import React, { useEffect } from 'react';
import { useHistory, Redirect, useParams, Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserAlbums } from '../../store/album';

import './UserAlbumsPage.css'

const UserAlbumsPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const album = useSelector(state => state.albums[id])

    useEffect(() => {
        dispatch(getUserAlbums(id))
    }, [dispatch, id])

    const userAlbums = useSelector(state => {
        return Object.values(state.albums)
    })

    console.log("     ALBUM                  ", userAlbums)

    const showPhotoStream = (e) => {
        e.preventDefault();
        history.push(`/users/${id}`)
    }

    const showAlbums = (e) => {
        e.preventDefault();
        history.push(`/albums/user/${id}`)
    }

    if (!userAlbums) return null;

    if (!sessionUser){
        return(
            <Redirect to='/login' />
        )
    }

    return (
        <>
            <div className="user-banner-container">
                <div className="user-info-container">
                    <div className='user-profile-pic'>
                    </div>
                    <div className='user-detail-container'>
                        <div className='user-detail'></div>
                        <div className='user-detail'></div>
                    </div>
                </div>

            </div>

            <div className="profile-row">
                <div >
                    <Link className="photostream-container" onClick={showPhotoStream}>PhotoStream</Link>
                </div>
                <div >
                    <Link  className="albums-container" id="photostream-border" onClick={showAlbums}>Albums</Link>
                </div>
                <div >
                    <a className="favorites-container">Favorites</a>
                </div>
            </div>

            <div className='album-page'>
                {userAlbums?.map((album) => (
                    <h1>{album.title}</h1>
                ))}

            </div>
        </>
    )
}

export default UserAlbumsPage;
