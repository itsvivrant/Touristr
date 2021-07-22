import React, { useEffect } from 'react';
import { useHistory, Redirect, useParams, Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserPhotos, getPhotos} from '../../store/photo'

import './UserProfilePage.css';

const UserProfilePage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const photo = useSelector(state => state.photos[id])


    useEffect(() => {
        dispatch(getUserPhotos(id))
    }, [dispatch, id])

    const userPhotos = useSelector(state => {
        return Object.values(state.photos)
    })

    //double check for the back button part
    const showPhoto = (e) => {
        history.push(`/users/${photo.id}`)
    }

    const showPhotoStream = (e) => {
        history.push(`/users/${id}`)
    }


    if (!userPhotos) return null;

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
                <div className="photostream-container">
                    <Link onClick={showPhotoStream}>PhotoStream</Link>
                </div>
                <div className="albums-container">
                    <a>Albums</a>
                </div>
                <div className="favorites-container">
                    <a>Favorites</a>
                </div>
            </div>

            <div className='gallery-page'>
                {userPhotos.map((photo) => (
                    <Link to={`/photos/${photo.id}`} onClick={showPhoto}>
                        <img className='each-photo' src={photo.imgURL} />
                    </Link>
                ))}
            </div>
        </>
    )
}
export default UserProfilePage;
