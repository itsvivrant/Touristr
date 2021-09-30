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
    const [status, setStatus] = useState("Add")
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
          setStatus("Added")
          window.alert("Photo added to album.")
    }

    if (handleAddToAlbum) {
      setTimeout(() => {
        setStatus('Add');
      }, 2000);
    }

    return(
        <form onSubmit={handleAddToAlbum}>
            <input type="hidden" value={photo.id} />
            <select className="album-select" value={addPhoto} onChange={e => setAddPhoto(e.target.value)}>
            <option value="" >Add to Album</option>
            {userAlbums.map(album => {
              return (
                <option className='album-options' key={album.id} value={album.id}>{album?.name}</option>
              )
            })}
          </select>
          <button className='add-photo-bttn' type='submit'>{status}</button>
        </form>
    )
}

export default AddToAlbum
