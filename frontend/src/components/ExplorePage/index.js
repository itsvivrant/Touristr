import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getPhotos } from '../../store/photo';
import './Explore.css'

const ExplorePage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [photo] = useState()

    useEffect(() => {
        dispatch(getPhotos()) //use the thunk action creator
    }, [dispatch])

    //grabs the current state object of photos
    let photos = useSelector(state =>  Object.values(state.photos)); //this is the from the root reducer in store index.js

    const showPhoto = (e) => {
        history.push(`/photos/${photo.id}`)
    }

    if(!photos) return null

    return (
        <>
            <div className="title-container">
                <div className="header-div">
                    <h1>All Photos</h1>
                </div>
            </div>
            <div className='gallery-page'>
                {photos.map((photo) => (
                    <>
                        <div className="gallery-box">
                            <a href={`/photos/${photo.id}`} onClick={showPhoto}>
                                <div class="img-box">
                                    <img class='single-photo' src={photo.imgURL} alt=""/>
                                    <div class="photo-content">
                                        <p className='photo-title'>{photo.title}</p>
                                        <p className='photo-user'>By {photo.User?.username}</p>
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

export default ExplorePage;
