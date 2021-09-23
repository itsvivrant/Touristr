import React, { useEffect } from 'react';
import { useHistory, Redirect, useParams, Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserPhotos} from '../../store/photo'

import './UserProfilePage.css';

const UserProfilePage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams();
    const sessionUser = useSelector(state => state.session.user);

    const userPhotos = useSelector(state => {
        return Object.values(state.photos)
    })



    useEffect(() => {
        dispatch(getUserPhotos(id))
    }, [dispatch, id])


    const showPhotoStream = (e) => {
        e.preventDefault();
        history.push(`/users/${id}`)
    }

    const showAlbums = (e) => {
        e.preventDefault();
        history.push(`/albums/user/${id}`)
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
                    <div className='user-profile-pic'></div>
                    <div className='user-detail-container'>
                        <div className='user-detail'></div>
                        <div className='user-detail'></div>
                    </div>
                </div>
            </div>
            <div className="profile-row">
                <div  >
                    <Link className="photostream-container" id="photostream-border" onClick={showPhotoStream}>PhotoStream</Link>
                </div>
                <div >
                    <Link className="albums-container" onClick={showAlbums}>Albums</Link>
                </div>
                <div >
                    <a className="favorites-container">Favorites</a>
                </div>
            </div>

            <div className='gallery-page'>
                {userPhotos.map((photo) => (
                    // <Link to={`/photos/${photo.id}`} key={photo.id}>
                    //     <img className='each-photo' src={photo.imgURL} />
                    // </Link>
                    <>
                        <div class="gallery-box">
                            <a href={`/photos/${photo.id}`} key={photo.id}>
                                <div class="img-box">
                                    <img class='single-photo' src={photo.imgURL} alt=""/>
                                    <div class="photo-content">
                                        <p className='photo-title'>{photo.title}</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="space-div"></div>
                    </>
                ))}
            </div>
        </>
    )
}
export default UserProfilePage;
