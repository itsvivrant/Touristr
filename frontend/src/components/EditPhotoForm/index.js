import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory, useParams, Redirect} from 'react-router-dom'
import {editUserPhoto, getPhotos} from '../../store/photo';
import './EditPhotoForm.css'


const EditPhotoForm = ({photo}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user)
    const [title, setTitle] = useState(photo.title);
    const [caption, setCaption] = useState(photo.caption);
    // const [location, setLocation] = useState('')

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

        await dispatch(editUserPhoto(photoData))
        // if (editedPhoto) {
        //     // setTitle('');
        //     // setCaption('')
        //     history.push(`/photos/${photo.id}`)
        // }

    }

    const handleCancelClick = (e) => {
        e.preventDefault();
        history.push(`/explore-photos`)
    };

      return (
        <div className='photo-edit-form'>
            <form onSubmit={handleSubmit}>

                <div className='photo-input-container'>
                    <input type='text' placeholder='title' value={title} onChange={updateTitle}></input>
                    <input type='text' placeholder='caption' value={caption} onChange={updateCaption}></input>
                </div>
                <button type="submit">Update Photo</button>
                <button type="button" onClick={handleCancelClick}>Cancel</button>
            </form>
        </div>
      )
}

export default EditPhotoForm
