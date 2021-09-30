import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom'
import { deleteAlbum} from '../../store/album';

import './UserAlbumsPage.css'

function AlbumDelete({albumId, setRenderPage, renderPage}) {
    const dispatch = useDispatch();
    const history = useHistory()
    const [renderDelete, setRenderDelete] = useState(false)



    const handleDelete = async e => {
        e.preventDefault()
        await dispatch(deleteAlbum(albumId))
        renderPage ? setRenderPage(false) : setRenderPage(true)

    }

    return (
        <i onClick={handleDelete} className="fas fa-trash"></i>

    )
}

export default AlbumDelete
