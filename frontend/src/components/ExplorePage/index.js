import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getPhotos } from '../../store/photo';
import './Explore.css'

const ExplorePage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [photo, setPhoto] = useState()

    const showPhoto = (e) => {
        history.push(`/photos/${photo.id}`)
        //e.preventDefault()
    }

    //grabs the current state object of photos
    let photos = useSelector(state =>  Object.values(state.photos)); //this is the from the root reducer in store index.js

    useEffect(() => {
        dispatch(getPhotos()) //use the thunk action creator
    }, [dispatch])

    if(!photos) return null

    return (
        <div className='photo-container'>
            <div className='show-pics'>
                <div className='pics'>
                    {photos.map((photo) => (
                        <a href={`/photos/${photo.id}`} onClick={showPhoto}>
                            <div key={photo.id} class='pics'>
                                <img class='each-photo' src={photo.imgURL} />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ExplorePage;
