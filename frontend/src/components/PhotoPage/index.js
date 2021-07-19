import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams , Redirect} from 'react-router-dom'
import { getSinglePhoto } from '../../store/photo';
import Comment from './comment';
import './PhotoPage.css'


const PhotoPage = () => {
    const dispatch = useDispatch();
    const history = useHistory()

    // const [showEditButton, setShowEditButton] = useState(false)

    const {id} = useParams()
    console.log('id', id)

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

     //check for user with photo to edit grabbing the current user's id
    //  if (photo.User.id === sessionUser.id) {
    //     setShowEditButton(true)
    // }

    const directToEditPage = () => {
        history.push(`/edit/${photo.id}`)
    }


    return (
        <div className='photo-page'>
            <div className='photo-container'>
                <img className='img' src={photo.imgURL}></img>
            </div>
            <div className='photo-info'>
                <div className='photo-info-card'>
                    <div className='title-container'>
                        <h1>{photo.title}</h1>
                        <h3>Photo by: {photo.User?.username}</h3>
                        <p>{photo.caption}</p>
                    </div>
                    <div>
                    </div>
                    {/* {showEditButton && ( //if showeditbutton is true, then render
                        <button onClick={directToEditPage}>Edit Photo</button>
                    )} */}
                    {/* {photo.User.id === sessionUser.id ? (<button onClick={directToEditPage}>Edit Photo</button>):(null)} */}
                    <button onClick={directToEditPage}>Edit Photo</button>

                    <div>
                        <Comment />
                    </div>
                 </div>
            </div>

        </div>
    )

}

export default PhotoPage
