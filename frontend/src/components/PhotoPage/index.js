import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams , Redirect, Link} from 'react-router-dom'
import { getSinglePhoto, deleteUserPhoto } from '../../store/photo';
import { Modal } from '../../context/Modal'
import Comment from './Comment/comment';
import EditPhotoFormModal from './EditPhotoForm/EditPhotoFormModal';
import AddToAlbum from './AddToAlbum';
import Footer from '../Footer/Footer'



import './PhotoPage.css'


const PhotoPage = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const {id} = useParams()
    const sessionUser = useSelector(state => state.session.user)
    const photo = useSelector(state =>  state.photos[id]);
    const comments = useSelector(state=>{
        return Object.values(state.comments)
    })
    const [expand, setExpand] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [renderDelete, setRenderDelete] = useState(false)


    useEffect(() => {
        dispatch(getSinglePhoto(id))

    }, [dispatch, id, renderDelete])

    if(!sessionUser) {
        return (
            <Redirect to='/login' />
        )
    }

    if (!photo) {
        return null
    }

    const expandPicture = () => {
        setExpand(true)
        setShowModal(true)
    }

    const compressPicture =() => {
        setShowModal(false)
    }


    const handleDeletePhoto = async (e) => {
        e.preventDefault()
        dispatch(deleteUserPhoto(photo.id))
        setRenderDelete(true)
        history.push(`/explore-photos/`)
    }


    return (
        <>
        <div className='photo-page'>
            <div className='photo-container'>
                <div className='photo-box'>

                    <img className='img' src={photo.imgURL} alt={photo.title}></img>
                </div>

            </div>
            <div className='photo-page-edit-delete'>
                {photo.userId === sessionUser.id ?
                <>
                <EditPhotoFormModal />
                <i className='far fa-trash-alt' onClick={handleDeletePhoto} ></i>
                <i className='fas fa-expand-alt' onClick={expandPicture}></i>

                {expand ?
                showModal && (
                    <Modal>

                    <div className='img-modal-container'>
                        <div className='img-modal-box'>

                            <img className='img-modal' src={photo.imgURL} alt={photo.title}></img>
                        </div>
                        <i onClick={compressPicture} className='fas fa-compress-alt'></i>
                    </div>


                    </Modal>
                ) : ''}
                </>
            : <i className='fas fa-expand-alt' onClick={expandPicture}></i>
            }
            </div>
            <div className='photo-info'>
                <div className='photo-info-card'>
                    <div className='photo-header-container'>
                        <div className='photopage-user-album'>
                            <h2 className='photopage-user'><Link className="link-user" to={`/users/${photo.userId}`}>{photo.User?.username}</Link></h2>
                            <div className='album-select-box' hidden={photo.userId !== sessionUser.id}>
                                <AddToAlbum photo={photo}/>
                            </div>
                        </div>
                        <h3 className='photopage-title'>{photo?.title}</h3>
                        <p className="photopage-caption">{photo?.caption}</p>

                    </div>
                    <div className='photo-comments'>
                        <Comment />
                    </div>
                </div>
                <div className='photo-info-card-two'>
                    <div className='photo-details-container'>
                        <div className='photo-stats-container'>
                            <div className='photo-stats'>
                                <span className='stats-count'>{comments?.length}</span>
                                <span className='stats-label'>comments</span>
                            </div>
                            <div className='photo-stats'>
                                <span className='stats-count'>0</span>
                                <span className='stats-label'>favs</span>
                            </div>
                        </div>
                        <div className='photo-created'>
                            <div>Taken on {photo.createdAt.slice(0,10)}</div>
                            <i className="far fa-copyright"><span className='copyright'>All rights reserved</span></i>
                        </div>
                    </div>


                </div>

            </div>
        </div>
        <Footer />
        </>
    )

}

export default PhotoPage
