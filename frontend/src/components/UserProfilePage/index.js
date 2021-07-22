import React, { useEffect } from 'react';
import { useHistory, Redirect, useParams} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserPhotos} from '../../store/photo'

import './UserProfilePage.css';

const UserProfilePage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const {id} = useParams();

    useEffect(() => {
        dispatch(getUserPhotos(id))
    }, [dispatch, id])

    const userPhotos = useSelector(state => {
        return Object.values(state.photos)
    })

    const showPhoto = (e) => {
        history.push(`/photos/${userPhotos.id}`)
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
                    <a onClick={showPhotoStream}>PhotoStream</a>
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
                    <a href={`/photos/${photo.id}`} onClick={showPhoto}>
                        <img className='each-photo' src={photo.imgURL} />
                    </a>
                ))}
            </div>
        </>
    )
}
export default UserProfilePage;
