import React, { useEffect, useState } from 'react';
import { useHistory, Redirect, useParams, Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSingleAlbum} from '../../store/album';
import {Modal} from '../../context/Modal';
import ReactBnbGallery from 'react-bnb-gallery';

import 'react-bnb-gallery/dist/style.css'



// import SimpleImageSlider from "react-simple-image-slider";


import './UserAlbumsPage.css'


function ViewAlbumPhotos({albumId, setIsOpen, isOpen}) {
    const dispatch  = useDispatch();
    
    const albumPhotos = useSelector(state => state.albums[albumId])

    // console.log(albumPhotos.Photos)

    const photos = albumPhotos.Photos?.map((photo) => photo.imgURL)




    useEffect(() =>  {
        dispatch(getSingleAlbum(albumId))

    }, [dispatch, albumId])

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
