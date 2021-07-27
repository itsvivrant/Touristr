import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams , Redirect} from 'react-router-dom'
import { getSinglePhoto, deleteUserPhoto } from '../../store/photo';
import Comment from './comment';
import EditPhotoFormModal from '../EditPhotoForm/EditPhotoFormModal';
import './PhotoPage.css'


const PhotoPage = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const {id} = useParams()
    const sessionUser = useSelector(state => state.session.user)
    const photo = useSelector(state =>  state.photos[id]);

    useEffect(() => {
        dispatch(getSinglePhoto(id))
    }, [dispatch, id])

    if(!sessionUser) {
        return (
            <Redirect to='/login' />
        )
    }

    if (!photo) {
        return null
    }

    // const directToEditPage = () => {
    //     history.push(`/edit/${photo.id}`)
    // }

    const handleDeletePhoto = async (e) => {
        e.preventDefault()
        dispatch(deleteUserPhoto(photo.id))
        history.push(`/users/${sessionUser.id}`)
    }


    return (
        <div className='photo-page'>
            <div className='photo-container'>
                <img className='img' src={photo.imgURL} alt=""></img>
            </div>
            <div className='photo-info'>
                <div className='photo-info-card'>
                    <div className='photo-header-container'>
                        <h1 className='photo-title'>{photo?.title}</h1>
                        <h2 className='photo-user'>Photo by: {photo.User?.username}</h2>
                        <p className="photo-caption">{photo?.caption}</p>
                    </div>
                    <div hidden={photo.userId !== sessionUser.id}>
                        {/* <button onClick={directToEditPage}>Edit Photo</button> */}
                        <EditPhotoFormModal />
                        <button onClick={handleDeletePhoto}>Delete Photo</button>
                    </div>
                </div>
                <div className='photo-comments'>
                    <Comment />
                </div>
            </div>

        </div>
    )

}

export default PhotoPage
