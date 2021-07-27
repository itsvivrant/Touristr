import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory, useParams, Redirect} from 'react-router-dom'
import {editUserPhoto, getPhotos} from '../../store/photo';
import './EditPhotoForm.css'


const EditPhotoForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user)
    const [title, setTitle] = useState('');
    const [caption, setCaption] = useState('');
    // const [location, setLocation] = useState('')

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
        }

    }

    const handleCancelClick = (e) => {
        e.preventDefault();
        history.push(`/photos/${photo.id}`)
    };

    const redirectToHomePage = () =>{
        history.push(`/photos/${photo.id}`)
    }

      return (
        <div className='edit-page-container'>
            <div className='photo-edit-form-container'>
                <form onSubmit={handleSubmit}>
                    <div className='photo-input-container'>
                        <input type='text' placeholder='title' value={title} onChange={updateTitle}></input>
                        <input type='text' placeholder='caption' value={caption} onChange={updateCaption}></input>
                    </div>
                    <button type="submit">Update Photo</button>
                    <button type="button" onClick={handleCancelClick}>Cancel</button>
                </form>
              <div>
                  <h3>Title: {photo.title}</h3>
                  <h4>Caption: {photo.caption}</h4>
              </div>
            </div>
            <div className='edit-photo-container'>
                <img className='edit-photo'src={photo.imgURL} alt=""></img>
            </div>


        </div>

      )
}

export default EditPhotoForm
