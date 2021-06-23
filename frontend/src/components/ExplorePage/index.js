import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { getPhotos } from '../../store/photo';

import './Explore.css'

const ExplorePage = () => {
    const dispatch = useDispatch();

    //grabs the current state object of photos
    let photos = useSelector(state =>  Object.values(state.photos)); //this is the from the root reducer in store index.js

    useEffect(() => {
        dispatch(getPhotos()) //use the thunk action creator
    }, [dispatch])

    if(!photos) return null

    return (
        <div class='photo-container'>
            {photos.map((photo) => (
                <div class='photo-card'>
                    <img class='each-photo' src={photo.imgURL} />
                </div>
            ))}
        </div>
    )
}

export default ExplorePage;
