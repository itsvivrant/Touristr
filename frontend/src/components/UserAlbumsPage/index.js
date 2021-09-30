import React, { useEffect, useState } from 'react';
import { useHistory, Redirect, useParams, Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserAlbums,createAlbum} from '../../store/album';
import {Modal} from '../../context/Modal'
import AlbumDelete from '../UserAlbumsPage/AlbumDelete'

import './UserAlbumsPage.css'

const UserAlbumsPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [renderPage, setRenderPage] = useState(false)

    useEffect(() => {
        dispatch(getUserAlbums(id))
    }, [dispatch, id, renderPage])

    const userAlbums = useSelector(state => {
        return Object.values(state.albums)
    })


    const handleCreateAlbum = async e => {
        e.preventDefault()
        const albumData = {
            title,
            userId: sessionUser.id,
            description
        }

        await dispatch(createAlbum(albumData))
        setTitle('')
        setDescription('')
        setShowModal(false)
        history.push(`/albums/user/${id}`)



    }

    const handleDeleteAlbum = async e => {
        e.preventDefault()
    }

    const showPhotoStream = (e) => {
        e.preventDefault();
        history.push(`/users/${id}`)
    }

    const showAlbums = (e) => {
        e.preventDefault();
        history.push(`/albums/user/${id}`)
    }

    if (!userAlbums) return null;

    if (!sessionUser){
        return(
            <Redirect to='/login' />
        )
    }

    return (
        <>
            <div className="user-banner-container">
                <div className="user-info-container">
                    <div className='user-profile-pic'></div>
                    <div className='user-detail-container'>
                        <div className='user-detail'>
                            <h2>{sessionUser.username}</h2>
                        </div>
                        <div className='user-detail'>
                            <p>{sessionUser.email}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="profile-row">
                <div >
                    <Link className="photostream-container" onClick={showPhotoStream}>PhotoStream</Link>
                </div>
                <div >
                    <Link  className="albums-container" id="photostream-border" onClick={showAlbums}>Albums</Link>
                </div>
                {/* <div >
                    <a className="favorites-container">Favorites</a>
                </div> */}
            </div>
            <div className='albums-gallery'>
                <div className='create-album-div'>
                    <button onClick={() => setShowModal(true)}>+ New Album</button>
                    {showModal && (
                        <Modal>
                            <div className='create-album-container'>
                                <form className='album-form' onSubmit={handleCreateAlbum}>
                                    <input value={title} onChange={(e) => setTitle(e.target.value)}></input>
                                    <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                    <button type='submit'>Create Album</button>
                                </form>
                            </div>
                        </Modal>
                    )}
                </div>
                <div className='album-gallery-container'>
                    <div className='album-gallery-page'>
                        {userAlbums?.map((album) => (
                            <>
                            <div className='album-box'>
                                <div className='album-photo'></div>
                                <div className='album-content'>
                                    <p>{album.title}</p>
                                    {/* <p>{album.description}</p> */}
                                    <div className='album-delete-bttn'>
                                        <AlbumDelete albumId={album.id} setRenderPage={setRenderPage} userId={id} renderPage={renderPage}/>
                                    </div>
                                </div>
                            </div>
                            </>
                        ))}

                    </div>
                </div>
            </div>
        </>
    )
}

export default UserAlbumsPage;
