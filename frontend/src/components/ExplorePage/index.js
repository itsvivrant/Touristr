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
                    <h1>Explore</h1>
                </div>
            </div>
            <div className='gallery-page'>
                {photos.map((photo) => (
                    <>
                        <a href={`/photos/${photo.id}`} onClick={showPhoto}>
                            <img class='single-photo' src={photo.imgURL} alt=""/>
                        </a>
                        <div class="photo-title">{photo.title}</div>
                        <div class="photo-username">By {photo.User.username}</div>
                            {/* <div className="image-overlay">
                        </div> */}
                    </>
                ))}
            </div>
        </>
    )
}

export default ExplorePage;
