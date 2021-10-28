import React, { useEffect, useState } from 'react';
import { useHistory, Redirect, useParams, Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserAlbums, getSingleAlbum} from '../../store/album';
import {Modal} from '../../context/Modal';
import ReactBnbGallery from 'react-bnb-gallery';

import 'react-bnb-gallery/dist/style.css'



// import SimpleImageSlider from "react-simple-image-slider";


import './UserAlbumsPage.css'


function ViewAlbumPhotos({albumId, setIsOpen, isOpen}) {
    const dispatch  = useDispatch();
    const {id} = useParams();


    const albumPhotos = useSelector(state => state.albums[albumId])

    const photos = albumPhotos.Photos?.map((photo) => photo.imgURL)




    useEffect(() =>  {
        dispatch(getUserAlbums(id))
        dispatch(getSingleAlbum(albumId))


    }, [dispatch, albumId, id])

    return (
        <>

        <ReactBnbGallery
          show={isOpen}
          photos={photos}
          onClose={() => setIsOpen(false)}
        />





        </>
    )

}

export default ViewAlbumPhotos
