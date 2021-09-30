import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {getUserAlbums, addPhotoToAlbum} from '../../store/album';

import './PhotoPage.css'


function AddToAlbum({photo}) {
    const dispatch = useDispatch()
    const {id} = useParams()
    const sessionUser = useSelector(state => state.session.user);
    const [addPhoto, setAddPhoto] = useState('');
    const userAlbums = useSelector(state => {
        return Object.values(state.albums)
    });

    useEffect(() => {
        dispatch(getUserAlbums(sessionUser.id))
    }, [dispatch])

    const handleAddToAlbum = async e => {
        e.preventDefault()
        const photo = {
            photoId: id,
            albumId: addPhoto
          }
          dispatch(addPhotoToAlbum(photo))
    }
    return(
        <form onSubmit={handleAddToAlbum}>
            <input type="hidden" value={photo.id} />
            <select id='dropdown-album-options' className="album" value={addPhoto} onChange={e => setAddPhoto(e.target.value)}>
            <option value="" disabled>Add to Album</option>
            {userAlbums.map(album => {
              return (
                <option className='album-options' key={album.id} value={album.id}>{album.name}</option>
              )
            })}
          </select>
          <button type='submit'>Add</button>
        </form>
    )
}

export default AddToAlbum
