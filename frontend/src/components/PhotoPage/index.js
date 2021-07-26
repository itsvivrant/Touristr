import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams , Redirect} from 'react-router-dom'
import { getSinglePhoto, deleteUserPhoto } from '../../store/photo';
import Comment from './comment';
import './PhotoPage.css'


const PhotoPage = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const {id} = useParams()
    const sessionUser = useSelector(state => state.session.user)
    const photo = useSelector(state =>  state.photos[id]);

    useEffect(() => {
        dispatch(getSinglePhoto(id))
    }, [dispatch])

    if(!sessionUser) {
        return (
            <Redirect to='/login' />
        )
    }

    if (!photo) {
        return null
    }

    const directToEditPage = () => {
        history.push(`/edit/${photo.id}`)
    }

    const handleDeletePhoto = async (e) => {
        e.preventDefault()
        dispatch(deleteUserPhoto(photo.id))
        history.push(`/users/${sessionUser.id}`)
    }

    if(photo.userId !== sessionUser.id)
    return (
        <div className='photo-page'>
            <div className='photo-container'>
                <img className='img' src={photo.imgURL}></img>
            </div>
            <div className='photo-info'>
                <div className='photo-info-card'>
                    <div className='photo-header-container'>
                        <h1 className='photo-title'>{photo?.title}</h1>
                        <h3 className='photo-user'>Photo by: {photo.User?.username}</h3>
                        <p className="photo-caption">{photo?.caption}</p>
                    </div>
                </div>
                <div className='photo-comments'>
                    <Comment />
                </div>
            </div>

        </div>
    )
    else
    return (
        <div className='photo-page'>
            <div className='photo-container'>
                <img className='img' src={photo.imgURL}></img>
            </div>
            <div className='photo-info'>
                <div className='photo-info-card'>
                    <div className='photo-header-container'>
                        <h1 className='photo-title'>{photo?.title}</h1>
                        <h3 className='photo-user'>Photo by: {photo.User?.username}</h3>
                        <p className="photo-caption">{photo?.caption}</p>
                    </div>
                    <div>
                        <button onClick={directToEditPage}>Edit Photo</button>
                        <button onClick={handleDeletePhoto}>Delete Photo</button>
                    </div>
                    
                    <div className='photo-comments-two'>
                        <Comment />
                    </div>
                </div>
            </div>

        </div>
    )

}

export default PhotoPage
