import React from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import { deleteAlbum} from '../../store/album';

import './UserAlbumsPage.css'

function AlbumDelete({albumId, setRenderPage}) {
    const dispatch = useDispatch()
    const history = useHistory()

    const handleDelete = async e => {
        e.preventDefault()
        await dispatch(deleteAlbum(albumId))
        setRenderPage(true)

    }

    return (
        <i onClick={handleDelete} className="fas fa-trash"></i>

    )
}

export default AlbumDelete
