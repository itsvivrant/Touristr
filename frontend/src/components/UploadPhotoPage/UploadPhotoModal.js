import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams , Redirect} from 'react-router-dom'
import {Modal} from '../../context/Modal'

import { uploadPhoto} from '../../store/photo';
import './UploadPhotoPage.css'


const UploadPhotoModal = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const history = useHistory()
    const [imgURL, setImgURL] = useState('');
    const [imgFile, setImgFile] = useState('');
    const [title, setTitle] = useState('');
    const [caption, setCaption] = useState('');
    const [showModal, setShowModal] = useState(false);

    // const [location, setLocation] = useState('')

    const updateImgURL = (e) => setImgURL(e.target.value)
    const updateTitle = (e) => setTitle(e.target.value)
    const updateCaption = (e) => setCaption(e.target.value)
    // const updateLocation = (e) => setLocation(e.target.value)

    const handleSubmit = async e => {
        e.preventDefault();

        const newPhoto = {
            imgFile,
            imgURL,
            title,
            caption,
            // location,
            userId: sessionUser.id
        }

        let createdPhoto = await dispatch(uploadPhoto(newPhoto))
        if (createdPhoto) {
            history.push(`/photos/${createdPhoto.id}`)
            setShowModal(false)
        }

    }




    const getFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImgFile(file);
        }
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        history.push(`/explore-photos`)
        setShowModal(false)
    };


    return (
        <>
            <i onClick={() => setShowModal(true)} className='fas fa-upload' title="Upload a picture"></i>
            {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <div className='upload-form-page'>
                    <div className='photo-form-container'>
                        <form className='upload-form' onSubmit={handleSubmit}>
                            <div className='upload-photo-box'>
                                <p>Click to select a file to upload</p>
                                <input type='file' accept="image/*" onChange={getFile}></input>
                            </div>
                            <span>Or</span>
                            <div className='upload-imgURL-box'>
                                <input type='text' placeholder='Image URL' onChange={updateImgURL}></input>
                            </div>
                            <div className='photo-input-container'>
                                <input type='text' placeholder='title' onChange={updateTitle}></input>
                                <input type='text' placeholder='caption' onChange={updateCaption}></input>
                            </div>
                            <div className="image-preview">
                                {imgURL === '' ? null :
                                    <img src={setImgURL}></img>
                                }
                            </div>
                            <div className="upload-buttons">
                                <button type="submit">Upload Photo</button>
                                <button type="button" onClick={handleCancelClick}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
            )}
        </>
    )

}




export default UploadPhotoModal
