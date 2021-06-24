import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams , Redirect} from 'react-router-dom'
import { getSinglePhoto } from '../../store/photo';
import './PhotoPage.css'


const PhotoPage = () => {
    const dispatch = useDispatch();

    const {id} = useParams()

    const sessionUser = useSelector(state => state.session.user)
    const photo = useSelector(state =>  state.photos[id]);

    useEffect(() => {
        dispatch(getSinglePhoto(id)) //use the thunk action creator
    }, [dispatch])

    if(!sessionUser) {
        return (
            <Redirect to='/login' />
        )
    }

    if (!photo) {
        return null
    }

    return (
        <div className='photo-page'>
            <div className='photo-container'>
                <img className='img' src={photo.imgURL}></img>
            </div>
            <div>
                <h1>{photo.title}</h1>
                <h3>Photo by: {photo.User?.username}</h3>
            </div>
            <div className='comment-container'>
                <p>Comment section</p>
            </div>

        </div>
    )

}

export default PhotoPage
