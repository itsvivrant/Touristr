import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams , Redirect} from 'react-router-dom'
import { uploadPhoto} from '../../store/photo';
import './UploadPhotoPage.css'


const UploadPhotoPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const history = useHistory()
    const [imgURL, setImgURL] = useState('');
    const [title, setTitle] = useState('');
    const [caption, setCaption] = useState('');
    // const [location, setLocation] = useState('')

    const updateImgURL = (e) => setImgURL(e.target.value)
    const updateTitle = (e) => setTitle(e.target.value)
    const updateCaption = (e) => setCaption(e.target.value)
    // const updateLocation = (e) => setLocation(e.target.value)

    const handleSubmit = async e => {
        e.preventDefault();

        const newPhoto = {
            imgURL,
            title,
            caption,
            // location,
            userId: sessionUser.id
        }

        let createdPhoto = await dispatch(uploadPhoto(newPhoto))
        if (createdPhoto) {
            history.push(`/photos/${createdPhoto.id}`)
        }

    }

    const handleCancelClick = (e) => {
        e.preventDefault();
        history.push(`/explore-photos`)
      };


    return (
        <div className='photo-form'>
            <form onSubmit={handleSubmit}>
                <div>
                    <div className='upload-photo-box'>
                        <p>Click to select a file to upload</p>
                        <input type='file' accept="image/*" autocomplete="off" size="60"></input>
                    </div>
                    <span>Or</span>
                    <div className='upload-imgURL-box'>
                        <input type='text' placeholder='Image URL' onChange={updateImgURL}></input>
                    </div>
                </div>
                <div className='photo-input-container'>
                    <input type='text' placeholder='title' onChange={updateTitle}></input>
                    <input type='text' placeholder='caption' onChange={updateCaption}></input>
                </div>
                <button type="submit">Upload Photo</button>
                <button type="button" onClick={handleCancelClick}>Cancel</button>
            </form>

        </div>
    )
}



export default UploadPhotoPage
