import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory, useParams, Redirect} from 'react-router-dom'
import {editUserPhoto, getPhotos} from '../../store/photo';
import {Modal} from '../../context/Modal'

import './EditPhotoForm.css'


const EditPhotoFormModal = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user)
    const [title, setTitle] = useState('');
    const [caption, setCaption] = useState('');
    // const [location, setLocation] = useState('')
    const [showModal, setShowModal] = useState(false);


    const {id} = useParams();
    const photo = useSelector(state => state.photos[id])

    useEffect(() => {
        dispatch(getPhotos())
    }, [dispatch])

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

    // const handleCancelClick = (e) => {
    //     e.preventDefault();
    //     history.push(`/photos/${photo.id}`)
    //     setShowModal(false)
    // };

    const redirectToHomePage = () =>{
        history.push(`/photos/${photo.id}`)
        setShowModal(false)
    }

      return (
        <>
            <button onClick={() => setShowModal(true)}>Edit Photo</button>
            {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <div className='edit-page-container'>
                    <div className='photo-edit-form'>
                        <button className='edit-page-button'onClick={redirectToHomePage}>Redirect to Photo Page</button>
                        <form onSubmit={handleSubmit}>
                            <div className='photo-input-container'>
                                <div>
                                    <input type='text' placeholder='Title..' value={title} onChange={updateTitle}></input>
                                </div>
                                <div>
                                    <input type='text' placeholder='Caption..' value={caption} onChange={updateCaption}></input>
                                </div>
                            </div>
                            <div className="update-photo-button">
                                <button type="submit">Update Photo</button>
                            </div>
                            {/* <button type="button" onClick={handleCancelClick}>Cancel</button> */}
                        </form>
                        <div>
                            <h3>Title: </h3>
                            <p>{photo.title}</p>
                            <h3>Caption: </h3>
                            <p>{photo.caption}</p>
                        </div>
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
