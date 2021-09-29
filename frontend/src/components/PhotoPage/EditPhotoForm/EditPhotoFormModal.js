import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory, useParams, Redirect} from 'react-router-dom'
import {editUserPhoto, getPhotos,getSinglePhoto} from '../../../store/photo';
import {Modal} from '../../../context/Modal'

import './EditPhotoForm.css'


const EditPhotoFormModal = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user)
    const photo = useSelector(state => state.photos[id])
    const [title, setTitle] = useState(photo.title || "");
    const [caption, setCaption] = useState(photo.caption || "");
    // const [location, setLocation] = useState('')
    const [showModal, setShowModal] = useState(false);



    useEffect(() => {
        dispatch(getSinglePhoto(id))
        dispatch(getPhotos())
    }, [dispatch,id, sessionUser.id, title, caption])

    const updateTitle = (e) => setTitle(e.target.value)
    const updateCaption = (e) => setCaption(e.target.value)

    if (!sessionUser) {
        return (
          <Redirect to='/login' />
        )
    }


    const handleSubmit = async e => {
        e.preventDefault();

        const photoData = {
            ...photo,
            title,
            caption,
            userId: sessionUser.id
            //location
        }

        const updatedPhoto = await dispatch(editUserPhoto(photoData))
        if (updatedPhoto) {
            setTitle('');
            setCaption('')
            history.push(`/photos/${photo.id}`)
            setShowModal(false)
        }

    }

    const handleCancelClick = (e) => {
        e.preventDefault();
        setCaption(photo.caption)
        setTitle(photo.title)
        history.push(`/photos/${photo.id}`)
        setShowModal(false)
    };

    const redirectToHomePage = () =>{
        history.push(`/photos/${photo.id}`)
        setShowModal(false)
    }

      return (
        <>
            <i className='fas fa-edit' onClick={() => setShowModal(true)}></i>
            {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <div className='edit-page-container'>
                    <div className='photo-edit-form'>
                        <div >
                            <form className="photo-details" onSubmit={handleSubmit}>
                                <h3>Title: </h3>
                                <p>{photo.title}</p>
                                <div className='photo-input-container'>
                                        <input type='text' placeholder='Title' value={title} onChange={updateTitle}></input>
                                </div>
                                <h3>Caption: </h3>
                                <p>{photo.caption}</p>
                                <div className='photo-input-container'>
                                        <textarea type='textarea' placeholder='Caption' value={caption} onChange={updateCaption}></textarea>
                                </div>
                            </form>
                        </div>
                        <form className="photo-details" onSubmit={handleSubmit}>
                            <div className="edit-form-buttons">
                                <div className="update-photo-button">
                                    <button type="submit">Update Photo</button>
                                </div>
                                <div className="update-photo-button">
                                    <button type="button" onClick={handleCancelClick}>Cancel</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className='edit-photo-container'>
                        <img className='edit-photo'src={photo.imgURL} alt=""></img>
                    </div>
                </div>
            </Modal>
            )}
        </>
      )
}

export default EditPhotoFormModal
